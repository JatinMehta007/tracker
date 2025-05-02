"use client"
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { WobbleCard } from "@/components/wobble_card";

export default function HabitTrackerApp() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [water, setWater] = useState(1.5);
  const [sleep, setSleep] = useState(6);
  const [screen, setScreen] = useState(5);
  const [streak, setStreak] = useState(3);
  const [chartData, setChartData] = useState([
    { day: "Mon", water: 2, sleep: 7, screen: 5 },
    { day: "Tue", water: 2.5, sleep: 8, screen: 4 },
    { day: "Wed", water: 3, sleep: 6.5, screen: 5.5 },
    { day: "Thu", water: 1.5, sleep: 6, screen: 6 },
    { day: "Fri", water: 2, sleep: 7.5, screen: 5 },
    { day: "Sat", water: 3, sleep: 8, screen: 4.5 },
    { day: "Sun", water: 2.2, sleep: 6.8, screen: 5 },
  ]);

  // Load selected day's values into sliders
  useEffect(() => {
    const entry = chartData.find((e) => e.day === selectedDay);
    if (entry) {
      setWater(entry.water);
      setSleep(entry.sleep);
      setScreen(entry.screen);
    }
  }, [selectedDay]);

  // Update chartData on slider change
  useEffect(() => {
    setChartData((prev) =>
      prev.map((entry) =>
        entry.day === selectedDay ? { ...entry, water, sleep, screen } : entry
      )
    );
  }, [water, sleep, screen, selectedDay]);

  useEffect(() => {
    if (water >= 2 && sleep >= 7 && screen <= 5) {
      setStreak((prev) => prev + 1);
    }
  }, [water, sleep, screen]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <WobbleCard>
        <div className="flex justify-center items-center  ">
      <div className=" w-[1300px]  bg-yellow-500 mt-5 h-16 fixed top-0 z-50 ">
        <div className="flex justify-between items-center text-white px-5 mt-2 ml- font-semibold">
        <img src="./images/logo1.png" alt="" className="h-8 mt-[5px] " />
        <div className="flex items-center gap-4 pt-1">
          <span className="text-base text-gray-700">Hi, Jatin 👋</span>
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="avatar"
            className="w-10 h-10 rounded-full border"
            />
            </div>
        </div>
      </div>
            </div>
      </WobbleCard>

      {/* Main Section */}
      <main className="px-6 py-8 mt-36">
        <div className="flex justify-center items-center">
        <p className="text-8xl font-extrabold uppercase">Welcome to </p>
        <img src="./images/logo1.png" alt="" className="h-[100px] mt-1 ml-1" />
        </div>
      
        
          <div className="">
            <div className=" grid grid-flow-col shadow-2xl mt-10  w-[1100px] h-[500px] ml-32 rounded-3xl  ">
              <div className="grid-cols-1 w-[65%] p-10">
              <motion.h2
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
                <p className="text-7xl text-left font-extrabold tracking-wider pt-5 ml-20  ">
                Daily Habit Check-In
                  <span className="text-2xl block font-normal mt-6">
                  Use this dashboard to track your daily habits and stay on top of your personal wellness goals.
                  Log your water intake, sleep hours, and screen time for each day of the week. Stay consistent to maintain your habit streak!
                  </span>
                </p>
                </motion.h2>
              </div>
              <div className="grid-cols-2 absolute h-[400px] w-[500px]  ml-[720px] mt-28  ">
                <img src="./images/image.png" alt="" className="rounded-4xl " />
              </div>
            </div>
          </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 mt-10">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full border font-medium transition-all duration-200 shadow-sm ${
                selectedDay === day
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Habit Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Water */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-medium text-lg mb-2">Water Intake (L)</h3>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={water}
              onChange={(e) => setWater(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">{water} L</p>
          </div>

          {/* Sleep */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-medium text-lg mb-2">Sleep (hrs)</h3>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={sleep}
              onChange={(e) => setSleep(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">{sleep} hrs</p>
          </div>

          {/* Screen Time */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-medium text-lg mb-2">Screen Time (hrs)</h3>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={screen}
              onChange={(e) => setScreen(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">{screen} hrs</p>
          </div>
        </div>

        {/* Streak */}
        <motion.div
          className="mt-10 bg-blue-100 p-4 rounded-xl text-blue-800 text-center text-lg font-medium shadow"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          🔥 Current Streak: {streak} days
        </motion.div>

        {/* Weekly Chart */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Water (L)" />
              <Line type="monotone" dataKey="sleep" stroke="#10b981" name="Sleep (hrs)" />
              <Line type="monotone" dataKey="screen" stroke="#f59e0b" name="Screen (hrs)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 TrackIt · Built by Jatin
      </footer>
    </div>
  );
}
