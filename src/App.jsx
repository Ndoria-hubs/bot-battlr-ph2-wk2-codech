import { useState } from 'react';
import './App.css';
import BotCollection from './BotCollection';
import MyBotArmy from './MyBotArmy';

function App() {
  const baseURL = "http://localhost:3000/bots";

  const [botArmy, setBotArmy] = useState([]);

  // function to handle addition when clicked
  const handleAddToArmy = (bot) => {
    let botExists = botArmy.some(existingBot => existingBot.id === bot.id);
    if (!botExists) {
      setBotArmy(prevArmy => [...prevArmy, bot]);
    } else {
      alert('Bot already exists in your inventory!');
    }
  };

  // function to handle removal when clicked
  const handleRemoveFromArmy = (botId) => {
    setBotArmy(prevArmy => prevArmy.filter(bot => bot.id !== botId));
  };

  return (
    <>
      <BotCollection onAddToArmy={handleAddToArmy} baseURL={baseURL} />
      <>
      <MyBotArmy botArmy={botArmy} onRemoveFromArmy={handleRemoveFromArmy} baseURL={baseURL} /> </>

      <span>Lastly - add a red button that discharges a bot from their service forever</span>
    </>
  );
}

export default App;
