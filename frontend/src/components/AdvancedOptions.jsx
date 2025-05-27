import "./AdvancedOptions.css";
import advOptions from "../assets/AdvOptions.png";

const AdvancedOptions = () => {
    return (
        <div className="advanced-options">
            <div className="advanced-options-image">
                <img src={advOptions} alt="Advanced Options" />
            </div>
        </div>
    );
};

export default AdvancedOptions;