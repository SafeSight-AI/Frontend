import "./Home.css";
import image from "../assets/Workers.jpeg"; // Make sure this image path is valid
import wsu_tenneco from "../assets/WSUTenneco.jpg";
import Katie from "../assets/Katie.jpg";
import Drew from "../assets/Drew.jpg";
import Chris from "../assets/Chris.jpg";
import Abdullahi from "../assets/Abdullahi.jpg";

// Dummy team data with image paths
const teamMembers = [
  { name: "Katie Pflum", major: "Global Supply Chain Management & Industrial Engineering", role: "Chief Executive Officer (CEO) & Head of Strategy", image: Katie },
  { name: "Drew Adomaitis​", major: "Computer Science", role: "Chief Technology Officer (CTO)", image: Drew },
  { name: "Chris Cooley", major: "Computer Science", role: "Lead Front-End Developer & UX Designer", image: Chris },
  { name: "Abdullahi Ayantayo", major: "Computer Science", role: "Director of Data Science & AI Optimization", image: Abdullahi }
];

function Title() {
    return (
        <header className="title-container">
            <h1>Welcome to Safesight AI</h1>
        </header>
    );
}

function Home() {
    return (
      <div>
        <Title />
        <div className="home-container">
            <div className="content-wrapper">
                <img 
                    src={image}
                    alt="Safesight AI" 
                    className="home-image"
                />
                <div className="text-content">
                  <h1>Our Mission</h1>
                    <p>
                        Our mission is to revolutionize workplace safety by providing an intuitive PPE detection system. 
                        With near real-time monitoring, proactive alerts, and comprehensive reporting, we aim to reduce 
                        injuries and enhance compliance on plant floors worldwide.
                    </p>
                </div>
            </div>
        </div>
        <div className="journey-container">
            <div className="content-wrapper"> 
                <div className="journey-content">
                  <h1>Our Journey</h1>
                    <p><strong>Born from a real-world challenge:</strong> This solution was developed in collaboration with Tenneco, a leading automotive supplier and our first projected customer.</p>
                    <p><strong>Designed to solve a critical pain point:</strong> Tenneco faced issues in PPE compliance and safety enforcement, which this system addresses.</p>
                    <p><strong>Tested and piloted within Tenneco:</strong> Our system will be implemented in Tenneco’s operations, with insights shared across their Apollo supplier network.</p>
                </div>
                <img 
                    src={wsu_tenneco}
                    alt="WSU and Tenneco Logos" 
                    className="journey-image"
                />
            </div>
        </div>

        <div className="team-container">
            <h1>Meet the Team</h1>
            <div className="team-cards">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        <div className="team-card-header">
                            <img src={member.image} alt={member.name} className="team-card-image" />
                            <h2>{member.name}</h2>
                        </div>
                        <div className="team-card-body">
                            <p><strong>Major:</strong> {member.major}</p>
                            <p><strong>Role:</strong> {member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
}

export default Home;
