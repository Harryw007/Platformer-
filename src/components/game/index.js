import { useEffect, useState } from 'react';
import { Character } from "@/components/characters/Character";
import { Chaser } from "@/components/characters/Chaser";
import { Pillar } from "@/components/obstacles/Pillar";
import { Score } from "@/components/game/Score";
import { GameOver } from "@/components/game/GameOver";
import useGameEngine from "@/game_engine/game_engine";
import { CHAR_HEIGHT, CHAR_WIDTH, GAME_HEIGHT, GAME_WIDTH } from "@/constants/game";
import useCharacter from "@/game_engine/character";
import LoginScreen from "@/components/LoginScreen";

const userImages = {
    dylan: 'dylan.jpg',
    emma: 'emma.jpg',
    fabien: 'fabien.jpg',
    george: 'george.jpg',
    harry: 'harry.jpg',
    jake: 'jake.jpg',
    josh: 'josh.jpg',
    rhianna: 'rhianna.jpg',
    ruben: 'ruben.jpg',
    tanya: 'tanya.jpg'
};

const getRandomUserImage = (excludeImage) => {
    const images = Object.values(userImages).filter(image => image !== excludeImage);
    return images[Math.floor(Math.random() * images.length)];
};

export const USER_GENERATED_OBSTACLES = [
    { id: 1, position: 0, Component: Pillar },
    { id: 2, position: -400, Component: Pillar },
    { id: 3, position: -800, Component: Pillar },
    { id: 4, position: -1200, Component: Pillar }
];

const StartScreen = ({ onStart }) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            onStart(event.key);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onStart]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#ddd',
            fontSize: '24px',
            fontWeight: 'bold'
        }}>
            Press any key to start
        </div>
    );
};

const GameContent = ({ startKey, userImage }) => {
    const { charRef, charCoords, jumpClicked } = useCharacter();
    const { points, isGameOver, obstacleRefs, obstacles } = useGameEngine({
        charCoords,
        startKey
    });

    const [obstacleImages, setObstacleImages] = useState([]);

    useEffect(() => {
        const images = obstacles.map(() => getRandomUserImage(userImage));
        setObstacleImages(images);
    }, [obstacles, userImage]);

    return (
        <div style={{
            position: 'relative',
            width: `${GAME_WIDTH}px`,
            height: `${GAME_HEIGHT}px`,
            overflow: 'hidden',
            backgroundColor: '#ddd',
            display: 'flex',
        }}>
            <Character width={CHAR_WIDTH} height={CHAR_HEIGHT} ref={charRef} jumpClicked={jumpClicked} userImage={userImage} />
            <Chaser width={CHAR_WIDTH} height={CHAR_HEIGHT} ref={charRef} jumpClicked={jumpClicked} userImage={userImage} />
            {obstacles.map((obstacle, index) => (
                <obstacle.Component
                    key={obstacle.id}
                    ref={(el) => (obstacleRefs.current[obstacle.id] = el)}
                    position={obstacle.position}
                    userImage={obstacleImages[index]}
                />
            ))}
            {isGameOver && <GameOver />}
            <Score points={parseInt(points / 10)} />
        </div>
    );
};

export const Game = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const [startKey, setStartKey] = useState(null);

    const handleLogin = (name) => {
        const lowerCaseName = name.toLowerCase();
        const userImages = {
            dylan: 'dylan.jpg',
            emma: 'emma.jpg',
            fabien: 'fabien.jpg',
            george: 'george.jpg',
            harry: 'harry.jpg',
            jake: 'jake.jpg',
            josh: 'josh.jpg',
            rhianna: 'rhianna.jpg',
            ruben: 'ruben.jpg',
            tanya: 'tanya.jpg'
        };

        setUserName(name);
        setUserImage(userImages[lowerCaseName] || '');
        setIsLoggedIn(true);
    };

    const handleStart = (key) => {
        setStartKey(key);
        setHasStarted(true);
    };

    if (!isLoggedIn) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    if (!hasStarted) {
        return <StartScreen onStart={handleStart} />;
    }

    return <GameContent startKey={startKey} userImage={userImage} />;
};
