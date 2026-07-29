"use client";

import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#d6a84d";

function StarTunnel({ scroll }: { scroll: MutableRefObject<number> }) {
  const tunnel = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 780;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.pow(Math.random(), 0.55) * 10;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = Math.sin(angle) * radius;
      values[i * 3 + 2] = -Math.random() * 52 + 8;
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    const progress = scroll.current;
    if (tunnel.current) {
      tunnel.current.rotation.z = progress * Math.PI * 1.35 + state.pointer.x * 0.08;
      tunnel.current.position.x = THREE.MathUtils.damp(
        tunnel.current.position.x,
        state.pointer.x * 1.7,
        4,
        delta,
      );
      tunnel.current.position.y = THREE.MathUtils.damp(
        tunnel.current.position.y,
        state.pointer.y * 1.15,
        4,
        delta,
      );
    }
    if (dust.current) {
      dust.current.rotation.z -= delta * (0.015 + progress * 0.035);
      const material = dust.current.material as THREE.PointsMaterial;
      material.size = 0.034 + progress * 0.025;
    }
  });

  return (
    <group ref={tunnel}>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#edc56f"
          size={0.035}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {Array.from({ length: 11 }, (_, index) => (
        <mesh
          key={index}
          position={[0, 0, 2 - index * 4.7]}
          rotation={[0, 0, index * 0.26]}
        >
          <torusGeometry args={[3.1 + (index % 3) * 0.42, 0.014, 8, 96]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#fff1c4" : GOLD}
            transparent
            opacity={0.1 + (index % 4) * 0.035}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeroObjects() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.52,
      3.8,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -state.pointer.y * 0.32,
      3.8,
      delta,
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.1} floatIntensity={0.75} rotationIntensity={0.4}>
        <mesh position={[3.1, 0.15, -1.2]} rotation={[0.9, 0.1, -0.2]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial color={GOLD} wireframe transparent opacity={0.68} />
        </mesh>
        <mesh position={[3.1, 0.15, -1.2]} rotation={[1.15, 0.15, 0.3]}>
          <torusGeometry args={[1.65, 0.018, 8, 120]} />
          <meshBasicMaterial color="#f0c96f" transparent opacity={0.78} />
        </mesh>
      </Float>

      <Float speed={1.6} floatIntensity={1.2} rotationIntensity={0.8}>
        <mesh position={[-3.65, -1.55, -2]} rotation={[0.6, 0.5, 0.1]}>
          <octahedronGeometry args={[0.88, 0]} />
          <meshStandardMaterial color="#f3d58c" wireframe transparent opacity={0.55} />
        </mesh>
      </Float>

      <Float speed={0.8} floatIntensity={0.5} rotationIntensity={0.3}>
        <mesh position={[-2.8, 2.7, -5]}>
          <dodecahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial color={GOLD} wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
    </group>
  );
}

function CameraFlight({ scroll }: { scroll: MutableRefObject<number> }) {
  const { camera } = useThree();
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const progress = scroll.current;
    const pointerX = state.pointer.x * 1.35;
    const pointerY = state.pointer.y * 0.9;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX, 4.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointerY - progress * 0.6, 4.5, delta);
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      6.2 - progress * 43,
      5,
      delta,
    );
    camera.rotation.z = THREE.MathUtils.damp(
      camera.rotation.z,
      -state.pointer.x * 0.025 + Math.sin(progress * Math.PI * 2) * 0.035,
      4,
      delta,
    );
    lookTarget.set(pointerX * 0.12, pointerY * 0.08, camera.position.z - 7);
    camera.lookAt(lookTarget);
  });
  return null;
}

function Scene() {
  const scrollTarget = useRef(0);
  const scrollSmooth = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      scrollTarget.current = window.scrollY / max;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useFrame((_, delta) => {
    scrollSmooth.current = THREE.MathUtils.damp(
      scrollSmooth.current,
      scrollTarget.current,
      6,
      delta,
    );
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 4, 5]} intensity={8} color={GOLD} />
      <pointLight position={[-5, -3, 1]} intensity={4} color="#fff1cf" />
      <StarTunnel scroll={scrollSmooth} />
      <HeroObjects />
      <Stars radius={70} depth={60} count={1250} factor={4} saturation={0.2} fade speed={0.55} />
      <CameraFlight scroll={scrollSmooth} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="galaxy-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 68 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
