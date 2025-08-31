import type { Client } from 'discord.js';

type CreateMessage = {
  discordClient: Client;
  guildId: string;
  channelId: string;
  message: string;
}

export type {
  CreateMessage,
}
