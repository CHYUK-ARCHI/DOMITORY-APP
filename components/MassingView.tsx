import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows, Text, Edges } from '@react-three/drei';
import { CalculationState, AreaResult } from '../types';
import { DoubleSide, Mesh, Group } from 'three';

interface MassingViewProps {
  state: CalculationState;
  results: AreaResult;
  setState: React.Dispatch<React.SetStateAction<CalculationState>>;
  colors: any;
}

const BuildingMesh: React.FC<{ 
  width: number; 
  depth: number; 
  height: number; 
  floors: number;
  isDark: boolean; 
}> = ({ width, depth, height, floors, isDark }) => {
  const groupRef = useRef<Group>(null);
  
  // Floor plates visual
  const floorPlates = useMemo(() => {
    return Array.from({ length: floors + 1 }).map((_, i) => {
        const y = i * (height / floors) - height / 2;
        // Avoid z-fighting with top/bottom of box
        const adjustedY = i === 0 ? y + 0.05 : (i === floors ? y - 0.05 : y);
        
        return (
            <mesh key={i} position={[0, adjustedY, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[width - 0.1, depth - 0.1]} />
                <meshStandardMaterial 
                    color={isDark ? "#00D1FF" : "#2563EB"} 
                    transparent 
                    opacity={0.15} 
                    side={DoubleSide} 
                />
            </mesh>
        )
    });
  }, [width, depth, height, floors, isDark]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation for the whole building
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <group position={[0, height / 2, 0]}>
      {/* Rotating Group containing Mass + Plates */}
      <group ref={groupRef}>
        {/* Main Mass */}
        <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshPhysicalMaterial 
                color={isDark ? "#ffffff" : "#f0f9ff"} 
                transmission={0.4}
                roughness={0.1}
                metalness={0.1}
                thickness={2}
                clearcoat={1}
                transparent
                opacity={0.3}
                side={DoubleSide}
            />
            {/* Edges replaces manual LineSegments */}
            <Edges 
                threshold={15} 
                color={isDark ? "#00D1FF" : "#2563EB"} 
                opacity={isDark ? 0.8 : 0.5}
                transparent
            />
        </mesh>

        {floorPlates}
      </group>

      {/* Static Dimensions Text (Does not rotate with building) */}
      <group>
          {/* Height Dimension */}
          <group position={[width/2 + 3, 0, 0]}>
             <Text 
                fontSize={1.5} 
                color={isDark ? "white" : "#1e293b"}
                anchorX="left" 
                anchorY="middle"
                rotation={[0, -Math.PI/4, 0]} // Slight angle to camera
             >
                {height.toFixed(1)}m
             </Text>
             {/* Dimension Line */}
             <mesh position={[-1, 0, 0]}>
                <boxGeometry args={[0.05, height, 0.05]} />
                <meshBasicMaterial color={isDark ? "#555" : "#ccc"} />
             </mesh>
          </group>

          {/* Width Dimension */}
          <group position={[0, -height/2 - 1, depth/2 + 3]}>
             <Text 
                fontSize={1.5} 
                color={isDark ? "white" : "#1e293b"}
                anchorX="center" 
                anchorY="top"
                rotation={[-Math.PI/4, 0, 0]}
             >
                {width.toFixed(1)}m
             </Text>
             {/* Dimension Line */}
             <mesh position={[0, 0.5, -1]}>
                <boxGeometry args={[width, 0.05, 0.05]} />
                <meshBasicMaterial color={isDark ? "#555" : "#ccc"} />
             </mesh>
          </group>
      </group>
    </group>
  );
};

const MassingView: React.FC<MassingViewProps> = ({ state, results, setState, colors }) => {
  const isDark = state.theme === 'dark';
  
  // Math for 3D model
  const footprintArea = results.total / state.floors;
  const sideLength = Math.sqrt(footprintArea);
  
  const buildingWidth = sideLength;
  const buildingDepth = sideLength;
  const buildingHeight = state.floors * state.floorHeight;

  // Cost Estimation (KRW)
  const costPerSqm = 2700000; 
  const totalCost = results.total * costPerSqm;
  const costInBillions = (totalCost / 100000000).toFixed(1);

  return (
    <div className="w-full h-full relative bg-transparent">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [50, 50, 50], fov: 35 }}>
          <color attach="background" args={[isDark ? '#0A0C10' : '#F1F5F9']} />
          <ambientLight intensity={0.7} />
          <directionalLight 
            position={[50, 80, 30]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]} 
          />
          <Environment preset="city" blur={0.8} />
          
          <group position={[0, -5, 0]}>
            <BuildingMesh 
                width={buildingWidth} 
                depth={buildingDepth} 
                height={buildingHeight} 
                floors={state.floors}
                isDark={isDark}
            />
            
            <Grid 
                infiniteGrid 
                fadeDistance={250} 
                sectionColor={isDark ? "#333" : "#cbd5e1"} 
                cellColor={isDark ? "#222" : "#e2e8f0"} 
                position={[0, 0, 0]}
                sectionSize={5}
                cellSize={1}
            />
            <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={150} blur={2.5} far={4} color="#000000" />
          </group>
          
          <OrbitControls 
            minPolarAngle={0.1} 
            maxPolarAngle={Math.PI / 2.1} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            makeDefault
          />
        </Canvas>
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between pb-32 pt-24 px-6">
        
        {/* Top Info Card */}
        <div className={`pointer-events-auto p-5 rounded-3xl backdrop-blur-xl border shadow-xl ${colors.card} max-w-sm self-end transition-colors duration-500`}>
             <h3 className={`text-[10px] font-black uppercase tracking-wider mb-2 ${colors.textSecondary}`}>Project Analysis</h3>
             <div className="grid grid-cols-2 gap-8">
                <div>
                    <p className={`text-[9px] font-bold ${colors.textSecondary}`}>Estimated Cost</p>
                    <p className={`text-xl font-black ${colors.textPrimary}`}>₩{costInBillions}<span className="text-xs font-medium opacity-50 ml-1">억</span></p>
                </div>
                <div>
                    <p className={`text-[9px] font-bold ${colors.textSecondary}`}>Avg Footprint</p>
                    <p className={`text-xl font-black ${colors.textPrimary}`}>{Math.round(footprintArea).toLocaleString()}<span className="text-xs font-medium opacity-50 ml-1">㎡</span></p>
                </div>
             </div>
        </div>

        {/* Bottom Controls */}
        <div className={`pointer-events-auto p-6 rounded-[2.5rem] backdrop-blur-xl border shadow-2xl ${colors.card} w-full max-w-md mx-auto transition-colors duration-500`}>
           <div className="flex items-center justify-between mb-4">
             <span className={`text-xs font-black uppercase tracking-wider ${colors.textSecondary}`}>Massing Controls</span>
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                1:{Math.round(buildingWidth)}
             </span>
           </div>

           <div className="space-y-6">
             {/* Floors Slider */}
             <div className="space-y-2">
                <div className="flex justify-between">
                    <label className={`text-sm font-bold ${colors.textPrimary}`}>지상 층수 (Floors)</label>
                    <span className={`text-sm font-black ${colors.accentText}`}>{state.floors}F</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    value={state.floors}
                    onChange={(e) => setState(prev => ({ ...prev, floors: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
             </div>

             {/* Floor Height Slider */}
             <div className="space-y-2">
                <div className="flex justify-between">
                    <label className={`text-sm font-bold ${colors.textPrimary}`}>층고 (Floor Height)</label>
                    <span className={`text-sm font-black ${colors.accentText}`}>{state.floorHeight}m</span>
                </div>
                 <input 
                    type="range" 
                    min="2.8" 
                    max="5.0" 
                    step="0.1"
                    value={state.floorHeight}
                    onChange={(e) => setState(prev => ({ ...prev, floorHeight: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MassingView;