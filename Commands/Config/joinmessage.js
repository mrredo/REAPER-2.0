const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/joinmsg");

module.exports = {
  name: "joinmessage",
  description: "Change the welcome message per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const text = args.join(" ");
    if (!args[0]) {
      return message.channel.send(`\`Usage: =joinmessage <Text|off>\``)
    }
    if (text) {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });
        let newData = new prefixModel({
          JoinMsg: args.join(" "),
          GuildID: message.guild.id
        });
        newData.save();
        message.channel.send(`Join Message set to ${newData.JoinMsg}`);

      } else if (!data) {

        let newData = new prefixModel({
          JoinMsg: args.join(" "),
          GuildID: message.guild.id
        });
        newData.save();
        message.channel.send(`Join Message set to ${data.JoinMsg}`);

      }
    } else if (args[0] === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Join Message has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Join Message isn't setup!`)
      }
    }
  }
}