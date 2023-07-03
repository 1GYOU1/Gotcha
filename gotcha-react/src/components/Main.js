import React, { useEffect, useRef, useState } from 'react';
// image
import resetTxt from '../img/reset_txt.png';
import resetArrow from '../img/reset_arrow.png';
import machine from '../img/machine.png';//뽑기 머신 이미지
// import ballBoxImg1 from '../img/ball_box_1.png';
import machineHandle from '../img/machine_handle.png';//핸들 이미지
// js
import Inventory from './Inventory';
import Quiz from './Quiz';
import Coin from './Coin';

const Main = () => {

    // 랜덤 배열
    let arr = [];
    let newRandomArr = [];

    const mainAreaRef = useRef();//main_area
    const myMoneyRef = useRef();//myMoney

    const [playCount, setPlayCount] = useState(0);

    useEffect(() => {
        // 영역 fadeIn 애니메이션
        let mainAreaElement = mainAreaRef.current;
        let myMoneyElement = myMoneyRef.current;
        mainAreaElement.classList.add('on');
        randomResult();//랜덤 결과 생성
        createBallImg();//캡슐 이미지 생성
    }, []);

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
        console.log(randomArr);
        newRandomArr = randomArr;//전역 배열에 넣어주기 
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
    
    return (
        <div>
            <div ref={mainAreaRef} className="main_area">
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
                        {/* 캡슐 Img */}
                        {createBallImg()}
                        </div>
                        <img className="handle" src={machineHandle} alt="핸들 이미지"/>
                        <strong className="turn">Turn the handle!</strong>
                        <strong className="price">￦ <span>2000</span></strong>
                        <div className="capsule_exit">
                            {/* 내가 뽑은 캡슐 img */}
                        </div>
                        <div className="coin_drop_area"></div>
                    </div>
                    <div className="pay_coin">
                        내가 넣은 동전 갯수 : <strong>0</strong>
                    </div>
                </div>

                <Coin myMoneyRef={myMoneyRef} mainAreaRef={mainAreaRef} />
                
                <div className="capsule_open">
                    {/* 방금 뽑은 캡슐 img */}
                </div>

                <Inventory/>

                <Quiz/>

            </div>
        </div>
    );
};

export default Main;