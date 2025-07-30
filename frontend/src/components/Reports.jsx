import "./Reports.css";
import reports from "../assets/Reports.png";


const Reports = () => {
    return (
        <div className="reports-container">
            <div className="reports-image">
                <img src={reports} alt="Reports" />
            </div>
        </div>
    );
};

export default Reports;