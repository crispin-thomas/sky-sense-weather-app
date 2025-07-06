"use client";

import WeatherDashboard from "@/components/WeatherDashboard";
import { fetchWeatherData, fetchWeatherDataByCoords } from "@/lib/weatherApi";
import { WeatherDataProps } from "@/types/weather-dashboard";
import { useEffect, useState } from "react";

export default function Page() {
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchWeatherData(searchQuery === '' ? 'New York' : searchQuery);
      setWeatherData(data);
    })();
  }, []);

  // Refresh Button Logic
  const handleRefresh = async () => {
    if (!weatherData) return; // no data to refresh
    setIsLoading(true);
    try {
      const refreshedData = await fetchWeatherData(
        weatherData.current.location
      );
      setWeatherData(refreshedData);
    } catch (error) {
      console.error("Error refreshing weather data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Search Form Logic
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
      setSearchQuery("");
    } catch (error) {
      console.error("Error searching weather data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Geolocation Logic
  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await fetchWeatherDataByCoords(latitude, longitude);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather by coordinates", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location", error);
        setIsLoading(false);
      }
    );
  };

  return weatherData ? (
    <WeatherDashboard
      data={weatherData}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isLoading={isLoading}
      handleLocationRequest={handleLocationRequest}
      handleRefresh={handleRefresh}
      handleSearch={handleSearch}
    />
  ) : (
    <div>Loading...</div>
  );
}
