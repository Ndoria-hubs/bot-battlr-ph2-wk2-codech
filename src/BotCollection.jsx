import React, { useEffect, useState } from 'react';
import './BotCollection.css';

const baseURL = "http://localhost:3000/bots";

const BotCollection = ({ onAddToArmy }) => {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchBots = async () => {
            try {
                const response = await fetch(baseURL);
                const data = await response.json();
                setBots(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchBots();
    }, []);

    // Convert binary to text and speak it
    const binaryToText = (binaryStr) => {
        let text = '';
        for (let i = 0; i < binaryStr.length; i += 8) {
            const byte = binaryStr.substring(i, i + 8);
            text += String.fromCharCode(parseInt(byte, 2));
        }
        return text;
    };

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handlePlayCatchphrase = (catchphraseBinary) => {
        const text = binaryToText(catchphraseBinary);
        speakText(text);
    };

    return (
        <div className="bot-collection-container">
            <h3>Galactico's Space BOTS COLLECTION :</h3>
            <div className="bot-grid">
                {bots.map((bot) => (
                    <div
                        className="bot-card"
                        key={bot.id}
                        onClick={() => onAddToArmy(bot)}
                    >
                        <h4>I am {bot.name}</h4>
                        <img src={bot.avatar_url} alt={`${bot.name} avatar`} className="bot-image" />
                        <p>Health: {bot.health}</p>
                        <p>Damage: {bot.damage}</p>
                        <p>Armor: {bot.armor}</p>
                        <p>Class: {bot.bot_class}</p>
                        <button onClick={() => handlePlayCatchphrase(bot.catchphrase)}>
                            Play Catchphrase
                        </button>
                        <p>Creation-date: {bot.created_at}</p>
                        <p>Last update: {bot.updated_at}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BotCollection;
