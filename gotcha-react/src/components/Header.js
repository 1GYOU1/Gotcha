import React from 'react';
import myImage from '../img/black_heart.png';//검정 하트 이미지

const Header = () => {
    return (
        <div>
            <header>
                <h1>1GYOU1</h1>
                <img src={myImage} alt=""/>
            </header>
        </div>
    );
};

export default Header;