import { useEffect, useRef, useState } from 'react';
import {INITIAL_Y} from "@/constants/game";

const useCharacterMovement = ({
    jump,
    setJump,
    charCoords
}) => {

    useEffect(() => {
        let jumpTimeout;
        if (jump) {
            jumpTimeout = setTimeout(() => {
                setJump(false);
            }, 300);
        }
        return () => clearTimeout(jumpTimeout);
    }, [jump, setJump]);


    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === 'Space' && !jump && charCoords.y > INITIAL_Y) { // Check if the dino is on the ground
                setJump(true);
            }
        };
        window.addEventListener('keydown', handleSpacebar);
        return () => window.removeEventListener('keydown', handleSpacebar);
    }, [jump, charCoords.y, setJump]); // Include dinoCoords.y in the dependency array
}

export default function useCharacter() {
    const charRef = useRef(null);
    const [charCoords, setCharCoords] = useState({ x: 200, y: 300 });
    const [jumpClicked, setJumpClicked] = useState(false)
    useCharacterMovement({ jump: jumpClicked, setJump: setJumpClicked, charCoords })

    useEffect(() => {
        if (charRef.current) {
            const rect = charRef.current.getBoundingClientRect();
            const x = rect.x + window.pageXOffset;
            const y = rect.y + window.pageYOffset;
            setCharCoords({ x, y });
        }

        const animateJump = () => {
            if (charRef.current) {
                const rect = charRef.current.getBoundingClientRect();
                const x = rect.x + window.pageXOffset;
                const y = rect.y + window.pageYOffset;
                setCharCoords({ x, y });
                requestAnimationFrame(animateJump);
            }
        };

        if (jumpClicked) {
            animateJump();
        }

        return () => {
            cancelAnimationFrame(requestAnimationFrame);
        };
    }, [jumpClicked, charRef]);

    return { charRef, charCoords, jumpClicked, setCharCoords };
}
