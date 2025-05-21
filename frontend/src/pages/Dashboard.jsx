import "./Dashboard.css";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ActiveAlerts from "../components/ActiveAlerts";
import Graph from "../components/Graph";
import LiveFeed from "../components/LiveFeed";
import StatisticsTrendsContainer from "../components/Statistics-Trends-Container";


const Dashboard = () => {
    return (
        <div>
            <div className="dash-container">
                <div className="dash-content-wrapper">
                    <GridLayout
                        className="layout"
                        layout={[
                            // X is what column the item starts at
                            // Y is what row the item starts at
                            // W is how many columns the item spans
                            // H is how many rows the item spans
                            { i: 'alerts', x: 1, y: 0, w: 1, h: 1 },
                            { i: 'graph', x: 0, y: 0, w: 1, h: 1 },
                            { i: 'live-feed', x: 1, y: 1, w: 1, h: 1 },
                            { i: 'statistics-trends', x: 0, y: 1, w: 1, h: 1 },

                        ]}
                        cols={2}  // Total columns
                        rowHeight={260}       
                        width={625}  
                        maxRows={2} // Max rows possible for grid
                        isResizable={false}   // Optional: turn off resizing, from the import
                        isDraggable={true}   // Turn off dragging if we want to keep the layout static
                        compactType="horizontal" // Simple fix for now for the max rows issue but still can happen... Works better at least?
                        // https://github.com/react-grid-layout/react-grid-layout/issues/1278 ...
                        >
                        <div key="alerts" className="grid-item"><ActiveAlerts /></div>
                        <div key="graph" className="grid-item"><Graph /></div>
                        <div key="live-feed" className="grid-item"><LiveFeed /></div>
                        <div key="statistics-trends" className="grid-item"><StatisticsTrendsContainer /></div>
                    </GridLayout>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;