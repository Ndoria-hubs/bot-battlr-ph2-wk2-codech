import React, { useState, useEffect } from 'react';
import './App.css';
import BotCollection from './BotCollection';
import MyBotArmy from './MyBotArmy';

function App() {
  const baseURL = "https://bot-battlr-server-pied.vercel.app/bots";

  const [botArmy, setBotArmy] = useState([]);

  // const [bots, setBots] = useState([]);

  // Fetch bots initially or after any updates
  // const fetchBots = async () => {
  //   try {
  //     const response = await fetch(baseURL);
  //     const data = await response.json();
  //     setBots(data);
  //   } catch (error) {
  //     console.error('Error fetching bots:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBots();
  // }, []);

  // Handle adding bot to the army
  
  const handleAddToArmy = (bot) => {
    let botExists = botArmy.some(existingBot => existingBot.id === bot.id);
    if (!botExists) {
      setBotArmy(prevArmy => [...prevArmy, bot]);
    } else {
      alert('Bot already exists in your Army!');
    }
  };

  // Handle removing bot from the army
  const handleRemoveFromArmy = (botId) => {
    setBotArmy(prevArmy => prevArmy.filter(bot => bot.id !== botId));
  };

  return (
    <>
      <BotCollection onAddToArmy={handleAddToArmy} baseURL={baseURL} />
      <MyBotArmy botArmy={botArmy} onRemoveFromArmy={handleRemoveFromArmy} baseURL={baseURL} // fetchBots={fetchBots} // Pass fetchBots function 
      />
    </>
  );
}

export default App;
