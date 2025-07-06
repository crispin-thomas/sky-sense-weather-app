export interface WeatherDataProps {
  current: {
    location: string;
    country: string;
    flag: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    description: string;
    minTemp: number;
    maxTemp: number;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    visibility: number;
    uvIndex: number;
    sunrise: string;
    sunset: string;
  };
  hourly: {
    time: string;
    temp: number;
    icon: string;
    condition: string;
  }[];
  weekly: {
    day: string;
    minTemp: number;
    maxTemp: number;
    icon: string;
    condition: string;
  }[];
}
