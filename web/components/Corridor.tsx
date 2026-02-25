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

  useEffect(() => {
    socket.on("signals:update", (data: Signal[]) => {
      setSignals(data);
    });

    return () => {
      socket.off("signals:update");
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
            <div className="w-10 h-24 bg-black rounded-lg flex flex-col justify-around items-center p-2">
              <div
                className={`w-4 h-4 rounded-full ${
                  signal.state === "RED" ? "bg-red-500" : "bg-red-500 opacity-30"
                }`}
              />
              <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-30" />
              <div
                className={`w-4 h-4 rounded-full ${
                  signal.state === "GREEN"
                    ? "bg-green-500"
                    : "bg-green-500 opacity-30"
                }`}
              />
            </div>

            <span className="mt-2 text-sm font-medium">
              Signal {signal.signal_id}
            </span>

            <span className="text-xs text-gray-500">
              {signal.remaining_time}s
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}