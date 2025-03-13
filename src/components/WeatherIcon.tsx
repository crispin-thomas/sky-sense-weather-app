
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Cloudy,
  Wind,
  Snowflake 
} from "lucide-react";

interface WeatherIconProps {
  weatherCode: string;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ weatherCode, size = 64, className = "" }: WeatherIconProps) => {
  // Map weather icon codes to Lucide icons
  // OpenWeatherMap icon codes: https://openweathermap.org/weather-conditions
  const getIcon = () => {
    switch (weatherCode) {
      // Clear sky
      case "01d":
      case "01n":
        return <Sun size={size} className={`text-yellow-500 ${className}`} />;
      
      // Few clouds, scattered clouds
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return <Cloudy size={size} className={`text-gray-400 ${className}`} />;
      
      // Broken clouds, overcast
      case "04d":
      case "04n":
        return <Cloud size={size} className={`text-gray-500 ${className}`} />;
      
      // Shower rain
      case "09d":
      case "09n":
        return <CloudDrizzle size={size} className={`text-blue-400 ${className}`} />;
      
      // Rain
      case "10d":
      case "10n":
        return <CloudRain size={size} className={`text-blue-500 ${className}`} />;
      
      // Thunderstorm
      case "11d":
      case "11n":
        return <CloudLightning size={size} className={`text-purple-500 ${className}`} />;
      
      // Snow
      case "13d":
      case "13n":
        return <CloudSnow size={size} className={`text-blue-100 ${className}`} />;
      
      // Mist, fog, etc.
      case "50d":
      case "50n":
        return <CloudFog size={size} className={`text-gray-300 ${className}`} />;
      
      default:
        return <Cloudy size={size} className={className} />;
    }
  };

  return <div className="animate-pulse-slow">{getIcon()}</div>;
};

export default WeatherIcon;
