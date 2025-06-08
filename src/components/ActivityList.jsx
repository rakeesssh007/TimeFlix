import React from 'react';
import '../styles/ActivityList.css';

function ActivityList({ activity, bingeHours }) {
  if (!activity) return null;

  const emoji = activity.text.split(' ')[0];
  const description = activity.text.split(' ').slice(1).join(' ');
  const times = Math.floor(bingeHours / activity.time);

  return (
    <div className="activity-list">
      <h3>What You Could Have Done Instead:</h3>
      <div className="activity-item single">
        <span className="activity-emoji">{emoji}</span>
        <div className="activity-details">
          <p>{description}</p>
          <div className="activity-count">
            {times > 0 ? `${times} times` : 'Not even once 😅'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityList;
