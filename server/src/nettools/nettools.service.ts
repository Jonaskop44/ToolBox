import { ConflictException, Injectable } from '@nestjs/common';
import axios from 'axios';

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
}
