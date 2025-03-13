export function formatTime(timestamp: number, timezone: number): string {
  // Convert timestamp to milliseconds and adjust for timezone
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(timestamp: number, timezone: number): string {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
