import { Box, Typography, Link } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const  End = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const Data = {
    ...state,
    survey_end_timestamp: new Date().toISOString(),
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendSessionDataToDB = async () => {
    const formData = {
      log_type: "session",
      logData: {
        ...state,
        survey_end_timestamp: new Date().toISOString(),
      },
    };

    try {
      const apiUrl =
        // "https://3t64257wlvbsa7tjwimcusywtq0pfljx.lambda-url.ap-south-1.on.aws/";
        "https://vh65jiyys2.execute-api.ap-south-1.amazonaws.com/default/ui-experiment-app-logger"

      const response = await axios.post(apiUrl, formData);

      if (response.status === 200) {
        console.log("Data sent");
        // navigate("/alignment/question", { state: { formData } });
      } else {
        console.error("Error:", response.statusText);
        // navigate("/alignment/question", { state: { formData } });
      }
    } catch (error) {
      console.error("Error:", error);
      // navigate("/alignment/question", { state: formData.logData });
    }
  };
  useEffect(() => {
    sendSessionDataToDB()
    console.log(Data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ textAlign: "center", mt: 30 }}>
      {/* <Typography variant="h2" component="h1" gutterBottom>
        Thank You!
      </Typography> */}
      <Typography variant="h5">
        You have completed the task. Thanks for participating.
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        <b>IMPORTANT: </b>
        <Link
          href="https://app.prolific.com/submissions/complete?cc=C77UBIPG"
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
