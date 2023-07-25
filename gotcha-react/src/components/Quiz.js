import React, { useRef, useState } from 'react';
// image
import quizIcon from '../img/quiz_icon.png';//퀴즈 아이콘
import closeIcon from '../img/close_icon.png';//닫기
const Quiz = ({myMoney, setMyMoney}) => {
    //quizListRef
    const quizListRef = useRef();

    //selectPopRef
    const selectPopRef = useRef();

    //QuizIndex
    let [quizIndex, setQuizIndex] = useState(null);

    // 퀴즈 리스트 문제 풀고 off index
    let [quizOff, setQuizOff] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    
    // 퀴즈 리스트
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

    //(17) 퀴즈 리스트 팝업 오픈, 딤처리
    function quizListPopOpen(){
        if (quizListRef.current) {
            quizListRef.current.classList.add('on');
        }
    }

    //(18) 퀴즈 리스트 생성
    function quizList(){
        const quizListMakeLi = quizTypeA.map((e, idx) => {
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
    function answerCheck(checkIdx){
        if(window.confirm("확실한가요 ?")){//"예" 선택
            if(quizTypeA[quizIndex].correctAnswer === checkIdx){
                window.alert('정답 ! ^.^')

                setMyMoney(myMoney + quizTypeA[quizIndex].getCoin)//동전 지급

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

    return (
        <>
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
        </>
    );
};

export default Quiz;