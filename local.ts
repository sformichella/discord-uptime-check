import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv'

import { App } from './app';

config();

const DISCORD_APP_TOKEN = process.env.DISCORD_APP_TOKEN
const UPTIME_CHECK_ADDRESS = process.env.UPTIME_CHECK_ADDRESS
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID

if (DISCORD_APP_TOKEN === undefined) {
  throw new Error('process.env.DISCORD_APP_TOKEN is undefined')
}

if (UPTIME_CHECK_ADDRESS === undefined) {
  throw new Error('process.env.UPTIME_CHECK_ADDRESS is undefined')
}

if (DISCORD_GUILD_ID === undefined) {
  throw new Error('process.env.DISCORD_GUILD_ID is undefined')
}

if (DISCORD_CHANNEL_ID === undefined) {
  throw new Error('process.env.DISCORD_CHANNEL_ID is undefined')
}

const discordClient = new Client({
  intents: [GatewayIntentBits.GuildMessages]
})

discordClient.login(DISCORD_APP_TOKEN)

// discordClient.on('debug', (msg) => console.log(msg))
discordClient.on('warn', (msg) => console.log(msg))

const THIRTY_SECONDS = 1000 * 30

const app = new App({
  discordClient,
  discordGuildId: DISCORD_GUILD_ID,
  discordChannelId: DISCORD_CHANNEL_ID,
  uptimeCheckAddress: UPTIME_CHECK_ADDRESS,
  uptimeCheckInterval: THIRTY_SECONDS
})

app.init();
