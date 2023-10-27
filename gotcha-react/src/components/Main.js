import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// image
import resetTxt from '../img/reset_txt.png';
import resetArrow from '../img/reset_arrow.png';
import machine from '../img/machine.png';//뽑기 머신 이미지
import machineHandle from '../img/machine_handle.png';//핸들 이미지
import coinImg from '../img/coin.png';//동전 이미지
//components
import Quiz from './Quiz';
import Inventory from './Inventory';

const Main = () => {

    const navigate = useNavigate();

    // main_area
    const mainAreaRef = useRef();

    // coin
    const coinRef = useRef();

    // coin_drop_area
    const coinDropAreaRef = useRef();
    
    // handle
    const handleRef = useRef();

    // balls
    const ballsRef = useRef();
    
    // ballsExit
    const ballExitRef = useRef();
    
    //outBallDim
    const outBallDimRef = useRef();
    
    // 소지한 돈
    let [myMoney, setMyMoney] = useState(2000);
    
    // 뽑기 가격
    let [playPrice, setPlayPrice] = useState(2000);

    // 랜덤 배열
    let arr = [];
    let [newRandomArr, setNewRandomArr] = useState([]);

    // 플레이 카운트
    let [playCount, setPlayCount] = useState(0);
    
    // 드래그 이벤트 처리를 위한 변수
    let [initialX, setInitialX] = useState(0);//동전 이미지의 left 초기값
    let [initialY, setInitialY] = useState(0);//동전 이미지의 top 초기값
    let [currentX, setCurrentX] = useState(0);//현재 동전 이미지의 left 값
    let [currentY, setCurrentY] = useState(0);//현재 동전 이미지의 top 값
    
    // 동전 드래그
    let [dragActive, setDragActive] = useState(false);

    // 동전 화살표 이미지
    let [coinArrow, setCoinArrow] = useState(false);

    // 핸들 화살표 이미지
    let [handleArrow, setHandleArrow] = useState(false);

    // 내가 넣은 동전 갯수 카운트
    let [payCoinCount, setPayCoinCount] = useState(0);

    // 인벤토리 아이템 카운트
    let [inventoryCount, setInventoryCount] = useState(0);

    // 출구 캡슐 이미지
    let [exitCapsuleImg, setExitCapsuleImg] = useState(false);

    // 캡슐 오픈 결과 이미지
    let [capsuleOpenImg, setCapsuleOpenImg] = useState(false);

    // 캡슐 이어서 진행하기 버튼
    let [reGobtn, setReGobtn] = useState(false);

//------------------------------------

    //초반 페이지 진입 시 업데이트
    useEffect(() => {
        // main_area 영역 fadeIn 애니메이션
        mainAreaRef.current.classList.add('on');

        randomResult();//랜덤 결과 생성
        createBallImg();//캡슐 이미지 생성

        setInitialX(initialX = getComputedStyle(coinRef.current).getPropertyValue('left'))
        setInitialY(initialY = getComputedStyle(coinRef.current).getPropertyValue('top'))

    }, []);

    //캡슐 이미지 업데이트
    useEffect(() => {
        createBallImg();//캡슐 이미지 생성
        console.log('뽑기 플레이 횟수 = ', playCount)
    }, [playCount]);

    // 동전 이미지 업데이트
    useEffect(() => {
        coinImgDisplay();
    }, [myMoney, payCoinCount]);

    // useEffect(() => {
        // console.log('playCount=',playCount)//문제없음
        // console.log('내가 넣은 동전 개수 = ', payCoinCount)//문제없음, 초기화하는 부분도 문제없음
        // console.log('inventoryCount=',inventoryCount)//문제없음
        // console.log('playPrice = ', playPrice)//문제없음
        // console.log('내가 가진 동전 개수 = ', myCoinCount)//해당 변수 사용 안하고 가격만 사용해보기
        // console.log('myMoney=',myMoney)//문제없음
    // })

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
    function createBallImg (){
        // 처음 시작 모든 갯수 이미지 캡슐 노출
        if (playCount === 0) {
            return <img src={process.env.PUBLIC_URL + '/img/ball_box_1.png'} alt="캡슐 1" />;
        // 모든 캡슐 소진했을 경우
        } else if (playCount === 15) {
            return null;
        //여러번 실행했을 경우, 이미지 업데이트
        } else {
            let imageNumber = playCount + 1;
            let imagePath = process.env.PUBLIC_URL + `/img/ball_box_${imageNumber}.png`;//상대경로
            return <img src={imagePath} alt={`캡슐 ${imageNumber}`} />;
        }
    }; 

    //(4) 동전 드래그 이벤트
    const handleDragStart = (e) => {
        // 드래그 시작 처리
        if (e.target === coinRef.current) {
            setDragActive(true);
            // console.log('Drag Start !')
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
        // console.log('drag end')
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
            // 진입했을 때 처리할 함수 호출(동전 넣는 영역 진입)
            priceCount();
        }
    }

    //(6) 넣은 동전 카운트
    function priceCount(){
        if(myMoney > 0){//내가 가진 동전 카운트 > 0
            setPayCoinCount(payCoinCount + 1)
            setMyMoney(myMoney - 500)//내가 가진 동전 업데이트
        }
        if(playPrice/500 <= payCoinCount + 1){//가격에 맞는 동전 갯수 <= 내가 넣은 동전 갯수 카운트
            capsuleOut();//캡슐 애니메이션 실행
            console.log('애니메이션 실행할 타이밍 ~')
        }
    }

    //(7) 동전 위치 초기화
    function coinImgDisplay(){
        coinRef.current.style.display = 'none';
        setCoinArrow(false);//화살표 이미지 false;
        if(myMoney > 0 && payCoinCount < playPrice/500){//동전 이미지 생성
            setTimeout(function(){
                coinRef.current.style.left = initialX;
                coinRef.current.style.top = initialY;
                coinRef.current.style.display = 'block';
                setCoinArrow(true);//화살표 이미지 true;
            }, 500)
        }
    }

    //동전 드래그 화살표 애니메이션
    function coinArrowEvent(){
        if(coinArrow){
            return (
                <div className='coin_arrow'>
                    <strong>Drag coin here !</strong>
                    <img
                    src={`./img/arr_test4.png`}
                    alt="화살표 이미지"
                    />
                </div>
            );
        }else{
            return null;
        }
    }

    //(8) 캡슐 뽑기 애니메이션 실행
    function capsuleOut(){
        setHandleArrow(true);//핸들 화살표 true
        console.log('돌려 !')
        handleRef.current.addEventListener("click", handleAni);//애니메이션 실행
    }
    function handleAni(){
        setHandleArrow(false);//핸들 화살표 false
        handleRef.current.classList.add('on');//핸들 애니메이션
        setTimeout(function(){
            handleRef.current.classList.remove('on');
            ballsRef.current.classList.add('on');//캡슐통 애니메이션
        }, 1700);
        setTimeout(function(){
            ballsRef.current.classList.remove('on');
            setPlayCount(playCount + 1)//플레이 카운트 횟수 ++
            createBallImg();//캡슐 통 이미지 업데이트

            setExitCapsuleImg(true);
            myCapsuleImgOpen();//exit 캡슐 이미지 노출

            ballExitRef.current.classList.add('on');//캡슐 떨어지는 애니메이션
        }, 2800);
        handleRef.current.removeEventListener("click", handleAni);//핸들 클릭 이벤트 제거
    };

    //핸들 화살표 애니메이션
    function handleArrowEvent(){
        if(handleArrow){
            return (
                <div className='handle_arrow'>
                    <strong>Turn the handle !</strong>
                    <img
                    src={`./img/arr_test3.png`}
                    alt="화살표 이미지"
                    />
                </div>
            );
        }else{
            return null;
        }
    }

    //(9) 출구에 뽑은 캡슐 이미지 노출
    function myCapsuleImgOpen() {
        if(exitCapsuleImg){
            return (
                <img
                className="my_ball"
                src={`./img/ball_${playCount}.png`}
                alt="뽑은 캡슐"
                onClick={() => outBallDimEvent()}
                />
            );
        }else{
            return null;
        }
    }

    //(10) 뽑은 캡슐 딤처리
    function outBallDimEvent(){
        outBallDimRef.current.classList.add('on');
    }

    //(11) 딤처리에 뽑은 캡슐 이미지 노출, 캡슐 오픈 결과 이미지로 변경
    function outBallDimCapsuleImg() {
        if(capsuleOpenImg){
            return (//결과 이미지
                <img
                className="open_ball"
                src={`./img/open_img_${newRandomArr[playCount - 1]}.png`}
                alt="뽑은 캡슐 오픈"
                />
            );
        }else{
            return (//캡슐 이미지
                <img
                className="my_ball"
                src={`./img/ball_${playCount}.png`}
                alt="뽑은 캡슐"
                onClick={() => {
                    setCapsuleOpenImg(true);
                    setReGobtn(true);
                }}
                />
            );
        }
    }

    //(12) 오픈 후 이어서하기 버튼 생성
    function keepGoingbtn() {
        return (
            <img
            className="keep_going_btn"
            src={`./img/return.png`}
            alt="이어서 계속 버튼"
            onClick={() => outBallUpdate()}
            />
        );
    }

    //(13) 캡슐 오픈 후 값 업데이트, 딤처리 해제, 뽑기 캡슐 이미지 제거
    function outBallUpdate(){
        setInventoryCount(inventoryCount + 1)//인벤토리 카운트 횟수 ++
        setPayCoinCount(payCoinCount - 1)//지불한 동전만큼 카운트 --

        setPayCoinCount(payCoinCount - (playPrice / 500))//지불한 동전만큼 카운트 -- 텍스트 업데이트
        outBallDimRef.current.classList.remove('on');//딤처리 해제

        setExitCapsuleImg(false);
        myCapsuleImgOpen();//exit 캡슐 이미지 제거

        setCapsuleOpenImg(false);//뽑은 캡슐 오픈 이미지 false로 변경

        setReGobtn(false);//이어서 진행하기 버튼 노출
    }
    
    /*
    [ Inventory.js ]

   (14) 인벤토리 팝업 오픈, 딤처리
   (15) 인벤토리 팝업 리스트 생성
   (16) 인벤토리 팝업 닫기, 딤처리 해제
    */

    /*
    [ Quiz.js ]

    (17) 퀴즈 리스트 팝업 오픈, 딤처리
    (18) 퀴즈 리스트 생성
    (19) 퀴즈 리스트 팝업 팝업 닫기, 딤처리 해제
    (20) 문제 풀이 팝업 제목, 문제, 정답 리스트 생성
    (21) 문제 풀이 정답 체크
    (22) 문제 풀이 팝업 닫기, 딤처리 제거
    */
   
    //(23) 리셋 버튼 클릭시 값 초기화
    function resetEvent (){
        navigate('/start');
        // window.location.href = '/';//인트로 화면으로
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

                    <p className="my_money">My money<br/>
                        <strong>￦ <span>{myMoney}</span></strong>
                    </p> 

                    <div className="machine_area p_r">
                        <img className="machine" src={machine} alt="뽑기 머신 이미지"/>
                        <div ref={ballsRef} className="balls">
                        {/* 캡슐 Img */}
                        {createBallImg()}
                        </div>
                        <img ref={handleRef} className="handle" src={machineHandle} alt="핸들 이미지"/>
                        {handleArrowEvent()}{/* 핸들 화살표 */}
                        <strong className="price">￦ <span>{playPrice}</span></strong>
                        <div ref={ballExitRef} className="capsule_exit">
                            {/* 내가 뽑은 캡슐 img */}
                            {myCapsuleImgOpen()}
                        </div>
                        <div ref={coinDropAreaRef} className="coin_drop_area"></div>
                    </div>
                    <div className="pay_coin">
                        내가 넣은 동전 갯수 : <strong>{payCoinCount}</strong>
                    </div>

                </div>

                <img ref={coinRef} className="coin" src={coinImg} alt="동전 이미지"/>
                {coinArrowEvent()}{/* 동전 화살표 */}

                <a className="reset" href="#;" onClick={resetEvent}>
                    <img className="rs_txt" src={resetTxt} alt=""/>
                    <img className="rs_arr" src={resetArrow} alt=""/>
                </a>
                
                <div ref={outBallDimRef} className="capsule_open">
                    {/* 방금 뽑은 캡슐 img */}
                    {outBallDimCapsuleImg()}
                    {reGobtn ? (
                        keepGoingbtn()
                    ) : null}
                </div>
                
                <Inventory
                newRandomArr={newRandomArr}
                inventoryCount={inventoryCount}
                />

                <Quiz
                myMoney={myMoney}
                setMyMoney={setMyMoney}
                />
                
            </div>
        </div>
    );
};

export default Main;