"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus, Octahedron, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function FloatingShape({
  position,
  color,
  speed,
  shape,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  shape: "torus" | "octa" | "ico";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      wireframe
      transparent
      opacity={0.25}
    />
  );

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        {shape === "torus" && <torusGeometry args={[1, 0.3, 16, 60]} />}
        {shape === "octa" && <octahedronGeometry args={[1.1]} />}
        {shape === "ico" && <icosahedronGeometry args={[1]} />}
        {mat}
      </mesh>
    </Float>
  );
}

function CenterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Float speed={0.8} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color="#e10600"
          attach="material"
          distort={0.28}
          speed={1.8}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.18}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 120;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ff8000" size={0.04} transparent opacity={0.5} />
    </points>
  );
}

export function HeroScene() {
  const shouldReduce = useReducedMotion();

  return (
    <Canvas
      className="canvas-cover"
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#e10600" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#ff8000" />

      {!shouldReduce && (
        <>
          <CenterSphere />
          <FloatingShape position={[-4, 2, -2]} color="#e10600" speed={0.5} shape="torus" />
          <FloatingShape position={[4, -1.5, -1]} color="#ff8000" speed={0.4} shape="octa" />
          <FloatingShape position={[3, 2.5, -3]} color="#ffcc00" speed={0.3} shape="ico" />
          <FloatingShape position={[-3.5, -2, -2]} color="#e10600" speed={0.6} shape="octa" />
          <Particles />
        </>
      )}
    </Canvas>
  );
}
