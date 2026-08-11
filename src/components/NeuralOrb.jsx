import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Generates points on a fibonacci sphere
function fibonacciSphere(count, radius) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function NetworkCore() {
  const groupRef = useRef();
  const coreCount = 96;
  const linkDistance = 1.55;

  const { positions, linkPositions } = useMemo(() => {
    const pts = fibonacciSphere(coreCount, 2.15);
    const linkPos = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < linkDistance) {
          linkPos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const flat = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      flat[i * 3] = p.x;
      flat[i * 3 + 1] = p.y;
      flat[i * 3 + 2] = p.z;
    });
    return {
      positions: flat,
      linkPositions: new Float32Array(linkPos),
    };
  }, []);

  // Outer sparse dust sphere
  const dustPositions = useMemo(() => {
    const n = 900;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3.3 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;

    const { pointer } = state;
    groupRef.current.rotation.y += pointer.x * 0.0006;
    groupRef.current.rotation.x += -pointer.y * 0.0003;
  });

  return (
    <group ref={groupRef}>
      {/* connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linkPositions.length / 3}
            array={linkPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#d7ff3f" transparent opacity={0.22} />
      </lineSegments>

      {/* core node points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#c8fa6e"
          size={0.065}
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>

      {/* inner glowing core */}
      <mesh>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color="#1a2230" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#6fb7ff" transparent opacity={0.09} />
      </mesh>

      {/* outer dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#6fb7ff" size={0.028} sizeAttenuation transparent opacity={0.45} />
      </points>
    </group>
  );
}

function RotatingRing({ radius, speed, color, tilt }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

export default function NeuralOrb({ className = "" }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#d7ff3f" />
        <pointLight position={[-5, -3, -5]} intensity={30} color="#6fb7ff" />
        <NetworkCore />
        <RotatingRing radius={3.1} speed={0.06} color="#d7ff3f" tilt={1.1} />
        <RotatingRing radius={3.6} speed={-0.045} color="#6fb7ff" tilt={0.4} />
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
