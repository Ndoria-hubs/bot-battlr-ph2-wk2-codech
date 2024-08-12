import { useEffect, useState } from "react";
import './BotCollection.css'


const baseURL = "http://localhost:3000/bots"

const BotCollection = ({handleAddToArmy}) => {
    const [ bots, setBots ] = useState([]);



//  |||| -------
// converting binary to audio
    const binaryToText = (binaryStr) => {
        let text = '';
        for (let i = 0; i < binaryStr.length; i += 8) {
            // Extract an 8-bit chunk
            const byte = binaryStr.substring(i, i + 8);
            // Convert the 8-bit chunk to a character and append to the text
            text += String.fromCharCode(parseInt(byte, 2));
        }
        return text;
    };
    // Function to speak text using the Web Speech API
    const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    };
    const handlePlayCatchphrase = (catchphraseBinary) => {
        const text = binaryToText(catchphraseBinary);
        speakText(text);
    };
 // |||| ------




    useEffect(() => {
        
        const fetchBots = async () => {
            try {
                const response = await fetch(baseURL)
                const data = await response.json()
                setBots(data);
            } catch (error) {
                console.error('Error:', error)
            }
        };   
        fetchBots();
    }, [])

    return (  
        <div className="container">
          <h3> Galactico's Space Collection </h3>
        {bots.map((bot) => (
            <div className="bot-card" key={bot.id} onClick={handleAddToArmy}>
                <h4>I am {bot.name} </h4>
                <img src={bot.avatar_url} alt={`${bot.name} avatar`} className="bot-image" />
                <p>Health: {bot.health} </p>
                <p>Damage: {bot.damage} </p>
                <p>Armor: {bot.armor} </p>
                <p>Class: {bot.bot_class} </p>
                {/*<p> {bot.catchphrase} </p> **/ }
                <button onClick={() => handlePlayCatchphrase(bot.catchphrase)}>
                        Play Catchphrase
                    </button>
                <p>Creation-date: {bot.created_at} </p>
                <p> Last update:{bot.updated_at} </p>
            </div>
        ))}
        </div>
    );
}

export default BotCollection;