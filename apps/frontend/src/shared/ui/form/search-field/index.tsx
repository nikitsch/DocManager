import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {
  IconButton,
  InputAdornment,
  outlinedInputClasses,
} from '@mui/material';
import { CrossIcon, SearchIcon } from '~shared/ui/CustomIcons';

import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

export interface IFormSearchFieldProps
  extends Omit<TextFieldProps, 'type' | 'name'> {
  onClickClear: () => void;
}

const FormSearchField: FC<IFormSearchFieldProps> = (props) => {
  const {
    fullWidth = true,
    size = 'small',
    onClickClear,
    ...searchFieldProps
  } = props;
  const { register, watch, setValue } = useFormContext();

  const name = 'search';
  const searchValue = watch(name);

  const handleClear = () => {
    onClickClear();
    setValue(name, '');
  };

  return (
    <TextField
      {...searchFieldProps}
      id={name}
      type="text"
      fullWidth={fullWidth}
      size={size}
      sx={{
        // minWidth: '268px',
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          // borderColor: {theme.palette.primary.main},
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start" size="small" type="submit">
                <SearchIcon color="primary" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClear}
              disablePointerEvents={!searchValue}
            >
              <IconButton edge="end" size="small">
                <CrossIcon color={searchValue ? 'primary' : 'disabled'} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...register(name)}
    />
  );
};

export default FormSearchField;
