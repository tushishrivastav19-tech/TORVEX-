
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type VehicleProps = {
  modelPath: string;
  paint: string;
};

function Vehicle({ modelPath, paint }: VehicleProps) {

function Vehicle({ modelPath, paint }: VehicleProps) {
  const { scene } = useGLTF(modelPath);
  const vehicle = scene.clone(true);

  vehicle.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.castShadow = true;
    object.receiveShadow = true;

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    materials.forEach((item) => {
      if (item instanceof THREE.MeshPhysicalMaterial) {
        item.envMapIntensity = 1.5;

        if (item.name.toLowerCase().includes("paint")) {
          item.color.set(paint);
          item.metalness = 0.82;
          item.roughness = 0.2;
          item.clearcoat = 1;
          item.clearcoatRoughness = 0.1;
        }
      }
    });
  });

  const bounds = new THREE.Box3().setFromObject(vehicle);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  const maxDimension = Math.max(size.x, size.y, size.z);
  const scale = 5.8 / maxDimension;

  vehicle.scale.setScalar(scale);
  vehicle.position.set(
    -center.x * scale,
    -bounds.min.y * scale,
    -center.z * scale
  );

  return <primitive object={vehicle} />;
}

function LoadingVehicle() {
  return (
    <Html center>
      <div style={{
        color: "#dce5f2",
        fontSize: 11,
        letterSpacing: 3,
        whiteSpace: "nowrap",
      }}>
        LOADING SHOWROOM
      </div>
    </Html>
  );
}

export default function Garage3D({
  modelPath,
  paint,
}: VehicleProps) {
  return (
    <div className="torvex-3d-stage">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [8, 4.2,10],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={["#090e17"]} />
        <fog attach="fog" args={["#090e17", 13, 28]} />

        <ambientLight intensity={0.65} />
        <spotLight
          position={[4, 8, 4]}
          intensity={110}
          angle={0.48}
          penumbra={0.8}
          castShadow
        />
        <spotLight
          position={[-5, 4, -3]}
          intensity={65}
          color="#9dbce8"
          angle={0.55}
          penumbra={1}
        />

        <Suspense fallback={<LoadingVehicle />}>
          <Environment preset="warehouse" />
          <Vehicle modelPath={modelPath} paint={paint} />
          <ContactShadows
            position={[0, -0.64, 0]}
            opacity={0.65}
            scale={12}
            blur={2.5}
            far={4}
          />
        </Suspense>

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.7, 0]}
          receiveShadow
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial
            color="#111a29"
            metalness={0.72}
            roughness={0.28}
          />
        </mesh>

        <OrbitControls
          makeDefault
          target={[0, 0.7, 0]}
enablePan={false}
minDistance={6}
maxDistance={14}
minPolarAngle={Math.PI / 3.2}
maxPolarAngle={Math.PI / 2.05}
autoRotate
autoRotateSpeed={0.45}
        />
      </Canvas>
      <div className="showroom-label">TORVEX / VEHICLE SHOWROOM</div>
      <div className="showroom-hint">DRAG TO ROTATE · SCROLL TO ZOOM</div>
    </div>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/spectral_gt_rs_game_ready.glb`);
