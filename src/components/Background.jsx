import styled from "styled-components";
import * as THREE from 'three'
import { useRef, useState, createContext, useContext } from 'react'
import {
    Clouds,
    Cloud,
    CameraShake,
    Environment,
    OrbitControls,
    ContactShadows,
    PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { random } from "maath";

const context = createContext();
export default function Background() {
    return (
        <CanvasContainer>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 20]}
                    fov={25}
                    onUpdate={(self) => self.lookAt(0, 0, 0)}
                >
                    <spotLight
                        position={[0, 40, 2]}
                        angle={0.5}
                        decay={1}
                        distance={45}
                        penumbra={1}
                        intensity={2000}
                    />
                    <spotLight
                        position={[-19, 0, -8]}
                        color="red"
                        angle={0.25}
                        decay={0.75}
                        distance={185}
                        penumbra={-1}
                        intensity={400}
                    />
                </PerspectiveCamera>
                <Clouds limit={400} material={THREE.MeshLambertMaterial}>
                    <Physics gravity={[0, 0, 0]}>
                        <Pointer />
                        <PrettyCloud seed={10} position={[10, 0, 0]} />
                        <CuboidCollider position={[0, -15, 0]} args={[400, 10, 400]} />
                    </Physics>
                </Clouds>
                <OrbitControls
                    makeDefault
                    autoRotate
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 1.7}
                    maxPolarAngle={Math.PI / 1.7}
                />
            </Canvas>
        </CanvasContainer>
    );
}

function PrettyCloud({ seed, vec = new THREE.Vector3(), ...props }) {
    const api = useRef();
    const light = useRef();
    const rig = useContext(context);

    const [flash] = useState(() => new random.FlashGen({ count: 10, minDuration: 40, maxDuration: 200 }));
    const contact = (p) => p.other.rigidBodyObject.userData?.cloud && p.totalForceMagnitute / 1000 > 100 && flash.burst();
    useFrame((state, delta) => {
        const impulse = flash.update(state.clock.elapsedTime, delta);
        light.current.intensity = impulse * 15000;
        if (impulse === 1) rig?.current?.setIntensity(1);
    })
    return (
        <RigidBody
            ref={api}
            userDate={{ cloud: true }}
            onContactForce={contact}
            linearDamping={4}
            angularDamping={1}
            friction={0.1}
            colliders={false}
            {...props}
        >
            <BallCollider args={[4]} />
            <Cloud
                seed={props?.seed}
                fade={30}
                speed={0.1}
                growth={4}
                segments={40}
                volume={6}
                opacity={0.6}
                bounds={[4, 3, 1]}
            />
            <Cloud
                seed={props?.seed + 1}
                fade={30}
                position={[0, 1, 0]}
                speed={0.5}
                growth={4}
                volume={10}
                opacity={1}
                bounds={[6, 2, 1]}
            />
            <pointLight
                position={[0, 0, 0.5]}
                ref={light}
                color="blue"
            />
        </RigidBody>
    );
}

function Pointer({ vec = new THREE.Vector3(), dir = new THREE.Vector3 }) {
    const ref = useRef();
    useFrame(({ pointer, viewport, camera }) => {
        vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
        dir.copy(vec).sub(camera.position).normalize();
        vec.add(dir.multiplyScalar(camera.position.length()));
        ref.current?.setNextKinematicTranslation(vec);
    });
    return (
        <RigidBody
            userData={{ cloud: true }}
            type="kinematicPosition"
            colliders={false}
            ref={ref}
        >
            <BallCollider args={[4]} />
        </RigidBody>
    )
}

const CanvasContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    y-overflow: hidden;
    x-overflow: hidden;
    z-index: -1;
`;
