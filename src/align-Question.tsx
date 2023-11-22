import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import { SendItemDataToDB } from "./api/api";
import { imageNames, questionArrayCreation } from "./align-QueGenerator";
const questions = questionArrayCreation();
const extractEmotionName = (imageName: string): string => {
  if (imageName) {
    const match = imageName.startsWith("gpt3-")
      ? imageName.match(/the emotion(.+?) - \d+\.txt\.webp/i)
      : imageName.match(/the emotion (.+?)-\d+\.webp/i);

    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return "Unknown";
};

// const questions: any = [];

// const questionArrayCreation = () => {
//   let N = 10;
//   let numbers = [];
//   for (let i = 1; i <= N; i++) {
//     numbers.push(i);
//   }
//   for (let i = N - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     let temp: any = numbers[i];
//     numbers[i] = numbers[j];
//     numbers[j] = temp;
//   }
//   for (let i = 0; i < N; i++) {
//     const question = {
//       id: i + 1,
//       image: `/assets/${numbers[i]}.jpg`,
//     };
//     questions.push(question);
//   }
// };

//random no. without permutation

//array - []
//shuffle = random permutation

//1 2 3 4 5 6 7 8
//8*7*6*5*4*3*2*1
//1-60
//3-60

const Question = () => {
  const theme = useTheme();
  const { state } = useLocation();

  // const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [responses, setResponses] = useState<
    Array<{
      // sessionid: string;
      itemtype: string;
      itemnumber: number;
      reaction_time: number;
      rating_value: number;
      image_filename: string;
    }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion]: any = useState({});
  const [stepNo, setStepNo]: any = useState(0);
  const [imageLoadStartTime, setImageLoadStartTime] = useState(0);
  const [preloadingComplete, setPreloadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagePreloadTime, setImagePreloadTime] = useState("");

  const imageRef = useRef<HTMLImageElement | null>(null);
  // const [ratingcondition, setRatingCondition]: any = useState("");

  const navigate = useNavigate();

  const checkSessionOnReload = window.performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[];
  useEffect(() => {
    const checkPageRefresh = () => {
      // const navigationEntries = performance.getEntriesByType(
      //   "navigation"
      // ) as PerformanceNavigationTiming[];

      if (
        checkSessionOnReload.length > 0 &&
        checkSessionOnReload[0].type === "reload"
      ) {
        // console.log(checkSessionOnReload[0].type);
        // console.log(performance.getEntriesByType("navigation"));
        // setRefreshSession(uuidv4());
        window.location.href = "/alignment";
        // console.log(newSession)
      }
    };
    checkPageRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    questionArrayCreation();
    console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (timer === 0) {
  //     navigate("/alignment/endForm", { state: { ...state, ...responses } });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [timer]);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        const newStep = stepNo + 1;
        setStepNo(newStep);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [stepNo]);
  useEffect(() => {
    if (imageRef.current && !imageLoadStartTime) {
      const startImageLoadTime = Date.now();
      setImageLoadStartTime(startImageLoadTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);
  const preloadImages = (imageUrls: any) => {
    const startTime = new Date().toISOString();
    setImagePreloadTime(startTime);
    let loadedCount = 0;

    const checkAllImagesLoaded = () => {
      loadedCount++;

      if (loadedCount === imageUrls.length) {
        // const endTime = performance.now();
        // const totalTime = endTime - startTime;
        // console.log(`Preloading took ${totalTime} milliseconds`);

        // Set preloadingComplete to true and progress to 100 when loading is complete
        setPreloadingComplete(true);
        // setProgress(100);
        setProgress((loadedCount / imageUrls.length) * 100);
      } else {
        // Update progress based on the number of loaded images
        const newProgress = (loadedCount / imageUrls.length) * 100;
        setProgress(newProgress);
      }
    };

    imageUrls.forEach((imageUrl: any) => {
      const img = new Image();
      img.src = `https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${imageUrl}`;
      img.onload = checkAllImagesLoaded;
      img.onerror = checkAllImagesLoaded;
    });
  };
  useEffect(() => {
    preloadImages(imageNames);
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      navigate("/alignment/end", {
        state: {
          ...state,
          eventtype: "survey_end",
          // responses: responses,
          survey_image_preload_timestamp: imagePreloadTime,
        },
      });
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  function calculateProgress() {
    const answeredQuestions = currentQuestionIndex - 3;
    const totalQuestions = questions.length - 4;
    return (answeredQuestions / totalQuestions) * 100;
  }
  const handleImageLoad = () => {
    const startImageLoadTime = Date.now();
    setImageLoadStartTime(startImageLoadTime);
  };
  const handleRatingChange = (value: number) => {
    if (currentQuestionIndex < questions.length) {
      const currentTime = Date.now();
      const response = {
        sessionid: state.sessionid,
        itemtype: "experimental",
        itemnumber: responses.length + 1,
        reaction_time: currentTime - imageLoadStartTime,
        image_filename: questions[currentQuestionIndex].image,
        rating_value: value,
        rating_timestamp: new Date().toISOString(),
      };
      // sendItemDataToDB(currentTime, value);
      SendItemDataToDB(
        state,
        // refreshSession,
        // state.sessionid,
        response,
        responses,
        currentTime,
        imageLoadStartTime,
        value,
        questions,
        currentQuestionIndex
      );
      console.log(response);
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // console.log(currentQuestion.image);
  };

  const handleTrialRatingChange = (value: any) => {
    if (currentQuestionIndex <= 3) {
      const currentTime = Date.now();
      const response = {
        // startTime: imageLoadStartTime,
        // stopTime: currentTime,
        sessionid: state.sessionid,
        itemtype: "trial",
        itemnumber: responses.length + 1,
        reaction_time: currentTime - imageLoadStartTime,
        image_filename: questions[currentQuestionIndex].image,
        rating_value: value,
        rating_timestamp: new Date().toISOString(),
      };
      // sendItemDataToDB(currentTime, value);
      SendItemDataToDB(
        state,
        // refreshSession,
        // state.sessionid,
        response,
        responses,
        currentTime,
        imageLoadStartTime,
        value,
        questions,
        currentQuestionIndex
      );
      console.log(response);
      setResponses((prevResponses) => [...prevResponses, response]);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    if (currentQuestionIndex >= 3) {
      setStepNo(2);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        textAlign: "center",
      }}
    >
      {!preloadingComplete && (
        <p>
          Please wait while the experiment loads. This may take a few moments.
        </p>
      )}
      {!preloadingComplete && (
        <div
          style={{
            display: "flex",
            width: "50%",
            margin: "10px",
            border: "1px solid #ccc",
          }}
        >
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: `${progress}% `,
              height: "20px",
              backgroundColor: "#2196F3",
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
      )}
      {preloadingComplete && (
        <Box>
          {stepNo === 0 ? (
            <Box
              sx={{
                display: "flex",
                height: "700px",
                alignItems: "center",
                justifyContent: "center",
                pl: "30px",
                pr: "30px",
              }}
            >
              <Typography variant="h4">
                You will now be given a few training trials. Please press ENTER
                to proceed.
              </Typography>
            </Box>
          ) : stepNo === 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mt: 2,
                height: "100%",
                width: "100%",
              }}
            >
              {/* <LinearProgress
            variant="determinate"
            value={calculateProgress()}
            sx={{ mt: 2, width: "50%", height: ".5rem" }}
          /> */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                  height: { xs: "auto", sm: "50vh", md: "70vh" },
                  width: "100%",
                }}
              >
                <img
                  // src={`/assets/DALLE3_emotion_images/${currentQuestion.image}`}
                  ref={imageRef}
                  onLoad={handleImageLoad}
                  src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${currentQuestion.image}`}
                  alt={`Question ${currentQuestion.id}`}
                  style={{
                    border: "1.5px solid black",
                    objectFit: "contain",
                    width: "auto",
                    height: "100%",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexWrap: theme.breakpoints.only("sm") ? "wrap" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                  // mt: 2,
                  p: 1,
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Button
                    key={value}
                    variant="contained"
                    size="small"
                    // color={ratingMethod === "star" ? "secondary" : "primary"}
                    onClick={() => handleTrialRatingChange(value)}
                    sx={{
                      marginTop: ".3rem",
                      marginLeft: ".3rem",
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "700",
                      border: "1px solid black",
                      "&:hover": {
                        backgroundColor: "lightblue",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {value}
                  </Button>
                ))}
              </Box>

              <Typography variant="h6">
                Rate the alignment of the image to the text
              </Typography>
              <Typography variant="h6">
                <b>
                  expressing the emotion{" "}
                  {extractEmotionName(currentQuestion.image)}
                </b>
              </Typography>
              <Typography variant="h6">
                {" "}
                where <b>0</b> is "no alignment" and <b>10</b> is "excellent
                alignment."
              </Typography>
            </Box>
          ) : stepNo === 2 ? (
            <Box
              sx={{
                display: "flex",
                height: "700px",
                alignItems: "center",
                justifyContent: "center",
                pl: "30px",
                pr: "30px",
              }}
            >
              <Typography variant="h4">
                You will now begin the main experiment. Please press ENTER to
                proceed.{" "}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                sx={{ mt: 2, width: "50%", height: ".5rem" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                  height: { xs: "auto", sm: "50vh", md: "70vh" },
                  width: "100%",
                }}
              >
                <img
                  ref={imageRef}
                  onLoad={handleImageLoad}
                  // src={`/assets/DALLE3_emotion_images/${currentQuestion.image}`}
                  src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${currentQuestion.image}`}
                  alt={`Question ${currentQuestion.id}`}
                  style={{
                    border: "1.5px solid black",
                    objectFit: "contain",
                    width: "auto",
                    height: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexWrap: theme.breakpoints.only("sm") ? "wrap" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                  // mt: 2,
                  p: 1,
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Button
                    key={value}
                    variant="contained"
                    size="small"
                    // color={ratingMethod === "star" ? "secondary" : "primary"}
                    onClick={() => handleRatingChange(value)}
                    sx={{
                      marginTop: ".3rem",
                      marginLeft: ".3rem",
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "700",
                      border: "1px solid black",
                      "&:hover": {
                        backgroundColor: "lightblue",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {value}
                  </Button>
                ))}
              </Box>
              <Typography variant="h6">
                Rate the alignment of the image to the text
              </Typography>
              <Typography variant="h6">
                <b>
                  expressing the emotion{" "}
                  {extractEmotionName(currentQuestion.image)}
                </b>
              </Typography>
              <Typography variant="h6">
                {" "}
                where <b>0</b> is "no alignment" and <b>10</b> is "excellent
                alignment."
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Question;
