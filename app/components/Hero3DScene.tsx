'use client';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF, ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#000', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function CharacterModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/model.glb');

  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetHeight = 2.4;
    const scaleFactor = targetHeight / size.y;
    scene.scale.setScalar(scaleFactor);
    scene.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollProgress.get();
    groupRef.current.rotation.y = p * Math.PI * 2;
    const scale = 1 + p * 0.8;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/model.glb');

export default function Hero3DScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#a5b4fc" />
      <pointLight position={[-4, 2, 3]} intensity={1.2} color="#7c3aed" />
      <pointLight position={[4, 2, 3]} intensity={0.8} color="#06b6d4" />

      <Suspense fallback={<Loader />}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <CharacterModel scrollProgress={scrollProgress} />
        </Float>
      </Suspense>

      <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={8} blur={2.5} far={4} />
      <Environment preset="city" />
    </Canvas>
  );
}