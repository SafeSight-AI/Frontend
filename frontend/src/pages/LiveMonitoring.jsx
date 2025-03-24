import React, { useState, useEffect } from 'react';
import './LiveMonitoring.css';

const LiveMonitoring = () => {
    const [fullResponse, setFullResponse] = useState({});
    const [responseMetadata, setResponseMetadata] = useState(null);
    const [responseDate, setResponseDate] = useState(null);

    const apiUrl = 'https://pfmthlmvvh.execute-api.us-east-1.amazonaws.com/prod/rekognition';
    const pollInterval = 5000;

    useEffect(() => {
        const fetchLatestResult = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch results");
                }

                const data = await response.json();
                const parsedBody = data.body ? JSON.parse(data.body) : {};

                const gmtDate = parsedBody.FullResponse.ResponseMetadata.HTTPHeaders.date; 
                const estDate = new Date(gmtDate).toLocaleString("en-US", {
                    timeZone: "America/New_York",
                    hour12: true,
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });
                setResponseDate(estDate);
                setFullResponse(parsedBody.FullResponse || {});
                setResponseMetadata(parsedBody.FullResponse?.ResponseMetadata || null);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        
        const interval = setInterval(fetchLatestResult, pollInterval);
        return () => clearInterval(interval);
    }, []);

    const formatConfidence = (confidence) => `${confidence.toFixed(2)}%`;

    return (
        <>
            <h2 className="live-monitoring-title">Live Monitoring Feed</h2>

            <div className="container">
                {/* Status Card */}
                <div className="card status-card">
                    <div className="status-container">
                        <h3>Connection Status:</h3>
                        <div className={`status-circle ${responseMetadata?.HTTPStatusCode === 200 ? 'live' : 'offline'}`}></div>
                        <span>{responseMetadata?.HTTPStatusCode === 200 ? 'Live' : 'Offline'}</span>
                    </div>
                </div>

                {/* Detection Response */}
                {responseMetadata?.HTTPStatusCode === 200 && fullResponse.Persons && (
                    <div className="detection-response">
                        <h2>Last Detection Response</h2>
                        <h3>Number of People Detected: {fullResponse.Persons.length}</h3>

                        {/* Each person inside their own container */}
                        <div className="persons-container">
                            {fullResponse.Persons.map((person, index) => {
                                // Find head covering detection
                                const headCoverDetection = person.BodyParts.find(
                                    (bodyPart) => bodyPart.Name === "HEAD"
                                )?.EquipmentDetections.find(
                                    (detection) => detection.Type === "HEAD_COVER"
                                );

                                return (
                                    <div key={index} className="person-box">
                                        <h4>Person {index + 1}:</h4>
                                        <span className={headCoverDetection ? "checkmark green" : "checkmark red"}>
                                            {headCoverDetection ? "✅ Head Cover Detected" : "❌ No Head Cover Detected"}
                                        </span>
                                        {headCoverDetection && (
                                            <p className="confidence-text">
                                                Confidence: {formatConfidence(headCoverDetection.Confidence)}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <h3><strong>Scan Time :</strong> {responseDate}</h3> 
                    </div>
                )}
            </div>
        </>
    );
};

export default LiveMonitoring;
