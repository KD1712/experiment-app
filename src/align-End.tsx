import { Box, Typography, Link } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const End = () => {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Box sx={{ textAlign: "center", mt: 30 }}>
      {/* <Typography variant="h2" component="h1" gutterBottom>
        Thank You!
      </Typography> */}
      <Typography variant="h5" >
        You have completed the task. Thanks for participating.
      </Typography>
      <Typography variant="h5" sx={{mt:3}}>
        <b>IMPORTANT:</b>
        <Link
          href="https://www.google.com/"
          color="primary"
          underline="none"
          sx={{ cursor: "pointer" }}
        >
          Click here to return to Prolific and receive your money.
        </Link>
      </Typography>

      {/* <Button
        variant="contained"
        sx={{ mt: 3, fontWeight:700 }}
        color="primary"
        size="large"
        onClick={() => (window.location.href = "/alignment/")}
      >
        Restart
      </Button> */}
    </Box>
  );
};

export default End;
