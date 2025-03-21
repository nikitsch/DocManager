import type { MenuItemProps } from '@mui/material/MenuItem';
import type {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { ApiError } from '~features/api/model/ApiError';

export type SelectOption = {
  value: MenuItemProps['value'];
  label: string;
  icon?: JSX.Element;
};

export type FileForm = {
  id: string;
  file: File;
  preview: string | null;
};

export type QueryOptionsType<
  T = unknown,
  E = Error | ApiError,
  S = T,
  K extends QueryKey = readonly unknown[]
> = Omit<UseQueryOptions<T, E, S, K>, 'queryKey' | 'queryFn'>;

export type MutationOptionsType<
  T = unknown,
  V = void,
  E = Error | ApiError,
  C = unknown
> = Omit<UseMutationOptions<T, E, V, C>, 'mutationFn'>;
