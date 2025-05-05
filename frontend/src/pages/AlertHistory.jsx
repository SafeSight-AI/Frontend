import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Line } from "react-chartjs-2";
import { ClientSideRowModelModule, ValidationModule, TextFilterModule, NumberFilterModule, DateFilterModule, ModuleRegistry , CellStyleModule} from "ag-grid-community";
import Chart from "chart.js/auto";
import "../../node_modules/ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CellStyleModule
]);

const apiUrl = "https://pfmthlmvvh.execute-api.us-east-1.amazonaws.com/prod/rekognition/all";

function AlertHistory() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);

    const columnDefs = [
        { headerName: "#", valueGetter: "node.rowIndex + 1", flex: 1, cellStyle: { textAlign: "left" } },
        { headerName: "Alert ID", field: "fileName", sortable: true, filter: true, flex: 3, cellStyle: { textAlign: "left" } },
        { headerName: "Head Coverings Detected", field: "headCoverings", sortable: true, filter: true, 
          valueFormatter: (params) => params.value.length > 0 ? params.value.map(hc => `Type: ${hc.Type}, Confidence: ${hc.Confidence.toFixed(2)}%`).join(", ") : "No Head Coverings", 
          flex: 2, cellStyle: { textAlign: "left" } },
        { headerName: "Persons Detected", field: "persons", sortable: true, filter: true, valueFormatter: (params) => params.value.length, flex: 2, cellStyle: { textAlign: "left" } },
        { headerName: "Date", field: "date", sortable: true, filter: true, flex: 2, cellStyle: { textAlign: "left" } }
    ];

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
                    persons: details.FullResponse?.Persons || [],
                    date: details.FullResponse.ResponseMetadata?.HTTPHeaders?.date || "No Date Provided",
                }));

                const filteredAlerts = parsedAlerts.filter(alert => 
                    alert.headCoverings.length === 0
                );

                setAlerts(filteredAlerts);
                generateChartData(filteredAlerts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchS3Files();
    }, []);

    const generateChartData = (alerts) => {
        const alertDates = alerts.map(alert => {
            const dateStr = alert.date;
            const datePart = dateStr.split(",")[1];
            const day = datePart.split(" ")[1];
            const month = datePart.split(" ")[2];
            const year = datePart.split(" ")[3];
            
            function monthAbbreviationToNumber(month) {
                const monthMap = {
                    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
                    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
                };
                return monthMap[month.toLowerCase()] || "Invalid month abbreviation";
            }
            
            const formattedDate = `${year}-${monthAbbreviationToNumber(month)}-${String(day).padStart(2, "0")}`;
            return formattedDate;
        });
    
        const uniqueDates = [...new Set(alertDates)].sort((a, b) => new Date(a) - new Date(b));
        const minDate = new Date(uniqueDates[0]);
        const maxDate = new Date(uniqueDates[uniqueDates.length - 1]);
        const dateLabels = [];
        const alertCount = [];
    
        let currentDate = new Date(minDate);
    
        while (currentDate <= maxDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            dateLabels.push(dateString);
            alertCount.push(alertDates.filter(date => date === dateString).length);
    
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        setChartData({
            labels: dateLabels,
            datasets: [
                {
                    label: "Number of Alerts",
                    data: alertCount,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                },
            ],
        });
    };

    return (
        <div className="container">
            <h2>Alert History</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>No chart data available.</p>
            )}

            <h2>Alerts</h2>
            {!loading && !error && alerts.length > 0 ? (
                <div className="ag-theme-alpine-dark">
                    <AgGridReact
                        rowData={alerts}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                    />
                </div>
            ) : (
                !loading && <p>No alerts found.</p>
            )}
        </div>
    );
}

export default AlertHistory;
