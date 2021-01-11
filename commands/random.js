const fetch = require('node-fetch');
module.exports = {
    name: 'random',
    description: 'Random number from 1 to given number',
    execute: async (message) => {
        const args = message.content.split(" ")[1];
        const names = message.content.split(" ").splice(2, 1000, 'NIGGA');
        try {
            let random = Math.round(Math.random() * (args - 1))
            if (!isNaN(args)) {
                let response = `The random number (1-${args}) is **${random + 1}**`
                if (names[random] !== undefined) { response += ` and the associated tag is **${names[random]}**`; }
                return message.channel.send(response)
                // console.log(`The random number (0, ${args}) is **${random}**`)
            } else {
                return message.channel.send("Nigga that ain't no number");
            }
        } catch (e){
            message.channel.send("Fucking errors");
            console.log(e)
        }
    }
}