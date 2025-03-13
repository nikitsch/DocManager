import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

export const CustomShowcaseCard = styled(Card)<{ overlayclass: string }>(
  ({ overlayclass }) => ({
    width: 120,
    position: 'relative',
    flexShrink: 0,
    overflow: 'hidden',
    '&:hover': {
      [`.${overlayclass}`]: {
        opacity: 1,
      },
    },
    boxShadow: 'none',
  })
);
export const CustomShowcaseCardContentFileExtension = styled(CardContent)(
  () => ({
    textAlign: 'center',
    height: 120,
    padding: '8px 16px',
  })
);

export const CustomShowcaseCardContentText = styled(CardContent)(() => ({
  textAlign: 'center',
  fontSize: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingTop: 0,
  paddingX: 1,
}));

export const CustomShowcaseBox = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  opacity: 0, //* Hidden by default
  transition: 'opacity 0.3s',
}));
