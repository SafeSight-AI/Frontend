import "./Dashboard.css";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ActiveAlerts from "../components/ActiveAlerts";
import Graph from "../components/Graph";
import LiveFeed from "../components/LiveFeed";
import StatisticsTrendsContainer from "../components/Statistics-Trends-Container";
import UserInformation from "../components/UserInformation";
import Reports from "../components/Reports";
import DashboardOptions from "../components/DashboardOptions";
import AdvancedOptions from "../components/AdvancedOptions";


const Dashboard = () => {
    return (
        <div>
            <div className="dash-container">
                <div className="dash-content-wrapper">
                    <GridLayout
                        className="layout1"
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
                        rowHeight={270}       
                        width={605}  
                        maxRows={2} // Max rows possible for grid
                        isResizable={false}   // Optional: turn off resizing, from the import
                        isDraggable={false}   // Turn off dragging if we want to keep the layout static
                        compactType="horizontal" // Simple fix for now for the max rows issue but still can happen... Works better at least?
                        // https://github.com/react-grid-layout/react-grid-layout/issues/1278 ...
                        >
                        <div key="alerts" className="grid-item"><ActiveAlerts /></div>
                        <div key="graph" className="grid-item"><Graph /></div>
                        <div key="live-feed" className="grid-item"><LiveFeed /></div>
                        <div key="statistics-trends" className="grid-item"><StatisticsTrendsContainer /></div>
                    </GridLayout>

                    <GridLayout
                        className="layout2"
                        layout={[
                            // X is what column the item starts at
                            // Y is what row the item starts at
                            // W is how many columns the item spans
                            // H is how many rows the item spans
                            { i: 'user-info', x: 0, y: 0, w: 1, h: 1 },
                            { i: 'reports', x: 0, y: 1, w: 1, h: 1 },
                            { i: 'dashboard-options', x: 0, y: 2, w: 1, h: 1 },
                            { i: 'advanced-options', x: 0, y: 3, w: 1, h: 1 },

                        ]}
                        cols={1}  // Total columns
                        rowHeight={126}       
                        width={625}  
                        maxRows={4} // Max rows possible for grid
                        isResizable={false}   // Optional: turn off resizing, from the import
                        isDraggable={false}   // Turn off dragging if we want to keep the layout static
                        >
                        <div key="user-info" className="grid-item"><UserInformation /></div>
                        <div key="reports" className="grid-item"><Reports /></div>
                        <div key="dashboard-options" className="grid-item"><DashboardOptions /></div>
                        <div key="advanced-options" className="grid-item"><AdvancedOptions /></div>
                    </GridLayout>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;