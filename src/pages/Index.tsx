import { useState, useEffect } from "react";
import { getLocationByIP } from "@/services/getLocationByIP";
import { WeatherCondition, WeatherData } from "@/types/weather";
import WeatherCard from "@/components/WeatherCard";
import WeatherDetails from "@/components/WeatherDetails";
import SearchLocation from "@/components/SearchLocation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import RainAnimation from "@/components/animations/RainAnimation";
import DrizzleAnimation from "@/components/animations/DrizzleAnimation";
import SnowAnimation from "@/components/animations/SnowAnimation";
import ThunderstormAnimation from "@/components/animations/ThunderstormAnimation";
import SunnyAnimation from "@/components/animations/SunnyAnimation";
import CloudyAnimation from "@/components/animations/CloudyAnimation";
import MistAnimation from "@/components/animations/MistAnimation";

import "./weather-app.css";
import { useGetWeatherData } from "@/api/getWeatherData";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { mutateAsync } = useGetWeatherData();

  // Load weather for a default city on first load
  useEffect(() => {
    const getInitialWeather = async () => {
      setLoading(true);
      const data = await mutateAsync({ city: "New York" });
      setWeatherData(data);
      setLoading(false);
    };

    getInitialWeather();
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    const data = await mutateAsync({ city });
    if (data) {
      setWeatherData(data);
      toast.success(`Weather loaded for ${data.name}`);
    }
    setLoading(false);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const city = "";
        const { latitude, longitude } = position.coords;
        mutateAsync({ lat: latitude, long: longitude, city }).then((data) => {
          if (data) {
            setWeatherData(data);
            toast.success(`Weather loaded for your location: ${data.name}`);
          }
          setLoading(false);
        });
      },
      async (error) => {
        console.error("Error getting location:", error);
        const { long, city, lat } = await getLocationByIP();
        await mutateAsync({ city, lat, long }).then((data) => {
          if (data) {
            setWeatherData(data);
            setSearchTerm(city);
            toast.success(`Weather loaded for your location: ${data.name}`);
          }
          setLoading(false);
        });
        setLoading(false);
      }
    );
  };

  const currentWeatherEmotion =
    weatherEmotions[weatherData?.weather?.[0]?.main];

  return (
    <div
      className={`min-h-screen p-4 flex flex-col items-center relative ${currentWeatherEmotion?.gradient}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <WeatherAnimation condition={weatherData?.weather?.[0]?.main} />
      </div>
      <div className="relative z-10 w-full max-w-6xl">
        <header className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-center mb-8"
            style={{ fontFamily: "Poppins" }}
          >
            Sky Sense
          </h1>
          <SearchLocation
            onSearch={handleSearch}
            onUseCurrentLocation={handleUseCurrentLocation}
            className="mx-auto"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : weatherData ? (
          <div className="space-y-6 animate-fade-in">
            <WeatherCard weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
          </div>
        ) : (
          <div className="text-center p-12">
            <p className="text-xl text-muted-foreground">
              No weather data available. Try searching for a city.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;

function WeatherAnimation({ condition }: { condition: WeatherCondition }) {
  switch (condition) {
    case "Rain":
      return <RainAnimation />;
    case "Drizzle":
      return <DrizzleAnimation />;
    case "Snow":
      return <SnowAnimation />;
    case "Thunderstorm":
      return <ThunderstormAnimation />;
    case "Clear":
      return <SunnyAnimation />;
    case "Clouds":
      return <CloudyAnimation />;
    case "Atmosphere":
      return <MistAnimation />;
    default:
      return null;
  }
}

interface WeatherEmotion {
  gradient: string;
  animation: string;
}

const weatherEmotions: Record<WeatherCondition, WeatherEmotion> = {
  Clear: {
    gradient: "bg-gradient-to-b from-sky-400 via-sky-300 to-yellow-200",
    animation: "animate-float",
  },
  Clouds: {
    gradient: "bg-gradient-to-b from-slate-400 via-slate-300 to-slate-200",
    animation: "animate-float-slow",
  },
  Rain: {
    gradient: "bg-gradient-to-b from-cyan-600 via-cyan-400 to-emerald-200",
    animation: "animate-rain",
  },
  Drizzle: {
    gradient: "bg-gradient-to-b from-blue-500 via-blue-300 to-green-200",
    animation: "animate-drizzle",
  },
  Thunderstorm: {
    gradient: "bg-gradient-to-b from-slate-800 via-slate-600 to-purple-700",
    animation: "animate-flash",
  },
  Snow: {
    gradient: "bg-gradient-to-b from-slate-300 via-blue-100 to-white",
    animation: "animate-snow",
  },
  Atmosphere: {
    gradient: "bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200",
    animation: "animate-float-slow",
  },
};
