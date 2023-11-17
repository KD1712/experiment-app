import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";

const Welcome2 = () => {
  const theme = useTheme();

  const [prolific_pid, setProlific_Pid]: any = useState("");
  const [study_id, setStudy_Id]: any = useState("");
  const [session_id, setSession_Id]: any = useState("");

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id1 = queryParams.get("prolific_pid");
    const id2 = queryParams.get("prolific_session_id");
    const id3 = queryParams.get("prolific_study_id");

    setProlific_Pid(id1);
    setStudy_Id(id2);
    setSession_Id(id3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: { xs: 1, sm: 1, md: 5, lg: 5 },
        mb: { xs: 1, sm: 1, md: 5, lg: 5 },
        pr: { xs: 2, sm: 2, md: 5, lg: 10 }, 
        pl: { xs: 2, sm: 2, md: 5, lg: 10 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          alignItems: "center",
          // fontSize: { xs: "22px", sm: "30px", md: "35px", lg: "40px" },
          fontSize: { xs: "20px", sm: "26px", md: "32px", lg: "40px" },
          mb: { md: 2, lg: 2 },
          fontWeight: "800",
        }}
        // component="h3"
      >
        Instructions - Please read carefully
      </Typography>
      <Typography
        variant="body1"
        // sx={{ fontSize: { xs: "15px", sm: "22px", md: "28px", lg: "20px" } }}
        sx={{ fontSize: { xs: "15px", sm: "22px", md: "28px", lg: "32px" } }}
      >
        Ethics statement and task description - Aesthetic survey
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "15px", sm: "22px", md: "28px", lg: "20px" },
          mb: { mb: 2, lg: 2 },
        }}
      >
        You are being invited to participate in a research study titled
        "Emotional Alignment of AI Systems".
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "15px", sm: "22px", md: "28px", lg: "20px" },
          mb: { mb: 2, lg: 2 },
        }}
      >
        <b>
          Your task is to look at each image carefully, and rate its aesthetic
          value.
        </b>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "15px", sm: "22px", md: "28px", lg: "20px" },
          mb: { mb: 2, lg: 2 },
        }}
      >
        This study is being done by Dr. James Lomas from the TU Delft. The
        purpose of this research study is to understand how well different AI
        systems can produce media that aligns with different human emotions. The
        study may take approximately 25 minutes to complete. The data will be
        used for benchmarking different AI systems, for scientific publication
        and for public communication. We will be asking you to rate some images.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "15px", sm: "22px", md: "28px", lg: "20px" },
          mb: { mb: 2, lg: 2 },
        }}
      >
        As with any online activity the risk of a breach is always possible. To
        the best of our ability your answers in this study will remain
        confidential. We will minimize any risks by collecting minimal personal
        information. We intend to make the data collected in this study open to
        analysis by other researchers. Your participation in this study is
        entirely voluntary and you can withdraw at any time. You are free to
        omit any questions. Responsible researcher: James Lomas,
        j.d.lomas@tudelft.nl
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "15px", sm: "22px", md: "22px", lg: "20px" },
          mb: { mb: 2, lg: 2 },
        }}
      >
        By clicking through this anonymous survey, you provide your informed
        consent to this statement.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          mb: 1,
          fontWeight: 700,
          fontSize: { xs: "15px", sm: "22px", md: "22px", lg: "20px" },
          width: { md: "auto" },
        }}
        color="success"
        size="large"
        // onClick={() => (window.location.href = "/alignment/form")}
        to="/aesthetic/form"
        component={Link}
        state={{
          eventtype: "survey_start",
          sessionid: uuidv4(),
          prolific_pid: prolific_pid,
          prolific_study_id: study_id,
          prolific_session_id: session_id,
          app_load_timestamp: new Date().toLocaleTimeString(),
          ui_type: "rating_1_10",
          experiment_condition: "aesthetic",
        }}
      >
        Agree and Begin
      </Button>
    </Box>
  );
};

export default Welcome2;
