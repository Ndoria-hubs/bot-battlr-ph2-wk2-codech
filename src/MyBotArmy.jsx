import { useState } from "react";

const MyBotArmy = ({ botArmy, onRemoveFromArmy, handleRemoveFromArmy}) => {

  return (
    <div className="container">
      <h3 className="heading">Your Bot Army</h3>
      <div className="bot-grid" onClick={() => {handleRemoveFromArmy}}>
        {botArmy.map((bot) => (
          <div
            className="bot-card"
            key={bot.id}
            onClick={() => onRemoveFromArmy(bot.id)}
          >
            <h4>{bot.name}</h4>
            <img
              src={bot.avatar_url}
              alt={`${bot.name} avatar`}
              className="bot-image"
            />
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <p>Class: {bot.bot_class}</p>
            <p>{bot.catchphrase}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBotArmy;
