import { useState, useEffect } from "react";

const apiUrl = "https://bow5d7w7r3.execute-api.us-east-1.amazonaws.com/prod/getResultsList";

function AlertHistory() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchS3Files() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonResponse = await response.json();

                const data = JSON.parse(jsonResponse.body);

                const parsedAlerts = Object.entries(data).map(([fileName, details]) => ({
                    fileName,
                    headCoverings: details.HeadCoverings || [],
                    persons: details.FullResponse?.Persons || []
                }));

                setAlerts(parsedAlerts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchS3Files();
    }, []);

    return (
        <div className="container">
            <h2>Alert History</h2>
            <p>View past alerts here.</p>

            {loading && <p>Loading....</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {!loading && !error && alerts.length > 0 ? (
                <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Head Coverings Detected</th>
                            <th>Persons Detected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map((alert, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{alert.fileName}</td>
                                <td>
                                    {alert.headCoverings.length > 0 ? (
                                        alert.headCoverings.map((hc, i) => (
                                            <div key={i}>
                                                Type: {hc.Type} (Confidence: {hc.Confidence.toFixed(2)}%)
                                            </div>
                                        ))
                                    ) : (
                                        <span>No Head Coverings</span>
                                    )}
                                </td>
                                <td>{alert.persons.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No alerts found.</p>
            )}
        </div>
    );
}

export default AlertHistory;
