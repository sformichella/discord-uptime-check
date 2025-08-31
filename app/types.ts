import { Client } from "discord.js";
import EventEmitter from "events";

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

interface IApp extends EventEmitter<AppEvents> {
  initialized: boolean;
  discordClient: Client;
  lastMessage?: { sentAt: number; status: 'failure' | 'success' } | undefined;
}


export type {
  GetUptimeCheckMessageArgs,
  AppEvents,
  AppArgs,
  IApp,
}
