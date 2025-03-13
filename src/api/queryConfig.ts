import { AxiosError } from "axios";
import { PromiseValue } from "type-fest";

import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 2,
    useErrorBoundary: true,
  },
};

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  PromiseValue<ReturnType<FnType>>;
