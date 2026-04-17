import { useEffect, useRef } from "react";

const TubesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<unknown>(null);

  useEffect(() => {
    if (!canvasRef.current || appRef.current) return;

    const loadTubes = async () => {
      try {
        // @ts-ignore - external CDN module
        const module = await import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
        const TubesCursor = module.default;
        appRef.current = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#2563EB", "#22D3EE", "#7C3AED"],
            lights: {
              intensity: 150,
              colors: ["#2563EB", "#22D3EE", "#7C3AED", "#60a5fa"],
            },
          },
        });
      } catch (e) {
        console.warn("Tubes background failed to load:", e);
      }
    };

    loadTubes();

    return () => {
      appRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} id="tubes-canvas" />;
};

export default TubesBackground;
