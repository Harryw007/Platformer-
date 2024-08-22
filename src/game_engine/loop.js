import { useEffect, useState } from 'react';
import { GAME_WIDTH } from "@/constants/game";

const INITIAL_GAME_MOVEMENT_INTERVAL_MS = 20; // Decreased to make the game faster
const INITIAL_CHANGE_ON_INTERVAL_PX = 10; // Increased to make the game faster
const SPEED_INCREMENT_INTERVAL_MS = 2000; // Increase speed every 2 seconds
const MAX_SPEED = 20;

export default function useActivateGameLoop({ isGameOver, isPaused, setObstacles }) {
    const [gameMovementInterval, setGameMovementInterval] = useState(INITIAL_GAME_MOVEMENT_INTERVAL_MS);
    const [changeOnIntervalPx, setChangeOnIntervalPx] = useState(INITIAL_CHANGE_ON_INTERVAL_PX);

    useEffect(() => {
        if (isGameOver || isPaused) return;

        const intervalId = setInterval(() => {
            setObstacles((prevObstacles) => {
                const newObstacles = prevObstacles.map((obstacle) => {
                    if (obstacle.position >= GAME_WIDTH) {
                        return { ...obstacle, position: -obstacle.width }; // Reset to the left side
                    }
                    return { ...obstacle, position: obstacle.position + changeOnIntervalPx };
                });

                // Add a new obstacle if the last obstacle is halfway through the screen
                if (newObstacles[newObstacles.length - 1].position > GAME_WIDTH / 2) {
                    newObstacles.push({
                        id: newObstacles.length + 1,
                        position: -400, // Starting position for new obstacles
                        Component: newObstacles[0].Component // Assuming all obstacles are of the same type
                    });
                }

                return newObstacles;
            });
        }, gameMovementInterval);

        return () => clearInterval(intervalId);
    }, [isGameOver, isPaused, setObstacles, gameMovementInterval, changeOnIntervalPx]);

    useEffect(() => {
        if (isGameOver || isPaused) return;

        const speedIntervalId = setInterval(() => {
            setGameMovementInterval((prev) => Math.max(prev - 1, 1));
            setChangeOnIntervalPx((prev) => Math.min(prev + 1, MAX_SPEED));
        }, SPEED_INCREMENT_INTERVAL_MS);

        return () => clearInterval(speedIntervalId);
    }, [isGameOver, isPaused]);

    return null;
}
