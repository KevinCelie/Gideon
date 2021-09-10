import { Client, Intents } from "discord.js";
import createCommand from "../utils/createCommand";

import convertTimeString from "../utils/convertTimeString";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("ready", function () {
  console.log("Je suis connecté !");
});

let parentId;
let timeoutSeconds = 5;

// add
// del
// request
// def-main
// def-sub
//

createCommand(client, "roles-", (message) => {
  if (!message.content) {
    timeoutSeconds = 0;
    message.channel.send(
      `Les salons vocaux ne seront plus fermés automatiquement`
    );
  } else {
    try {
      timeoutSeconds = convertTimeString(message.content);
      message.channel.send(
        `Les salons vocaux seront désormais fermés au bout de ${message.content}`
      );
    } catch (error) {
      console.error(error);
      if (error.message === "Invalid format") {
        message.channel.send(
          `Le format est invalide, le format doit être .d.h.m.s avec (jour/heure/minute/seconde)`
        );
      }
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
