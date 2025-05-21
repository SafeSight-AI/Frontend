import "./Dashboard.css";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ActiveAlerts from "../components/ActiveAlerts";
import Graph from "../components/Graph";


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
                            { i: 'alerts', x: 0, y: 1, w: 1, h: 2 },
                            { i: 'graph', x: 0, y: 1, w: 1, h: 2 }
                        ]}
                        cols={3}  // Total columns
                        rowHeight={150}       
                        width={1168}          
                        isResizable={false}   // Optional: turn off resizing
                        // isDraggable={false}   // Turn off dragging if we want to keep the layout static
                        >
                        <div key="alerts" className="grid-item"><ActiveAlerts /></div>
                        <div key="graph" className="grid-item"><Graph /></div>
                    </GridLayout>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;