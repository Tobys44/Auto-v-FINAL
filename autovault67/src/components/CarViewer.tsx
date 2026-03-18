import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Html, useProgress, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";



function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-white/20 border-t-[#0A84FF] rounded-full animate-spin"></div>
        <span className="text-white text-[10px] font-bold tracking-widest">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

export default function CarViewer({ modelPath }: { modelPath: string }) {
  const carPosition: [number, number, number] = [0, 0, 0];
  const shadowPosition: [number, number, number] = [0, -1.1, 0];

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [5, 2, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          
          <group position={carPosition}>
            <Stage 
              environment="city" 
              intensity={0.6} 
              contactShadow={false} 
              adjustCamera={true}
              preset="rembrandt"
            >
              <Model path={modelPath} />
            </Stage>
          </group>

          {/* OPRAVA VÝKONU: Přidáno resolution={256} extrémně sníží zátěž grafické karty! */}
          <ContactShadows 
            position={shadowPosition} 
            opacity={0.7} 
            scale={12} 
            blur={3} 
            far={2} 
            resolution={256}
            color="#000000"
          />

          <OrbitControls 
            target={carPosition} 
            autoRotate 
            autoRotateSpeed={0.5} 
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}