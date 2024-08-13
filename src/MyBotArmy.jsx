import './MyBotArmy.css';

const MyBotArmy = ({ botArmy, onRemoveFromArmy, baseURL /* fetchBots*/ }) => {

    const handleDeleteBot = async (botId) => {

        // || create a DELETE http request to delete bot from server
        try {
            const response = await fetch(`${baseURL}/${botId}`, { method: 'DELETE' });

            if (response.ok) {
                console.log('Bot deleted successfully');
                onRemoveFromArmy(botId); 

                // |***(( My refresher did not work, on deleting i have to refresh my page manually; assistance needed))****|
                // fetchBots(); 

            } else {
                console.error('Failed to delete bot. Status:', 'Status Text:', response.statusText);
            }
        } catch (error) {
            console.error('Error during DELETE request:', error);
        }
    };

    return (
        // map over single bot to display under my bot army ||

        <div className="container">
         <h3 className="heading">My Bot Army</h3>
         <div className="bot-grid">
            {botArmy.length > 0 ? (
                 botArmy.map((bot) => (
           <div className="bot-card" key={bot.id}>
           <h4>I am {bot.name}</h4>
           <img src={bot.avatar_url} alt={`${bot.name} avatar`} className="bot-image" />
           <p>Health: {bot.health}</p>
           <p>Damage: {bot.damage}</p>
           <p>Armor: {bot.armor}</p>
           <p>Class: {bot.bot_class}</p>
           <button onClick={(event) => handleDeleteBot(bot.id, event)}>Discharge Bot From Service </button>
           </div>
                 ))
            ) : (
           <p>No bots in your army yet! Click on a bot to add to your army!</p>
            )}
         </div>
        </div>
    );
};

export default MyBotArmy;
