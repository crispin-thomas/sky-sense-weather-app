import { useMutation } from "@tanstack/react-query";

import { WeatherData } from "@/types/weather";
import { axios } from "./axios";
import { ExtractFnReturnType } from "./queryConfig";

type Props = {
  city?: string;
  lat?: number;
  long?: number;
};

export const getWeatherData = ({
  city,
  lat,
  long,
}: Props): Promise<WeatherData> => {
  return axios
    .get(`weather`, { params: { q: city, lat, long } })
    .then((res) => res.data);
};

type MutationFnType = typeof getWeatherData;

export const useGetWeatherData = () => {
  return useMutation<ExtractFnReturnType<MutationFnType>, Error, Props>({
    mutationKey: ["getWeatherData"],
    mutationFn: (data) => getWeatherData(data),
  });
};
