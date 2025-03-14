import type { MenuItemProps } from '@mui/material/MenuItem';

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
