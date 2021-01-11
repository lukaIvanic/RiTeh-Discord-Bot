const fetch = require('node-fetch');
module.exports = {
    name: 'duje',
    description: 'Random number from 1 to given number',
    execute: async (message) => {
        
        setInterval(duje, 1000)

        function duje() {
            message.channel.send("Duje koji cemo modpack igrat")
        }
    }

}