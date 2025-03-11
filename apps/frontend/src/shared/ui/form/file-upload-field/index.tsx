import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Controller, useFormContext } from 'react-hook-form';
import { UploadFileIcon } from '~shared/ui/custom-icons';
import { validationRules } from '~shared/model/validation/validationRules';

import type { FC } from 'react';
import type { IconButtonOwnProps } from '@mui/material/IconButton';

interface IFormFileUploadFieldProps extends Pick<IconButtonOwnProps, 'size'> {
  name: string;
  required?: boolean;
  multiple?: boolean;
}

const FILE_INPUT_ID = 'file-input';

const FormFileUploadField: FC<IFormFileUploadFieldProps> = (props) => {
  const { name, required = false, multiple = true, size = 'large' } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules(required)}
      render={({ field }) => (
        <>
          <input
            type="file"
            id={FILE_INPUT_ID}
            multiple={multiple}
            onChange={(event) => {
              const prevValue = field.value || [];
              const files = Array.from(event.target.files || []);
              field.onChange([...prevValue, ...files]);
            }}
            style={{ display: 'none' }}
          />
          <label htmlFor={FILE_INPUT_ID}>
            <Tooltip title="Upload file">
              <IconButton component="span" size={size}>
                <UploadFileIcon color={error ? 'error' : 'primary'} />
              </IconButton>
            </Tooltip>
          </label>
        </>
      )}
    />
  );
};

export default FormFileUploadField;
