import "./ActiveAlerts.css";
import check from "../assets/check.png";
import exclamation from "../assets/exclamation.png";
import { useState, useEffect } from 'react';

// these links both have actual good examples of how to use useState and useEffect
// https://react.dev/reference/react/useEffect
// https://react.dev/reference/react/useState


/* TEST FOR ACTIVE ALERTS COMPONENT
const ActiveAlerts = () => {
    // State to manage alert status
    const [alertActive, setAlert] = useState(false);
    // Function to simulate an alert trigger
    const triggerAlert = () => {
        if (!alertActive) {
            // Set alert to active state
            setAlert(true);
            // Simulate a violation alert for 1 second, set back to safe state after
            setTimeout(() => {setAlert(false); }, 1000);
        }
};
*/


// Production code, work in progress

// API URL to fetch active alerts, replace with actual endpoint and is constant because will never have to change
const apiUrl = "https://1pdqypk59l.execute-api.us-east-2.amazonaws.com/prod/get-rekognition-result";

const ActiveAlerts = () => {
    const [alertActive, setAlert] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch alert status from the API when the component mounts
        const fetchAlertStatus = async () => {
          try {
            // call api and convert response to json
            const response = await fetch(apiUrl);
            const jsonResponse = await response.json();
            const data = JSON.parse(jsonResponse.body);

            /*
            const parsedAlerts = Object.entries(data).map(([fileName, details]) => ({
                fileName,
                headCoverings: details.HeadCoverings || [],
                persons: details.FullResponse?.Persons || [],
                date: details.FullResponse.ResponseMetadata?.HTTPHeaders?.date || "No Date Provided",
            }));
            */
            
            // similar to above, but only getting persons detected and head coverings detected
            const parsedAlerts = Object.entries(data).map(([fileName, details]) => ({
              fileName,
              persons: details.FullResponse?.Persons || [],
              headCoverings: details.HeadCoverings || [],
            }));

            // .some is used to check if at least one element in the array meets the condition of someone missing ppe
            // if no one is missing hardhat ppe, then alertActive will be false else true
            const violationDetected = parsedAlerts.some(alert => 
              alert.headCoverings.length === 0 
              && alert.persons.length > 0 // atleast one person detected
            );

            if (violationDetected) {
                setAlert(true);
                setTimeout(() => setAlert(false), 10000); // Flash alert for 10 seconds
            }

          } catch (error) {
            // log error and show error message
            console.error("Error fetching alert status from rekognition:", error);
            setError(error.message);
          }
        };

        // CHATGPT ADDED THIS NEED TO ASK ABOUT !!!!!!!!!!!!!!!!!!!!!!!1
        // 🔁 Call fetchAlertStatus every 5 seconds
        const interval = setInterval(fetchAlertStatus, 20000);

        // 🧹 Clean up the interval when component unmounts
        return () => clearInterval(interval);
    }, []);
    



  return (
    <div className="active-alerts-container">
      <img
        src={alertActive ? exclamation : check}
        alt={alertActive ? "Danger" : "Safe"}
        className="alert-icon"
      />
      <p className="alert-text">
        {alertActive ? "❗ ALERT - Violation Detected" : "✅ All Clear"}
      </p>
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default ActiveAlerts;





