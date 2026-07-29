"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function GalaxyRig() {
  const rig = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 360;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.2 + Math.random() * 5.8;
      const angle = Math.random() * Math.PI * 2;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = (Math.random() - 0.5) * 5;
      values[i * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (!rig.current) return;
    rig.current.rotation.y = THREE.MathUtils.damp(
      rig.current.rotation.y,
      state.pointer.x * 0.18,
      3.5,
      delta,
    );
    rig.current.rotation.x = THREE.MathUtils.damp(
      rig.current.rotation.x,
      -state.pointer.y * 0.11,
      3.5,
      delta,
    );
    if (ring.current) ring.current.rotation.z += delta * 0.035;
    if (dust.current) dust.current.rotation.y -= delta * 0.018;
  });

  return (
    <group ref={rig}>
      <Float speed={0.7} floatIntensity={0.45} rotationIntensity={0.12}>
        <mesh ref={ring} position={[2.6, 0.15, -1.8]} rotation={[1.12, 0.2, -0.35]}>
          <torusGeometry args={[1.55, 0.012, 10, 160]} />
          <meshBasicMaterial color="#e4b85c" transparent opacity={0.58} />
        </mesh>
        <mesh position={[2.6, 0.15, -1.8]}>
          <icosahedronGeometry args={[0.54, 2]} />
          <meshBasicMaterial color="#c89a45" wireframe transparent opacity={0.42} />
        </mesh>
      </Float>

      <Float speed={0.9} floatIntensity={0.6} rotationIntensity={0.18}>
        <mesh position={[-3.4, -1.5, -2.5]} rotation={[0.4, 0.7, 0.2]}>
          <octahedronGeometry args={[0.78, 0]} />
          <meshBasicMaterial color="#9c783c" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e5bd68"
          size={0.025}
          transparent
          opacity={0.58}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="galaxy-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 62 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <GalaxyRig />
        <Stars
          radius={45}
          depth={32}
          count={720}
          factor={2.5}
          saturation={0.35}
          fade
          speed={0.25}
        />
      </Canvas>
    </div>
  );
}
