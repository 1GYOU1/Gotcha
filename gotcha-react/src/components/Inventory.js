import React from 'react';
import myBag from '../img/my_bag.png';//인벤토리 아이콘
import closeIcon from '../img/close_icon.png';//닫기

const Inventory = () => {
    return (
        <div>
            <a className="my_bag" href="#;">
                <img src={myBag} alt="인벤토리 아이콘"/>
            </a>

            <div className="inventory_open">
                {/* 뽑았던 캡슐 img */}
                <div className="layer p_r">
                    <h2>my collection</h2>
                    <a className="close" href="#;">
                        <img src={closeIcon} alt="닫기"/>
                    </a>
                    <ul>
                        {/* 내 아이템 img */}
                    </ul>
                    <div className="detail">
                        {/* 내 아이템 자세히 보기 img */}
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default Inventory;