import { useEffect, useState } from "react";
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

  return (
    <div className="container">
      <h3>Galactico's Space Collection</h3>
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
          <p>{bot.catchphrase}</p>
        </div>
      ))}
    </div>
  );
};

export default BotCollection;
