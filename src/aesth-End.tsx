import { Box, Typography, Button, Link } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const End2 = () => {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Box sx={{ textAlign: "center", mt: 30 }}>
      <Typography variant="h5" >
        You have completed the task. Thanks for participating.
      </Typography>
      <Typography variant="h5" sx={{mt:3}}>
        <b>IMPORTANT: </b>
        <Link
          href="https://prolific.co"
          color="primary"
          underline="none"
          sx={{ cursor: "pointer" }}
        >
          Click here to return to Prolific and receive your money.
        </Link>
      </Typography>
    </Box>
  );
};

export default End2;
