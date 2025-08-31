import { CreateMessage } from "./types";

async function createMessage(
  args: CreateMessage
) {
  const { discordClient, guildId, channelId, message } = args;

  const guild = discordClient.guilds.cache.get(guildId)
    || await discordClient.guilds.fetch(guildId)

  if (!guild) {
    throw new Error(`Guild ${guildId} was not found in the cache`);
  }

  const channel = guild.channels.cache.get(channelId)
    || await guild.channels.fetch(channelId)

  if (!channel) {
    throw new Error(`Channel ${channelId} was not found in the cache`)
  }

  if (!channel.isTextBased()) {
    throw new Error(`Channel ${channelId} is not a text channel`)
  }

  await channel.send(message)
}

export {
  createMessage,
}
