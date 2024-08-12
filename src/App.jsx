import { useState } from 'react';
import './App.css';
import BotCollection from './BotCollection';
import MyBotArmy from './MyBotArmy';

function App() {

  const baseURL = "http://localhost:3000/bots";


  const [botArmy, setBotArmy] = useState([]);

  const handleAddToArmy = (bot) => {
    let botExists = false;
    for (let i = 0; i < botArmy.length; i++) {
      if (botArmy[i].id === bot.id) {
        botExists = true;
      }
    }
    // Add bot only if it doesn't already exist in the botArmy form MyBOtArmy
    if (!botExists) {
      setBotArmy(prevArmy => [...prevArmy, bot]);
    } else {
      alert('Bot already exists in your inventory!')
    }
  };

  const handleRemoveFromArmy = (botId) => {
    setBotArmy(prevArmy => prevArmy.filter(bot => bot.id !== botId));
  };

  return (
    <>
      <BotCollection onAddToArmy={handleAddToArmy} baseURL={baseURL} />
      <MyBotArmy botArmy={botArmy} onRemoveFromArmy={handleRemoveFromArmy} baseURL={baseURL} />
      <p>Clicking on a bot in MyBotArmy removes it from MyBotArmy component</p>
      <span>Lastly - add a red button that discharges a bot from their service forever</span>
    </>
  );
}

export default App;
