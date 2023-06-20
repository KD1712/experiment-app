import { Box, Typography, Button } from '@mui/material';

const End = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 40 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Survey completed.
      </Typography>
      <Button variant="contained" sx={{mt:3}} color="primary" size="large" onClick={() => window.location.href = '/'}>
        Restart
      </Button>
    </Box>
  );
};

export default End;
