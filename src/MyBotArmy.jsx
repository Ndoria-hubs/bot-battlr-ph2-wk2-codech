import './MyBotArmy.css';

const MyBotArmy = ({ botArmy, onRemoveFromArmy, baseURL /* fetchBots*/ }) => {

    // || Remove bot from botArmy only (frontend) ||
    const handleReleaseBot = (botId) => {
        onRemoveFromArmy(botId);
    };

    // || Delete bot from backend and remove from botArmy (frontend) ||
    const handleDeleteBot = async (botId) => {
        try {
            const response = await fetch(`${baseURL}/${botId}`, { method: 'DELETE' });

            if (response.ok) {
                console.log('Bot deleted successfully');
                onRemoveFromArmy(botId); // Update state to remove bot from frontend
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
                <div className="bot-card" key={bot.id} onClick={() => handleReleaseBot(bot.id)} // Click to remove bot from army (frontend only)
                     >
                   <div className="card-content">
                   <button className="delete-button" onClick={() => {event.preventDefault(); // Prevent default action
                           handleDeleteBot(bot.id); // Delete bot from backend and frontend
                   }} > X </button>
                   <h4>I am {bot.name}</h4>
                   <img src={bot.avatar_url} alt={`${bot.name} avatar`} className="bot-image" />
                   <p>Health: {bot.health}</p>
                   <p>Damage: {bot.damage}</p>
                   <p>Armor: {bot.armor}</p>
                   <p>Class: {bot.bot_class}</p>
                   </div>
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


// why did my delete request not work without refreshing??!!