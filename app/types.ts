import { Client } from "discord.js";

type GetUptimeCheckMessageArgs = {
  currentStatus: 'failure' | 'success';
  repeatFailureMessageInterval: number;
  previousMessage?: {
    sentAt: number;
    status: 'failure' | 'success';
  } | undefined;
}

type AppEvents = {
  ready: [];
  check: [];
}

type AppArgs = {
  discordClient: Client;
  discordGuildId: string;
  discordChannelId: string;
  uptimeCheckAddress: string;
  uptimeCheckInterval: number;
}

export type {
  GetUptimeCheckMessageArgs,
  AppEvents,
  AppArgs,
}
