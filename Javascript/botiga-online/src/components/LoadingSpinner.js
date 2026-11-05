import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;