import { useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// import question1 from '/assets/image1.png';
// import question2 from '/assets/image2.png';
// import question3 from '/assets/image3.png';
// import question4 from '/assets/image4.png';
// import question5 from '../src/assets/AI Images/download(1).jpg';
//...
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
  "dalle3-a person expressing the emotion affection-1.png",
  "dalle3-a person expressing the emotion affection-2.png",
  "dalle3-a person expressing the emotion affection-3.png",
  "dalle3-a person expressing the emotion affection-4.png",
  "dalle3-a person expressing the emotion amusement-1.png",
  "dalle3-a person expressing the emotion amusement-2.png",
  "dalle3-a person expressing the emotion amusement-3.png",
  "dalle3-a person expressing the emotion amusement-4.png",
  "dalle3-a person expressing the emotion annoyance-1.png",
  "dalle3-a person expressing the emotion annoyance-2.png",
  "dalle3-a person expressing the emotion annoyance-3.png",
  "dalle3-a person expressing the emotion annoyance-4.png",
  "dalle3-a person expressing the emotion dissatisfaction-1.png",
  "dalle3-a person expressing the emotion dissatisfaction-2.png",
  "dalle3-a person expressing the emotion dissatisfaction-3.png",
  "dalle3-a person expressing the emotion dissatisfaction-4.png",
  "dalle3-a person expressing the emotion gratitude-1.png",
  "dalle3-a person expressing the emotion gratitude-2.png",
  "dalle3-a person expressing the emotion gratitude-3.png",
  "dalle3-a person expressing the emotion gratitude-4.png",
  "dalle3-a person expressing the emotion hate-1.png",
  "dalle3-a person expressing the emotion hate-2.png",
  "dalle3-a person expressing the emotion hate-3.png",
  "dalle3-a person expressing the emotion hate-4.png",
  "dalle3-a person expressing the emotion positive surprise-1.png",
  "dalle3-a person expressing the emotion positive surprise-2.png",
  "dalle3-a person expressing the emotion positive surprise-3.png",
  "dalle3-a person expressing the emotion positive surprise-4.png",
  "dalle3-a person expressing the emotion resentment-1.png",
  "dalle3-a person expressing the emotion resentment-2.png",
  "dalle3-a person expressing the emotion resentment-3.png",
  "dalle3-a person expressing the emotion resentment-4.png",
  "dalle3-a person expressing the emotion satisfaction-1.png",
  "dalle3-a person expressing the emotion satisfaction-2.png",
  "dalle3-a person expressing the emotion satisfaction-3.png",
  "dalle3-a person expressing the emotion satisfaction-4.png",
  "dalle3-a person expressing the emotion shock-1.png",
  "dalle3-a person expressing the emotion shock-2.png",
  "dalle3-a person expressing the emotion shock-3.png",
  "dalle3-a person expressing the emotion shock-4.png",
  "dalle3-a robot expressing the emotion affecion-1.png",
  "dalle3-a robot expressing the emotion affecion-2.png",
  "dalle3-a robot expressing the emotion affecion-3.png",
  "dalle3-a robot expressing the emotion affecion-4.png",
  "dalle3-a robot expressing the emotion amusement-1.png",
  "dalle3-a robot expressing the emotion amusement-2.png",
  "dalle3-a robot expressing the emotion amusement-3.png",
  "dalle3-a robot expressing the emotion amusement-4.png",
  "dalle3-a robot expressing the emotion annoyance-1.png",
  "dalle3-a robot expressing the emotion annoyance-2.png",
  "dalle3-a robot expressing the emotion annoyance-3.png",
  "dalle3-a robot expressing the emotion annoyance-4.png",
  "dalle3-a robot expressing the emotion dissatisfaction-1.png",
  "dalle3-a robot expressing the emotion dissatisfaction-2.png",
  "dalle3-a robot expressing the emotion dissatisfaction-3.png",
  "dalle3-a robot expressing the emotion dissatisfaction-4.png",
  "dalle3-a robot expressing the emotion gratitude-1.png",
  "dalle3-a robot expressing the emotion gratitude-2.png",
  "dalle3-a robot expressing the emotion gratitude-3.png",
  "dalle3-a robot expressing the emotion gratitude-4.png",
  "dalle3-a robot expressing the emotion hate-1.png",
  "dalle3-a robot expressing the emotion hate-2.png",
  "dalle3-a robot expressing the emotion hate-3.png",
  "dalle3-a robot expressing the emotion hate-4.png",
  "dalle3-a robot expressing the emotion positive surprise-1.png",
  "dalle3-a robot expressing the emotion positive surprise-2.png",
  "dalle3-a robot expressing the emotion positive surprise-3.png",
  "dalle3-a robot expressing the emotion positive surprise-4.png",
  "dalle3-a robot expressing the emotion resentment-1.png",
  "dalle3-a robot expressing the emotion resentment-2.png",
  "dalle3-a robot expressing the emotion resentment-3.png",
  "dalle3-a robot expressing the emotion resentment-4.png",
  "dalle3-a robot expressing the emotion satisfaction-1.png",
  "dalle3-a robot expressing the emotion satisfaction-2.png",
  "dalle3-a robot expressing the emotion satisfaction-3.png",
  "dalle3-a robot expressing the emotion satisfaction-4.png",
  "dalle3-a robot expressing the emotion shock-1.png",
  "dalle3-a robot expressing the emotion shock-2.png",
  "dalle3-a robot expressing the emotion shock-3.png",
  "dalle3-a robot expressing the emotion shock-4.png",
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
//   const match = imageName.match(/the emotion (.+?)-\d+\.png/i);
//   if (match && match[1]) {
//     return match[1].trim();
//   }
//   return 'Unknown'; // Handle cases where the format doesn't match
// }

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

const Question2 = () => {
  const theme = useTheme();

  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [responses, setResponses] = useState<
    Array<{ responseTime: number; answer: string; imageName: any }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion]: any = useState({});
  const [ratingcondition, setRatingCondition]: any = useState("");
  const [stepNo, setStepNo]: any = useState(0);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    questionArrayCreation();
    setRatingCondition("ratings");

    // console.log(state.condition,"question array created");
  }, [state.condition]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      navigate("/alignment/endForm", {
        state: { ...state, responses: responses },
      });
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        const newStep = stepNo + 1;
        setStepNo(newStep);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    console.log("ji");
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [stepNo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/aesthetic/endForm", { state: { ...state, ...responses } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleLikeDislike = (action: any) => {
    if (currentQuestionIndex <= questions.length - 1) {
      const currentTime = (600 - timer) * 1000;
      const response = {
        responseTime: currentTime,
        answer: action,
        imageName: questions[currentQuestionIndex].image,
      };
      //add image name, user's age, nationality,
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

  const calculateProgress = () => {
    const answeredQuestions = currentQuestionIndex + 1;
    const totalQuestions = questions.length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const handleRatingChange = (value: any) => {
    if (currentQuestionIndex <= questions.length - 1) {
      const currentTime = (600 - timer) * 1000;
      const response = {
        responseTime: currentTime,
        answer: value,
        imageName: questions[currentQuestionIndex].image,
      };
      //add image name, user's age, nationality,
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <Box>
      {stepNo === 0 ? (
        <Box>
          <Typography variant="h4">You will now be given a few training trials.Please enter to proceed.</Typography>
        </Box>
      ) : stepNo === 1 ? (
        <Box>Trial Images</Box>
      ) : stepNo === 2 ? (
        <Box>Now Main Experiment</Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
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
              flexDirection: "column",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <img
              src={`/assets/DALLE3_emotion_images/${currentQuestion.image}`}
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
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
            {" "}
            How much do you like this image on scale from 1 to 10 ?
          </Typography>
          {/* <Typography variant="h6"><b>expressing the emotion {extractEmotionName(currentQuestion.image)}</b></Typography> */}
          <Typography variant="h6">
            (where 1 means "very bad" and 10 means "very good")
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Question2;
