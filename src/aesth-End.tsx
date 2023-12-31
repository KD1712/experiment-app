import { Box, Typography, Link } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SendSessionDataToDB2 } from "./api/api";

const End2 = () => {
  const { state } = useLocation();

  const checkSessionOnReload = window.performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[];
  const finalData = {
    ...state,
    survey_end_timestamp: new Date().toISOString(),
  };
  useEffect(() => {
    const checkPageRefresh = () => {
      if (
        checkSessionOnReload.length > 0 &&
        checkSessionOnReload[0].type === "reload"
      ) {
        window.location.href = "/aesthetic";
      }
    };

    checkPageRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    SendSessionDataToDB2(finalData);
    console.log(finalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Box sx={{ textAlign: "center", mt: 30 }}>
      <Typography variant="h5">
        You have completed the task. Thanks for participating.
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        <b>IMPORTANT: </b>
        <Link
          href="https://app.prolific.com/submissions/complete?cc=CSA9PSQU"
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
