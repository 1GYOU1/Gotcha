import React, { useState, useEffect } from 'react';

const Start = () => {
  const [startBtnClick, setStartBtnClick] = useState(false);

  useEffect(() => {
    if (startBtnClick) {
      const timeout = setTimeout(() => {
        window.location.href = '/main';
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [startBtnClick]);

  const handleClick = () => {
    setStartBtnClick(true);
  };

  return (
    <div>
        {startBtnClick ? null : (
            <div className="start_area">
                <div className="inner p_r">
                <button className="start_btn p_r" onClick={handleClick}>
                    <span>START</span>
                    <span></span>
                </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default Start;
