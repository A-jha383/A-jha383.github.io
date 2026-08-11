import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A small library of distinct, cheap, unlit ambient 3D motifs — one per
// section — so the site doesn't repeat the Hero's NeuralOrb centerpiece.
// Every scene uses basic/points materials only (no lights needed) and
// modest primitive counts to stay light on GPU/CPU as multiple sections
// mount concurrently while scrolling.

/* ---------- About — "Identity Core": a slow wireframe polyhedron + halo ---------- */
export function IdentityCore() {
  const coreRef = useRef();
  const haloRef = useRef();

  const haloPositions = useMemo(() => {
    const n = 260;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3.1 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
      coreRef.current.rotation.x += delta * 0.04;
    }
    if (haloRef.current) haloRef.current.rotation.y -= delta * 0.03;
  });

  return (
    <group position={[3.2, 0, -1]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#d7ff3f" wireframe transparent opacity={0.4} />
      </mesh>
      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={haloPositions.length / 3} array={haloPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#6fb7ff" size={0.03} sizeAttenuation transparent opacity={0.5} />
      </points>
    </group>
  );
}

/* ---------- Experience — "Trajectory Stream": upward-flowing particle stream ---------- */
export function TrajectoryStream() {
  const ref = useRef();
  const count = 340;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      spd[i] = 0.25 + Math.random() * 0.5;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * speeds[i];
      if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#d7ff3f" size={0.045} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

/* ---------- AI Expertise — "Neural Matrix": pulsing point grid with flickering links ---------- */
export function NeuralMatrix() {
  const groupRef = useRef();
  const linesRef = useRef();
  const cols = 10;
  const rows = 7;

  const { gridPositions, linkPositions } = useMemo(() => {
    const pts = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        pts.push(
          new THREE.Vector3(
            (x - (cols - 1) / 2) * 0.85 + (Math.random() - 0.5) * 0.2,
            (y - (rows - 1) / 2) * 0.85 + (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 1.4
          )
        );
      }
    }
    const flat = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      flat[i * 3] = p.x;
      flat[i * 3 + 1] = p.y;
      flat[i * 3 + 2] = p.z;
    });
    const links = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.05 && Math.random() < 0.5) {
          links.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { gridPositions: flat, linkPositions: new Float32Array(links) };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.12 + Math.abs(Math.sin(state.clock.elapsedTime * 0.6)) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-3, 0.5, -1.5]}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linkPositions.length / 3} array={linkPositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#6fb7ff" transparent opacity={0.16} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={gridPositions.length / 3} array={gridPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#d7ff3f" size={0.05} sizeAttenuation transparent opacity={0.7} />
      </points>
    </group>
  );
}

/* ---------- Projects — "Drifting Shards": floating rotating octahedra ---------- */
export function DriftingShards() {
  const groupRef = useRef();
  const shards = useMemo(() => {
    const n = 9;
    return new Array(n).fill(0).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4 - 1],
      scale: 0.22 + Math.random() * 0.32,
      speed: 0.15 + Math.random() * 0.25,
      color: i % 3 === 0 ? "#d7ff3f" : i % 3 === 1 ? "#6fb7ff" : "#ff5c72",
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const s = shards[i];
      mesh.rotation.x += delta * s.speed;
      mesh.rotation.y += delta * s.speed * 0.7;
      mesh.position.y = s.pos[1] + Math.sin(state.clock.elapsedTime * 0.4 + s.offset) * 0.35;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Skills — "Skill Knot": a single rotating wireframe torus knot ---------- */
export function SkillKnot() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.11;
  });
  return (
    <mesh ref={ref} position={[3.4, -0.5, -1]}>
      <torusKnotGeometry args={[1.35, 0.32, 128, 16]} />
      <meshBasicMaterial color="#6fb7ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

/* ---------- Education — "Knowledge Orbits": concentric rings with orbiting nodes ---------- */
export function KnowledgeOrbits() {
  const groupRef = useRef();
  const orbits = useMemo(
    () => [
      { radius: 1.6, speed: 0.35, color: "#d7ff3f", tilt: 0.3 },
      { radius: 2.3, speed: -0.24, color: "#6fb7ff", tilt: -0.5 },
      { radius: 3.0, speed: 0.16, color: "#ffb454", tilt: 0.15 },
    ],
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {orbits.map((o, i) => (
        <OrbitRing key={i} {...o} />
      ))}
    </group>
  );
}

function OrbitRing({ radius, speed, color, tilt }) {
  const ringRef = useRef();
  const nodeRef = useRef();
  useFrame((state, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * speed * 0.2;
    if (nodeRef.current) {
      const t = state.clock.elapsedTime * speed;
      nodeRef.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
    }
  });
  return (
    <group rotation={[tilt, 0.4, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.005, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/* ---------- Certifications — "Floating Gems": faceted shapes drifting upward ---------- */
export function FloatingGems() {
  const groupRef = useRef();
  const gems = useMemo(() => {
    const n = 7;
    return new Array(n).fill(0).map((_, i) => ({
      x: (Math.random() - 0.5) * 9,
      z: (Math.random() - 0.5) * 4 - 1,
      startY: -4 - Math.random() * 4,
      scale: 0.2 + Math.random() * 0.22,
      speed: 0.3 + Math.random() * 0.35,
      color: i % 2 === 0 ? "#ffb454" : "#d7ff3f",
    }));
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const g = gems[i];
      mesh.position.y += delta * g.speed;
      mesh.rotation.y += delta * 0.3;
      mesh.rotation.x += delta * 0.15;
      if (mesh.position.y > 4.5) mesh.position.y = g.startY;
    });
  });

  return (
    <group ref={groupRef}>
      {gems.map((g, i) => (
        <mesh key={i} position={[g.x, g.startY, g.z]} scale={g.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={g.color} wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Contact — "Perspective Floor": receding terminal-style grid ---------- */
export function PerspectiveFloor() {
  const ref = useRef();
  const positions = useMemo(() => {
    const lines = [];
    const size = 10;
    const step = 1;
    for (let x = -size; x <= size; x += step) {
      lines.push(x, 0, -size, x, 0, size);
    }
    for (let z = -size; z <= size; z += step) {
      lines.push(-size, 0, z, size, 0, z);
    }
    return new Float32Array(lines);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.14 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  return (
    <group position={[0, -2.6, -3]} rotation={[-1.15, 0, 0]}>
      <lineSegments ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#d7ff3f" transparent opacity={0.16} />
      </lineSegments>
    </group>
  );
}
