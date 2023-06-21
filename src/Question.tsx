import { useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';

import question1 from '../src/assets/image1.png';
import question2 from '../src/assets/image2.png';
import question3 from '../src/assets/image3.png';
import question4 from '../src/assets/image4.png';
import { useLocation, useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    image: question1,
  },
  {
    id: 2,
    image: question2,
  },
  {
    id: 3,
    image: question3,
  },
  {
    id: 4,
    image: question4,
  },
];

const Question = () => {
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [responses, setResponses] = useState<Array<{ responseTime: number; answer: string }>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const {state} = useLocation()
  const navigate = useNavigate();
  
  useEffect(()=>{ 
    if(currentQuestionIndex===questions.length-1){
      navigate("/end",{state:{...state,...responses}})

    }

    console.log(state)
  },[currentQuestionIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/end",{state:{...state,...responses}})
    }
  }, [timer]);


  const handleLike = () => {
    const currentTime = 600 - timer;
    const response = {
      responseTime: currentTime,
      answer: 'Like',
      imageName: questions[currentQuestionIndex].image
    };
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    setResponses((prevResponses) => [...prevResponses, response]);
    console.log(responses);

  };

  const handleDislike = () => {
    const currentTime = 600 - timer;
    const response = {
      responseTime: currentTime,
      answer: 'Dislike',
      imageName: questions[currentQuestionIndex].image
    };
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    //add image name, user's age, nationality,
    setResponses((prevResponses) => [...prevResponses, response]);

    console.log(responses);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const answeredQuestions = currentQuestionIndex + 1;
    const totalQuestions = questions.length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Question
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <img src={currentQuestion.image} alt={`Question ${currentQuestion.id}`} style={{ height: 400 }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="success" size="large" onClick={handleLike}>
          Like 👍
        </Button>
        <Button variant="contained" color="error" size="large" onClick={handleDislike} sx={{ ml: 2 }}>
          Dislike 👎
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'fixed',
          top: 20,
          right: 100,
          p: 1,
          zIndex: 1,
          backgroundColor:'lightgray',
          borderRadius: 4,
        }}
      >
        <Typography variant="body1" sx={{ fontSize: 26 }}>
          {formatTime(timer)}
        </Typography>
      </Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, width: '80%' }}>
        <CircularProgress variant="determinate" value={timer / 60} size={96} thickness={4} />
        <Typography variant="body1" component="span" sx={{ ml: 2, fontSize: 20 }}>
          {formatTime(timer)}
        </Typography>
      </Box> */}
      <LinearProgress variant="determinate" value={calculateProgress()} sx={{ mt: 4, width: '50%' }} />
    </Box>
  //   <Box
  //   sx={{
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     mt: 4,
  //   }}
  // >
  //   <Typography variant="h4" component="h2" gutterBottom>
  //     Question
  //   </Typography>
  //   <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  //     <img
  //       src={currentQuestion.image}
  //       alt={`Question ${currentQuestion.id}`}
  //       style={{ height: 400 }}
  //     />
  //   </Box>
  //   <Box sx={{ display: "flex", justifyContent: "center", mt: 4,  }}>
  //     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
  //       <Button
  //         variant="contained"
  //         color="secondary"
  //         size="large"
  //         onClick={() => handleRatingChange(value)}
  //         sx={{margin:'.3rem'}}
  //       >
  //         {value}
  //       </Button>
  //     ))}
  //   </Box>
  //   <Box  
  //     sx={{
  //       display: "flex",
  //       justifyContent: "flex-end",
  //       alignItems: "center",
  //       position: "fixed",
  //       top: 20,
  //       right: 100,
  //       p: 1,
  //       zIndex: 1,
  //       backgroundColor: "lightgray",
  //       borderRadius: 4,
  //     }}
  //   >
  //     <Typography variant="body1" sx={{ fontSize: 26 }}>
  //       {formatTime(timer)}
  //     </Typography>
  //   </Box>

  //   <LinearProgress
  //     variant="determinate"
  //     value={calculateProgress()}
  //     sx={{ mt: 4, width: "50%" }}
  //   />
  // </Box>
  );
};

export default Question;
