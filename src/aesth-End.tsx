import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const End2 = () => {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Box sx={{ textAlign: "center", mt: 30 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Survey completed.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, fontWeight:700 }}
        color="primary"
        size="large"
        onClick={() => (window.location.href = "/alignment/")}
      >
        Restart
      </Button>
    </Box>
  );
};

export default End2;
