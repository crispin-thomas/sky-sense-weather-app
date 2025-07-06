import { MapPin } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import WeatherDetails from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";
import { WeatherDataProps } from "@/types/weather-dashboard";


interface MainWeatherCardProps {
  isDark: boolean
  data: WeatherDataProps
  convertTemp: (temp: number) => number
  tempUnit: "C" | "F"
  setTempUnit: React.Dispatch<React.SetStateAction<"C" | "F">>
}

const MainWeatherCard: React.FC<MainWeatherCardProps> = ({ isDark, data, convertTemp, tempUnit, setTempUnit }) => {
  return (
    <Card
      className={`mb-8 ${isDark ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"} backdrop-blur-md text-white transition-all duration-300`}
    >
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Weather */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span className="text-xl font-semibold">
                {data.current.location}, {data.current.country}
              </span>
              <img src={data.current.flag} className="w-8 h-8" alt={data.current.country} />
            </div>

            <div className="flex items-center gap-6">
              <div className="text-6xl font-light">
                {convertTemp(data.current.temperature)}°<span className="text-2xl ml-1">{tempUnit}</span>
              </div>
              <WeatherIcon icon={data.current.icon} size="w-16 h-16" />
            </div>

            <div>
              <p className="text-xl font-medium">{data.current.condition}</p>
              <p className="text-white/80">{data.current.description}</p>
            </div>

            <div className="flex gap-4">
              <Button
                variant={tempUnit === "C" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTempUnit("C")}
                className={`${isDark ? "bg-white/10 hover:bg-white/20" : "bg-white/20 hover:bg-white/30"} transition-colors`}
              >
                °C
              </Button>
              <Button
                variant={tempUnit === "F" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTempUnit("F")}
                className={`${isDark ? "bg-white/10 hover:bg-white/20" : "bg-white/20 hover:bg-white/30"} transition-colors`}
              >
                °F
              </Button>
            </div>

            <div className="flex gap-4 text-sm">
              <span>
                Feels like {convertTemp(data.current.feelsLike)}°{tempUnit}
              </span>
              <span>•</span>
              <span>H: {convertTemp(data.current.maxTemp)}°</span>
              <span>L: {convertTemp(data.current.minTemp)}°</span>
            </div>
          </div>

          {/* Weather Details */}
          <WeatherDetails data={data} isDark={isDark} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MainWeatherCard;
