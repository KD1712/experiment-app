import { useEffect, useState } from "react";
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
  "attentionCheck-Write a story about a person expressing the emotion shock-999.png",
  "dalle-a person expressing the emotion affection-1669785498.png",
  "dalle-a person expressing the emotion affection-1669786877.png",
  "dalle-a person expressing the emotion affection-1669787979.png",
  "dalle-a person expressing the emotion affection-1669789175.png",
  "dalle-a person expressing the emotion amusement-1669785482.png",
  "dalle-a person expressing the emotion amusement-1669786858.png",
  "dalle-a person expressing the emotion amusement-1669787963.png",
  "dalle-a person expressing the emotion amusement-1669789158.png",
  "dalle-a person expressing the emotion annoyance-1669785565.png",
  "dalle-a person expressing the emotion annoyance-1669786950.png",
  "dalle-a person expressing the emotion annoyance-1669788048.png",
  "dalle-a person expressing the emotion annoyance-1669789241.png",
  "dalle-a person expressing the emotion dissatisfaction-1669785637.png",
  "dalle-a person expressing the emotion dissatisfaction-1669787001.png",
  "dalle-a person expressing the emotion dissatisfaction-1669788103.png",
  "dalle-a person expressing the emotion dissatisfaction-1669789298.png",
  "dalle-a person expressing the emotion gratitude-1669785548.png",
  "dalle-a person expressing the emotion gratitude-1669786926.png",
  "dalle-a person expressing the emotion gratitude-1669788030.png",
  "dalle-a person expressing the emotion gratitude-1669789224.png",
  "dalle-a person expressing the emotion hate-1669785591.png",
  "dalle-a person expressing the emotion hate-1669786967.png",
  "dalle-a person expressing the emotion hate-1669788063.png",
  "dalle-a person expressing the emotion hate-1669789260.png",
  "dalle-a person expressing the emotion positive Surprise-1669785513.png",
  "dalle-a person expressing the emotion positive Surprise-1669786894.png",
  "dalle-a person expressing the emotion positive Surprise-1669787997.png",
  "dalle-a person expressing the emotion positive Surprise-1669789192.png",
  "dalle-a person expressing the emotion resentment-1669785657.png",
  "dalle-a person expressing the emotion resentment-1669787017.png",
  "dalle-a person expressing the emotion resentment-1669788130.png",
  "dalle-a person expressing the emotion resentment-1669789315.png",
  "dalle-a person expressing the emotion satisfaction-1669785531.png",
  "dalle-a person expressing the emotion satisfaction-1669786910.png",
  "dalle-a person expressing the emotion satisfaction-1669788013.png",
  "dalle-a person expressing the emotion satisfaction-1669789208.png",
  "dalle-a person expressing the emotion shock-1669785608.png",
  "dalle-a person expressing the emotion shock-1669786984.png",
  "dalle-a person expressing the emotion shock-1669788079.png",
  "dalle-a person expressing the emotion shock-1669789275.png",
  "dalle-a robot expressing the emotion affection-1669785322.png",
  "dalle-a robot expressing the emotion affection-1669786667.png",
  "dalle-a robot expressing the emotion affection-1669787805.png",
  "dalle-a robot expressing the emotion affection-1669788971.png",
  "dalle-a robot expressing the emotion amusement-1669785306.png",
  "dalle-a robot expressing the emotion amusement-1669786636.png",
  "dalle-a robot expressing the emotion amusement-1669787780.png",
  "dalle-a robot expressing the emotion amusement-1669788956.png",
  "dalle-a robot expressing the emotion annoyance-1669785401.png",
  "dalle-a robot expressing the emotion annoyance-1669786760.png",
  "dalle-a robot expressing the emotion annoyance-1669787878.png",
  "dalle-a robot expressing the emotion annoyance-1669789050.png",
  "dalle-a robot expressing the emotion dissatisfaction-1669785450.png",
  "dalle-a robot expressing the emotion dissatisfaction-1669786822.png",
  "dalle-a robot expressing the emotion dissatisfaction-1669787930.png",
  "dalle-a robot expressing the emotion dissatisfaction-1669789122.png",
  "dalle-a robot expressing the emotion gratitude-1669785385.png",
  "dalle-a robot expressing the emotion gratitude-1669786736.png",
  "dalle-a robot expressing the emotion gratitude-1669787853.png",
  "dalle-a robot expressing the emotion gratitude-1669789033.png",
  "dalle-a robot expressing the emotion hate-1669785418.png",
  "dalle-a robot expressing the emotion hate-1669786777.png",
  "dalle-a robot expressing the emotion hate-1669787898.png",
  "dalle-a robot expressing the emotion hate-1669789073.png",
  "dalle-a robot expressing the emotion positive Surprise-1669785342.png",
  "dalle-a robot expressing the emotion positive Surprise-1669786696.png",
  "dalle-a robot expressing the emotion positive Surprise-1669787820.png",
  "dalle-a robot expressing the emotion positive Surprise-1669788994.png",
  "dalle-a robot expressing the emotion resentment-1669785467.png",
  "dalle-a robot expressing the emotion resentment-1669786841.png",
  "dalle-a robot expressing the emotion resentment-1669787946.png",
  "dalle-a robot expressing the emotion resentment-1669789138.png",
  "dalle-a robot expressing the emotion satisfaction-1669785359.png",
  "dalle-a robot expressing the emotion satisfaction-1669786711.png",
  "dalle-a robot expressing the emotion satisfaction-1669787836.png",
  "dalle-a robot expressing the emotion satisfaction-1669789017.png",
  "dalle-a robot expressing the emotion shock-1669785434.png",
  "dalle-a robot expressing the emotion shock-1669786796.png",
  "dalle-a robot expressing the emotion shock-1669787914.png",
  "dalle-a robot expressing the emotion shock-1669789097.png",
  "gpt3-Write a story about a person expressing the emotion affection - 1669885950.txt.png",
  "gpt3-Write a story about a person expressing the emotion amusement - 1669885938.txt.png",
  "gpt3-Write a story about a person expressing the emotion annoyance - 1669885993.txt.png",
  "gpt3-Write a story about a person expressing the emotion dissatisfaction - 1669886022.txt.png",
  "gpt3-Write a story about a person expressing the emotion gratitude - 1669885976.txt.png",
  "gpt3-Write a story about a person expressing the emotion hate - 1669886007.txt.png",
  "gpt3-Write a story about a person expressing the emotion positive Surprise - 1669885960.txt.png",
  "gpt3-Write a story about a person expressing the emotion resentment - 1669886038.txt.png",
  "gpt3-Write a story about a person expressing the emotion satisfaction - 1669885965.txt.png",
  "gpt3-Write a story about a person expressing the emotion shock - 1669886015.txt.png",
  "gpt3-Write a story about a robot expressing the emotion affection - 1669885852.txt.png",
  "gpt3-Write a story about a robot expressing the emotion amusement - 1669885843.txt.png",
  "gpt3-Write a story about a robot expressing the emotion annoyance - 1669885893.txt.png",
  "gpt3-Write a story about a robot expressing the emotion dissatisfaction - 1669885922.txt.png",
  "gpt3-Write a story about a robot expressing the emotion gratitude - 1669885882.txt.png",
  "gpt3-Write a story about a robot expressing the emotion hate - 1669885905.txt.png",
  "gpt3-Write a story about a robot expressing the emotion positive Surprise - 1669885861.txt.png",
  "gpt3-Write a story about a robot expressing the emotion resentment - 1669885930.txt.png",
  "gpt3-Write a story about a robot expressing the emotion satisfaction - 1669885874.txt.png",
  "gpt3-Write a story about a robot expressing the emotion shock - 1669885914.txt.png",
  "sd-a person expressing the emotion affection-234.png",
  "sd-a person expressing the emotion affection-2389.png",
  "sd-a person expressing the emotion affection-42.png",
  "sd-a person expressing the emotion affection-892.png",
  "sd-a person expressing the emotion amusement-234.png",
  "sd-a person expressing the emotion amusement-2389.png",
  "sd-a person expressing the emotion amusement-42.png",
  "sd-a person expressing the emotion amusement-892.png",
  "sd-a person expressing the emotion annoyance-234.png",
  "sd-a person expressing the emotion annoyance-2389.png",
  "sd-a person expressing the emotion annoyance-42.png",
  "sd-a person expressing the emotion annoyance-892.png",
  "sd-a person expressing the emotion dissatisfaction-234.png",
  "sd-a person expressing the emotion dissatisfaction-2389.png",
  "sd-a person expressing the emotion dissatisfaction-42.png",
  "sd-a person expressing the emotion dissatisfaction-892.png",
  "sd-a person expressing the emotion gratitude-234.png",
  "sd-a person expressing the emotion gratitude-2389.png",
  "sd-a person expressing the emotion gratitude-42.png",
  "sd-a person expressing the emotion gratitude-892.png",
  "sd-a person expressing the emotion hate-234.png",
  "sd-a person expressing the emotion hate-2389.png",
  "sd-a person expressing the emotion hate-42.png",
  "sd-a person expressing the emotion hate-892.png",
  "sd-a person expressing the emotion positive Surprise-234.png",
  "sd-a person expressing the emotion positive Surprise-2389.png",
  "sd-a person expressing the emotion positive Surprise-42.png",
  "sd-a person expressing the emotion positive Surprise-892.png",
  "sd-a person expressing the emotion resentment-234.png",
  "sd-a person expressing the emotion resentment-2389.png",
  "sd-a person expressing the emotion resentment-42.png",
  "sd-a person expressing the emotion resentment-892.png",
  "sd-a person expressing the emotion satisfaction-234.png",
  "sd-a person expressing the emotion satisfaction-2389.png",
  "sd-a person expressing the emotion satisfaction-42.png",
  "sd-a person expressing the emotion satisfaction-892.png",
  "sd-a person expressing the emotion shock-234.png",
  "sd-a person expressing the emotion shock-2389.png",
  "sd-a person expressing the emotion shock-42.png",
  "sd-a person expressing the emotion shock-892.png",
  "sd-a robot expressing the emotion affection-234.png",
  "sd-a robot expressing the emotion affection-2389.png",
  "sd-a robot expressing the emotion affection-42.png",
  "sd-a robot expressing the emotion affection-892.png",
  "sd-a robot expressing the emotion amusement-234.png",
  "sd-a robot expressing the emotion amusement-2389.png",
  "sd-a robot expressing the emotion amusement-42.png",
  "sd-a robot expressing the emotion amusement-892.png",
  "sd-a robot expressing the emotion annoyance-234.png",
  "sd-a robot expressing the emotion annoyance-2389.png",
  "sd-a robot expressing the emotion annoyance-42.png",
  "sd-a robot expressing the emotion annoyance-892.png",
  "sd-a robot expressing the emotion dissatisfaction-234.png",
  "sd-a robot expressing the emotion dissatisfaction-2389.png",
  "sd-a robot expressing the emotion dissatisfaction-42.png",
  "sd-a robot expressing the emotion dissatisfaction-892.png",
  "sd-a robot expressing the emotion gratitude-234.png",
  "sd-a robot expressing the emotion gratitude-2389.png",
  "sd-a robot expressing the emotion gratitude-42.png",
  "sd-a robot expressing the emotion gratitude-892.png",
  "sd-a robot expressing the emotion hate-234.png",
  "sd-a robot expressing the emotion hate-2389.png",
  "sd-a robot expressing the emotion hate-42.png",
  "sd-a robot expressing the emotion hate-892.png",
  "sd-a robot expressing the emotion positive Surprise-234.png",
  "sd-a robot expressing the emotion positive Surprise-2389.png",
  "sd-a robot expressing the emotion positive Surprise-42.png",
  "sd-a robot expressing the emotion positive Surprise-892.png",
  "sd-a robot expressing the emotion resentment-234.png",
  "sd-a robot expressing the emotion resentment-2389.png",
  "sd-a robot expressing the emotion resentment-42.png",
  "sd-a robot expressing the emotion resentment-892.png",
  "sd-a robot expressing the emotion satisfaction-234.png",
  "sd-a robot expressing the emotion satisfaction-2389.png",
  "sd-a robot expressing the emotion satisfaction-42.png",
  "sd-a robot expressing the emotion satisfaction-892.png",
  "sd-a robot expressing the emotion shock-234.png",
  "sd-a robot expressing the emotion shock-2389.png",
  "sd-a robot expressing the emotion shock-42.png",
  "sd-a robot expressing the emotion shock-892.png",
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
function extractEmotionName(imageName: string): string {
  if (imageName) {
    const match = imageName.match(/the emotion (.+?)-\d+\.png/i);
    if (match && match[1]) {
      return match[1].trim();
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

  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [responses, setResponses] = useState<
    Array<{ responseTime: number; answer: string; imageName: any }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion]: any = useState({});
  const [stepNo, setStepNo]: any = useState(0);
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
      navigate("/alignment/endForm", {
        state: { ...state, responses: responses },
      });
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/alignment/endForm", { state: { ...state, ...responses } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);
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
  const handleTrialRatingChange = (value: any) => {
    if (currentQuestionIndex < 3) {
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

    if (currentQuestionIndex >= 3) {
      setStepNo(2);
    }
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
            You will now be given a few training trials.Please enter to proceed.
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
            You will now begin the main experiment. Press enter to proceed.{" "}
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
