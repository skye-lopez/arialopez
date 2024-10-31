import styled from "styled-components";
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

const startRight = 50;
const startTop = 12;

function TorusOpposite(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    useFrame((_, delta) => {
        meshRef.current.rotation.x -= (delta * 0.25);
        meshRef.current.rotation.y -= (delta * 0.25);

        const pos = meshRef.current.position.toArray();
        const newX = pos[0] < startRight ? pos[0] + 0.01 : pos[0] - startRight * 1.25;
        const newY = pos[1] < startTop ? pos[1] + 0.01 : pos[1] - startTop * 1.5;
        meshRef.current.position.set(newX, newY, pos[2]);
    });
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={0.1}
        >
            <torusGeometry args={[1, 0.5, 16, 100]} />
            <meshStandardMaterial color={"pink"} />
        </mesh>
    )
}

function Torus(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    useFrame((_, delta) => {
        meshRef.current.rotation.x += (delta * 0.25);
        meshRef.current.rotation.y += (delta * 0.25);

        const pos = meshRef.current.position.toArray();
        const newX = pos[0] < startRight ? pos[0] - 0.01 : pos[0] - startRight * 1.25;
        const newY = pos[1] < startTop ? pos[1] - 0.01 : pos[1] - startTop * 1.5;
        meshRef.current.position.set(newX, newY, pos[2]);
    });
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={0.1}
        >
            <torusGeometry args={[1, 0.5, 16, 100]} />
            <meshStandardMaterial color={"cyan"} />
        </mesh>
    )
}

interface BackgroundProps {
    children: JSX.Element | JSX.Element[] | JSX.Element
}

export default function Background({ children }: BackgroundProps) {
    function generateRenderSize(): number[][] {
        const render: number[][] = [];
        for (let row = 0; row < 50; row++) {
            render.push([]);
            for (let col = 0; col < 50; col++) {
                render[row].push(0);
            }
        }
        return render;
    }
    const [renderSize] = useState<number[][]>(generateRenderSize());
    return (
        <CanvasContainer>
            <Canvas>
                <ambientLight intensity={Math.PI} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={5} penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                {renderSize
                    .map((row, rowIdx) => {
                        return (<>
                            {row.map((_, colIdx) => (colIdx % 2 === 0 ?
                                <TorusOpposite position={[(startRight - (colIdx * 1.2)), startTop - (rowIdx * 1.4), (rowIdx % 2 == 0 ? 1 : -2)]} />
                                : <Torus position={[(startRight - (colIdx * 1.2)), startTop - (rowIdx * 1.4), (rowIdx % 2 == 0 ? -3 : 2)]} />
                            ))}
                        </>);
                    })
                }
            </Canvas>
        </CanvasContainer>
    );
}

const CanvasContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    y-overflow: hidden;
    x-overflow: hidden;
    z-index: -1;
    opacity: 0.7;
`;
