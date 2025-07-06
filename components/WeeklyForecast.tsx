import React from "react";
import WeatherIcon from "./WeatherIcon";
import { Card, CardContent } from "./ui/card";
import { WeatherDataProps } from "@/types/weather-dashboard";

interface WeeklyForecastProps {
    isDark: boolean
    data: WeatherDataProps
    convertTemp: (temp: number) => number
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ convertTemp, data, isDark }) => {
    return (
        <Card
            className={`bg-white/10 backdrop-blur-md border-white/20 text-white ${isDark ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"} transition-all duration-300`}
        >
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
                <div className="space-y-3">
                    {data.weekly.map((day, index) => (
                        <div
                            key={index}
                            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-2 sm:gap-0 ${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg`}
                        >
                            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                                <span className="font-medium w-16 sm:w-20 text-sm sm:text-base">{day.day}</span>
                                <WeatherIcon icon={day.icon} size="w-5 h-5 sm:w-6 sm:h-6" />
                                <span className="text-white/80 flex-1 text-sm sm:text-base">{day.condition}</span>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                <span className="text-white/70 text-sm sm:text-base">{convertTemp(day.minTemp)}°</span>
                                <div className="w-12 sm:w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
                                        style={{ width: `${((day.maxTemp - day.minTemp) / 15) * 100}%` }}
                                    />
                                </div>
                                <span className="font-semibold text-sm sm:text-base">{convertTemp(day.maxTemp)}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default WeeklyForecast;
