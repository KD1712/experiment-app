import { useEffect, useRef, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// import question1 from '/assets/image1.png';
// import question2 from '/assets/image2.png';
// import question3 from '/assets/image3.png';
// import question4 from '/assets/image4.png';
// import question5 from '../src/assets/AI Images/download(1).jpg';
//...
import { useLocation, useNavigate } from "react-router-dom";
import { stat } from "fs";

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
  "attentionCheck-Write a story about a person expressing the emotion shock-999.webp",
  "dalle-a person expressing the emotion affection-1669785498.webp",
  "dalle-a person expressing the emotion affection-1669786877.webp",
  "dalle-a person expressing the emotion affection-1669787979.webp",
  "dalle-a person expressing the emotion affection-1669789175.webp",
  "dalle-a person expressing the emotion amusement-1669785482.webp",
  "dalle-a person expressing the emotion amusement-1669786858.webp",
  "dalle-a person expressing the emotion amusement-1669787963.webp",
  "dalle-a person expressing the emotion amusement-1669789158.webp",
  "dalle-a person expressing the emotion annoyance-1669785565.webp",
  "dalle-a person expressing the emotion annoyance-1669786950.webp",
  "dalle-a person expressing the emotion annoyance-1669788048.webp",
  "dalle-a person expressing the emotion annoyance-1669789241.webp",
  "dalle-a person expressing the emotion dissatisfaction-1669785637.webp",
  "dalle-a person expressing the emotion dissatisfaction-1669787001.webp",
  "dalle-a person expressing the emotion dissatisfaction-1669788103.webp",
  "dalle-a person expressing the emotion dissatisfaction-1669789298.webp",
  "dalle-a person expressing the emotion gratitude-1669785548.webp",
  "dalle-a person expressing the emotion gratitude-1669786926.webp",
  "dalle-a person expressing the emotion gratitude-1669788030.webp",
  "dalle-a person expressing the emotion gratitude-1669789224.webp",
  "dalle-a person expressing the emotion hate-1669785591.webp",
  "dalle-a person expressing the emotion hate-1669786967.webp",
  "dalle-a person expressing the emotion hate-1669788063.webp",
  "dalle-a person expressing the emotion hate-1669789260.webp",
  "dalle-a person expressing the emotion positive Surprise-1669785513.webp",
  "dalle-a person expressing the emotion positive Surprise-1669786894.webp",
  "dalle-a person expressing the emotion positive Surprise-1669787997.webp",
  "dalle-a person expressing the emotion positive Surprise-1669789192.webp",
  "dalle-a person expressing the emotion resentment-1669785657.webp",
  "dalle-a person expressing the emotion resentment-1669787017.webp",
  "dalle-a person expressing the emotion resentment-1669788130.webp",
  "dalle-a person expressing the emotion resentment-1669789315.webp",
  "dalle-a person expressing the emotion satisfaction-1669785531.webp",
  "dalle-a person expressing the emotion satisfaction-1669786910.webp",
  "dalle-a person expressing the emotion satisfaction-1669788013.webp",
  "dalle-a person expressing the emotion satisfaction-1669789208.webp",
  "dalle-a person expressing the emotion shock-1669785608.webp",
  "dalle-a person expressing the emotion shock-1669786984.webp",
  "dalle-a person expressing the emotion shock-1669788079.webp",
  "dalle-a person expressing the emotion shock-1669789275.webp",
  "dalle-a robot expressing the emotion affection-1669785322.webp",
  "dalle-a robot expressing the emotion affection-1669786667.webp",
  "dalle-a robot expressing the emotion affection-1669787805.webp",
  "dalle-a robot expressing the emotion affection-1669788971.webp",
  "dalle-a robot expressing the emotion amusement-1669785306.webp",
  "dalle-a robot expressing the emotion amusement-1669786636.webp",
  "dalle-a robot expressing the emotion amusement-1669787780.webp",
  "dalle-a robot expressing the emotion amusement-1669788956.webp",
  "dalle-a robot expressing the emotion annoyance-1669785401.webp",
  "dalle-a robot expressing the emotion annoyance-1669786760.webp",
  "dalle-a robot expressing the emotion annoyance-1669787878.webp",
  "dalle-a robot expressing the emotion annoyance-1669789050.webp",
  "dalle-a robot expressing the emotion dissatisfaction-1669785450.webp",
  "dalle-a robot expressing the emotion dissatisfaction-1669786822.webp",
  "dalle-a robot expressing the emotion dissatisfaction-1669787930.webp",
  "dalle-a robot expressing the emotion dissatisfaction-1669789122.webp",
  "dalle-a robot expressing the emotion gratitude-1669785385.webp",
  "dalle-a robot expressing the emotion gratitude-1669786736.webp",
  "dalle-a robot expressing the emotion gratitude-1669787853.webp",
  "dalle-a robot expressing the emotion gratitude-1669789033.webp",
  "dalle-a robot expressing the emotion hate-1669785418.webp",
  "dalle-a robot expressing the emotion hate-1669786777.webp",
  "dalle-a robot expressing the emotion hate-1669787898.webp",
  "dalle-a robot expressing the emotion hate-1669789073.webp",
  "dalle-a robot expressing the emotion positive Surprise-1669785342.webp",
  "dalle-a robot expressing the emotion positive Surprise-1669786696.webp",
  "dalle-a robot expressing the emotion positive Surprise-1669787820.webp",
  "dalle-a robot expressing the emotion positive Surprise-1669788994.webp",
  "dalle-a robot expressing the emotion resentment-1669785467.webp",
  "dalle-a robot expressing the emotion resentment-1669786841.webp",
  "dalle-a robot expressing the emotion resentment-1669787946.webp",
  "dalle-a robot expressing the emotion resentment-1669789138.webp",
  "dalle-a robot expressing the emotion satisfaction-1669785359.webp",
  "dalle-a robot expressing the emotion satisfaction-1669786711.webp",
  "dalle-a robot expressing the emotion satisfaction-1669787836.webp",
  "dalle-a robot expressing the emotion satisfaction-1669789017.webp",
  "dalle-a robot expressing the emotion shock-1669785434.webp",
  "dalle-a robot expressing the emotion shock-1669786796.webp",
  "dalle-a robot expressing the emotion shock-1669787914.webp",
  "dalle-a robot expressing the emotion shock-1669789097.webp",

  "sd-a person expressing the emotion affection-234.webp",
  "sd-a person expressing the emotion affection-2389.webp",
  "sd-a person expressing the emotion affection-42.webp",
  "sd-a person expressing the emotion affection-892.webp",
  "sd-a person expressing the emotion amusement-234.webp",
  "sd-a person expressing the emotion amusement-2389.webp",
  "sd-a person expressing the emotion amusement-42.webp",
  "sd-a person expressing the emotion amusement-892.webp",
  "sd-a person expressing the emotion annoyance-234.webp",
  "sd-a person expressing the emotion annoyance-2389.webp",
  "sd-a person expressing the emotion annoyance-42.webp",
  "sd-a person expressing the emotion annoyance-892.webp",
  "sd-a person expressing the emotion dissatisfaction-234.webp",
  "sd-a person expressing the emotion dissatisfaction-2389.webp",
  "sd-a person expressing the emotion dissatisfaction-42.webp",
  "sd-a person expressing the emotion dissatisfaction-892.webp",
  "sd-a person expressing the emotion gratitude-234.webp",
  "sd-a person expressing the emotion gratitude-2389.webp",
  "sd-a person expressing the emotion gratitude-42.webp",
  "sd-a person expressing the emotion gratitude-892.webp",
  "sd-a person expressing the emotion hate-234.webp",
  "sd-a person expressing the emotion hate-2389.webp",
  "sd-a person expressing the emotion hate-42.webp",
  "sd-a person expressing the emotion hate-892.webp",
  "sd-a person expressing the emotion positive Surprise-234.webp",
  "sd-a person expressing the emotion positive Surprise-2389.webp",
  "sd-a person expressing the emotion positive Surprise-42.webp",
  "sd-a person expressing the emotion positive Surprise-892.webp",
  "sd-a person expressing the emotion resentment-234.webp",
  "sd-a person expressing the emotion resentment-2389.webp",
  "sd-a person expressing the emotion resentment-42.webp",
  "sd-a person expressing the emotion resentment-892.webp",
  "sd-a person expressing the emotion satisfaction-234.webp",
  "sd-a person expressing the emotion satisfaction-2389.webp",
  "sd-a person expressing the emotion satisfaction-42.webp",
  "sd-a person expressing the emotion satisfaction-892.webp",
  "sd-a person expressing the emotion shock-234.webp",
  "sd-a person expressing the emotion shock-2389.webp",
  "sd-a person expressing the emotion shock-42.webp",
  "sd-a person expressing the emotion shock-892.webp",
  "sd-a robot expressing the emotion affection-234.webp",
  "sd-a robot expressing the emotion affection-2389.webp",
  "sd-a robot expressing the emotion affection-42.webp",
  "sd-a robot expressing the emotion affection-892.webp",
  "sd-a robot expressing the emotion amusement-234.webp",
  "sd-a robot expressing the emotion amusement-2389.webp",
  "sd-a robot expressing the emotion amusement-42.webp",
  "sd-a robot expressing the emotion amusement-892.webp",
  "sd-a robot expressing the emotion annoyance-234.webp",
  "sd-a robot expressing the emotion annoyance-2389.webp",
  "sd-a robot expressing the emotion annoyance-42.webp",
  "sd-a robot expressing the emotion annoyance-892.webp",
  "sd-a robot expressing the emotion dissatisfaction-234.webp",
  "sd-a robot expressing the emotion dissatisfaction-2389.webp",
  "sd-a robot expressing the emotion dissatisfaction-42.webp",
  "sd-a robot expressing the emotion dissatisfaction-892.webp",
  "sd-a robot expressing the emotion gratitude-234.webp",
  "sd-a robot expressing the emotion gratitude-2389.webp",
  "sd-a robot expressing the emotion gratitude-42.webp",
  "sd-a robot expressing the emotion gratitude-892.webp",
  "sd-a robot expressing the emotion hate-234.webp",
  "sd-a robot expressing the emotion hate-2389.webp",
  "sd-a robot expressing the emotion hate-42.webp",
  "sd-a robot expressing the emotion hate-892.webp",
  "sd-a robot expressing the emotion positive Surprise-234.webp",
  "sd-a robot expressing the emotion positive Surprise-2389.webp",
  "sd-a robot expressing the emotion positive Surprise-42.webp",
  "sd-a robot expressing the emotion positive Surprise-892.webp",
  "sd-a robot expressing the emotion resentment-234.webp",
  "sd-a robot expressing the emotion resentment-2389.webp",
  "sd-a robot expressing the emotion resentment-42.webp",
  "sd-a robot expressing the emotion resentment-892.webp",
  "sd-a robot expressing the emotion satisfaction-234.webp",
  "sd-a robot expressing the emotion satisfaction-2389.webp",
  "sd-a robot expressing the emotion satisfaction-42.webp",
  "sd-a robot expressing the emotion satisfaction-892.webp",
  "sd-a robot expressing the emotion shock-234.webp",
  "sd-a robot expressing the emotion shock-2389.webp",
  "sd-a robot expressing the emotion shock-42.webp",
  "sd-a robot expressing the emotion shock-892.webp",
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

  // const [timer, setTimer] = useState(600); // 10 minutes in seconds
  // const [responses, setResponses] = useState<
  //   Array<{ responseTime: number; answer: string | number; imageName: any }>
  // >([]);
  const [responses, setResponses] = useState<
    Array<{
      answer: number | string;
      imageName: string;
    }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion]: any = useState({});
  // const [ratingcondition, setRatingCondition]: any = useState("");
  const [stepNo, setStepNo]: any = useState(0);
  // const [imageLoadTime, setImageLoadTime] = useState<number | null>(null);
  const [imageLoadStartTime, setImageLoadStartTime] = useState(0);

  const imageRef = useRef<HTMLImageElement | null>(null);
  // const timerRef = useRef<number>(1);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    questionArrayCreation();
    // setRatingCondition("ratings");

    // console.log(state.condition,"question array created");
  }, [state.condition]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      navigate("/aesthetic/end", {
        state: { ...state, responses: responses },
      });
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
      // console.log(currentQuestion)
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
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [stepNo]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => prevTimer - 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (timer === 0) {
  //     navigate("/aesthetic/endForm", { state: { ...state, ...responses } });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [timer]);
  useEffect(() => {
    if (imageRef.current && !imageLoadStartTime) {
      const startImageLoadTime = Date.now();
      setImageLoadStartTime(startImageLoadTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const preloadImages = (imageUrls: any) => {
    imageUrls.forEach((imageUrl: any) => {
      const img = new Image();
      img.src = `https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${imageUrl}`;
    });
  };
  useEffect(() => {
    preloadImages(imageNames);
  }, []);
  const calculateProgress = () => {
    const answeredQuestions = currentQuestionIndex - 3;
    const totalQuestions = questions.length - 3;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const handleImageLoad = () => {
    const startImageLoadTime = Date.now();
    setImageLoadStartTime(startImageLoadTime);
  };

  const handleRatingChange = (value: number) => {
    if (currentQuestionIndex < questions.length) {
      const currentTime = Date.now();
      const response = {
        // startTime: imageLoadStartTime,
        // stopTime: currentTime,
        itemNumber: responses.length + 1,
        session_id: state.sessionId,
        responseTime: currentTime - imageLoadStartTime,
        answer: value,
        // imageName: questions[currentQuestionIndex].image,
        imageName: questions[currentQuestionIndex].image,
      };
      console.log(response);
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
            You will now be given a few training trials.Please press ENTER to proceed.
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <img
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
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
            How much do you like this image on scale from 1 to 10 ?
          </Typography>
          <Typography variant="h6">
            (where 1 means "very bad" and 10 means "very good")
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
              // src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/dalle3-a+robot+expressing+the+emotion+hate-2.webp`}
              alt={`Question ${currentQuestion.id}`}
              src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${currentQuestion.image}`}
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
