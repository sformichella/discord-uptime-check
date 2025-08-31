import EventEmitter from "node:events";
import { Client } from "discord.js";

import { createMessage, getVpsStatus } from "../controllers";

import { AppArgs, AppEvents, IApp } from "./types";
import { getUptimeCheckMessage } from "./utils";

const TEN_MINUTES = 1000 * 60 * 10

class App extends EventEmitter<AppEvents> implements IApp {
  discordClient: Client;
  initialized: boolean;
  lastMessage?: { sentAt: number; status: 'failure' | 'success' } | undefined;

  constructor(args: AppArgs) {
    super();

    const {
      discordClient,
      discordChannelId,
      discordGuildId,
      uptimeCheckInterval,
      uptimeCheckAddress
    } = args;

    this.discordClient = discordClient;
    this.initialized = false

    this.once('ready', () => {
      this.emit('check')
    })

    this.on('check', async () => {
      const status = await getVpsStatus({
        address: uptimeCheckAddress
      })

      const message = getUptimeCheckMessage({
        currentStatus: status,
        repeatFailureMessageInterval: TEN_MINUTES,
        previousMessage: this.lastMessage
      })

      if (message) {
        this.lastMessage = {
          sentAt: Date.now(),
          status,
        }

        await createMessage({
          discordClient,
          guildId: discordGuildId,
          channelId: discordChannelId,
          message
        });
      }

      setTimeout(() => {
        this.emit('check')
      }, uptimeCheckInterval)
    })
  }

  init() {
    if (this.initialized) {
      return this;
    }
    
    this.initialized = true;

    if (this.discordClient.readyAt) {
      this.emit('ready')
      return this
    }

    this.discordClient.on('clientReady', () => {
      this.emit('ready')
    });

    return this
  }
}

export {
  App,
}
