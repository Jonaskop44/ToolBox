export interface Discord {
  token: string;
  amount: number;
  name: string;
  channelId: string;
  message: string;
  delay: number;
  guildId: string;
}

export enum DiscordTypes {
  MASSCREATECHANNELS = "MASSCREATECHANNELS",
  MASSCREATEROLES = "MASSCREATEROLES",
  BANALLMEMBERS = "BANALLMEMBERS",
  KICKALL = "KICKALL",
  DELETEALLCHANNELS = "DELETEALLCHANNELS",
  DELETEALLROLES = "DELETEALLROLES",
  ACCOUNTMESSAGESPAM = "ACCOUNTMESSAGESPAM",
}

export type DiscordModalType = DiscordTypes;
