import "./Statistics-Trends-Container.css";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import FutureRisk from "./FutureRisk";
import Statistics from "./Statistics"; 
import HistoricalTrends from "./HistoricalTrends";
import PreviousAlerts from "./PreviousAlerts";

const StatisticsTrends = () => {
    return (
        <div className='statistics-trends-container'>
            <div className="statistics-trends-wrapper">
                    <GridLayout
                        className="layout"
                        layout={[
                            // X is what column the item starts at
                            // Y is what row the item starts at
                            // W is how many columns the item spans
                            // H is how many rows the item spans
                            { i: 'future-risk', x: 0, y: 0, w: 1, h: 1 },
                            { i: 'statistics', x: 1, y: 0, w: 1, h: 1 },
                            { i: 'previous-alerts', x: 0, y: 1, w: 1, h: 1 },
                            { i: 'historical-trends', x: 1, y: 1, w: 1, h: 1 },

                        ]}
                        cols={2}  // Total columns
                        rowHeight={110}       
                        width={250}  
                        maxRows={2} // Max rows possible for grid
                        isResizable={false}   // Optional: turn off resizing, from the import
                        isDraggable={false}   // Static layout
                        >
                        <div key="future-risk" className="grid-item"><FutureRisk /></div>
                        <div key="statistics" className="grid-item"><Statistics /></div>
                        <div key="previous-alerts" className="grid-item"><PreviousAlerts /></div>
                        <div key="historical-trends" className="grid-item"><HistoricalTrends /></div>
                    </GridLayout>
            </div>
        </div>
    );
};

export default StatisticsTrends;
