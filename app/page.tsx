"use client"

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { WobbleCard } from "@/components/wobble_card";
type HabitEntry = {
  water: number;
  sleep: number;
  screen: number;
};

const getPast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split("T")[0]);
  }
  return days;
};

export default function HabitTrackerApp() {
  const dates = getPast7Days();
  const [selectedDate, setSelectedDate] = useState<string>(dates[0]);

  const [habitData, setHabitData] = useState<Record<string, HabitEntry>>(() =>
    dates.reduce((acc, date) => {
      acc[date] = { water: 1.5, sleep: 6, screen: 5 };
      return acc;
    }, {} as Record<string, HabitEntry>)
  );

  const [streak, setStreak] = useState<number>(0);
  const current = habitData[selectedDate];

  // Calculate streak
  useEffect(() => {
    const newStreak = dates.reduce((acc, date) => {
      const h = habitData[date];
      if (h.water >= 2 && h.sleep >= 7 && h.screen <= 5) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setStreak(newStreak);
  }, [habitData]);

  // Handle updates
  const updateHabit = (type: keyof HabitEntry, value: number) => {
    setHabitData((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [type]: value,
      },
    }));
  };

  

  const chartData = dates.map((date) => ({
    date,
    ...habitData[date],
  }));

  return (
    <div className="min-h-screen  text-gray-800 overflow-hidden relative ">
      <WobbleCard >
        <div className="flex justify-center ">
          <div className="w-[78%] lg:max-w-[1300px] mx-auto bg-yellow-400 rounded-full lg:rounded-sm mt-5 h-16 fixed top-0 z-50">
            <div className="flex justify-between items-center text-white px-5 mt-2 font-semibold">
              <img src="./images/logo.png" alt="" className="h-5 lg:h-8 mt-[5px]" />
              <div className="flex items-center gap-4 pt-1">
                <span className="text-base text-black hidden">Hi, Jatin 👋🏻</span>
               
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-black"
                />
                
              </div>
            </div>
          </div>
        </div>

      <main className="px-6 py-8 mt-36">
        <div className="  block md:flex justify-center items-center">
          <p className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-black font-extrabold uppercase text-center">Welcome to </p>
          <div className="flex justify-center">
          <img src="./images/logo.png" alt="" className="h-[45px] md:h-[50px] lg:h-[70px] xl:h-[95px] mt-1 md:ml-1 sm:block " />
          </div>
        </div>

        <div className="md:grid md:grid-flow-col  bg-gradient-to-b from-yellow-500 to-yellow-300 shadow-2xl mt-10 xl:w-[1100px] md:w-[90%] mx-auto xl:mx-0  xl:h-[500px] xl:ml-32  rounded-3xl">
          <div className="sm:grid-cols-1 sm:w-[65%] xl:p-10">
            <motion.h2
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              >
              <p className="text-4xl  xl:text-7xl sm:text-left font-extrabold tracking-wider text-black pt-5 xl:ml-20 text-center md:text-5xl p-7  xl:p-0 ">
                Daily Habit Check-In
                <span className="text-2xl md:text-xl xl:text-2xl p-2    block font-normal  mt-6 text-blac k">
                  Use this dashboard to track your daily habits and stay on top of your personal wellness goals.
                  Log your water intake, sleep hours, and screen time for each day of the week. Stay consistent to maintain your habit streak!
                </span>
              </p>
            </motion.h2>
          </div>
          <div className=" absolute right-6 xl:h-[400px] xl:w-[500px] ml-[400px] lg:ml-[580px] xl:ml-[720px] sm:mt-24 xl:mt-28 lg:mt-5">
            <img src="./images/image.png" alt="" className="invisible md:visible  rounded-4xl md:w-[300px] lg:w-[350px] xl:w-full" />
          </div>
          
        </div>

        <p className="text-3xl md:text-4xl xl:text-5xl font-black text-black mb-2 mt-10 text-center">
          Select a date to view or update your habits:
        </p>
        <div className="w-32 sm:w-96 h-[7px] mt-7 bg-amber-600 rounded-4xl  mx-auto"></div>
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 mt-10  ">
          {dates.map((date) => (
            <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={` cursor-pointer sm:px-4  sm:py-2 p-[1px] sm:rounded-full   border  transition-all duration-200 shadow-sm font-bold  ${
              selectedDate === date
              ? "bg-amber-400   "
              : "bg-white text-gray-700 hover:bg-blue-100"
            }`}
            >
              {new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">Water Intake (L)</h3>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={current.water}
              onChange={(e) => updateHabit("water", parseFloat(e.target.value))}
              className="w-full "
              />
            <p className="text-sm text-gray-600 mt-1">{current.water} L</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">Sleep (hrs)</h3>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={current.sleep}
              onChange={(e) => updateHabit("sleep", parseFloat(e.target.value))}
              className="w-full"
              />
            <p className="text-sm text-gray-600 mt-1">{current.sleep} hrs</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">Screen Time (hrs)</h3>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={current.screen}
              onChange={(e) => updateHabit("screen", parseFloat(e.target.value))}
              className="w-full"
              />
            <p className="text-sm text-gray-600 mt-1">{current.screen} hrs</p>
          </div>
        </div>

        <motion.div
          className="mt-10 bg-blue-100 p-4 rounded-xl text-amber-800 text-center text-xl font-medium shadow"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          >
          🔥 Current Streak: {streak} days
        </motion.div>

        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString("en-US", { weekday: "short" })} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Water (L)" />
              <Line type="monotone" dataKey="sleep" stroke="#10b981" name="Sleep (hrs)" />
              <Line type="monotone" dataKey="screen" stroke="#f59e0b" name="Screen (hrs)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-black">
        © 2025 TrackIt · Built by Jatin
      </footer>
          </WobbleCard>
    </div>
          
  );
}
