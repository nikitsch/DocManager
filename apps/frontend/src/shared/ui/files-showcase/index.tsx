import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { FileForm } from '~shared/model/type';
import { getFileExtension } from '~shared/model/helper/fileExtension';
import FileExtension from './file-extension';
import ShowcaseActionButton from './showcase-action-button';
import {
  CustomShowcaseBox,
  CustomShowcaseCard,
  CustomShowcaseCardContentFileExtension,
  CustomShowcaseCardContentText,
} from './styles';
import { DeleteFileIcon, DownloadFileIcon, PreviewIcon } from '../custom-icons';

import type { FC } from 'react';
import type { CardProps } from '@mui/material/Card';

interface IFilesShowcaseProps extends CardProps {
  files: FileForm[] | null;
  onRemoveFile?: (deletedId: string) => void;
  onDownloadFile?: (file: File) => void;
}

const SHOWCASE_BOX_CLASS_NAME = 'SHOWCASE_BOX_CLASS_NAME';

//TODO: для просмотра
// const onDownloadFile = (file: File) => {
//   const url = URL.createObjectURL(file);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = file.name;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url); //* Clearing memory
// };

const FilesShowcase: FC<IFilesShowcaseProps> = (props) => {
  const { files, onRemoveFile, onDownloadFile, ...restCardProps } = props;

  if (!files?.length) {
    return null;
  }

  return (
    <Stack direction="row" gap={1} overflow="auto">
      {files.map(({ id, file, preview }) => (
        <CustomShowcaseCard
          {...restCardProps}
          key={id}
          overlayclass={SHOWCASE_BOX_CLASS_NAME}
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
              <FileExtension extension={getFileExtension(file.name)} />
            </CustomShowcaseCardContentFileExtension>
          )}

          <CustomShowcaseCardContentText
            style={{ paddingBottom: '8px' }} //* Interrupting the style of the mui CardContent component
          >
            {file.name}
          </CustomShowcaseCardContentText>

          <CustomShowcaseBox className={SHOWCASE_BOX_CLASS_NAME}>
            {preview && (
              <ShowcaseActionButton
                title="Preview"
                icon={<PreviewIcon />}
                onClick={() => window.open(preview, '_blank')}
              />
            )}
            {onRemoveFile && (
              <ShowcaseActionButton
                title="Delete"
                icon={<DeleteFileIcon />}
                onClick={() => onRemoveFile(id)}
              />
            )}
            {onDownloadFile && (
              <ShowcaseActionButton
                title="Download"
                icon={<DownloadFileIcon color="primary" />}
                onClick={() => onDownloadFile(file)}
              />
            )}
          </CustomShowcaseBox>
        </CustomShowcaseCard>
      ))}
    </Stack>
  );
};

export default FilesShowcase;
