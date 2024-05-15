import { Long, Timestamp } from '../types/types';

export interface UserInput {
  username: string;
  password: string;
}

export interface UserEntity {
  id: Long;
  username: string;
  avatar: string;
  createdAt: Timestamp;
}

export interface UserOutput {
  id: number;
  username: string;
  avatar: string;
  createdAt: string;
}
