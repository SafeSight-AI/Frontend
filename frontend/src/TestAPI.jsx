import { useState, useEffect } from "react";

const TestAPI = () => {
    const [result, setResult] = useState(null);
    const [lastFileName, setLastFileName] = useState(null);

    const apiUrl = 'https://pfmthlmvvh.execute-api.us-east-1.amazonaws.com/prod/rekognition';
    const pollInterval = 5000; // Poll AWS every 5 seconds

    useEffect(() => {
        const fetchLatestResult = async () => {
            try {
                // Ping the api for a response
                const response = await fetch(apiUrl);
                if(!response.ok) {
                    throw new Error("Failed to fetch results");
                }

                const data = await response.json();

                // Extract the initial latest file
                const newFileName = JSON.stringify(data);

                // Only update the UI if a new file was added
                if(newFileName !== lastFileName) {
                    setResult(data);
                    setLastFileName(newFileName);
                }
            } catch(error) {
                console.error("Error fetching results:", error);
            }
        };

        // Poll on a repeating interval
        const interval = setInterval(fetchLatestResult, pollInterval);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [lastFileName]);

    return (
        <div>
            <h2>Rekognition Results</h2>
            {result ? (
                <pre>{JSON.stringify(result, null, 2)}</pre>
            ) : (
                <p>Waiting for new results...</p>
            )}
        </div>
    );
}

export default TestAPI;