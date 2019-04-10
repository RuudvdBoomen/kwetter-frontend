import { Kweet } from './kweet';

export class Hashtag {
  id: number;
  name: String;
  lastUsed: Date;
  timesUsed: number;
  kweets: Kweet[];
}
