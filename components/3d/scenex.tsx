"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

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
    if (!meshRef.current) return;

    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
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
    if (!meshRef.current) return;

    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime) * 0.35;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.42}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 900;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 32;
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.04}
        color="#d4a94d"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.025;
    camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      gsap.to(camera.position, {
        z: 5 + scrollY * 0.006,
        y: -(scrollY * 0.0015),
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(camera.rotation, {
        y: scrollY * 0.0005,
        x: scrollY * 0.0001,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [camera]);

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.42} />

      <pointLight position={[10, 10, 10]} intensity={1.8} color="#d4a94d" />
      <pointLight position={[-10, -10, -10]} intensity={0.65} color="#ffffff" />

      <FloatingCube position={[-3, 1, -2]} color="#d4a94d" speed={1} />
      <FloatingCube position={[3, -1, -4]} color="#ffffff" speed={0.8} />
      <FloatingCube position={[0, 2, -6]} color="#d4a94d" speed={1.2} />

      <FloatingSphere position={[-2, -2, -2]} color="#d4a94d" />
      <FloatingSphere position={[2, 2, -3]} color="#ffffff" />

      <Particles />

      <Stars
        radius={80}
        depth={80}
        count={2200}
        factor={5}
        saturation={0}
        fade
        speed={0.45}
      />

      <CameraRig />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}