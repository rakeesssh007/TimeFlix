import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import ActivityList from '../components/ActivityList'; // Fixed import path
import '../styles/BingeTimePage.css';
function BingeTimePage() {
  const [isCalculating, setIsCalculating] = useState(true);
  const [bingeHours, setBingeHours] = useState(0);
  const [activities, setActivities] = useState([]);
  const [shownActivities, setShownActivities] = useState([]);
  const videoRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  
  const navigate = useNavigate();
  const { basket, calculateTotalBingeTime } = useBasket();
  
  const activityList = [
    { text: '💃 danced non-stop to your favorite song', time: 1.5 },
    { text: '🍛 cooked a feast for your family', time: 3 },
    { text: '🚗 traveled from Chennai to Hyderabad and back', time: 20 },
    { text: '🔥 fried 40 dosas at a roadside stall', time: 0.25 },
    { text: '📚 finished reading 5 chapters of your favorite book', time: 2 },
    { text: '🥵 argued with relatives about your job', time: 1 },
    { text: '🛵 completed 120 Swiggy deliveries on a Scooty Pep', time: 0.5 },
    { text: '🛕 attended 10 full-length Telugu weddings', time: 5 },
    { text: '🎮 won 100 chicken dinners in PUBG with your squad', time: 0.75 },
    { text: '📞 heard "hello, who this?" from unknown numbers', time: 0.1 }
  ];
  
  useEffect(() => {
    if (basket.length === 0) {
      navigate('/');
      return;
    }
    
    const calculateBingeTime = async () => {
      const hours = await calculateTotalBingeTime();
      setBingeHours(hours);
      
      setTimeout(() => {
        setIsCalculating(false);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 2000);
    };
    
    calculateBingeTime();
  }, [basket, calculateTotalBingeTime, navigate]);
  
  useEffect(() => {
    if (!isCalculating && activities.length === 0) {
      // Select 5 random activities
      const shuffled = [...activityList].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      
      setActivities(selected);
      setShownActivities(selected);
    }
  }, [isCalculating, activities]);
  
  const handleVideoEnd = () => {
    if (playCount < 2) {
      setPlayCount(prev => prev + 1);
      if (videoRef.current) {
        videoRef.current.play();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };
  
  const handleParrotClick = () => {
    const remainingActivities = activityList.filter(
      activity => !shownActivities.includes(activity)
    );
    
    if (remainingActivities.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingActivities.length);
      const newActivity = remainingActivities[randomIndex];
      
      setActivities(prev => [...prev, newActivity]);
      setShownActivities(prev => [...prev, newActivity]);
    }
  };
  
  return (
    <div className="binge-time-page">
      {isCalculating && (
        <div className="calculating-overlay">
          <div className="calculating-popup">
            <p>Calculating binge time...</p>
          </div>
        </div>
      )}
      
      <div className={`content ${isCalculating ? 'hidden' : ''}`}>
        <h2>POV: Your face after seeing the number</h2>
        
        <video 
          ref={videoRef}
          className="oh-no-video"
          onEnded={handleVideoEnd}
          muted={false}
        >
          <source src="https://media.tenor.com/1KvOaUwjQK4AAAPo/oh-no-no-no.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="binge-result">
          <h3>Total Binge Time:</h3>
          <div className="time-display">
            {Math.round(bingeHours)} hours
            <span>(approx. {Math.round(bingeHours / 24)} days)</span>
          </div>
        </div>
        
        <ActivityList activities={activities} bingeHours={bingeHours} />
        
        <button 
          className="parrot-btn"
          onClick={handleParrotClick}
          disabled={shownActivities.length >= activityList.length}
        >
          Ask the Parrot 🦜
        </button>
      </div>
      
      <footer>
        <ul className="socials">
          <li>
            <a href="https://github.com/rakeesssh007" target="_blank" rel="noreferrer">
              <img className="static" src="images/Static-logos/github-1080px.png" alt="GitHub" />
              <img className="gif" src="images/Animated-logos/Github-1200px.gif" alt="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rakesh-chowdary-965663292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
              <img className="static" src="images/Static-logos/linkedin-1080px.png" alt="LinkedIn" />
              <img className="gif" src="images/Animated-logos/Linkedin-1080px.gif" alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/xExeheNU" target="_blank" rel="noreferrer">
              <img className="static" src="images/Static-logos/discord-1200px.png" alt="Discord" />
              <img className="gif" src="images/Animated-logos/Discord-1080px.gif" alt="Discord" />
            </a>
          </li>
          <li>
            <a href="https://x.com/RakeshC007?t=Ae0j1lM2-jMTiDVTUfB7kg&s=09" target="_blank" rel="noreferrer">
              <img className="static" src="images/Static-logos/twitter-1080px.png" alt="Twitter" />
              <img className="gif" src="images/Animated-logos/twitter-1080px.gif" alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/iamrakesh._007/profilecard/?igsh=MmxvMG9yeGN3eXI0" target="_blank" rel="noreferrer">
              <img className="static" src="images/Static-logos/instagram-1200px.png" alt="Instagram" />
              <img className="gif" src="images/Animated-logos/Instagram-1200px.gif" alt="Instagram" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default BingeTimePage;