
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WeatherData } from "@/types/weather";
import WeatherIcon from "./WeatherIcon";
import { formatDate } from "@/utils";
import { cn } from "@/lib/utils";
import { Thermometer } from "lucide-react";

interface WeatherCardProps {
  weatherData: WeatherData;
  className?: string;
}

const WeatherCard = ({ weatherData, className }: WeatherCardProps) => {
  const weatherCondition = weatherData.weather[0];
  const mainTemp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  
  // Get background color based on temperature
  const getTemperatureColor = (temp: number): string => {
    if (temp < 5) return "from-blue-500 to-blue-300";
    if (temp < 15) return "from-blue-400 to-cyan-300";
    if (temp < 25) return "from-cyan-400 to-yellow-200";
    return "from-orange-400 to-yellow-200";
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className={`bg-gradient-to-b ${getTemperatureColor(mainTemp)}`}>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{weatherData.name}</h2>
              <p className="text-sm text-white/80">{weatherData.sys.country}, {formatDate(weatherData.dt, weatherData.timezone)}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 pb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center">
              <WeatherIcon 
                weatherCode={weatherCondition.icon} 
                size={80} 
                className="text-white"
              />
              <div className="ml-4">
                <div className="text-5xl font-bold text-white">{mainTemp}°C</div>
                <div className="flex items-center text-white/80">
                  <Thermometer className="h-4 w-4 mr-1" />
                  <span>Feels like {feelsLike}°C</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 text-center lg:text-right">
              <div className="text-xl font-semibold text-white capitalize">
                {weatherCondition.description}
              </div>
              <div className="text-sm text-white/80">
                Min: {Math.round(weatherData.main.temp_min)}°C | 
                Max: {Math.round(weatherData.main.temp_max)}°C
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default WeatherCard;
