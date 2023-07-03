import React from 'react';
import quizIcon from '../img/quiz_icon.png';//퀴즈 아이콘
import closeIcon from '../img/close_icon.png';//닫기

const Quiz = () => {
    return (
        <div>
            <a className="quiz" href="#;">
                <img src={quizIcon} alt="퀴즈 아이콘"/>
            </a>

            <div className="quiz_list">
                    <div className="layer p_r">
                        <h2>Quiz List</h2>
                        <a className="close" href="#;">
                            <img src={closeIcon} alt="닫기"/>
                        </a>
                        <ul></ul>
                    </div>
                </div>

                <div className="quiz_pop">
                    <div className="layer p_r">
                        <h2></h2>
                        <a className="close" href="#;">
                            <img src={closeIcon} alt="닫기"/>
                        </a>
                        <p></p>
                        <ul>
                            <li><span></span></li>
                            <li><span></span></li>
                            <li><span></span></li>
                            <li><span></span></li>
                        </ul>
                    </div>
                </div>

        </div>
    );
};

export default Quiz;