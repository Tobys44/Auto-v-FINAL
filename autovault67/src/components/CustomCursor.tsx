import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference -ml-2 -mt-2 transition-transform duration-100 ease-out will-change-transform"
      style={{ 
        zIndex: 99999, // Vždycky navrchu
        pointerEvents: "none" // Nikdy neblokuje klikání
      }}
    />
  );
};

export default CustomCursor;