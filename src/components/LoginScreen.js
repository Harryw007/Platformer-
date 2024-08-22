import { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleLogin = () => {
        if (name.trim()) {
            onLogin(name);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
        }}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
            />
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Start Game
            </button>
        </div>
    );
};

export default LoginScreen;
