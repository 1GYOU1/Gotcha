import React, { useRef } from 'react';
import closeIcon from '../img/close_icon.png';//닫기
import inventoryIcon from '../img/my_bag.png';//인벤토리 아이콘
import inventoryListIcon from '../img/q_icon.png';//인벤토리 빈칸 아이콘

const Inventory = ({newRandomArr, inventoryCount}) => {
    //inventory_open
    const inventoryOpenRef = useRef();

    //(14) 인벤토리 팝업 오픈, 딤처리
    function inventoryOpen(){
        inventoryOpenRef.current.classList.add('on');
    }

    //(15) 인벤토리 팝업 리스트 생성
    function inventoryList(){
        const inventoryListMakeLi = newRandomArr.map((e, idx) => {
        // inventoryCount에 따라 결과 이미지로 변경
        const imgSrc = inventoryCount >= idx + 1 ? `./img/open_img_${newRandomArr[idx]}.png` : inventoryListIcon;
        return (
            <li key={idx}>
                <img src={imgSrc} alt='인벤토리 빈 칸'/>
            </li>
            )
        })
        return (
            <ul>{inventoryListMakeLi}</ul>
        );
    }

    //(16) 인벤토리 팝업 닫기, 딤처리 해제
    function inventoryClose(){
        inventoryOpenRef.current.classList.remove('on');
    }
       
    return (
        <>
            <a className="my_bag" href="#;" onClick={inventoryOpen}>
                <img src={inventoryIcon} alt="인벤토리 아이콘"/>
            </a>
            
            <div ref={inventoryOpenRef} className="inventory_open">
                {/* 뽑았던 캡슐 img */}
                <div className="layer p_r">
                    <h2>my collection</h2>
                    <a className="close" href="#;" onClick={inventoryClose}>
                        <img src={closeIcon} alt=""/>
                    </a>
                    {/* 내 아이템 img */}
                    {inventoryList()}
                    <div className="detail">
                        {/* 내 아이템 자세히 보기 img */}
                    </div>   
                </div>
            </div>
        </>
    );
};

export default Inventory;