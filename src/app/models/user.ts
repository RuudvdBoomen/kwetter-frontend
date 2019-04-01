import { Kweet } from './kweet';

export class User {
  username: string;
  followerCount: Number;
  followingCount: Number;
  email: string;
  kweets: Kweet[];
}
