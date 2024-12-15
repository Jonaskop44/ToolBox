export interface Nettools {
  ip: string;
  mac: string;
  startPort: string;
  endPort: string;
}

export enum NettoolsTypes {
  IPINFO = "IPINFO",
  MACLOOKUP = "MACLOOKUP",
  PORTSCAN = "PORTSCAN",
}

export type NettoolModalType = NettoolsTypes;
