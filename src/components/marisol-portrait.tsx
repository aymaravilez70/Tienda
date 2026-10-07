"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Group, Object3D, Vector3 } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

function MarisolModel() {
  const materials = useLoader(MTLLoader, "/models/marisol.mtl");
  materials.preload();
  const source = useLoader(OBJLoader, "/models/marisol.obj", (loader) => loader.setMaterials(materials));

  const fit = useMemo(() => {
    const model = source.clone(true);
    model.updateMatrixWorld(true);

    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const scale = 2.55 / bounds.getSize(new Vector3()).z;
    const winkParts = ["Eye.L_cl_head_LOW.001", "Sphere.001"]
      .map((name) => model.getObjectByName(name))
      .filter((object): object is Object3D => object !== undefined);

    if (winkParts.length) {
      const eyeBounds = new Box3();
      winkParts.forEach((part) => eyeBounds.expandByObject(part));
      const eyeCenter = eyeBounds.getCenter(new Vector3());
      const pivot = new Group();
      const counter = new Group();
      pivot.position.copy(eyeCenter);
      counter.position.copy(eyeCenter).negate();
      model.add(pivot);
      pivot.add(counter);
      winkParts.forEach((part) => counter.attach(part));
    }

    return { model, center, scale, wink: model.getObjectByName("Eye.L_cl_head_LOW.001")?.parent?.parent };
  }, [source]);

  const wink = useRef<Group>(null);
  const openEyeScale = useRef(1);
  const animationStart = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (fit.wink instanceof Group) {
      wink.current = fit.wink;
      openEyeScale.current = fit.wink.scale.z;
    }
  }, [fit.wink]);

  useFrame(({ clock }) => {
    animationStart.current ??= clock.elapsedTime;

    const time = clock.elapsedTime - animationStart.current;
    const close = smoothStep(time, 0.15, 0.4) * (1 - smoothStep(time, 0.67, 0.92));

    if (wink.current) wink.current.scale.z = openEyeScale.current * (1 - 0.94 * close);
  });

  const { center, scale, model } = fit;
  return (
    <group position={[-center.x * scale, -center.y * scale, -center.z * scale]} scale={scale}>
      <group position={center.toArray()}>
        <group position={[-center.x, -center.y, -center.z]}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  );
}

function smoothStep(value: number, start: number, end: number) {
  const progress = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return progress * progress * (3 - 2 * progress);
}

function PortraitCamera() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.up.set(0, 0, 1);
    camera.position.set(0.55, -5.7, -0.12);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

export function MarisolPortrait() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 5.7], fov: 32 }}
      className="marisol-canvas"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.45} />
      <directionalLight intensity={2.1} position={[-3, 4, 5]} />
      <directionalLight intensity={0.75} position={[4, 0, -2]} />
      <PortraitCamera />
      <Suspense fallback={null}>
        <MarisolModel />
      </Suspense>
    </Canvas>
  );
}
