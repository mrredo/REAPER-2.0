const Discord = module.require("discord.js");
const moment = require("moment");
const { oneLine } = require("common-tags");

module.exports = {
    name: "userinfo",
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const act = mention.user.presence.status.toUpperCase();
        const game = mention.user.presence.game || "None";
        var ack = "";
        if (mention.user.id === message.member.id) {
        if (message.member.hasPermissions("ADMINISTRATOR")) {
         ack = "Server Admin";
        } else if (message.member.id === message.guild.owner.id) {
        ack = "Server Owner";
        } else if (message.member.hasPermissions("MANAGE_GUILD")) {
        ack = "Server Manager";
        }
        }
        if (mention.user.id === message.mentions.members.first().id) {
        if (mention.member.hasPermissions("ADMINISTRATOR") || mention.member.hasPermissions("ADMINISTRATOR")) {
         ack = "Server Admin";
        } else if (mention.user.id === message.guild.owner.id || mention.user.id === message.guild.owner.id) {
        ack = "Server Owner";
        } else if (mention.member.hasPermissions("MANAGE_GUILD")) {
        ack = "Server Manager";
        }
        }
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "None",
            "DISCORD_EMPLOYEE": "Discord Employee",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early Supporter",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Verified Bot",
            "VERIFIED_DEVELOPER": "Verified Bot Developer"
        };
        var bot = {
            "true": "Yes, The User is a Bot",
            "false": "No, The User is a Human"
        };
        const userlol = new Discord.MessageEmbed()
        .setAuthor(`User Info`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .addField(`General Info`, `**\`Name\`**: ${mention.user.username} \n**`\Tag`\**: ${mention.user.discriminator} \n**`\Nickname\`**: ${nick}`))
        .addField(`Overview`, `**`\Badges\`**: ${flags[mention.user.flags.toArray().join(", ")]} \n**\`Status\`**: ${act} \n**\`Activity\`**: ${game} \n**\`Is Bot\`**: ${bot[mention.user.bot]}`)
        .addField(`Server Relating Info`, `**`\Position\`**: ${ack} \n**\`Roles\`**: <@&${mention._roles.join(">  <@&")}> \n**\`Key Permissions\`**: ${finalPermissions.join(', ')}`)
        .addField(`Misc Info`, `**\`Acc Created on\`**: \n${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")} \n**\`Joined This Server on\`**: \n${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}`)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor("RANDOM");
        message.channel.send(userlol)
    }
}
