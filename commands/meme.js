const fetch = require('node-fetch');
module.exports = {
    name: 'meme',
    description: 'Random meme scraped from reddit',
    meme: async (message, client) => {

        sendMeme()

        async function sendMeme() {
            const response = await fetch(`https://meme-api.herokuapp.com/gimme`);
            const json = await response.json();
            let sentMessage = await message.channel.send(json.url);
        sentMessage.react("🔁");

        const filter = (reaction, user) => {
            return ['🔁'].includes(reaction.emoji.name) && user.id !== sentMessage.author.id;
        }

            sentMessage.awaitReactions(filter, {
                max: 1
                , time: 600000, errors: ['time']
            })
            .then(()=> {
                    sendMeme()
            });
        }

            
        
        
    }
}