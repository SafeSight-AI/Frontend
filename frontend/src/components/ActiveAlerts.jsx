import "./ActiveAlerts.css";
import check from "../assets/check.png";
import exclamation from "../assets/exclamation.png";
import { useState } from 'react';

// these links both have actual good examples of how to use useState and useEffect
// https://react.dev/reference/react/useEffect
// https://react.dev/reference/react/useState

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


/* Production code, work in progress

    // API URL to fetch active alerts, replace with actual endpoint and is constant because will never have to change
    const apiUrl = "!!!""

    const ActiveAlerts = () => {
        const [alertActive, setAlert] = useState(false);
        useEffect(() => {
            // Call API
            const response = await fetch(apiUrl);

            ...

        });
    
    }

*/


  return (
    <div className='active-alerts-container'>
      <img
        src={alertActive ? exclamation : check}
        alt={alertActive ? "Danger" : "Safe"}
        className='alert-icon'
      />
      {/* Test button to simulate violation */}
      <button onClick={triggerAlert} className='trigger-button'>
        Simulate Violation
      </button>
    </div>
  );
};

export default ActiveAlerts;
