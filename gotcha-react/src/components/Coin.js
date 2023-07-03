import React, { useEffect, useRef, useState } from 'react';
import coin from '../img/coin.png'; // 동전 이미지

const Coin = ({ myMoneyRef, mainAreaRef }) => {
    const coinImgRef = useRef(); // 동전
    const [myCoinCount, setMyCoinCount] = useState(0);
    // let mainAreaElement = mainAreaRef.current;
    let coinImgElement = coinImgRef.current;
    console.log(coinImgElement)

    useEffect(() => {
        let myCoinCount = parseInt(myMoneyRef.current.textContent) / 500;
        setMyCoinCount(myCoinCount);
        // let coinImgElement = coinImgRef.current;
        // console.log(coinImgElement)
        // coinImgDisplay(coinImgElement);
    }, [myMoneyRef]);

    let initialX;
    let initialY;
    let currentX;
    let currentY;
    let active = false;

    function coinImgDisplay(coinImgElement) {
        if (!coinImgElement) return;

        initialX = parseInt(getComputedStyle(coinImgElement).top);
        initialY = parseInt(getComputedStyle(coinImgElement).left);

        coinImgElement.style.display = 'none';
        if (myCoinCount > 0) {
            setTimeout(() => {
            coinImgElement.style.display = 'block';
            coinImgElement.style.left = initialY + 'px';
            coinImgElement.style.top = initialX + 'px';
            }, 500);
        }
    }

    //(4) 동전 드래그 이벤트
    // mainAreaElement.addEventListener("mousedown", dragStart);//마우스 왼쪽 버튼을 누를 때
    // mainAreaElement.addEventListener("mouseup", dragEnd);//마우스 왼쪽 버튼을 누르고 있다가 뗄 때
    // mainAreaElement.addEventListener("mousemove", drag);//마우스 왼쪽 버튼을 누르면서 움직일 때
    
    // mainAreaElement.addEventListener("touchstart", dragStart);//스크린에 손가락이 닿을 때
    // mainAreaElement.addEventListener("touchend", dragEnd);//스크린에서 손가락을 뗄 때
    // mainAreaElement.addEventListener("touchmove", drag);//스크린에 손가락이 닿은 채로 움직일 때
    
    // function dragStart(e) {
    //     if (e.target === coinImgElement) {
    //         active = true;
    //     }
    //     // console.log('dragStart')
    // }
    
    // function drag(e) {
    //     if (active) {
    //         e.preventDefault();//드래그 기본 동작 취소, 이벤트 발생할 때 style 업데이트
    //         if (e.type === "touchmove") {
    //             currentX = e.touches[0].clientX - (coinImgElement.getBoundingClientRect().width)/2;//첫번째 터치액션값
    //             currentY = e.touches[0].clientY - (coinImgElement.getBoundingClientRect().height)/2;
    //         }else{
    //             currentX = e.clientX - (coinImgElement.getBoundingClientRect().width)/2;//현재 top 값은 웹 문서상 top 값과 같음, 마우스 가운데 정렬
    //             currentY = e.clientY - (coinImgElement.getBoundingClientRect().height)/2;//현재 left 값은 웹 문서상 left 값과 같음, 마우스 가운데 정렬
    //         }
    //         coinImgElement.style.left = currentX + "px";
    //         coinImgElement.style.top = currentY + "px";
    //         // console.log('drag')
    //     }
    // }
    
    // function dragEnd() {
    //     active = false;
    //     // console.log('dragEnd')
    //     // checkElementEnter();//(3) coinDropArea 진입 체크
    // }

  return (
    <div>
        <img ref={coinImgRef} className="coin" src={coin} alt="동전 이미지" />
    </div>
  );
};

export default Coin;
