import axios from "axios";

export const SendSessionDataToDB1 = async (
  state: any,
  sessionid:any,
  age: any,
  gender: any,
  education: any,
  nationality: any
) => {
  const formData = {
    logType: "session",
    logData: {
      ...state,
      sessionid:sessionid,
      age: age,
      gender: gender,
      education: education,
      nationality: nationality,
      survey_start_timestamp: new Date().toLocaleTimeString(),
    },
  };

  try {
    const apiUrl =
      "https://3t64257wlvbsa7tjwimcusywtq0pfljx.lambda-url.ap-south-1.on.aws/";
    // "https://vh65jiyys2.execute-api.ap-south-1.amazonaws.com/default/ui-experiment-app-logger"

    const response = await axios.post(apiUrl, formData);

    if (response.status === 200) {
      console.log("Data sent");
      // navigate("/alignment/question", { state: { formData } });
    } else {
      console.error("Error:", response.statusText);
      // navigate("/alignment/question", { state: { formData } });
    }
  } catch (error) {
    console.error("Error:", error);
    // navigate("/alignment/question", { state: formData.logData });
  }
};
export const SendSessionDataToDB2 = async (finalData: any) => {
  const formData = {
    logType: "session",
    logData: {
      ...finalData,
      survey_end_timestamp: new Date().toLocaleTimeString(),
    },
  };

  try {
    const apiUrl =
      "https://3t64257wlvbsa7tjwimcusywtq0pfljx.lambda-url.ap-south-1.on.aws/";
    // "https://vh65jiyys2.execute-api.ap-south-1.amazonaws.com/default/ui-experiment-app-logger"

    const response = await axios.post(apiUrl, formData);

    if (response.status === 200) {
      console.log("Data sent");
      // navigate("/alignment/question", { state: { formData } });
    } else {
      console.error("Error:", response.statusText);
      // navigate("/alignment/question", { state: { formData } });
    }
  } catch (error) {
    console.error("Error:", error);
    // navigate("/alignment/question", { state: formData.logData });
  }
};

export const SendItemDataToDB = async (
  // state: any,
  response: any,
  responses: any,
  currentTime: any,
  imageLoadStartTime: any,
  value: number,
  questions: any,
  currentQuestionIndex: any
) => {
  const formData = {
    logType: "item_response",
    logData: {
      itemtype: response.itemtype,
      itemnumber: responses.length + 1,
      reaction_time: currentTime - imageLoadStartTime,
      image_filename: questions[currentQuestionIndex].image,
      rating_value: value,
      rating_timestamp: new Date().toLocaleTimeString(),
    },
  };

  try {
    const apiUrl =
      "https://3t64257wlvbsa7tjwimcusywtq0pfljx.lambda-url.ap-south-1.on.aws/";
    // "https://vh65jiyys2.execute-api.ap-south-1.amazonaws.com/default/ui-experiment-app-logger"

    const response = await axios.post(apiUrl, formData);

    if (response.status === 200) {
      console.log("Data sent");
      // navigate("/alignment/end", {
      //   state: {
      //     formData,
      //     eventtype: "survey_end",
      //     survey_image_preload_timestamp: imagePreloadTime,
      //   },
      // });
    } else {
      console.error("Error:", response.statusText);
      // navigate("/alignment/end", {
      //   state: {
      //     formData,
      //     eventtype: "survey_end",
      //     survey_image_preload_timestamp: imagePreloadTime,
      //   },
      // });
    }
  } catch (error) {
    console.error("Error:", error);
    // navigate("/alignment/end", {
    //   state: formData.logData,
    //   eventtype: "survey_end",
    //   survey_image_preload_timestamp: imagePreloadTime,
    // });
  }
};
// useEffect(() => {
//   const checkPageRefresh = () => {
//     // const navigationEntries = performance.getEntriesByType(
//     //   "navigation"
//     // ) as PerformanceNavigationTiming[];

//     if (
//       checkSessionOnReload.length > 0 &&
//       checkSessionOnReload[0].type === "reload"
//     ) {
//       // console.log(checkSessionOnReload[0].type);
//       // console.log(performance.getEntriesByType("navigation"));
//       // setRefreshSession(uuidv4());
//       window.location.href = "/alignment";

//       // console.log(newSession)
//     }
//   };

//   checkPageRefresh();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);