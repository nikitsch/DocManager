import { LocalizationProvider as XDatePickersLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import type { PropsWithChildren } from 'react';

export default function LocalizationProvider({ children }: PropsWithChildren) {
  return (
    <XDatePickersLocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </XDatePickersLocalizationProvider>
  );
}
