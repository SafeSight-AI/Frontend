import "./UserInformation.css";
import userInfo from "../assets/UserInfo.png";


const UserInformation = () => {
    return (
        <div className="user-information">
            <div className="user-info-image">
                <img src={userInfo} alt="User Avatar" />
            </div>
        </div>
    );
};

export default UserInformation;
