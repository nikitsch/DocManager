import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import { DeleteFileIcon } from '../custom-icons';

import type { FC } from 'react';
import type { CardProps } from '@mui/material/Card';

interface IFilesShowcaseProps extends CardProps {
  field: string;
}

const FilesShowcase: FC<IFilesShowcaseProps> = (props) => {
  const { field } = props;

  const { getValues, setValue } = useFormContext();

  const files: File[] = getValues(field) || [];
  // const color = theme.palette[error ? 'error' : 'primary'].main;

  // const handleRemoveFile = (index: number) => {
  //   setFiles((prev) => prev.filter((_, i) => i !== index));
  // };
  const handleRemoveFile = (index: number) => {
    const value = files.filter((_, i) => i !== index);
    setValue(field, value);
  };

  const getFileExtension = (fileName: string) =>
    fileName.split('.').pop()?.toUpperCase();

  return (
    <Stack direction="row" gap={2} overflow='auto'>
      {files.map((file, index) => {
        const preview = file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null;

        return (
          <Card key={index} sx={{ width: 120, position: 'relative', flexShrink: 0 }}>
            {preview ? (
              <CardMedia
                component="img"
                height="100"
                image={preview}
                alt={file.name}
              />
            ) : (
              <CardContent
                sx={{
                  textAlign: 'center',
                  background: '#f0f0f0',
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle2">
                  {getFileExtension(file.name)}
                </Typography>
              </CardContent>
            )}
            <IconButton
              onClick={() => handleRemoveFile(index)}
              sx={{
                position: 'absolute',
                top: 5,
                right: 5,
              }}
            >
              <DeleteFileIcon />
            </IconButton>
          </Card>
        );
      })}
    </Stack>
  );
};

export default FilesShowcase;
