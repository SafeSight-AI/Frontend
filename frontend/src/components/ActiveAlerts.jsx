import "./ActiveAlerts.css";
import check from "../assets/check.png";
import exclamation from "../assets/exclamation.png";
import { useState, useEffect, useRef } from 'react';

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
const apiUrl = "https://pfmthlmvvh.execute-api.us-east-1.amazonaws.com/prod/rekognition/latest";

const ActiveAlerts = () => {
    const [alertActive, setAlert] = useState(false);
    const [error, setError] = useState(null);
    const lastAlertedFileRef = useRef(null);


    useEffect(() => {
        // Fetch alert status from the API when the component mounts
        const fetchAlertStatus = async () => {
          try {
            // call api and convert response to json
            const response = await fetch(apiUrl);
            const jsonResponse = await response.json();
            const data = JSON.parse(jsonResponse.body);
            console.log("Raw API data:", data);
            const alertId = data.imageId || data.timestamp || 'default';
            
            const headCoverings = data.HeadCoverings || [];
            const persons = data.FullResponse?.Persons || [];

            console.log("HeadCoverings:", headCoverings);
            console.log("Persons:", persons);
            
            if (
              headCoverings.length === 0 &&
              persons.length > 0 &&
              lastAlertedFileRef.current !== alertId
            ) {
              console.log("New alert triggered from latest image");
              setAlert(true);
              lastAlertedFileRef.current = alertId; // Mark this alert as handled
              setTimeout(() => setAlert(false), 5000); // Auto reset alert
            } else {
              console.log("No new alert or already alerted.");
            }
          } catch (error) {
            console.error("Error fetching alert status from rekognition:", error);
            setError(error.message);
          }
        };


        const interval = setInterval(fetchAlertStatus, 3000);
        //fetchAlertStatus();

        // 🧹 Clean up the interval when component unmounts
        return () => clearInterval(interval);
    }, []); // Depend on lastAlertedFile to avoid re-alerting for the same image
    



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
        <button className="alert-button" onClick={() => setAlert(false)}>
          {"Reset Alert " + (alertActive ? "to Safe" : "Status")}
        </button>
    </div>
  );
};

export default ActiveAlerts;





// 