import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '~shared/config/muiTheme';

import type { PropsWithChildren } from 'react';

export default function ThemeProvider({ children }: PropsWithChildren) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
