import React from 'react';
import '../styles/ActivityList.css';

function ActivityList({ activities, bingeHours }) {
  return (
    <div className="activity-list">
      <h3>What You Could Have Done Instead:</h3>
      <ul>
        {activities.map((activity, index) => {
          const times = Math.floor(bingeHours / activity.time);
          return (
            <li key={index} className="activity-item">
              <span className="activity-emoji">{activity.text.split(' ')[0]}</span>
              <div className="activity-details">
                <p>{activity.text}</p>
                <div className="activity-count">
                  {times > 0 ? `${times} times` : "Not even once 😅"}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActivityList;
