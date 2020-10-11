module.exports = {
  name: "purpose",
  description: "What is my purpose?",
  execute(message) {
    message.channel.send("I have no purpose, O' Mighty");

    // if (message.member.roles.cache.has("764188955033600070")) {
    // } else {
    //   message.channel.send("Only God is allowed to know my purpose.");
    // }
  },
};
