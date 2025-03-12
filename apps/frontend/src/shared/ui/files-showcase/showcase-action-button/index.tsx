import Tooltip from '@mui/material/Tooltip';
import { CustomShowcaseActionButton } from './styles';

import type { FC, PropsWithChildren } from 'react';

interface IShowcaseActionButtonProps extends PropsWithChildren {
  title: string;
  onClick: () => void;
}

const ShowcaseActionButton: FC<IShowcaseActionButtonProps> = (props) => {
  const { title, children, onClick } = props;

  return (
    <Tooltip placement="top-end" title={`${title} file`}>
      <CustomShowcaseActionButton
        key={title}
        aria-label={`${title.toLowerCase()}-file`}
        style={{ backgroundColor: '#FFFFFF' }} //* Interrupting the style of the mui CardContent component
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {children}
      </CustomShowcaseActionButton>
    </Tooltip>
  );
};

export default ShowcaseActionButton;
