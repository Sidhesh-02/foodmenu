// components/ThreeDViewer.js
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene}
      scale={[0.3, 0.3, 0.3]}   // Adjust size here
      position={[0, -1, 0]}     // Center vertically if needed
    />
  );
}

export default function ThreeDViewer({ modelUrl }) {
  return (
    <div style={{ width: "250px", height: "250px" }} className="rounded overflow-hidden">
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          <OrbitControls enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
