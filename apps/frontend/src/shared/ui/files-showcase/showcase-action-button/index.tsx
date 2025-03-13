import Tooltip from '@mui/material/Tooltip';
import { CustomShowcaseActionButton } from './styles';

import type { FC } from 'react';

interface IShowcaseActionButtonProps {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

const ShowcaseActionButton: FC<IShowcaseActionButtonProps> = (props) => {
  const { title, icon, onClick } = props;

  return (
    <Tooltip placement="top-end" title={`${title} file`}>
      <CustomShowcaseActionButton
        key={title}
        aria-label={`${title.toLowerCase()}-file`}
        style={{ backgroundColor: '#FFFFFF' }} //* Interrupting the style of the mui IconButton component
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {icon}
      </CustomShowcaseActionButton>
    </Tooltip>
  );
};

export default ShowcaseActionButton;
