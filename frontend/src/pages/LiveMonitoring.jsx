import React, { useState, useEffect } from 'react';
import './LiveMonitoring.css';  // Import the CSS file

const LiveMonitoring = () => {
    const [headCoverings, setHeadCoverings] = useState([]);
    const [fullResponse, setFullResponse] = useState({});
    const [responseMetadata, setResponseMetadata] = useState(null);

    const apiUrl = 'https://pfmthlmvvh.execute-api.us-east-1.amazonaws.com/prod/rekognition';
    const pollInterval = 5000; // Poll AWS every 5 seconds

    useEffect(() => {
        const fetchLatestResult = async () => {
            try {
                // Ping the API for a response
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch results");
                }

                const data = await response.json();
                // Parse the body and check for necessary properties
                const parsedBody = data.body ? JSON.parse(data.body) : {};
                // Store HeadCoverings if available
                const newHeadCoverings = parsedBody.HeadCoverings || [];
                // Store FullResponse with Persons data if available
                const newFullResponse = parsedBody.FullResponse || {};
                // Store ResponseMetadata if available
                const newResponseMetadata = parsedBody.FullResponse.ResponseMetadata || null;

                // Update state with new data
                setHeadCoverings(newHeadCoverings);
                setFullResponse(newFullResponse);
                setResponseMetadata(newResponseMetadata);

            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        // Poll on a repeating interval
        const interval = setInterval(fetchLatestResult, pollInterval);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);
    
    const formatConfidence = (confidence) => {
      return `${(confidence).toFixed(2)}%`;
    };

    return (
        <>
            <h2 className="live-monitoring-title">Live Monitoring Feed</h2>

            <div className="container">
                {/* Card for Status */}
                <div className="card status-card">
                    <div className="status-container">
                    <h3>Status:</h3>
                    <div class="item"></div>
                    <div
                            className={`status-circle ${responseMetadata?.HTTPStatusCode === 200 ? 'live' : 'offline'}`}
                        ></div>
                        <span>{responseMetadata?.HTTPStatusCode === 200 ? 'Live' : 'Offline'}</span>
                    </div>
                </div>

                {/* Card for Number of Persons Detected */}
                {responseMetadata?.HTTPStatusCode === 200 && fullResponse.Persons && (
                    <div>
                        <h2>Detection Response</h2>
                        <div className="card persons-card">
                            <h3>Number of People Detected: {fullResponse.Persons.length}</h3>
                            {fullResponse.Persons.map((person, personIndex) => (
                                <div key={personIndex} className="person-card">
                                    <h4>Person {personIndex + 1}:</h4>
                                    {person.BodyParts.map((bodyPart, bodyPartIndex) => (
                                        <div key={bodyPartIndex}>
                                            {bodyPart.EquipmentDetections.length > 0 && (
                                                <div>
                                                    {bodyPart.EquipmentDetections.map((detection, detectionIndex) => (
                                                        <div key={detectionIndex}>
                                                            {/* Head Covering Detection */}
                                                            {detection.Type === "HEAD_COVER" ? (
                                                                <span className="checkmark green">
                                                                    ✅ Head Cover Detected
                                                                </span>
                                                            ) : (
                                                                <span className="checkmark red">
                                                                    ❌ No Head Cover Detected
                                                                </span>
                                                            )}
                                                            <h3>Detected PPE:</h3>
                                                            <strong>Type:</strong> {detection.Type}
                                                            <br />
                                                            <strong>Confidence:</strong> {formatConfidence(detection.Confidence)}
                                                            <br />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LiveMonitoring;
