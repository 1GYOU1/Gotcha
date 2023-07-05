import React, { useEffect, useRef, useState } from 'react';
// image
import resetTxt from '../img/reset_txt.png';
import resetArrow from '../img/reset_arrow.png';
import machine from '../img/machine.png';//뽑기 머신 이미지
import machineHandle from '../img/machine_handle.png';//핸들 이미지
import coinImg from '../img/coin.png';//핸들 이미지
import closeIcon from '../img/close_icon.png';//닫기
import quizIcon from '../img/quiz_icon.png';//퀴즈 아이콘

const Main = () => {

    //main_area
    const mainAreaRef = useRef();

    //myMoney
    const myMoneyRef = useRef();
    const [myMoney, setMyMoney] = useState(0);

    //coin
    const coinRef = useRef();

    //coin_drop_area
    const coinDropAreaRef = useRef();

    // 랜덤 배열
    let arr = [];
    const [newRandomArr, setNewRandomArr] = useState([]);

    //플레이 카운트
    const [playCount, setPlayCount] = useState(0);

    // 드래그 이벤트 처리를 위한 변수
    const [currentX, setCurrentX] = useState(0);//현재 동전 이미지의 left 값
    const [currentY, setCurrentY] = useState(0);//현재 동전 이미지의 top 값

    //동전 드래그
    const [dragActive, setDragActive] = useState(false);

    // 현재 내가 가진 동전 갯수
    const [myCoinCount, setMyCoinCount] = useState(0);

    // 동전 갯수 카운트
    const [payCoinCount, setPayCoinCount] = useState(1);

    // 현재 내가 넣은 동전 갯수(플레이 전)
    const payCoinRef = useRef();
    // let payCoin = document.querySelector(".pay_coin strong");

    // 가격에 맞는 동전 갯수
    // let priceCoin = parseInt(document.querySelector(".machine_area .price span").textContent) / 500;

//------------------------------------

    //초반 페이지 진입 시 업데이트
    useEffect(() => {
        // main_area 영역 fadeIn 애니메이션
        mainAreaRef.current.classList.add('on');

        randomResult();//랜덤 결과 생성
        createBallImg();//캡슐 이미지 생성

        setMyMoney(parseInt(myMoneyRef.current.textContent));//myMoney 값 업데이트
        setMyCoinCount(parseInt(myMoneyRef.current.textContent / 500));

        setCurrentX(parseInt(getComputedStyle(coinRef.current).top))//현재 동전 이미지의 left 값 업데이트
        setCurrentY(parseInt(getComputedStyle(coinRef.current).left))//현재 동전 이미지의 top 값 업데이트

    }, []);

    // console.log(myCoinCount)

    //값 업데이트
    useEffect(() => {

        createBallImg();//캡슐 이미지 생성
        
    }, [playCount]);

//------------------------------------

    //(2) 랜덤 결과
    function randomResult(){
        let randomArr = [];
        for(let i=1; i<=15; i++){
            arr.push(i);
        }
        while(randomArr.length < 15){
            let randomNum = Math.floor(Math.random() * 15) + 1;
            if(!randomArr.includes(randomNum)){
                randomArr.push(randomNum);
            }
        }
        setNewRandomArr(randomArr); // 상태 업데이트
        console.log(randomArr);
    }

    //(3) 캡슐 통 이미지 생성, 변경
    const createBallImg = () => {
        // 처음 시작 모든 갯수 이미지 캡슐 노출
        if (playCount === 0) {
            return <img src={process.env.PUBLIC_URL + '/img/ball_box_1.png'} alt="캡슐 1" />;
        // 모든 캡슐 소진했을 경우
        } else if (playCount === 15) {
            return null;
        //여러번 실행했을 경우, 이미지 업데이트
        } else {
            const imageNumber = playCount + 1;
            const imagePath = process.env.PUBLIC_URL + `/img/ball_box_${imageNumber}.png`;//상대경로
            return <img src={imagePath} alt={`캡슐 ${imageNumber}`} />;
        }
    }; 

    //(4) 동전 드래그 이벤트
    const handleDragStart = (e) => {
        // 드래그 시작 처리
        if (e.target === coinRef.current) {
            setDragActive(true);
            console.log('Drag Start !')
        }
    };

    const handleDrag = (e) => {
    // 드래그 처리
        if (dragActive) {
            e.preventDefault();//드래그 기본 동작 취소, 이벤트 발생할 때 style 업데이트
            if (e.type === "touchmove") {
                setCurrentX(e.touches[0].clientX - (coinRef.current.getBoundingClientRect().width)/2);//첫번째 터치액션값
                setCurrentY(e.touches[0].clientY - (coinRef.current.getBoundingClientRect().height)/2);
            }else{
                setCurrentX(e.clientX - (coinRef.current.getBoundingClientRect().width)/2)//현재 top 값은 웹 문서상 top 값과 같음, 마우스 가운데 정렬
                setCurrentY(e.clientY - (coinRef.current.getBoundingClientRect().height)/2)//현재 left 값은 웹 문서상 left 값과 같음, 마우스 가운데 정렬
            }
                coinRef.current.style.left = currentX + "px";
                coinRef.current.style.top = currentY + "px";
        }
    };

    const handleDragEnd = (e) => {
        // 드래그 종료 처리
        setDragActive(false);
        checkElementEnter();
        console.log('drag end')
    };


    //(5) 동전 넣는 영역에 진입했는지 체크
    function checkElementEnter() {
        let targetRect = coinDropAreaRef.current.getBoundingClientRect();//웹 문서상 위치 값
        let coinRect = coinRef.current.getBoundingClientRect();//웹 문서상 동전이미지 위치 값
        if (
            coinRect.left >= targetRect.left &&
            coinRect.right <= targetRect.right &&
            coinRect.top >= targetRect.top &&
            coinRect.bottom <= targetRect.bottom
        ) {
            // 진입했을 때 처리할 함수 호출
            console.log('동전 넣는 영역 진입 !')
            priceCount();
        }
    }

    //(6) 넣은 동전 카운트
    function priceCount(){
        // console.log('priceCount 함수실행')
        if(myCoinCount > 0){
            setPayCoinCount((setPayCoinCount) => setPayCoinCount + 1)//지불한 동전 카운트 ++
            payCoinRef.current.textContent = payCoinCount;//지불한 동전 갯수 텍스트 업데이트
            setMyCoinCount((setMyCoinCount) => setMyCoinCount - 1);//내가 가진 동전 카운트 --
            myMoneyRef.current.textContent = (myCoinCount-1) * 500;//내가 가진 동전 텍스트 업데이트

            console.log('동전 위치 초기화 할 타이밍 ~')
            // coinImgDisplay();//동전 위치 초기화
        }
        if(myCoinCount <= payCoinCount){
        //     capsuleOut();//캡슐 애니메이션 실행
            console.log('애니메이션 실행할 타이밍 ~')
        }
    }

    return (
        <div>
             <div 
                ref={mainAreaRef} 
                className="main_area"
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseMove={handleDrag}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                onTouchMove={handleDrag}
             >
                <div className="inner p_r">

                    <div className="top_area">
                        <a className="reset" href="#;">
                            <img className="rs_txt" src={resetTxt} alt=""/>
                            <img className="rs_arr" src={resetArrow} alt=""/>
                        </a>
                        <p className="my_money">My money<br/>
                            <strong>￦ <span ref={myMoneyRef}>2000</span></strong>
                        </p> 
                    </div>

                    <div className="machine_area p_r">
                        <img className="machine" src={machine} alt="뽑기 머신 이미지"/>
                        <div className="balls">
                        {/*<!-- 캡슐 Img -->*/}
                        {createBallImg()}
                        </div>
                        <img className="handle" src={machineHandle} alt="핸들 이미지"/>
                        <strong className="turn">Turn the handle!</strong>
                        <strong className="price">￦ <span>2000</span></strong>
                        <div className="capsule_exit">
                            {/*<!-- 내가 뽑은 캡슐 img -->*/}
                        </div>
                        <div ref={coinDropAreaRef} className="coin_drop_area"></div>
                    </div>
                    <div className="pay_coin">
                        내가 넣은 동전 갯수 : <strong ref={payCoinRef}>0</strong>
                    </div>

                </div>

                <img ref={coinRef} className="coin" src={coinImg} alt="동전 이미지"/>
                
                <div className="capsule_open">
                    {/*<!-- 방금 뽑은 캡슐 img -->*/}
                </div>
                
                <a className="my_bag" href="#;">
                    <img src="./img/my_bag.png" alt="인벤토리 아이콘"/>
                </a>
                
                <div className="inventory_open">
                    {/*<!-- 뽑았던 캡슐 img -->*/}
                    <div className="layer p_r">
                        <h2>my collection</h2>
                        <a className="close" href="#;">
                            <img src={closeIcon} alt=""/>
                        </a>
                        <ul>
                            {/*<!-- 내 아이템 img -->*/}
                        </ul>
                        <div className="detail">
                            {/*<!-- 내 아이템 자세히 보기 img -->*/}
                        </div>   
                    </div>
                </div>

                <a className="quiz" href="#;">
                    <img src={quizIcon} alt="퀴즈 아이콘"/>
                </a>
                
                <div className="quiz_list">
                    <div className="layer p_r">
                        <h2>Quiz List</h2>
                        <a className="close" href="#;">
                            <img src={closeIcon} alt=""/>
                        </a>
                        <ul></ul>
                    </div>
                </div>
                
                <div className="quiz_pop">
                    <div className="layer p_r">
                        <h2></h2>
                        <a className="close" href="#;">
                            <img src={closeIcon} alt=""/>
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
        </div>
    );
};

export default Main;