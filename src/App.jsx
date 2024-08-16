import { Canvas } from '@react-three/fiber';
import { AccumulativeShadows, Center, Environment, OrbitControls, RandomizedLight } from '@react-three/drei'
import './App.css'

function App({ position = [-1,0,2.5] , fov = 25}) {

  return (
    <Canvas
    shadows
      eventPrefix='client'
      eventSource={document.getElementById('root')}
      camera={{position,fov}}>
      <ambientLight intensity={0.5}/>
      <Environment preset='city'/>
      <Center>
        <Shirt/>
        <Backdrop/>
      </Center>
      <OrbitControls/>
    </Canvas>
  )
}

export default App;

export function Backdrop(){
  return <AccumulativeShadows
  temporal
  frames={60}
  alphaTest={0.3}
  scale={10}
  rotation={[Math.PI/2,0,0]}
  position={[0,0,-0.14]}
  >
    <RandomizedLight
      amount={4}
      radius={9}
      intensity={0.75}
      ambient={0.8}
      position={[5,5,-10]}
    />
    <RandomizedLight 
      amount={4}
      radius={9}
      intensity={0.75}
      ambient={0.25}
      position={[5,5,-10]}
    />

  </AccumulativeShadows>
}

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Shirt(props) {
  const { nodes, materials } = useGLTF('shirt_baked.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/001 shirt-baked.glb')
