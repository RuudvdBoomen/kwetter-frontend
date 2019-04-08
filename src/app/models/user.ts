import { Kweet } from './kweet';

export class User {
  username: string;
  followerCount: number;
  followingCount: number;
  email: string;
  kweets: Kweet[];
}
