import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import { SendItemDataToDB } from "./api/api";

const imageNames: string[] = [
  "dalle3-a person expressing the emotion affection-1.webp",
  "dalle3-a person expressing the emotion affection-2.webp",
  "dalle3-a person expressing the emotion affection-3.webp",
  "dalle3-a person expressing the emotion affection-4.webp",
  "dalle3-a person expressing the emotion amusement-1.webp",
  "dalle3-a person expressing the emotion amusement-2.webp",
  "dalle3-a person expressing the emotion amusement-3.webp",
  "dalle3-a person expressing the emotion amusement-4.webp",
  "dalle3-a person expressing the emotion annoyance-1.webp",
  "dalle3-a person expressing the emotion annoyance-2.webp",
  "dalle3-a person expressing the emotion annoyance-3.webp",
  "dalle3-a person expressing the emotion annoyance-4.webp",
  "dalle3-a person expressing the emotion dissatisfaction-1.webp",
  "dalle3-a person expressing the emotion dissatisfaction-2.webp",
  "dalle3-a person expressing the emotion dissatisfaction-3.webp",
  "dalle3-a person expressing the emotion dissatisfaction-4.webp",
  "dalle3-a person expressing the emotion gratitude-1.webp",
  "dalle3-a person expressing the emotion gratitude-2.webp",
  "dalle3-a person expressing the emotion gratitude-3.webp",
  "dalle3-a person expressing the emotion gratitude-4.webp",
  "dalle3-a person expressing the emotion hate-1.webp",
  "dalle3-a person expressing the emotion hate-2.webp",
  "dalle3-a person expressing the emotion hate-3.webp",
  "dalle3-a person expressing the emotion hate-4.webp",
  "dalle3-a person expressing the emotion positive surprise-1.webp",
  "dalle3-a person expressing the emotion positive surprise-2.webp",
  "dalle3-a person expressing the emotion positive surprise-3.webp",
  "dalle3-a person expressing the emotion positive surprise-4.webp",
  "dalle3-a person expressing the emotion resentment-1.webp",
  "dalle3-a person expressing the emotion resentment-2.webp",
  "dalle3-a person expressing the emotion resentment-3.webp",
  "dalle3-a person expressing the emotion resentment-4.webp",
  "dalle3-a person expressing the emotion satisfaction-1.webp",
  "dalle3-a person expressing the emotion satisfaction-2.webp",
  "dalle3-a person expressing the emotion satisfaction-3.webp",
  "dalle3-a person expressing the emotion satisfaction-4.webp",
  "dalle3-a person expressing the emotion shock-1.webp",
  "dalle3-a person expressing the emotion shock-2.webp",
  "dalle3-a person expressing the emotion shock-3.webp",
  "dalle3-a person expressing the emotion shock-4.webp",
  "dalle3-a robot expressing the emotion affection-1.webp",
  "dalle3-a robot expressing the emotion affection-2.webp",
  "dalle3-a robot expressing the emotion affection-3.webp",
  "dalle3-a robot expressing the emotion affection-4.webp",
  "dalle3-a robot expressing the emotion amusement-1.webp",
  "dalle3-a robot expressing the emotion amusement-2.webp",
  "dalle3-a robot expressing the emotion amusement-3.webp",
  "dalle3-a robot expressing the emotion amusement-4.webp",
  "dalle3-a robot expressing the emotion annoyance-1.webp",
  "dalle3-a robot expressing the emotion annoyance-2.webp",
  "dalle3-a robot expressing the emotion annoyance-3.webp",
  "dalle3-a robot expressing the emotion annoyance-4.webp",
  "dalle3-a robot expressing the emotion dissatisfaction-1.webp",
  "dalle3-a robot expressing the emotion dissatisfaction-2.webp",
  "dalle3-a robot expressing the emotion dissatisfaction-3.webp",
  "dalle3-a robot expressing the emotion dissatisfaction-4.webp",
  "dalle3-a robot expressing the emotion gratitude-1.webp",
  "dalle3-a robot expressing the emotion gratitude-2.webp",
  "dalle3-a robot expressing the emotion gratitude-3.webp",
  "dalle3-a robot expressing the emotion gratitude-4.webp",
  "dalle3-a robot expressing the emotion hate-1.webp",
  "dalle3-a robot expressing the emotion hate-2.webp",
  "dalle3-a robot expressing the emotion hate-3.webp",
  "dalle3-a robot expressing the emotion hate-4.webp",
  "dalle3-a robot expressing the emotion positive surprise-1.webp",
  "dalle3-a robot expressing the emotion positive surprise-2.webp",
  "dalle3-a robot expressing the emotion positive surprise-3.webp",
  "dalle3-a robot expressing the emotion positive surprise-4.webp",
  "dalle3-a robot expressing the emotion resentment-1.webp",
  "dalle3-a robot expressing the emotion resentment-2.webp",
  "dalle3-a robot expressing the emotion resentment-3.webp",
  "dalle3-a robot expressing the emotion resentment-4.webp",
  "dalle3-a robot expressing the emotion satisfaction-1.webp",
  "dalle3-a robot expressing the emotion satisfaction-2.webp",
  "dalle3-a robot expressing the emotion satisfaction-3.webp",
  "dalle3-a robot expressing the emotion satisfaction-4.webp",
  "dalle3-a robot expressing the emotion shock-1.webp",
  "dalle3-a robot expressing the emotion shock-2.webp",
  "dalle3-a robot expressing the emotion shock-3.webp",
  "dalle3-a robot expressing the emotion shock-4.webp",

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
  "gpt3-Write a story about a person expressing the emotion affection - 1669885950.txt.webp",
  "gpt3-Write a story about a person expressing the emotion amusement - 1669885938.txt.webp",
  "gpt3-Write a story about a person expressing the emotion annoyance - 1669885993.txt.webp",
  "gpt3-Write a story about a person expressing the emotion dissatisfaction - 1669886022.txt.webp",
  "gpt3-Write a story about a person expressing the emotion gratitude - 1669885976.txt.webp",
  "gpt3-Write a story about a person expressing the emotion hate - 1669886007.txt.webp",
  "gpt3-Write a story about a person expressing the emotion positive Surprise - 1669885960.txt.webp",
  "gpt3-Write a story about a person expressing the emotion resentment - 1669886038.txt.webp",
  "gpt3-Write a story about a person expressing the emotion satisfaction - 1669885965.txt.webp",
  "gpt3-Write a story about a person expressing the emotion shock - 1669886015.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion affection - 1669885852.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion amusement - 1669885843.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion annoyance - 1669885893.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion dissatisfaction - 1669885922.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion gratitude - 1669885882.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion hate - 1669885905.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion positive Surprise - 1669885861.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion resentment - 1669885930.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion satisfaction - 1669885874.txt.webp",
  "gpt3-Write a story about a robot expressing the emotion shock - 1669885914.txt.webp",
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
    const startTime = new Date().toLocaleTimeString();
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
    if (currentQuestionIndex === 10) {
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
        rating_timestamp: new Date().toLocaleTimeString(),
      };
      // sendItemDataToDB(currentTime, value);
      SendItemDataToDB(
        // state,
        // refreshSession,
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
        rating_timestamp: new Date().toLocaleTimeString(),
      };
      // sendItemDataToDB(currentTime, value);
      SendItemDataToDB(
        // state,
        // refreshSession,
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
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "center",
                // mt: 1,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mt: 2,
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
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "center",
                  // mt: 4,

                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                  height: { xs: "auto", md: "70vh" },
                  width: { xs: "auto", sm: "100%" },
                }}
              >
                <img
                  // src={`/assets/DALLE3_emotion_images/${currentQuestion.image}`}
                  ref={imageRef}
                  onLoad={handleImageLoad}
                  src={`https://open-crops-smartpaper.s3.ap-south-1.amazonaws.com/${currentQuestion.image}`}
                  alt={`Question ${currentQuestion.id}`}
                  style={{
                    // height: 500,
                    // width: theme.breakpoints.only("md") ? "80%" : "100%",
                    // border: "1.5px solid black",

                    border: "1.5px solid black",
                    objectFit: "contain",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
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
