import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Start = () => {
    const [startBtnClick, setStartBtnClick] = useState(false);
    
    const handleClick = () => {
        setStartBtnClick(true);
    };

    return (
        <div>
            {startBtnClick ? null : (
            <div className="start_area">
                <div className="inner p_r">
                    <Link to="/main" className="start_btn p_r" onClick={handleClick}>
                        <span>START</span>
                        <span></span>
                    </Link>
                </div>
            </div>
         )}
        </div>
    );
};

export default Start;