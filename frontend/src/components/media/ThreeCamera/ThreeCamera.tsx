import { Canvas, useFrame } from "@react-three/fiber";

import { Bounds, Center, Environment, useGLTF } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";

import * as THREE from "three";

function CameraModel() {
  const { scene } = useGLTF("/models/camera.glb");

  const ref = useRef<THREE.Group>(null);

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;

      const value = window.scrollY / max;

      setScroll(value);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    /*
      esquerda e direita
      começa direita termina esquerda
    */

    ref.current.position.x = THREE.MathUtils.lerp(10, -1.2, scroll);

    /*
      movimento vertical suave
    */

    ref.current.position.y = THREE.MathUtils.lerp(0, -150.8, scroll);

    /*
      zoom aproximando
    */

    const scale = THREE.MathUtils.lerp(1, 1.5, scroll);

    ref.current.scale.set(scale, scale, scale);

    /*
      muda visão frontal
      para diagonal
    */
    ref.current.rotation.y = THREE.MathUtils.lerp(25, -Math.PI / 3, scroll);

    /*
      leve inclinação premium
    */

    ref.current.rotation.x = THREE.MathUtils.lerp(0, 0.8, scroll);
  });

  return (
    <Bounds fit clip margin={1.8}>
      <Center>
        <group ref={ref}>
          <primitive object={scene} />
        </group>
      </Center>
    </Bounds>
  );
}

export default function ThreeCamera() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 12],

        fov: 40,
      }}
    >
      <ambientLight intensity={1.8} />

      <directionalLight position={[5, 5, 5]} intensity={3} />

      <Environment preset="studio" />

      <CameraModel />
    </Canvas>
  );
}

useGLTF.preload("/models/camera.glb");
