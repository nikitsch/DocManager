import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

export const CustomShowcaseActionButton = styled(IconButton)(() => ({
  scale: 0.9,
  '&:hover': {
    scale: 1,
  },
  transition: 'scale 0.3s',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
}));
