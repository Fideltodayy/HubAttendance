import React, { useState } from "react";
import TechHubBooking from "./components/TechHubBooking";
import LoginComponent from "./components/LoginComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
    intervalId = null;
    if (router.query.queryType === "SignIn") {
      console.log("Sign In is Fetching", VERIFIER_BACKEND_API_URL_FOR_SIGNIN);
      fetchData(VERIFIER_BACKEND_API_URL_FOR_SIGNIN);
 } else if (router.query.queryType === "ProveGraduate") {
      fetchData(VERIFIER_BACKEND_API_URL_FOR_PROOF_VERIRY);
 }
 }, [router.query.queryType]);

  const fetchData = async (url) => {
    console.log(`Fetching data from ${url}`);
    setLoading(true);
    try {
      const response = await axios.get(url);
      const contentType = response.headers.get("content-type");
      console.log(response.data);

      if (contentType && contentType.includes("application/json")) {
        const data = response.data;

        setVerificationQuery(JSON.stringify(data));
        console.log();
        const callbackUrl = data.body.callbackUrl;
        console.log(`callbackUrl: ${callbackUrl}`);
        // Create a URL object
        const urlObj = new URL(callbackUrl);

        // Extract the sessionId using URLSearchParams
        const sessionId = urlObj.searchParams.get("sessionId");

        console.log(`sessionId: ${sessionId}}`);
        listenForResponse(sessionId);
 } else {
        console.error("Error: Expected JSON response");
 }
 } catch (error) {
      console.error("Error:", error);
 } finally {
      setLoading(false);
 }
 };

  const listenForResponse = async (sessionId) => {
    console.log("Listening for response... SessionId: ", sessionId);
    if (!sessionId) {
      console.error("Error: sessionId is missing");
      return;
 }

    const interval = 5 * 1000; // 5 seconds
    const duration = 2 * 60 * 1000; // 2 minutes

    intervalId = setInterval(() => {
      if (router.query.queryType === "SignIn") {
        checkAuthStatus(sessionId);
 } else if (router.query.queryType === "ProveGraduate") {
        checkGraduationStatus(sessionId);
 }
 }, interval);

    // Stop the interval after 2 minutes
    //setTimeout(() => clearInterval(intervalId), duration);
 };

  const checkAuthStatus = async (sessionId) => {
    try {
      const response = await axios.get(VERIFIER_BACKEND_API_URL_FOR_STATUS, {
        params: {
          sessionId: sessionId,
 },
 });

      const data = response.data;
      console.log(data);
      if (data.body?.message) {
        console.log(intervalId);
        clearInterval(intervalId);
        console.log(` Message: ${data.body.message}`);

        /*TODO: You might need to handle ZWT token in realworld applicaiton  */
        // Store the user is graduate in the local storage
        localStorage.setItem("isLogin", "true");

        router.push("/ProfileEntryPage");
 }
 } catch (error) {
      console.error("Error:", error);
 }
 };

  const checkGraduationStatus = async (sessionId) => {
    try {
      const response = await axios.get(VERIFIER_BACKEND_API_URL_FOR_STATUS, {
        params: {
          sessionId: sessionId,
 },
 });
      const data = response.data;
      console.log(data);
      console.log(intervalId);
      clearInterval(intervalId);
      if (data.body?.message) {
        console.log(` Message: ${data.body.message}`);
        /*TODO: You might need to handle ZWT token in realworld applicaiton */
        // Handle success case
        localStorage.setItem("isGraduate", "true");
        router.push("/JobBoardPage");
 }
 } catch (error) {
      console.error("Error:", error);
 }
 };


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <TechHubBooking />
      ) : (
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
