import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

// Floating geometric shapes component
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTabFocused, setIsTabFocused] = useState(true);

  // Handle mouse movement for subtle parallax
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleVisibilityChange = () => {
      setIsTabFocused(!document.hidden);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Generate shapes with memoization for performance
  const shapes = useMemo(() => {
    const shapeArray = [];
    const shapeCount = window.innerWidth < 768 ? 8 : 12; // Fewer on mobile

    for (let i = 0; i < shapeCount; i++) {
      const shapeType = Math.floor(Math.random() * 3);
      shapeArray.push({
        id: i,
        type: shapeType, // 0: box, 1: sphere, 2: octahedron
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.3 + Math.random() * 0.7,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return shapeArray;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !isTabFocused) return;

    const elapsedTime = clock.getElapsedTime();

    // Subtle parallax based on mouse position (≤ 2-3°)
    const parallaxX = mousePosition.x * 0.02;
    const parallaxY = mousePosition.y * 0.02;

    groupRef.current.rotation.x = parallaxY;
    groupRef.current.rotation.y = parallaxX;

    // Animate individual shapes
    groupRef.current.children.forEach((child, index) => {
      const shape = shapes[index];
      if (shape) {
        child.rotation.x = elapsedTime * shape.speed * 0.3;
        child.rotation.y = elapsedTime * shape.speed * 0.2;
        child.position.y = shape.position[1] + Math.sin(elapsedTime * shape.speed) * 0.5;
      }
    });
  });

  const shapeGeometries = {
    0: <boxGeometry args={[1, 1, 1]} />,
    1: <sphereGeometry args={[0.5, 16, 16]} />,
    2: <octahedronGeometry args={[0.6]} />,
  };

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <mesh
          key={shape.id}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
        >
          {shapeGeometries[shape.type as keyof typeof shapeGeometries]}
          <meshPhongMaterial
            color="#22C55E"
            transparent
            opacity={0.15}
            wireframe={Math.random() > 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ambient lighting setup
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#22C55E"
      />
      <pointLight
        position={[5, 5, 5]}
        intensity={0.3}
        color="#F59E0B"
      />
    </>
  );
}

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: isMobile ? 50 : 45, // Wider FOV on mobile for better view
        }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)} // Lower DPR on mobile
        performance={{
          min: 0.5, // Degrade performance more aggressively
          max: 1,
          debounce: 200,
        }}
      >
        <Lighting />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}