import React, { useEffect, useRef, useState } from 'react';
// image
import resetTxt from '../img/reset_txt.png';
import resetArrow from '../img/reset_arrow.png';
import machine from '../img/machine.png';//뽑기 머신 이미지
import machineHandle from '../img/machine_handle.png';//핸들 이미지
import coinImg from '../img/coin.png';//핸들 이미지
import closeIcon from '../img/close_icon.png';//닫기
import quizIcon from '../img/quiz_icon.png';//퀴즈 아이콘
import inventoryIcon from '../img/my_bag.png';//인벤토리 아이콘
import inventoryListIcon from '../img/q_icon.png';//인벤토리 빈칸 아이콘

const Main = () => {

    // main_area
    const mainAreaRef = useRef();

    // myMoney
    const myMoneyRef = useRef();

    // coin
    const coinRef = useRef();

    // coin_drop_area
    const coinDropAreaRef = useRef();

    // price
    const priceRef = useRef();

    // 현재 내가 넣은 동전 갯수(플레이 전)
    const payCoinRef = useRef();

    // turn
    const turnRef = useRef();
    
    // handle
    const handleRef = useRef();

    // balls
    const ballsRef = useRef();

    // ballsExit
    const ballExitRef = useRef();

    //outBallDim
    const outBallDimRef = useRef();

    //inventory_open
    const inventoryOpenRef = useRef();

    //quizListRef
    const quizListRef = useRef();

    //selectPopRef
    const selectPopRef = useRef();

    // 소지한 돈
    let [myMoney, setMyMoney] = useState(0);

    // 랜덤 배열
    let arr = [];
    let [newRandomArr, setNewRandomArr] = useState([]);

    // 플레이 카운트
    let [playCount, setPlayCount] = useState(0);

    //QuizIndex
    let [quizIndex, setQuizIndex] = useState(null);

    // 드래그 이벤트 처리를 위한 변수
    let [initialX, setInitialX] = useState(0);//동전 이미지의 left 초기값
    let [initialY, setInitialY] = useState(0);//동전 이미지의 top 초기값
    let [currentX, setCurrentX] = useState(0);//현재 동전 이미지의 left 값
    let [currentY, setCurrentY] = useState(0);//현재 동전 이미지의 top 값

    // 동전 드래그
    let [dragActive, setDragActive] = useState(false);

    // 현재 내가 가진 동전 갯수
    let [myCoinCount, setMyCoinCount] = useState(0);

    // 내가 넣은 동전 갯수 카운트
    let [payCoinCount, setPayCoinCount] = useState(0);

    // 인벤토리 아이템 카운트
    let [inventoryCount, setInventoryCount] = useState(0);

    // 출구 캡슐 이미지
    let [exitCapsuleImg, setExitCapsuleImg] = useState(false);

    // 캡슐 오픈 결과 이미지
    let [capsuleOpenImg, setCapsuleOpenImg] = useState(false);

    // 퀴즈 리스트 문제 풀고 off index
    let [quizOff, setQuizOff] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

    //퀴즈 리스트
    let quizTypeA = [
    {
        question : '쿠로미가 속한 애니메이션 제목은?',
        answer : ['쿠로미','시나모롤','마이멜로디','헬로키티'],
        getCoin : 500,
        correctAnswer : 2
    },
    {
        question : '산리오 캐릭터가 아닌 것은 ?',
        answer : ['흰둥이','헬로키티','시나모롤','마이멜로디'],
        getCoin : 500,
        correctAnswer : 0
    },
    {
        question : '마이멜로디의 리본 컬러는 ?',
        answer : ['핑크','하늘색','하얀색','노란색'],
        getCoin : 1000,
        correctAnswer : 0
    },
    {
        question : '쿠로미의 꼬리 색은 ?',
        answer : ['블랙','핑크','회색','보라색'],
        getCoin : 1000,
        correctAnswer : 0
    },
    {
        question : '마이멜로디가 운동하는 방법은 ?',
        answer : ['귀 굽혀펴기','귀 철봉','귀 아령','귀 물구나무서기'],
        getCoin : 1000,
        correctAnswer : 0
    },
    {
        question : '마이멜로디의 보물은 ?',
        answer : ['리본','꽃','앞치마','두건'],
        getCoin : 1500,
        correctAnswer : 3
    },
    {
        question : '헬로키티의 최애 음식은 ?',
        answer : ['푸딩','애플 파이','시나몬 컵케익','아몬드파운드 케이크'],
        getCoin : 1500,
        correctAnswer : 1
    },
    {
        question : '쿠로미가 흑화한 이유는 ?',
        answer : ['사춘기라서','검은색이 최애라서','마이멜로디랑 비교를 당해서','마이멜로디가 생일을 까먹어서'],
        getCoin : 2000,
        correctAnswer : 2
    },
    {
        question : '쿠로미가 최근에 빠진 소설 종류는 ?',
        answer : ['추리','연애','판타지','스릴러'],
        getCoin : 2000,
        correctAnswer : 1
    },
    {
        question : '헬로키티 친구인 로티의 성격은 ?',
        answer : ['다혈질','건방짐','느긋함','온화함'],
        getCoin : 2000,
        correctAnswer : 2
    },
    {
        question : '마이멜로디의 친구가 아닌 캐릭터는 ?',
        answer : ['캥거루','기린','나비','마이스윗피아노'],
        getCoin : 2500,
        correctAnswer : 1
    },
    {
        question : '마이멜로디의 남동생 이름은?',
        answer : ['플랫','음표','크레센도','리듬'],
        getCoin : 2500,
        correctAnswer : 3
    },
    {
        question : '시나모롤의 친구가 아닌 캐릭터는 ?',
        answer : ['카푸치노','모카','에스프레소','라떼'],
        getCoin : 3000,
        correctAnswer : 3
    },
    {
        question : '헬로키티의 형제 이름은 ?',
        answer : ['나나','미미','키키','피피'],
        getCoin : 3500,
        correctAnswer : 1
    },
    {
        question : '쿠로미즈 파이브가 아닌 캐릭터는 ?',
        answer : ['팡미','왕미','콘미','츄미'],
        getCoin : 3500,
        correctAnswer : 0
    }
]

//------------------------------------

    //초반 페이지 진입 시 업데이트
    useEffect(() => {
        // main_area 영역 fadeIn 애니메이션
        mainAreaRef.current.classList.add('on');

        randomResult();//랜덤 결과 생성
        createBallImg();//캡슐 이미지 생성

        setMyMoney(parseInt(myMoneyRef.current.textContent));//myMoney 값 업데이트
        setMyCoinCount(parseInt(myMoneyRef.current.textContent / 500));

        setInitialX(getComputedStyle(coinRef.current).getPropertyValue('left'))
        setInitialY(getComputedStyle(coinRef.current).getPropertyValue('top'))
        
        // console.log('currentX = ',currentX)

        // setCurrentX(parseInt(getComputedStyle(coinRef.current).left))//현재 동전 이미지의 left 값 업데이트
        // setCurrentY(parseInt(getComputedStyle(coinRef.current).top))//현재 동전 이미지의 top 값 업데이트

    }, []);

    //캡슐 이미지 업데이트
    useEffect(() => {
        createBallImg();//캡슐 이미지 생성
        console.log('뽑기 플레이 횟수 = ', playCount)
    }, [playCount]);

    // 동전 이미지 업데이트
    useEffect(() => {
        coinImgDisplay();
        console.log('내가 가진 동전 개수 = ', myCoinCount)
        console.log('내가 넣은 동전 개수 = ', payCoinCount)
    }, [myCoinCount, payCoinCount]);

    // useEffect(() => {
    //     console.log('내가 클릭한 문제 index =',quizIndex)
    //     selectPop();
    // }, [quizIndex])

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
        // console.log(playCount)
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
            // 진입했을 때 처리할 함수 호출
            // console.log('동전 넣는 영역 진입 !')
            priceCount();
        }
    }

    //(6) 넣은 동전 카운트
    function priceCount(){
        if(myCoinCount > 0){//내가 가진 동전 카운트 > 0
            setPayCoinCount((e) => {//지불한 동전 카운트 ++
                payCoinRef.current.textContent = e + 1;//내가 넣은 동전 갯수 텍스트 업데이트
                // console.log(payCoinCount)
                return e + 1
            })

            setMyCoinCount((e) => {//내가 가진 동전 카운트 --
                myMoneyRef.current.textContent = (e - 1) * 500;//내가 가진 동전 텍스트 업데이트
                return e - 1
            });
        }
        if(priceRef.current.textContent/500 <= payCoinCount + 1){//가격에 맞는 동전 갯수 <= 내가 넣은 동전 갯수 카운트
            capsuleOut();//캡슐 애니메이션 실행
            console.log('애니메이션 실행할 타이밍 ~')
        }
    }

    //(7) 동전 위치 초기화
    function coinImgDisplay(){
        coinRef.current.style.display = 'none';
        // console.log(payCoinCount)
        if(myCoinCount > 0 && payCoinCount < 4){//동전 이미지 생성
            setTimeout(function(){
                coinRef.current.style.left = initialX;
                coinRef.current.style.top = initialY;
                coinRef.current.style.display = 'block';
            }, 500)
        }
        // console.log('동전 개수 =', myCoinCount)
    }

    //(8) 캡슐 뽑기 애니메이션 실행
    function capsuleOut(){
        turnRef.current.classList.add('on');
        console.log('돌려 !')
        handleRef.current.addEventListener("click", handleAni);//애니메이션 실행
    }
    function handleAni(){
        turnRef.current.classList.remove('on');
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
                onClick={() => setCapsuleOpenImg(true)}
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
        setInventoryCount((e) => {//인벤토리 카운트 횟수 ++
            return e + 1;
        });
        setPayCoinCount((e) => {//지불한 동전만큼 카운트 마이너스
            return e -= (priceRef.current.textContent / 500);
        })

        payCoinRef.current.textContent = (payCoinRef.current.textContent - (priceRef.current.textContent / 500))//지불한 동전만큼 카운트 마이너스 텍스트 업데이트

        outBallDimRef.current.classList.remove('on');//딤처리 해제

        setExitCapsuleImg(false);
        myCapsuleImgOpen();//exit 캡슐 이미지 제거

        setCapsuleOpenImg(false);//뽑은 캡슐 오픈 이미지 false로 변경
    }
    
    //(14) 인벤토리 팝업 오픈, 딤처리
    function inventoryOpen(){
        inventoryOpenRef.current.classList.add('on');
    }

    //(15) 인벤토리 팝업 리스트 생성
    function inventoryList(){
        const inventoryListMakeLi = newRandomArr.map((e, idx) => {
        // playCount에 따라 결과 이미지로 변경
        const imgSrc = playCount >= idx + 1 ? `./img/open_img_${newRandomArr[idx]}.png` : inventoryListIcon;
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

    //(17) 퀴즈 리스트 팝업 오픈, 딤처리
    function quizListPopOpen(){
        if (quizListRef.current) {
            quizListRef.current.classList.add('on');
        }
    }

    //(18) 퀴즈 리스트 생성
    function quizList(){
        const quizListMakeLi = quizTypeA.map((e, idx) => {
        // console.log(e)
        return (
            <li key={idx} className={quizOff[idx] === false ? '' : 'off'} onClick={() => selectPopOpen(idx)}>
                <strong>Quiz.{idx+1}</strong>
                <span><i></i>+{quizTypeA[idx].getCoin}</span>
            </li>
            )
        })
        return (
            <ul>{quizListMakeLi}</ul>
        );
    }
    
    //(19) 퀴즈 리스트 팝업 팝업 닫기, 딤처리 해제
    function quizListPopClose(){
        quizListRef.current.classList.remove('on');
    }

    //(20) 문제 풀이 팝업 오픈
    function selectPopOpen(idx){
        if (selectPopRef.current && quizOff[idx] === false) {//풀었던 문제가 아닌 경우
            setQuizIndex(idx);//선택한 퀴즈 index 값 업데이트
            selectPopRef.current.classList.add('on');
            selectPop();
            setQuizOff((prevQuizOff) => {
                const newState = [...prevQuizOff]; // 이전 상태 배열을 복사하여 새로운 배열 생성
                newState[idx] = true; // 선택한 요소 값 true(li에 class off 추가)로 업데이트
                return newState; // 새로운 배열로 상태 업데이트
            });
        }
    }

    //(21) 문제 풀이 팝업 제목, 문제, 정답 리스트 생성
    function selectPop() {
        if (quizTypeA[quizIndex]) { // 해당 인덱스의 항목이 존재하는지 확인
            return (
            <>
                <h2>Quiz.{quizIndex+1}</h2>
                <p>{quizTypeA[quizIndex].question}</p>
                <ul>
                    <li onClick={() => answerCheck(0)}><span>{quizTypeA[quizIndex].answer[0]}</span></li>
                    <li onClick={() => answerCheck(1)}><span>{quizTypeA[quizIndex].answer[1]}</span></li>
                    <li onClick={() => answerCheck(2)}><span>{quizTypeA[quizIndex].answer[2]}</span></li>
                    <li onClick={() => answerCheck(3)}><span>{quizTypeA[quizIndex].answer[3]}</span></li>
                </ul>
            </>
            );
        } else {
            return null; // 해당 인덱스의 항목이 없을 경우 null 반환
        }
    }

    //(22) 문제 풀이 정답 체크
    function answerCheck(check){
        // console.log('check=',check)
        if(window.confirm("확실한가요 ?")){//"예" 선택
            if(quizTypeA[quizIndex].correctAnswer === check){
                window.alert('정답 ! ^.^')
                //동전 추가 지급
                setMyMoney((e) => {
                    return myMoneyRef.current.textContent = e + quizTypeA[quizIndex].getCoin
                })
                setMyCoinCount(parseInt(myMoneyRef.current.textContent / 500));
                selectPopRef.current.classList.remove('on');//문제 풀이 팝업 닫기
            }else{
                window.alert('땡 ! ㅜ.ㅠ')
                selectPopRef.current.classList.remove('on');//문제 풀이 팝업 닫기
            }
        }else{//"아니오" 선택
            return false;
        }
    }

    //(23) 문제 풀이 팝업 닫기, 딤처리 제거
    function selectPopClose(){
        if(window.confirm("지금 창을 닫으면 다시 이 문제를 풀 수 없습니다. 그래도 닫으시겠습니까 ?")){//"예" 선택
            selectPopRef.current.classList.remove('on');
        }else{//"아니오" 선택
            return false;
        }
    }

    //(24) 리셋 버튼 클릭시 값 초기화
    function resetEvent (){
        
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
                        <a className="reset" href="#;" onClick={resetEvent()}>
                            <img className="rs_txt" src={resetTxt} alt=""/>
                            <img className="rs_arr" src={resetArrow} alt=""/>
                        </a>
                        <p className="my_money">My money<br/>
                            <strong>￦ <span ref={myMoneyRef}>2000</span></strong>
                        </p> 
                    </div>

                    <div className="machine_area p_r">
                        <img className="machine" src={machine} alt="뽑기 머신 이미지"/>
                        <div ref={ballsRef} className="balls">
                        {/* 캡슐 Img */}
                        {createBallImg()}
                        </div>
                        <img ref={handleRef} className="handle" src={machineHandle} alt="핸들 이미지"/>
                        <strong ref={turnRef} className="turn">Turn the handle!</strong>
                        <strong className="price">￦ <span ref={priceRef}>2000</span></strong>
                        <div ref={ballExitRef} className="capsule_exit">
                            {/* 내가 뽑은 캡슐 img */}
                            {myCapsuleImgOpen()}
                        </div>
                        <div ref={coinDropAreaRef} className="coin_drop_area"></div>
                    </div>
                    <div className="pay_coin">
                        내가 넣은 동전 갯수 : <strong ref={payCoinRef}>0</strong>
                    </div>

                </div>

                <img ref={coinRef} className="coin" src={coinImg} alt="동전 이미지"/>
                
                <div ref={outBallDimRef} className="capsule_open">
                    {/* 방금 뽑은 캡슐 img */}
                    {outBallDimCapsuleImg()}
                    {keepGoingbtn()}
                </div>
                
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

                <a className="quiz" href="#;" onClick={quizListPopOpen}>
                    <img src={quizIcon} alt="퀴즈 아이콘"/>
                </a>
                
                <div ref={quizListRef} className="quiz_list">
                    <div className="layer p_r">
                        <h2>Quiz List</h2>
                        <a className="close" href="#;" onClick={quizListPopClose}>
                            <img src={closeIcon} alt=""/>
                        </a>
                        {/* 퀴즈 리스트 */}
                        {quizList()}
                    </div>
                </div>
                
                <div ref={selectPopRef} className="quiz_pop">
                    <div className="layer p_r">
                        <a className="close" href="#;" onClick={selectPopClose}>
                            <img src={closeIcon} alt=""/>
                        </a>
                        {selectPop()}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Main;