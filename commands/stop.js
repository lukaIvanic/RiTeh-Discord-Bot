module.exports = {
  name: "stop",
  description: "Stops the music and empties the queue",
  execute(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    else if (serverQueue) {
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
    } else {
      message.channel.send("There is nothing playing.");
    }
  },
};
