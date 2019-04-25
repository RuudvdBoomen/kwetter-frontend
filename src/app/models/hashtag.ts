import { Kweet } from './kweet';

export class Hashtag {
  id: number;
  name: string;
  lastUsed: Date;
  timesUsed: number;
  kweets: Kweet[];
}
