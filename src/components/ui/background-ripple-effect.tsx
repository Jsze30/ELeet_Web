"use client";
import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<any>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        // baseline colors via CSS variables
        "[--cell-border-color:rgb(90_90_90_/_0.28)] [--cell-fill-color:rgb(120_120_120_/_0.12)] [--cell-shadow-color:rgb(80_80_80_/_0.35)]",
        "dark:[--cell-border-color:rgb(70_70_70_/_0.30)] dark:[--cell-fill-color:rgb(120_120_120_/_0.10)] dark:[--cell-shadow-color:rgb(40_40_40_/_0.45)]"
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-600"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "rgb(90 90 90 / 0.28)",
  fillColor = "rgb(120 120 120 / 0.12)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null
  );
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  // --- SPOTLIGHT SETTINGS (dark purple aesthetic) ---
  const RADIUS = 2.1; // small neighborhood
  const MAX_FILL_ALPHA = 0.32;
  const MAX_BORDER_ALPHA = 0.6;
  const SPOT_COLOR = "120 40 160"; // rich dark purple (HSL ≈ #7828A0)

  const shadesForDistance = (d: number) => {
    if (!Number.isFinite(d) || d > RADIUS) {
      return { fill: fillColor, border: borderColor };
    }
    const t = 1 - d / RADIUS;
    const k = t * t;
    const fill = `rgb(${SPOT_COLOR} / ${MAX_FILL_ALPHA * k + 0.1})`;
    const border = `rgb(${SPOT_COLOR} / ${MAX_BORDER_ALPHA * k + 0.25})`;
    return { fill, border };
  };

  const pointToCell = (clientX: number, clientY: number) => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - 0.0001, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height - 0.0001, clientY - rect.top));
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return null;
    return { row, col };
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      setHovered(pointToCell(clientX, clientY));
      rafRef.current = null;
    });
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHovered(null);
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!interactive) return;
    const cell = pointToCell(e.clientX, e.clientY);
    if (cell) onCellClick?.(cell.row, cell.col);
  };

  return (
    <div
      ref={gridRef}
      className={cn("relative select-none", className)}
      style={gridStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        const dClick = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, dClick * 55) : 0;
        const duration = 200 + dClick * 80;
        const style: CellStyle = clickedCell
          ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
          : {};

        const dHover = hovered
          ? Math.hypot(hovered.row - rowIdx, hovered.col - colIdx)
          : Number.POSITIVE_INFINITY;
        const shades = shadesForDistance(dHover);

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] transition-[background-color,border-color] duration-150 ease-out will-change-transform",
              "opacity-40",
              "dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: shades.fill,
              borderColor: shades.border,
              ...style,
            }}
          />
        );
      })}
    </div>
  );
};
