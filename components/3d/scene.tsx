"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingCube({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        state.clock.elapsedTime * speed * 0.5;

      meshRef.current.rotation.y =
        state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />

        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.55}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />

        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y =
        state.clock.elapsedTime * 0.02;

      pointsRef.current.rotation.x =
        state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#D4A94D"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.25} />

      {/* Main warm gold light */}
      <pointLight
        position={[10, 10, 10]}
        intensity={1}
        color="#D4A94D"
      />

      {/* Secondary soft champagne light */}
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color="#E5C15F"
      />

      {/* Floating Cubes */}
      <FloatingCube
        position={[-3, 1, -2]}
        color="#D4A94D"
        speed={1}
      />

      <FloatingCube
        position={[3, -1, -3]}
        color="#BE933D"
        speed={0.8}
      />

      <FloatingCube
        position={[0, 2, -4]}
        color="#E5C15F"
        speed={1.2}
      />

      {/* Floating Spheres */}
      <FloatingSphere
        position={[-2, -2, -1]}
        color="#D4A94D"
      />

      <FloatingSphere
        position={[2, 2, -2]}
        color="#E5C15F"
      />

      {/* Particles */}
      <Particles />

      {/* Stars */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0.3}
        fade
        speed={1}
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}