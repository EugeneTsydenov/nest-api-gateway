export interface Timestamp {
  seconds: Long;
  nanos: number;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}
