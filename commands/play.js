const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "play",
  description: "Puts a song in the queue and plays it if the queue was empty.",
  async execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
    if (args[1] === undefined)
      return message.channel.send("Aight, playing nothing.");
    let songInfo = { videoDetails: {} };
    let video;
    try {
      songInfo = await ytdl.getInfo(args.slice(1).join(" "));
    } catch {
      let result;
      console.log(args.slice(1).join(" "))
      ytsr.getFilters(args.slice(1).join(" ")).then(async (filters1) => {
        const filter1 = filters1.get('Type').find(o => o.name === 'Video');
        const filters2 = await ytsr.getFilters(filter1.ref);
        const filter2 = filters2.get('Duration').find(o => o.name.startsWith('Short'));
        const options = {
          limit: 5,
          nextpageRef: filter2.ref,
        }
        result = await ytsr(null, options);
        dosth(searchResults);
      }).catch(err => {
        console.error(err);
      });
      try{ video = result.items.filter((i) => i.type === "video")[0];}
      catch{ return message.channel.send("No video found");}
     

      songInfo.videoDetails.title = video.title;
      songInfo.videoDetails.video_url = video.link;
    }
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      video: video,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      global.queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        global.queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(
        `**${song.title}** has been added to the queue!`
      );
    }

    async function play(guild, song) {
      const serverQueue = global.queue.get(guild.id);
      if (!song) {
        serverQueue.voiceChannel.leave();
        global.queue.delete(guild.id);
        return;
      }

      const dispatcher = serverQueue.connection
        .play(ytdl(song.url, {
          quality: 'highestaudio',
          acodec: 1 << 25
        }))
        .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5).on('error', error => console.error(error));
      (async () => { 
        const embed = new MessageEmbed()
          .setTitle(song.video.title)
          .setImage(song.video.thumbnail)
          .setColor("GREEN")
          .setDescription(`**[${song.video.link}](${song.video.link})**`)
          .setAuthor(`[PLAYING]\n\n` + song.video.author.name)
          .addField("Views", song.video.views.toLocaleString(), true)
          .addField("Duration", song.video.duration, true);

        message.channel.send(embed);
      })();
    }
  },
};
