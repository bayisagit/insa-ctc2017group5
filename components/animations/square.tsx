import React, { useRef, useEffect, useState } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
}

const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 1,
  borderColor,
  squareSize = 40,
  hoverFillColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const [themeColors, setThemeColors] = useState<{
    border: CanvasStrokeStyle;
    hoverFill: CanvasStrokeStyle;
    background: string;
  }>({
    border: "#E2E8F0", // Default light border
    hoverFill: "#F1F5F9", // Default light hover
    background: "#F8FAFC", // Default light background
  });

  // Function to resolve CSS custom properties
  const resolveCssVariable = (variableName: string): string => {
    // Handle both with and without -- prefix
    const varName = variableName.startsWith('--') ? variableName : `--${variableName}`;
    
    // Get the value from computed styles
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    
    // Return the value or a fallback
    return value || getFallbackColor(varName);
  };

  // Fallback colors if CSS variables aren't available
  const getFallbackColor = (variableName: string): string => {
    const fallbacks: Record<string, string> = {
      '--accent': '#F97316',
      '--border': '',
      '--background': '#F97316',
      '--muted': '#F97316',
      '--primary': '#F97316',
      '--secondary': '#F97316',
    };
    
    return fallbacks[variableName] || '#000000';
  };

  // Resolve theme colors based on CSS custom properties
  const resolveThemeColors = () => {
    return {
      border: borderColor || resolveCssVariable('border'),
      hoverFill: hoverFillColor || resolveCssVariable('muted'),
      background: resolveCssVariable('background'),
    };
  };

  useEffect(() => {
    // Initial theme color resolution
    setThemeColors(resolveThemeColors());
    
    // Set up observer to detect theme changes
    const observer = new MutationObserver(() => {
      setThemeColors(resolveThemeColors());
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class', 'style'] 
    });
    
    // Also listen for resize events which might affect computed styles
    const handleResize = () => {
      setThemeColors(resolveThemeColors());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [borderColor, hoverFillColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = themeColors.hoverFill;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = themeColors.border;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // Create a subtle gradient overlay to blend the edges
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      // gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      // gradient.addColorStop(1, themeColors.background);

      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, squareSize, themeColors]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
      style={{ 
        background: themeColors.background,
        transition: 'background-color 0.3s ease'
      }}
    ></canvas>
  );
};

export default Squares;