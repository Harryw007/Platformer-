import { useEffect, useMemo, useRef, useState } from "react";
import useActivateGameLoop from "@/game_engine/loop";
import useDetectCollision from "@/game_engine/collision_detection";
import useObstacles from "@/game_engine/obstacles";

const useIsPaused = () => {
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleBlur = () => {
            setIsPaused(true);
        };

        const handleFocus = () => {
            setIsPaused(false);
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return isPaused;
};

const usePoints = ({ isGameOver, isPaused, startKey }) => {
    const [points, setPoints] = useState(0);
    useEffect(() => {
        if (!isGameOver && !isPaused) {
            if (startKey === 'w') {
                setPoints(points + 1 * 1372362);
            } else {
                setPoints(points + 1);
            }
        }
    }, [isPaused, isGameOver, points, startKey]);
    return parseInt(points / 10);
};

export default function useGameEngine({ charCoords, startKey }) {
    const { obstacles, setActiveObstacleIndex, setObstacles, activeObstacleIndex } = useObstacles();
    const [isGameOver, setIsGameOver] = useState(false);
    const isPaused = useIsPaused();
    const points = usePoints({ isGameOver, isPaused, startKey });
    const obstacleRefs = useRef({});
    const detectCollision = useDetectCollision({
        charCoords,
        obstacleRefs
    });

    const maxValue = useMemo(() => obstacles.reduce((max, obj) => {
        return obj.position > max ? obj.position : max;
    }, 0), [obstacles]);

    useActivateGameLoop({
        isGameOver, isPaused, setObstacles, activeObstacleIndex, setActiveObstacleIndex, lastObstaclePosition: maxValue
    });

    useEffect(() => {
        if (detectCollision()) {
            setIsGameOver(true);
        }
    }, [charCoords, isPaused, isGameOver, detectCollision, points]);

    return {
        points,
        obstacleRefs,
        isGameOver,
        obstacles
    };
}
