import styled from "styled-components";
import * as THREE from 'three'
import { useRef, useState, createContext, useContext } from 'react'
import {
    Clouds,
    Cloud,
    PerspectiveCamera,
    MapControls,
} from "@react-three/drei";
import { Canvas, useFrame, } from '@react-three/fiber'
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import { random } from "maath";

const context = createContext();
export default function Background() {
    return (
        <CanvasContainer>
            <Canvas>
                <ambientLight intensity={2} />
                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 20]}
                    fov={50}
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
                        intensity={1000}
                    />
                </PerspectiveCamera>
                <Clouds limit={1000} material={THREE.MeshLambertMaterial}>
                    <Physics gravity={[0, 0, 0]}>
                        <PrettyCloud seed={30} position={[5, 0, 0]} color={"pink"} />
                        <PrettyCloud seed={30} position={[5, 0, 0]} color={"#ee9dfa"} />
                    </Physics>
                </Clouds>
                <MapControls
                    makeDefault
                    autoRotate
                    autoPan
                    autoRotateSpeed={0.6}
                    enablePan={false}
                    enableZoom={false}
                    maxPolarAngle={3}
                    minPolarAngle={0}
                />
            </Canvas>
        </CanvasContainer>
    );
}

function PrettyCloud({ seed, color, vec = new THREE.Vector3(), ...props }) {
    const api = useRef();
    const light = useRef();

    /*
    NOTE: This is the logic for the lightning strike effect.
    const rig = useContext(context);
    const [flash] = useState(() => new random.FlashGen({ count: 10, minDuration: 40, maxDuration: 200 }));
    const contact = (p) => p.other.rigidBodyObject.userData?.cloud && p.totalForceMagnitute / 1000 > 100 && flash.burst();
    useFrame((state, delta) => {
        const impulse = flash.update(state.clock.elapsedTime, delta);
        light.current.intensity = impulse * 15000;
        if (impulse === 1) rig?.current?.setIntensity(1);
    })

    // NOTE: 
    also in the <RigidBody I need to add onContactForce={contact} to restore.
    */
    return (
        <RigidBody
            ref={api}
            userDate={{ cloud: true }}
            linearDamping={4}
            angularDamping={1}
            friction={0.1}
            {...props}
            colliders={false}
        >
            <BallCollider args={[4]} />
            <Cloud
                seed={props?.seed}
                fade={30}
                speed={0.01}
                growth={4}
                segments={50}
                volume={10}
                opacity={0.6}
                bounds={[9, 9, 9]}
                color={color}
            />
            <Cloud
                seed={props?.seed + 1}
                fade={30}
                position={[0, 1, 0]}
                speed={0.1}
                growth={4}
                volume={10}
                opacity={1}
                bounds={[1, 2, 1]}
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
    background: rgba(0, 0, 0, 0.1);
`;
