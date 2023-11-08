import { useEffect, useRef, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";

//ES6 shuffling or js shuffle
// const questions = [
//   {
//     id: 1,
//     image: '/assets/1.jpg',
//   },
//   {
//     id: 2,
//     image: '/assets/2.jpg',
//   },
//   {
//     id: 3,
//     image: '/assets/3.jpg',
//   },
//   {
//     id: 4,
//     image: '/assets/4.jpg',
//   },
// ];
const imageNames: string[] = [
  "dalle3-a+person+expressing+the+emotion+affection-1.webp",
  "dalle3-a+person+expressing+the+emotion+affection-2.webp",
  "dalle3-a+person+expressing+the+emotion+affection-3.webp",
  "dalle3-a+person+expressing+the+emotion+affection-4.webp",
  "dalle3-a+person+expressing+the+emotion+amusement-1.webp",
  "dalle3-a+person+expressing+the+emotion+amusement-2.webp",
  "dalle3-a+person+expressing+the+emotion+amusement-3.webp",
  "dalle3-a+person+expressing+the+emotion+amusement-4.webp",
  "dalle3-a+person+expressing+the+emotion+annoyance-1.webp",
  "dalle3-a+person+expressing+the+emotion+annoyance-2.webp",
  "dalle3-a+person+expressing+the+emotion+annoyance-3.webp",
  "dalle3-a+person+expressing+the+emotion+annoyance-4.webp",
  "dalle3-a+person+expressing+the+emotion+dissatisfaction-1.webp",
  "dalle3-a+person+expressing+the+emotion+dissatisfaction-2.webp",
  "dalle3-a+person+expressing+the+emotion+dissatisfaction-3.webp",
  "dalle3-a+person+expressing+the+emotion+dissatisfaction-4.webp",
  "dalle3-a+person+expressing+the+emotion+gratitude-1.webp",
  "dalle3-a+person+expressing+the+emotion+gratitude-2.webp",
  "dalle3-a+person+expressing+the+emotion+gratitude-3.webp",
  "dalle3-a+person+expressing+the+emotion+gratitude-4.webp",
  "dalle3-a+person+expressing+the+emotion+hate-1.webp",
  "dalle3-a+person+expressing+the+emotion+hate-2.webp",
  "dalle3-a+person+expressing+the+emotion+hate-3.webp",
  "dalle3-a+person+expressing+the+emotion+hate-4.webp",
  "dalle3-a+person+expressing+the+emotion+positive+surprise-1.webp",
  "dalle3-a+person+expressing+the+emotion+positive+surprise-2.webp",
  "dalle3-a+person+expressing+the+emotion+positive+surprise-3.webp",
  "dalle3-a+person+expressing+the+emotion+positive+surprise-4.webp",
  "dalle3-a+person+expressing+the+emotion+resentment-1.webp",
  "dalle3-a+person+expressing+the+emotion+resentment-2.webp",
  "dalle3-a+person+expressing+the+emotion+resentment-3.webp",
  "dalle3-a+person+expressing+the+emotion+resentment-4.webp",
  "dalle3-a+person+expressing+the+emotion+satisfaction-1.webp",
  "dalle3-a+person+expressing+the+emotion+satisfaction-2.webp",
  "dalle3-a+person+expressing+the+emotion+satisfaction-3.webp",
  "dalle3-a+person+expressing+the+emotion+satisfaction-4.webp",
  "dalle3-a+person+expressing+the+emotion+shock-1.webp",
  "dalle3-a+person+expressing+the+emotion+shock-2.webp",
  "dalle3-a+person+expressing+the+emotion+shock-3.webp",
  "dalle3-a+person+expressing+the+emotion+shock-4.webp",
  "dalle3-a+robot+expressing+the+emotion+affection-1.webp",
  "dalle3-a+robot+expressing+the+emotion+affection-2.webp",
  "dalle3-a+robot+expressing+the+emotion+affection-3.webp",
  "dalle3-a+robot+expressing+the+emotion+affection-4.webp",
  "dalle3-a+robot+expressing+the+emotion+amusement-1.webp",
  "dalle3-a+robot+expressing+the+emotion+amusement-2.webp",
  "dalle3-a+robot+expressing+the+emotion+amusement-3.webp",
  "dalle3-a+robot+expressing+the+emotion+amusement-4.webp",
  "dalle3-a+robot+expressing+the+emotion+annoyance-1.webp",
  "dalle3-a+robot+expressing+the+emotion+annoyance-2.webp",
  "dalle3-a+robot+expressing+the+emotion+annoyance-3.webp",
  "dalle3-a+robot+expressing+the+emotion+annoyance-4.webp",
  "dalle3-a+robot+expressing+the+emotion+dissatisfaction-1.webp",
  "dalle3-a+robot+expressing+the+emotion+dissatisfaction-2.webp",
  "dalle3-a+robot+expressing+the+emotion+dissatisfaction-3.webp",
  "dalle3-a+robot+expressing+the+emotion+dissatisfaction-4.webp",
  "dalle3-a+robot+expressing+the+emotion+gratitude-1.webp",
  "dalle3-a+robot+expressing+the+emotion+gratitude-2.webp",
  "dalle3-a+robot+expressing+the+emotion+gratitude-3.webp",
  "dalle3-a+robot+expressing+the+emotion+gratitude-4.webp",
  "dalle3-a+robot+expressing+the+emotion+hate-1.webp",
  "dalle3-a+robot+expressing+the+emotion+hate-2.webp",
  "dalle3-a+robot+expressing+the+emotion+hate-3.webp",
  "dalle3-a+robot+expressing+the+emotion+hate-4.webp",
  "dalle3-a+robot+expressing+the+emotion+positive+surprise-1.webp",
  "dalle3-a+robot+expressing+the+emotion+positive+surprise-2.webp",
  "dalle3-a+robot+expressing+the+emotion+positive+surprise-3.webp",
  "dalle3-a+robot+expressing+the+emotion+positive+surprise-4.webp",
  "dalle3-a+robot+expressing+the+emotion+resentment-1.webp",
  "dalle3-a+robot+expressing+the+emotion+resentment-2.webp",
  "dalle3-a+robot+expressing+the+emotion+resentment-3.webp",
  "dalle3-a+robot+expressing+the+emotion+resentment-4.webp",
  "dalle3-a+robot+expressing+the+emotion+satisfaction-1.webp",
  "dalle3-a+robot+expressing+the+emotion+satisfaction-2.webp",
  "dalle3-a+robot+expressing+the+emotion+satisfaction-3.webp",
  "dalle3-a+robot+expressing+the+emotion+satisfaction-4.webp",
  "dalle3-a+robot+expressing+the+emotion+shock-1.webp",
  "dalle3-a+robot+expressing+the+emotion+shock-2.webp",
  "dalle3-a+robot+expressing+the+emotion+shock-3.webp",
  "dalle3-a+robot+expressing+the+emotion+shock-4.webp",
];

function questionArrayCreation(): { id: number; image: string }[] {
  const shuffledImageNames = shuffleArray([...imageNames]);

  const questions = shuffledImageNames.map((image, index) => ({
    id: index + 1,
    image,
  }));

  return questions;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to extract emotion name from the image file name
// function extractEmotionName(imageName: string): string {
//   if (imageName) {
//     const match = imageName.match(/the+emotion+(.+?)-\d+\.png/i);
//     if (match && match[1]) {
//       return match[1].trim();
//     }
//   }
//   return "Unknown";
// }
function extractEmotionName(imageName: string): string {
  if (imageName) {
    const match = imageName.match(/the\+emotion\+(.+?)-\d+\.webp/i);
    if (match && match[1]) {
      // Replace "+" with a space
      const emotionName = match[1].replace(/\+/g, " ").trim();
      return emotionName;
    }
  }
  return "Unknown";
}
const questions = questionArrayCreation();
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

  // const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [responses, setResponses] = useState<
    Array<{
      answer: number | string;
      imageName: string;
    }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion]: any = useState({});
  const [stepNo, setStepNo]: any = useState(0);
  const [imageLoadStartTime, setImageLoadStartTime] = useState(0);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const [showLoader, setShowLoader] = useState(true);
  // const [ratingcondition, setRatingCondition]: any = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    questionArrayCreation();
    // setRatingCondition(state.condition);

    // console.log(state.condition,"question array created");
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      navigate("/alignment/end", {
        state: { ...state, responses: responses },
      });
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

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

  useEffect(() => {
    // Hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => {
      // Clear the timer if the component unmounts before the timer completes
      clearTimeout(timer);
    };
  }, []);

  const calculateProgress = () => {
    const answeredQuestions = currentQuestionIndex - 3;
    const totalQuestions = questions.length - 4;
    return (answeredQuestions / totalQuestions) * 100;
  };
  const handleImageLoad = () => {
    const startImageLoadTime = Date.now();
    setImageLoadStartTime(startImageLoadTime);
  };
  const handleRatingChange = (value: number) => {
    if (currentQuestionIndex < questions.length) {
      if (currentQuestionIndex === 0) {
        setShowLoader(true);
      }
      const currentTime = Date.now();
      const response = {
        // startTime: imageLoadStartTime,
        // stopTime: currentTime,
        responseTime: currentTime - imageLoadStartTime,
        answer: value,
        imageName: questions[currentQuestionIndex].image,
      };
      // console.log(response);
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTrialRatingChange = (value: any) => {
    // if (currentQuestionIndex < 3) {
    //   const currentTime = (600 - timer) * 1000;
    //   const response = {
    //     responseTime: currentTime,
    //     answer: value,
    //     imageName: questions[currentQuestionIndex].image,
    //   };
    //   //add image name, user's age, nationality,
    //   setResponses((prevResponses) => [...prevResponses, response]);
    // }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex >= 3) {
      setStepNo(2);
    }
  };
  const loaderStyles: React.CSSProperties = {
    border: "16px solid #f3f3f3",
    borderTop: "16px solid #3498db",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite",
    margin: "100px auto",
    textAlign: "center",
    fontWeight: "bold",
  };
  return (
    <Box>
      {stepNo === 0 ? (
        <Box
          sx={{
            display: "flex",
            height: "700px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">
            You will now be given a few training trials.Please ENTER to proceed.
          </Typography>
        </Box>
      ) : stepNo === 1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
          }}
        >
          {/* <LinearProgress
            variant="determinate"
            value={calculateProgress()}
            sx={{ mt: 2, width: "50%", height: ".5rem" }}
          /> */}
          {showLoader && <div style={loaderStyles}>Loading...</div>}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <img
              // src={`/assets/DALLE3_emotion_images/${currentQuestion.image}`}
              src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${currentQuestion.image}`}
              alt={`Question ${currentQuestion.id}`}
              style={{
                height: 500,
                width: theme.breakpoints.only("md") ? "80%" : "100%",
                border: "1.5px solid black",
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
              expressing the emotion {extractEmotionName(currentQuestion.image)}
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
          }}
        >
          <Typography variant="h4">
            You will now begin the main experiment. Press ENTER to proceed.{" "}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
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
              flexDirection: "row",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <img
              ref={imageRef}
              onLoad={handleImageLoad}
              // src={`/assets/DALLE3_emotion_images/${currentQuestion.image}`}
              src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${currentQuestion.image}`}
              alt={`Question ${currentQuestion.id}`}
              style={{
                height: 500,
                width: theme.breakpoints.only("md") ? "80%" : "100%",
                border: "1.5px solid black",
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
              expressing the emotion {extractEmotionName(currentQuestion.image)}
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
  );
};

export default Question;
