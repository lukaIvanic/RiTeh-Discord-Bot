//Discord setup
const discord = require("discord.js");
const client = new discord.Client();
client.commands = new discord.Collection();

//Getting prefix and token from config.json
const { prefix, token } = require("./config.json");

const ytdl = require("ytdl-core");

let array = []

global.queue = new Map();
global.helpEmbed = new discord.MessageEmbed()
  .setColor("#0099ff")
  .setTitle("There is no purpose [BOT]")
  .attachFiles(["./pictures/elon.jpg", "./pictures/pepe.jpg"])
  .setURL("https://discord.js.org/")
  .setAuthor("Spasitelj", "attachment://elon.jpg", "https://discord.js.org")
  .setDescription("Light-weight multi-purpose bot")
  .setThumbnail("attachment://pepe.jpg")
  .addFields({
    name: "[COMMANDS]",
    value: `[PREFIX] => '${prefix}'`,
  })
  .setFooter(`You typed ${prefix}help", "`);

//reading the commands file and making sure it's a js file
const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  global.helpEmbed.addField(command.name, command.description, true);
}

//Starting bot
client.once("ready", () => {
  console.log("It's alive! Poor thing...");
});

//Server interaction
client.on("message", async (message) => {
  //checks if the bot is called
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //String manipulation
  const args = message.content.slice(prefix.length).split(/ +/);

  //Leaves the command execution to specific command files
  try {
    const serverQueue = global.queue.get(message.guild.id);
    message.myarray = array
    if(client.commands.get(args[0].toLowerCase()).name === 'meme')
      client.commands.get(args[0].toLowerCase()).meme(message, client);
    else {
      message.client = client;
      client.commands.get(args[0].toLowerCase()).execute(message, serverQueue);
    }
  } catch {
    if (args[0] === "help") {
      message.channel.send(helpEmbed);
    } else {
      message.channel.send(
        new discord.MessageEmbed()
          .setTitle("Wrong command")
          .setDescription(`Type **${prefix}help** for help.`)
      );
    }
  }

  //musicCommands(message);
});

//Dunno I guess this is neccesary for auth
client.login(token);
