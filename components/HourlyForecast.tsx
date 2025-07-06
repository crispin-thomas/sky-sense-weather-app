import React from "react";
import WeatherIcon from "./WeatherIcon";
import { Card, CardContent } from "./ui/card";
import { WeatherDataProps } from "@/types/weather-dashboard";

interface HourlyForecastProps {
    isDark: boolean
    data: WeatherDataProps
    convertTemp: (temp: number) => number
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ isDark, data, convertTemp }) => {
    return (
        <Card
            className={`mb-8 ${isDark ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"} backdrop-blur-md text-white transition-all duration-300`}
        >
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {data.hourly.map((hour, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 text-center ${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 min-w-[100px]`}
                        >
                            <p className="text-sm text-white/80 mb-2">{hour.time}</p>
                            <div className="flex justify-center mb-2">
                                <WeatherIcon icon={hour.icon} size="w-6 h-6" />
                            </div>
                            <p className="font-semibold">{convertTemp(hour.temp)}°</p>
                            <p className="text-xs text-white/70 mt-1">{hour.condition}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

    );
};

export default HourlyForecast;
