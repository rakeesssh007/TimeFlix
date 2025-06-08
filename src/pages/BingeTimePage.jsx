import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import ActivityList from '../components/ActivityList';
import '../styles/BingeTimePage.css';

function BingeTimePage() {
  const [isCalculating, setIsCalculating] = useState(true);
  const [bingeHours, setBingeHours] = useState(0);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [shownActivities, setShownActivities] = useState([]);
  const [showOutOfIdeasPopup, setShowOutOfIdeasPopup] = useState(false);
  const videoRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  
  const navigate = useNavigate();
  const { basket, calculateTotalBingeTime } = useBasket();
  
  const activityList = [
    { text: '💃 danced non-stop to your favorite song', time: 1.5 },
    { text: '🍛 cooked a feast for your whole neighborhood', time: 3 },
    { text: '🚗 traveled from Chennai to Hyderabad and back', time: 20 },
    { text: '🔥 fried 40 dosas at a roadside stall', time: 0.25 },
    { text: '📚 finished reading 5 chapters of your favorite book', time: 2 },
    { text: '🤣 argued with relatives about your job and their son\'s job', time: 1 },
    { text: '🛵 completed 120 Swiggy deliveries on a Scooty Pep per day', time: 0.5 },
    { text: '🛕 attended 10 full-length Telugu weddings', time: 5 },
    { text: '🎮 won 100 chicken dinners in PUBG with your squad', time: 0.75 },
    { text: '📞 heard "hello, who\'s this?" from unknown numbers', time: 0.1 }
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
    if (!isCalculating && shownActivities.length === 0) {
      const first = getUniqueRandomActivity([]);
      setCurrentActivity(first);
      setShownActivities([first]);
    }
  }, [isCalculating]);
  
  const handleVideoEnd = () => {
    if (playCount <1) {
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
  
  const getUniqueRandomActivity = (exclude) => {
    const remaining = activityList.filter(act => 
      !exclude.some(e => e.text === act.text)
    );
    if (remaining.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * remaining.length);
    return remaining[randomIndex];
  };

  const handleParrotClick = () => {
    if (shownActivities.length >= 5) {
      setShowOutOfIdeasPopup(true);
      return;
    }

    const next = getUniqueRandomActivity(shownActivities);

    if (next) {
      setCurrentActivity(next);
      setShownActivities(prev => [...prev, next]);

    } else {
      setShowOutOfIdeasPopup(true);
    }
  };

  return (
    <div className="binge-time-page">
      {showOutOfIdeasPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Parrot's out of ideas 🦜🤷‍♂️</h2>
            <p>Time to get off the screen and touch some grass 🌱😄</p>
            <button onClick={() => setShowOutOfIdeasPopup(false)}>Okay 😅</button>
          </div>
        </div>
      )}
      <div className="main-content">
      {isCalculating && (
        <div className="calculating-overlay">
         <div className="calculating-popup">
           <div className="spinner"></div>
          <p>Calculating binge time...</p>
         </div>
    </div>
      )}
      
      <div className={`content ${isCalculating ? 'hidden' : ''}`}>
        <h2>POV: Your face after seeing the number 😆</h2>
        
        <video 
          ref={videoRef}
          className="oh-no-video"
          onEnded={handleVideoEnd}
          muted={false}
        >
          <source src="/assets/videos/oh-no.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="binge-result">
          <h3>Total Binge Time:</h3>
          <div className="time-display">
            {Math.round(bingeHours)} hours
            <span>(approx. {Math.round(bingeHours / 24)} days)</span>
          </div>
        </div>
        
        <ActivityList activity={currentActivity} bingeHours={bingeHours} />
        
        <button 
          className="parrot-btn"
          onClick={handleParrotClick}
          disabled={showOutOfIdeasPopup}
        >
           {shownActivities.length === activityList.length ? 
           "No More Ideas 🦜" : 
          "Ask the Parrot 🦜"}
        </button>
      </div>
      </div>
      <footer>
        <ul className="socials">
          <li>
            <a href="https://github.com/rakeesssh007" target="_blank" rel="noreferrer">
              <img className="static" src="/assets/Static-logos/github-1080px.png" alt="GitHub" />
              <img className="gif" src="/assets/Animated-logos/Github-1200px.gif" alt="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rakesh-chowdary-965663292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
              <img className="static" src="/assets/Static-logos/linkedin-1080px.png" alt="LinkedIn" />
              <img className="gif" src="/assets/Animated-logos/Linkedin-1080px.gif" alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/xExeheNU" target="_blank" rel="noreferrer">
              <img className="static" src="/assets/Static-logos/discord-1200px.png" alt="Discord" />
              <img className="gif" src="/assets/Animated-logos/Discord-1080px.gif" alt="Discord" />
            </a>
          </li>
          <li>
            <a href="https://x.com/RakeshC007?t=Ae0j1lM2-jMTiDVTUfB7kg&s=09" target="_blank" rel="noreferrer">
              <img className="static" src="/assets/Static-logos/twitter-1080px.png" alt="Twitter" />
              <img className="gif" src="/assets/Animated-logos/twitter-1080px.gif" alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/iamrakesh._007/profilecard/?igsh=MmxvMG9yeGN3eXI0" target="_blank" rel="noreferrer">
              <img className="static" src="/assets/Static-logos/instagram-1200px.png" alt="Instagram" />
              <img className="gif" src="/assets/Animated-logos/Instagram-1200px.gif" alt="Instagram" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default BingeTimePage;