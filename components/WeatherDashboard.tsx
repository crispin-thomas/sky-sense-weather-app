import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Header from "./Header";
import HourlyForecast from "./HourlyForecast";
import MainWeatherCard from "./MainWeatherCard";
import WeeklyForecast from "./WeeklyForecast";
import { WeatherDataProps } from "@/types/weather-dashboard";

type Props = {
  data: WeatherDataProps;
  searchQuery: string;
  isLoading: boolean;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleRefresh: () => Promise<void>;
  handleSearch: (e: React.FormEvent) => Promise<void>;
  handleLocationRequest: () => void;
};

const WeatherDashboard: React.FC<Props> = ({
  data,
  searchQuery,
  setSearchQuery,
  isLoading,
  handleRefresh,
  handleSearch,
  handleLocationRequest,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const convertTemp = (temp: number) => {
    if (tempUnit === "F") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const getBackgroundGradient = () => {
    const hour = currentTime.getHours();
    const condition = data.current.icon;

    if (isDark) {
      // Dark mode gradients
      if (hour >= 6 && hour < 12) {
        // Morning dark
        return "bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900";
      } else if (hour >= 12 && hour < 18) {
        // Afternoon dark
        if (condition === "rain") {
          return "bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900";
        }
        return "bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900";
      } else if (hour >= 18 && hour < 21) {
        // Evening dark
        return "bg-gradient-to-br from-gray-900 via-purple-900 to-black";
      } else {
        // Night dark
        return "bg-gradient-to-br from-black via-gray-900 to-slate-900";
      }
    } else {
      // Light mode gradients
      if (hour >= 6 && hour < 12) {
        // Morning light
        return "bg-gradient-to-br from-rose-300 via-orange-200 to-amber-100";
      } else if (hour >= 12 && hour < 18) {
        // Afternoon light
        if (condition === "rain") {
          return "bg-gradient-to-br from-slate-300 via-blue-300 to-indigo-400";
        }
        return "bg-gradient-to-br from-sky-300 via-blue-400 to-cyan-500";
      } else if (hour >= 18 && hour < 21) {
        // Evening light
        return "bg-gradient-to-br from-orange-300 via-rose-400 to-purple-500";
      } else {
        // Night light
        return "bg-gradient-to-br from-slate-600 via-blue-700 to-indigo-800";
      }
    }
  };

  return (
    <div className={`transition-all duration-500 ${isDark ? "dark" : ""}`}>
      <div
        className={`${getBackgroundGradient()} transition-all duration-1000 min-h-screen relative`}
      >
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-black/20" : "bg-white/10"
          } backdrop-blur-sm`}
        />
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
          <Header
            isDark={isDark}
            setIsDark={setIsDark}
            handleLocationRequest={handleLocationRequest}
            handleRefresh={handleRefresh}
            handleSearch={handleSearch}
            isLoading={isLoading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <MainWeatherCard
            convertTemp={convertTemp}
            data={data}
            isDark={isDark}
            setTempUnit={setTempUnit}
            tempUnit={tempUnit}
          />
          <HourlyForecast
            convertTemp={convertTemp}
            data={data}
            isDark={isDark}
          />
          <WeeklyForecast
            convertTemp={convertTemp}
            data={data}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
