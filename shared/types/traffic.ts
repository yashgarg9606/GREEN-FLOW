export type TrafficSegmentState = {
  segment_id: string;
  avg_speed: number;      // meters per second
  vehicle_count: number;  // vehicles currently on segment
  queue_length: number;   // vehicles waiting near signal
  occupancy: number;      // 0 to 1 road occupancy
  timestamp: number;      // unix epoch seconds
};

export type TrafficUpdatePayload = {
  segments: TrafficSegmentState[];
};