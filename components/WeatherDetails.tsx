import { WeatherDataProps } from "@/types/weather-dashboard";
import { Droplets, Eye, Gauge, Sunrise, Sunset, Wind } from "lucide-react";
import React from "react";

interface WeatherDetailsProps {
    isDark: boolean
    data: WeatherDataProps

}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ isDark, data }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div
                className={`${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 backdrop-blur-sm transition-colors`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm text-white/80">Humidity</span>
                </div>
                <span className="text-2xl font-semibold">{data.current.humidity}%</span>
            </div>

            <div
                className={`${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 backdrop-blur-sm transition-colors`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-4 h-4" />
                    <span className="text-sm text-white/80">Wind</span>
                </div>
                <span className="text-2xl font-semibold">{data.current.windSpeed}</span>
                <span className="text-sm ml-1">km/h {data.current.windDirection}</span>
            </div>

            <div
                className={`${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 backdrop-blur-sm transition-colors`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4" />
                    <span className="text-sm text-white/80">Pressure</span>
                </div>
                <span className="text-2xl font-semibold">{data.current.pressure}</span>
                <span className="text-sm ml-1">hPa</span>
            </div>

            <div
                className={`${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 backdrop-blur-sm transition-colors`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm text-white/80">Visibility</span>
                </div>
                <span className="text-2xl font-semibold">{data.current.visibility}</span>
                <span className="text-sm ml-1">km</span>
            </div>

            <div
                className={`${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 backdrop-blur-sm transition-colors`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Sunrise className="w-4 h-4" />
                    <span className="text-sm text-white/80">Sunrise</span>
                </div>
                <span className="text-lg font-semibold">{data.current.sunrise}</span>
            </div>

            <div
                className={`${isDark ? "bg-white/5" : "bg-white/10"} rounded-lg p-4 backdrop-blur-sm transition-colors`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Sunset className="w-4 h-4" />
                    <span className="text-sm text-white/80">Sunset</span>
                </div>
                <span className="text-lg font-semibold">{data.current.sunset}</span>
            </div>
        </div>
    );
};

export default WeatherDetails;
