
import { Card } from "@/components/ui/card";
import { 
  Droplets, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset, 
  Wind 
} from "lucide-react";
import { WeatherData } from "@/types/weather";
import { formatTime } from "@/utils";

interface WeatherDetailsProps {
  weatherData: WeatherData;
  className?: string;
}

const WeatherDetails = ({ weatherData, className }: WeatherDetailsProps) => {
  return (
    <Card className={`p-4 grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-md">
        <div className="flex items-center mb-1 text-muted-foreground">
          <Droplets className="h-4 w-4 mr-1" />
          <span className="text-sm">Humidity</span>
        </div>
        <span className="text-xl font-medium">{weatherData.main.humidity}%</span>
      </div>
      
      <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-md">
        <div className="flex items-center mb-1 text-muted-foreground">
          <Wind className="h-4 w-4 mr-1" />
          <span className="text-sm">Wind Speed</span>
        </div>
        <span className="text-xl font-medium">{weatherData.wind.speed} m/s</span>
      </div>
      
      <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-md">
        <div className="flex items-center mb-1 text-muted-foreground">
          <Gauge className="h-4 w-4 mr-1" />
          <span className="text-sm">Pressure</span>
        </div>
        <span className="text-xl font-medium">{weatherData.main.pressure} hPa</span>
      </div>
      
      <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-md">
        <div className="flex items-center mb-1 text-muted-foreground">
          <Eye className="h-4 w-4 mr-1" />
          <span className="text-sm">Visibility</span>
        </div>
        <span className="text-xl font-medium">{(weatherData.visibility / 1000).toFixed(1)} km</span>
      </div>
      
      <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-md">
        <div className="flex items-center mb-1 text-muted-foreground">
          <Sunrise className="h-4 w-4 mr-1" />
          <span className="text-sm">Sunrise</span>
        </div>
        <span className="text-xl font-medium">
          {formatTime(weatherData.sys.sunrise, weatherData.timezone)}
        </span>
      </div>
      
      <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-md">
        <div className="flex items-center mb-1 text-muted-foreground">
          <Sunset className="h-4 w-4 mr-1" />
          <span className="text-sm">Sunset</span>
        </div>
        <span className="text-xl font-medium">
          {formatTime(weatherData.sys.sunset, weatherData.timezone)}
        </span>
      </div>
    </Card>
  );
};

export default WeatherDetails;
