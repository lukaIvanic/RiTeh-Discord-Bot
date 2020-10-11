const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'queue',
    description: 'shows songs in queue',
    execute(message, serverQueue){

        if(!serverQueue)return message.channel.send('Queue is empty.');
        
        let embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("[QUEUE]")
        .setFooter(`You typed ${message.content[0]}queue`);
        
        
        for(let i = 0; i < serverQueue.songs.length ;i++){
            embed.addField((i + 1) + '. ' + serverQueue.songs[i].title, 'Views: ' + serverQueue.songs[i].video.views + '\nDuration: ' + serverQueue.songs[i].video.duration, false);
        }
        message.channel.send(embed);
    }
}