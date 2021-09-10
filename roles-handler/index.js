import { Client, Intents } from "discord.js";
import createCommand from "./createCommand.js";

import convertTimeString from "./convertTimeString";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("ready", function () {
  console.log("Je suis connecté !");
});

let color = "YELLOW";
let channelRequest = "admin";

// add
// del
// request
// def-main
// def-sub
// def-color ?

createCommand(client, "roles add", (message) => {
  if (!message.content) {
    message.channel.send(`Aucun nom n'a été donné pour le rôle.`);
  } else {
    if (
      message.guild.roles.cache.find((role) => role.name === message.content)
    ) {
      message.channel.send(`Le nom de rôle spécifié existe déjà.`);
    } else {
      // Create a new role
      message.guild.roles.create({
        name: message.content,
        color: color,
        mentionable: true,
        reason: "",
      });
    }
  }
});

createCommand(client, "roles del", (message) => {
  let role = message.guild.roles.cache.find(
    (role) => role.name === message.content
  );
  if (role) {
    role.delete();
  }
});

createCommand(client, "roles request", (message) => {
  if (!message.content) {
    message.channel.send(`Aucun nom n'a été donné pour le rôle.`);
  } else {
    let channel = message.guild.channels.cache.find(
      (channel) => channel.name === channelRequest
    );
    if (channel) {
      channel.send(
        `${message.author} propose d'ajouter le role ${message.content}`
      );
    }
  }
});

// createCommand(client, "voc-category", (message) => {
//   if (!message.content) {
//     parentId = null;
//     message.channel.send(`Les salons vocaux seront générés sans catégorie`);
//   } else {
//     const channel = message.guild.channels.cache.find(
//       (channel) =>
//         channel.type === "GUILD_CATEGORY" &&
//         channel.name.toLowerCase().trim() ===
//           message.content.toLowerCase().trim()
//     );
//     if (channel) {
//       parentId = channel.id;
//       message.channel.send(
//         `Les salons vocaux seront désormais générés dans ${channel.name}`
//       );
//     } else {
//       message.channel.send(`Aucune catégorie ne correspond à ce nom`);
//     }
//   }
// });

// createCommand(client, "voc", (message) => {
//   if (message.content) {
//     message.guild.channels
//       .create(message.content, { parent: parentId, type: "GUILD_VOICE" })
//       .then((channel) => {
//         let timeout;
//         function checkPresence() {
//           if (timeoutSeconds) {
//             if (timeout) {
//               clearTimeout(timeout);
//             }
//             timeout = setTimeout(() => {
//               if (channel && !channel.members.size) {
//                 channel.delete();
//                 client.off("voiceStateUpdate", callback);
//               }
//             }, timeoutSeconds * 1000);
//           }
//         }
//         checkPresence();
//         const callback = () => {
//           if (channel && !channel.members.size) checkPresence();
//         };
//         client.on("voiceStateUpdate", callback);
//       });
//   }
// });

client.login(process.env.TOKEN);
