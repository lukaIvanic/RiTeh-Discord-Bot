const fetch = require('node-fetch');
module.exports = {
    name: 'cat',
    description: 'Random cat picture',
    execute: async (message) => {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
            const json = await response.json();
            message.channel.send(json[0].url);
        
    }
}