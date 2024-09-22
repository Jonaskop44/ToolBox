import { ConflictException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as net from 'net';

@Injectable()
export class NettoolsService {
  constructor() {}

  async getIpInfo(ip: string) {
    return axios
      .get(`https://www.ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new ConflictException(
          'Something went wrong while fetching IP info',
        );
      });
  }

  async scanPorts(ip: string, startPort: number, endPort: number) {
    const openPorts: number[] = [];

    //Check if the port range is valid
    if (
      startPort < 1 ||
      startPort > 65535 ||
      endPort < 1 ||
      endPort > 65535 ||
      startPort > endPort
    ) {
      throw new ConflictException(
        'Invalid port range. Ports should be between 1 and 65535.',
      );
    }

    const scanPort = (port: number): Promise<boolean> => {
      return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(60000);

        socket.on('connect', () => {
          console.log(`Port ${port} is open`);
          openPorts.push(port);
          socket.destroy();
          resolve(true);
        });

        socket.on('timeout', () => {
          console.log(`Port ${port} is closed`);
          socket.destroy();
          resolve(false);
        });

        socket.on('error', () => {
          console.log(`Port ${port} is closed`);
          socket.destroy();
          resolve(false);
        });

        socket.connect(port, ip);
      });
    };

    const portScanPromises = [];
    for (let port = startPort; port <= endPort; port++) {
      portScanPromises.push(scanPort(port));
    }

    await Promise.all(portScanPromises);

    console.log('Open ports:', openPorts);
    return openPorts;
  }
}
