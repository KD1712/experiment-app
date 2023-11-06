import { Box, Button, Typography } from "@mui/material";

const Welcome2 = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 20 ,pr:35, pl:35}}>
      <Typography variant="h4" sx={{mb:3, fontWeight:'800'}} component="h1" gutterBottom>
        Ethics statement and task description - Alignment survey
      </Typography>
      <Typography variant="body1" gutterBottom>
        You are being invited to participate in a research study titled
        "Emotional Alignment of AI Systems".
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>
          Your task is to look at the image or read the story, and read the
          description text given below it. Then, your task is to provide a
          rating about how well the image/story corresponds or aligns to that
          description text.
        </b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        This study is being done by Dr. James Lomas from the TU Delft. The
        purpose of this research study is to understand how well different AI
        systems can produce media that aligns with different human emotions. The
        study may take approximately 25 minutes to complete. The data will be
        used for benchmarking different AI systems, for scientific publication
        and for public communication. We will be asking you to rate some images.
      </Typography>
      <Typography variant="body1" gutterBottom>
        As with any online activity the risk of a breach is always possible. To
        the best of our ability your answers in this study will remain
        confidential. We will minimize any risks by collecting minimal personal
        information. We intend to make the data collected in this study open to
        analysis by other researchers. Your participation in this study is
        entirely voluntary and you can withdraw at any time. You are free to
        omit any questions. Responsible researcher: James Lomas,
        j.d.lomas@tudelft.nl
      </Typography>
      <Typography variant="body1" sx={{mt:4}} gutterBottom>By clicking through this anonymous survey, you provide your informed
        consent to this statement.</Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, fontWeight: 700 }}
        color="success"
        size="large"
        onClick={() => (window.location.href = "/aesthetic/form")}
      >
        Agree and Begin
      </Button>
    </Box>
  );
};

export default Welcome2;
