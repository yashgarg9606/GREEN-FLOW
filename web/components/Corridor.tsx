"use client";

import React, { useEffect, useState } from "react";
import { socket } from "../src/lib/socket";


type Signal = {
  signal_id: number;
  state: "GREEN" | "RED" | "YELLOW";
  remaining_time: number;
};

export default function Corridor() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [trafficState, setTrafficState] = useState<Record<string, any>>({});

  useEffect(() => {
    socket.on("signals:update", (data: Signal[]) => {
      setSignals(data);
    });

    socket.on("traffic:update", (data) => {
      setTrafficState(data);
    });

    return () => {
      socket.off("signals:update");
      socket.off("traffic:update");
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-8">
        Green Flow Corridor (Live)
      </h1>

      <div className="relative w-[900px] h-[200px] bg-gray-100 rounded-xl flex items-center justify-between px-10">
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 -translate-y-1/2" />

        {signals.map((signal) => (
          <div key={signal.signal_id} className="flex flex-col items-center z-10">
            ...
          </div>
        ))}
      </div>

      <div className="mt-8 w-[900px] bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Live Traffic Metrics
        </h2>

        {Object.keys(trafficState).length === 0 ? (
          <p className="text-sm text-gray-500">
            No traffic data yet…
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(trafficState).map(([segmentId, data]: any) => (
              <div
                key={segmentId}
                className="border rounded-lg p-3 bg-gray-50"
              >
                <p className="text-sm font-medium">{segmentId}</p>
                <p className="text-xs text-gray-600">
                  Speed: {data.avg_speed.toFixed(2)} m/s
                </p>
                <p className="text-xs text-gray-600">
                  Vehicles: {data.vehicle_count}
                </p>
                <p className="text-xs text-gray-600">
                  Queue: {data.queue_length}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}