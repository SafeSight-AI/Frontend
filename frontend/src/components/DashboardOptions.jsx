import "./DashboardOptions.css";
import dashOptions from "../assets/DashOptions.png";


const DashboardOptions = () => {
    return (
        <div className="dashboard-options">
            <div className="dashboard-options-image">
                <img src={dashOptions} alt="Dashboard Options" />
            </div>
        </div>
    );
};

export default DashboardOptions;