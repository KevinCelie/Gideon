const prefix = "$";

export default function createCommand(client, aliases, callback) {
  if (typeof aliases === "string") aliases = [aliases];
  client.on("message", (message) => {
    aliases.forEach((alias) => {
      if (
        message.content.trim() === `${prefix}${alias}` ||
        message.content.trim().startsWith(`${prefix}${alias} `)
      ) {
        message.content = message.content
          .replace(`${prefix}${alias}`, "")
          .trim();
        callback(message);
      }
    });
  });
}
