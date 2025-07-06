import { Sun, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react";

const WeatherIcon = ({
  icon,
  size = "w-8 h-8",
}: {
  icon: string;
  size?: string;
}) => {
  const iconMap = {
    sunny: <Sun className={`${size} text-yellow-500`} />,
    "partly-cloudy": <Cloud className={`${size} text-gray-400`} />,
    cloudy: <Cloud className={`${size} text-gray-500`} />,
    rain: <CloudRain className={`${size} text-blue-500`} />,
    snow: <CloudSnow className={`${size} text-blue-200`} />,
    storm: <Zap className={`${size} text-purple-500`} />,
  };
  return (
    iconMap[icon as keyof typeof iconMap] || (
      <Sun className={`${size} text-yellow-500`} />
    )
  );
};

export default WeatherIcon;
