import axios from "axios";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
// Function to make the POST API request

export const SendDataToDB = async (
  state: any,
  age: number,
  gender: string,
  education: string,
  nationality: string
) => {
  const navigate = useNavigate();
  const formData = {
    log_type: "session",
    logData: {
      ...state,
      age: age,
      gender: gender,
      education: education,
      nationality: nationality,
      survey_start_timestamp: new Date().toISOString(),
    },
  };

  try {
    const apiUrl =
      "https://3t64257wlvbsa7tjwimcusywtq0pfljx.lambda-url.ap-south-1.on.aws/";

    const response = await axios.post(apiUrl, formData);

    if (response.status === 200) {
      console.log("Data sent");
      navigate("/alignment/question", { state: { formData } });
    } else {
      console.error("Error:", response.statusText);
      navigate("/alignment/question", { state: { formData } });
    }
  } catch (error) {
    console.error("Error:", error);
    navigate("/alignment/question", { state: formData.logData });
  }
};
