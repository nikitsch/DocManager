import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { useFormContext } from 'react-hook-form';
import FileExtension from './file-extension';
import ShowcaseActionButton from './showcase-action-button';
import {
  CustomShowcaseBox,
  CustomShowcaseCard,
  CustomShowcaseCardContentFileExtension,
  CustomShowcaseCardContentText,
} from './styles';
import { getFileExtension } from './helper/getFileExtension';
import { handlePreviewImage } from './helper/handlePreviewImage';
import { handleDownloadImage } from './helper/handleDownloadImage';
import { DeleteFileIcon, DownloadFileIcon, PreviewIcon } from '../custom-icons';

import type { FC } from 'react';
import type { CardProps } from '@mui/material/Card';

interface IFilesShowcaseProps extends CardProps {
  field: string;
  canDelete: boolean;
}

const SHOWCASE_BOX_CLASS_NAME = 'SHOWCASE_BOX_CLASS_NAME';

//TODO: Вынести логику наверх и оставить чисто UI компоненты
const FilesShowcase: FC<IFilesShowcaseProps> = (props) => {
  const { field, canDelete, ...restCardProps } = props;

  const { getValues, setValue } = useFormContext();

  const files: File[] = getValues(field) || [];

  const handleRemoveFile = (index: number) => {
    const value = files.filter((_, i) => i !== index);
    setValue(field, value);
  };

  return (
    <Stack direction="row" gap={1} overflow="auto">
      {files.map((file, index) => {
        const preview = file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null;
        const extension = getFileExtension(file.name);
        const isImage = file.type.startsWith('image/');

        return (
          <CustomShowcaseCard
            {...restCardProps}
            key={index}
            overlayClass={SHOWCASE_BOX_CLASS_NAME}
          >
            {preview ? (
              <CardMedia
                component="img"
                height="120"
                image={preview}
                alt={file.name}
                sx={{ padding: '8px 16px' }}
              />
            ) : (
              <CustomShowcaseCardContentFileExtension>
                <FileExtension extension={extension} />
              </CustomShowcaseCardContentFileExtension>
            )}
            <CustomShowcaseCardContentText
              style={{ paddingBottom: '8px' }} //* Interrupting the style of the mui CardContent component
            >
              {file.name}
            </CustomShowcaseCardContentText>

            <CustomShowcaseBox className={SHOWCASE_BOX_CLASS_NAME}>
              {isImage && (
                <ShowcaseActionButton
                  title="Preview"
                  onClick={() => handlePreviewImage(file)}
                >
                  <PreviewIcon />
                </ShowcaseActionButton>
              )}
              <ShowcaseActionButton
                title={canDelete ? 'Delete' : 'Download'}
                onClick={() => {
                  if (canDelete) {
                    handleRemoveFile(index);
                  } else {
                    handleDownloadImage(file);
                  }
                }}
              >
                {canDelete ? (
                  <DeleteFileIcon />
                ) : (
                  <DownloadFileIcon color="primary" />
                )}
              </ShowcaseActionButton>
            </CustomShowcaseBox>
          </CustomShowcaseCard>
        );
      })}
    </Stack>
  );
};

export default FilesShowcase;
