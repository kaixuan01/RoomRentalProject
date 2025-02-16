import { Dialog, styled } from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: theme.spacing(2),
  },
  zIndex: 50,
}));

export default StyledDialog;