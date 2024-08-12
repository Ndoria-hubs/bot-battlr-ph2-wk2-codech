const MyBotArmy = ({ botArmy, onRemoveFromArmy, baseURL }) => {


const handleDeleteBot = async (botId) => {
    try {
        const response = await fetch(`${baseURL}/${botId}`, { method: 'DELETE' });
        
        if (response.ok) {
            console.log('Bot deleted successfully');
            onRemoveFromArmy(botId); // Remove from local state after successful delete
        } else {
            console.error('Failed to delete bot:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

    return (
        <div className="container">
            <h3 className="heading">Your Bot Army</h3>
            <div className="bot-grid">
                {botArmy.length > 0 ? (
                    botArmy.map((bot) => (
                        <div className="bot-card" key={bot.id} onClick={() => onRemoveFromArmy(bot.id)}>
                         <h4>I am {bot.name}</h4>
                         <img src={bot.avatar_url} alt={`${bot.name} avatar`} className="bot-image" />
                         <p>Health: {bot.health}</p>
                         <p>Damage: {bot.damage}</p>
                         <p>Armor: {bot.armor}</p>
                         <p>Class: {bot.bot_class}</p>
                         <button onClick={() => handleDeleteBot(bot.id)}>Discharge Bot From Service</button>
                        </div>
                    ))
                ) : (
                    <p>No bots in your army</p>
                )}
            </div>
        </div>
    );
};

export default MyBotArmy;
