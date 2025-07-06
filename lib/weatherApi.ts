import { WeatherDataProps } from "@/types/weather-dashboard";
import axios from "axios";

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getCoordinates(city: string) {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`
  );
  const data = response.data[0];
  return {
    lat: data.lat,
    lon: data.lon,
    country: data.country,
  };
}

export async function getCurrentWeather(lat: number, lon: number) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
  );
  return response.data;
}

export async function getForecast(lat: number, lon: number) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
  );
  return response.data;
}

export async function fetchWeatherData(
  city: string
): Promise<WeatherDataProps> {
  const coords = await getCoordinates(city);
  const current = await getCurrentWeather(coords.lat, coords.lon);
  const forecast = await getForecast(coords.lat, coords.lon);

  // Build hourly forecast
  const hourly = forecast.list.slice(0, 8).map((item: any) => ({
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    temp: item.main.temp,
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    condition: item.weather[0].main,
  }));

  // Build weekly forecast (simplified: take 1 item per day)
  const dailyMap = new Map<string, any>();

  forecast.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, item);
    }
  });

  const weekly = Array.from(dailyMap.values())
    .slice(0, 7)
    .map((item: any) => ({
      day: new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      minTemp: item.main.temp_min,
      maxTemp: item.main.temp_max,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      condition: item.weather[0].main,
    }));

  const data: WeatherDataProps = {
    current: {
      location: current.name,
      country: coords.country,
      flag: `https://flagsapi.com/${coords.country}/flat/64.png`,
      temperature: current.main.temp,
      feelsLike: current.main.feels_like,
      condition: current.weather[0].main,
      description: current.weather[0].description,
      minTemp: current.main.temp_min,
      maxTemp: current.main.temp_max,
      icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      windDirection: `${current.wind.deg}°`,
      pressure: current.main.pressure,
      visibility: current.visibility,
      uvIndex: 0, // UV index not available in free tier 😢
      sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString(),
    },
    hourly,
    weekly,
  };

  return data;
}

export async function fetchWeatherDataByCoords(
  lat: number,
  lon: number
): Promise<WeatherDataProps> {
  const current = await getCurrentWeather(lat, lon);
  const forecast = await getForecast(lat, lon);

  // Build hourly forecast
  const hourly = forecast.list.slice(0, 8).map((item: any) => ({
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    temp: item.main.temp,
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    condition: item.weather[0].main,
  }));

  // Build weekly forecast (simplified: take 1 item per day)
  const dailyMap = new Map<string, any>();

  forecast.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, item);
    }
  });

  const weekly = Array.from(dailyMap.values())
    .slice(0, 7)
    .map((item: any) => ({
      day: new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      minTemp: item.main.temp_min,
      maxTemp: item.main.temp_max,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      condition: item.weather[0].main,
    }));

  const data: WeatherDataProps = {
    current: {
      location: current.name,
      country: current.sys.country,
      flag: `https://flagsapi.com/${current.sys.country}/flat/64.png`,
      temperature: current.main.temp,
      feelsLike: current.main.feels_like,
      condition: current.weather[0].main,
      description: current.weather[0].description,
      minTemp: current.main.temp_min,
      maxTemp: current.main.temp_max,
      icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      windDirection: `${current.wind.deg}°`,
      pressure: current.main.pressure,
      visibility: current.visibility,
      uvIndex: 0, // UV index not available in free tier 😢
      sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString(),
    },
    hourly,
    weekly,
  };

  return data;
}
