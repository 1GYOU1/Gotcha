//include html
window.addEventListener('load', function() {
    let allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        let includePath = el.dataset.includePath;
        if (includePath) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});
  
//header fixed
// if($('div[data-include-path="header.html"]').length > 0) {
//     $(window).on('scroll', function() {
//         if($(window).scrollTop() >= $('.wrap').offset().top) {
//             $('header').addClass('fixed');
//         }
//         else {
//             $('header').removeClass('fixed');
//         }
//     });
// }

/* -------------------------------------------------------------------

캡슐 뽑기 이벤트 동작 순서

1. start 버튼 클릭, 메인 영역('.main_area') 노출

2. 랜덤 배열 생성 -> 결과 이미지

3. for문 캡슐 이미지 태그 생성

4. 동전 이미지 드래그(pc), 터치(mobile) 시 메인 영역('.main_area')안에서 움직이는 효과 
   position top, left을 웹 문서 기준으로 각각 얼마나 떨어져 있는지 clientX축, clientY축 구해서 스타일 변경

5. 동전 넣는 곳('.coin_drop_area') 영역에 진입했는지, 해당 영역에서 마우스를 떼는 동작을 했는지 체크

6. 동전 몇 번 넣었는지 카운팅 ++

7. 동전 이미지 위치 초기화

8. 가격과 넣은 동전의 갯수가 같을 때 애니메이션 실행

9. 플레이 카운트 횟수 이용해서 뽑은 캡슐 이미지 매칭

10. 뽑은 캡슐 클릭 시 딤처리, 확대 효과, 캡슐 오픈, 이어서 하기 버튼 클릭 이벤트

11. 이어서 뽑기, 엔딩

12. 인벤토리

13. 퀴즈 리스트 팝업

14. 문제 풀기 팝업

15. 리셋
 
-------------------------------------------------------------------PLAN

2023년 6월 2주차
- 퀴즈 맞춰야 동전 지급 기능 (완료 ✔︎)
- 캡슐 이미지 불러오는 방식 createBallImg() 수정 (완료 ✔︎)
- 뽑기 열기 전에 인벤토리 창 열면 결과 이미지 보이는 오류 해결 (완료 ✔︎)

2023년 6월 3주차
- 화살표, 이어서 계속하기, 리셋 버튼 이미지 변경
- 효과음 찾아보기 (https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9D%8C%EC%95%85-%EA%B0%9D%EC%B2%B4Audio-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

2023년 6월 4주차
- 효과음 적용
- 퀴즈 문제 풀이 부분 object 형식으로 불러오도록 바꿔보기

2023년 6월 5주차
- 엔딩 ()
- document.cookie 또는 localstorage 이용해서 플레이 기록 저장해보기 (뽑은 캡슐 갯수)

*/

//문제 리스트
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
        correctAnswer : 2
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

// 첫 화면 영역
let startArea = document.querySelector(".start_area");

// 시작 버튼
let startBtn = document.querySelector(".start_btn");

// 메인 영역
let mainArea = document.querySelector(".main_area");

// 동전 이미지
let coinImg = document.querySelector(".coin");

// 동전 넣는 영역
let coinDropArea = document.querySelector(".coin_drop_area");

// 가격
let price = document.querySelector(".machine_area .price span").innerText;

// 내가 낸 동전 문구 영역
let moneyCount = document.querySelector(".coin_count strong span");

// 핸들 이미지
let handle = document.querySelector(".handle");

// 핸들 돌려! 알림
let turn = document.querySelector(".turn");

// 출구
let ballExit = document.querySelector(".capsule_exit");

// 캡슐통
let balls = document.querySelector(".balls");

// 뽑은 캡슐 딤처리
let outBallDim = document.querySelector(".capsule_open");

// 인벤토리창 오픈 아이콘
let myBag = document.querySelector(".my_bag");

// 인벤토리창 딤처리
let inventoryDim = document.querySelector(".inventory_open");

// 인벤토리창 레이어 리스트 영역
let inventoryList = document.querySelector(".inventory_open .layer ul");

// 인벤토리창 닫기
let inventoryClose = document.querySelector(".inventory_open .close");

// 인벤토리창 자세히 보기
let inventoryDetail = document.querySelector(".inventory_open .detail");

// 퀴즈 아이콘
let quizBtn = document.querySelector(".quiz");

// 퀴즈 딤처리 레이어
let quizList = document.querySelector(".quiz_list");

// 퀴즈 리스트 팝업 닫기 버튼
let quizListClose = document.querySelector(".quiz_list .close");

// 퀴즈 리스트
let quizListLi = document.querySelectorAll(".quiz_list ul li");

// 퀴즈 문제 팝업 딤처리
let quizPopDim = document.querySelector(".quiz_pop");

// 퀴즈 문제 팝업 닫기 버튼
let quizPopClose = document.querySelector(".quiz_pop .close");

// 리셋 버튼
let resetBtn = document.querySelector(".reset");

// 랜덤 배열
let arr = [];
let newRandomArr = [];

// 게임 플레이 카운트
let playCount = 0;

// 동전 갯수 카운트
let coinCount = 0;

// 무료 동전 갯수 카운트
let freeCoin = 4;

// 내가 맞춘 문제 수
let correctCount = 0;

// 인벤토리 아이템 카운트
let inventoryCount = 0;

// 드래그 이벤트 처리를 위한 변수
let initialX = parseInt(getComputedStyle(coinImg).top);//초기 동전 이미지의 style css left 값
let initialY = parseInt(getComputedStyle(coinImg).left);//초기 동전 이미지의 style css top 값
let currentX;//현재 동전 이미지의 left 값
let currentY;//현재 동전 이미지의 top 값
let active = false;//동전 이미지의 드래그인지 확인하기 위한 변수

//(1) start !
startBtn.addEventListener('click', startBtnEvent)
function startBtnEvent(){
    startBtn.classList.add('on');
    setTimeout(function(){
        startArea.classList.add('out');
    }, 500);
    setTimeout(function(){
        startBtn.classList.remove('on');
        startArea.classList.remove('out');
        startArea.style.display = 'none';
        mainArea.classList.add('on');
        mainArea.style.display = 'block';
        randomResult();//랜덤 결과 생성
        createBallImg();//캡슐 이미지 생성
    }, 1000);
    setTimeout(function(){
        mainArea.classList.remove('on');
    }, 1500)
    coinImgDisplay();//동전 위치 초기화
}

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
function createBallImg(){
    if(parseInt(playCount) == 0){//처음 시작 모든 갯수 이미지 캡슐 노출
        let createBall = document.createElement("img");
        createBall.setAttribute("src", "./img/ball_box_" + parseInt(playCount + 1) + ".png");
        createBall.setAttribute("alt", "캡슐 " + parseInt(playCount + 1));
        balls.append(createBall);   
    }else if(playCount == 15){//모든 캡슐 소진했을 경우
        let ballsImg = document.querySelector(".balls img");
        ballsImg.remove();
    }else{//여러번 실행했을 경우, 이미지 업데이트
        let ballsImg = document.querySelector(".balls img");
        ballsImg.setAttribute("src", "./img/ball_box_" + parseInt(playCount + 1) + ".png");
        ballsImg.setAttribute("alt", "캡슐 " + parseInt(playCount + 1)); 
    }
}

//(4) 동전 드래그 이벤트
mainArea.addEventListener("mousedown", dragStart);//마우스 왼쪽 버튼을 누를 때
mainArea.addEventListener("mouseup", dragEnd);//마우스 왼쪽 버튼을 누르고 있다가 뗄 때
mainArea.addEventListener("mousemove", drag);//마우스 왼쪽 버튼을 누르면서 움직일 때

mainArea.addEventListener("touchstart", dragStart);//스크린에 손가락이 닿을 때
mainArea.addEventListener("touchend", dragEnd);//스크린에서 손가락을 뗄 때
mainArea.addEventListener("touchmove", drag);//스크린에 손가락이 닿은 채로 움직일 때

function dragStart(e) {
    if (e.target === coinImg) {
        active = true;
    }
    // console.log('dragStart')
}

function drag(e) {
    if (active) {
        e.preventDefault();//드래그 기본 동작 취소, 이벤트 발생할 때 style 업데이트
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - (coinImg.getBoundingClientRect().width)/2;//첫번째 터치액션값
            currentY = e.touches[0].clientY - (coinImg.getBoundingClientRect().height)/2;
        }else{
            currentX = e.clientX - (coinImg.getBoundingClientRect().width)/2;//현재 top 값은 웹 문서상 top 값과 같음, 마우스 가운데 정렬
            currentY = e.clientY - (coinImg.getBoundingClientRect().height)/2;//현재 left 값은 웹 문서상 left 값과 같음, 마우스 가운데 정렬
        }
        coinImg.style.left = currentX + "px";
        coinImg.style.top = currentY + "px";
        // console.log('drag')
    }
}

function dragEnd() {
    active = false;
    // console.log('dragEnd')
    checkElementEnter();//(3) coinDropArea 진입 체크
}

//(5) 동전 넣는 영역에 진입했는지 체크
function checkElementEnter() {
    let targetRect = coinDropArea.getBoundingClientRect();//웹 문서상 위치 값
    let coinRect = coinImg.getBoundingClientRect();//웹 문서상 동전이미지 위치 값
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
    //무료 동전 4개
    if(freeCoin > 0){
        coinCount += 500;
        freeCoin--;
        moneyCount.textContent = coinCount;//내가 낸 동전 화면에 보여주기
        console.log("Count:", coinCount);
        coinImgDisplay();
        console.log('무료 동전 4개')
        console.log('freeCoin : ', freeCoin)
    }
    //무료 동전 0개, price보다 동전이 적을 때
    if(freeCoin == 0 && parseInt(coinCount) > 0 && parseInt(coinCount) < parseInt(price)){
        console.log('무료 동전 0개, price보다 동전이 적을 때')
        return false;
    }
 
    //price랑 동전이 같거나 클 때
    if(parseInt(coinCount) == parseInt(price) || parseInt(coinCount) > parseInt(price)){
        capsuleOut();//캡슐 애니메이션 실행
    }
}

//(7) 동전 위치 초기화
function coinImgDisplay(){
    coinImg.style.display = 'none';
    //내가 낸 동전이 가격과 같을 때 제외, 무료 동전이 남아있을 때
    if(parseInt(coinCount) !== parseInt(price) && freeCoin > 0){
        // if(freeCoin > 0){
            setTimeout(function(){
                coinImg.style.display = 'block';
                coinImg.style.left = initialY + "px";
                coinImg.style.top = initialX + "px";
            }, 500)
        // }
    }
}

//(8) 캡슐 뽑기 애니메이션 실행
function capsuleOut(){
    turn.classList.add('on');
    console.log('돌려 !')
    handle.addEventListener("click", handleAni);//애니메이션 실행
}
function handleAni(){
    turn.classList.remove('on');
    handle.classList.add('on');//핸들 애니메이션
    // 동전, 카운트 계산
    coinCount = coinCount - price;
    moneyCount.textContent = coinCount;
    console.log('coinCount = coinCount - price', coinCount)
    console.log('moneyCount.textContent = coinCount', moneyCount.textContent)
    setTimeout(function(){
        handle.classList.remove('on');
        balls.classList.add('on');//캡슐통 애니메이션
    }, 1700);
    setTimeout(function(){
        balls.classList.remove('on');
        playCount++;//플레이 카운트 횟수 ++
        createBallImg();//캡슐 통 이미지 업데이트
        myCapsule();//뽑은 캡슐 이미지 노출
        ballExit.classList.add('on');//캡슐 떨어지는 애니메이션
    }, 2800);
    handle.removeEventListener("click", handleAni);//핸들 클릭 이벤트 제거
};

//(9) 뽑은 캡슐 이미지 노출
function myCapsule(){
    let outBall = document.createElement("img");
    outBall.setAttribute("class", "my_ball");
    outBall.setAttribute("src", "./img/ball_" + playCount + ".png");
    outBall.setAttribute("alt", "뽑은 캡슐");
    ballExit.append(outBall);
    outBallDimEvent(outBall);//딤처리
}

//(10) 뽑은 캡슐 딤처리, 오픈, 이어서 하기 버튼
function outBallDimEvent(e){
    let keepGoingbtn = document.createElement("img");
    e.addEventListener('click', () => {
        outBallDim.classList.add('on');
        outBallDim.append(e);
        let outBallDimImg = document.querySelector(".capsule_open.on img");
        outBallDimImg.addEventListener('click', function(){//결과 이미지 노출
            //랜덤 결과 이미지
            console.log('뽑은 횟수 : ',playCount);
            e.setAttribute("class", "open_ball");
            e.setAttribute("src", "./img/open_img_" + newRandomArr[playCount - 1] + ".png");//랜덤 배열 index 기준으로 결과 이미지 노출
            e.setAttribute("alt", "뽑은 캡슐 오픈");
            //이어서 하기 버튼 생성
            keepGoingbtn.setAttribute("class", "keep_going_btn");
            keepGoingbtn.setAttribute("src", "./img/open_img_v2_7.png");//버튼 이미지
            keepGoingbtn.setAttribute("alt", "계속");
            outBallDim.append(keepGoingbtn);

            inventoryCount++;//인벤토리 카운트 횟수 ++
            console.log('인벤토리 아이템 ' + inventoryCount + '개 획득 !')
        })
    }, {once : true})//한 번만 실행
    keepGoingEvent(keepGoingbtn, e);
}

//(11) 이어서 뽑기
function keepGoingEvent(keepGoingbtn, item){
    keepGoingbtn.addEventListener('click', function(){
        outBallDim.classList.remove('on');//딤 제거
        keepGoingbtn.remove();//이어서 하기 버튼 제거
        item.remove();//뽑은 이미지 제거
        //내가 가진 동전이 가격과 같거나, 클 때 계속 실행
        // priceCount();
        if(parseInt(coinCount) == parseInt(price) || parseInt(coinCount) > parseInt(price)){
            capsuleOut();//캡슐 애니메이션 실행
        }else{
            return false;
        }
    });
}

//(12) 인벤토리 창 오픈
myBag.addEventListener("click", inventoryOpen);
function inventoryOpen(){
    inventoryDim.classList.add('on');
    for(let i=1;i<=15;i++){//빈 칸 이미지 생성
        let inventoryListItem = document.createElement("li");
        let inventoryListItemImg = document.createElement("img");
        inventoryList.append(inventoryListItem)
        inventoryListItemImg.setAttribute("src", "./img/q_icon.png");
        inventoryListItemImg.setAttribute("alt", "빈 칸");
        inventoryListItem.append(inventoryListItemImg)
    };
    if(inventoryCount > 0){//뽑은 이미지 생성
        for(let e=1;e<=inventoryCount;e++){
            let inventoryGetItem = document.querySelector('.inventory_open .layer ul li:nth-of-type('+ e +') img')
            inventoryGetItem.setAttribute("src", "./img/open_img_" + newRandomArr[e - 1] + ".png");//랜덤 배열 index 기준으로 결과 이미지 노출
            inventoryGetItem.setAttribute("alt", "내 아이템 " + e);
            inventoryGetItem.addEventListener("click", function(){
                inventoryDetail.classList.add("on");
                let inventoryDetailImg = document.createElement("img");
                inventoryDetailImg.setAttribute("src", "./img/open_img_" + newRandomArr[e - 1] + ".png");//랜덤 배열 index 기준으로 결과 이미지 노출
                inventoryDetailImg.setAttribute("alt", "내 아이템 "+ e +" 자세히 보기");
                inventoryDetail.append(inventoryDetailImg)
                inventoryDetail.addEventListener("click", function(){//자세히 보기
                    inventoryDetail.classList.remove("on");
                    inventoryDetailImg.remove();//자세히 보기 이미지 제거
                });
            });
        };
    };
    inventoryClose.addEventListener("click",function(){//인벤토리 창 닫기
        inventoryDim.classList.remove('on');
        let inventoryListItemAll = document.querySelectorAll(".inventory_open ul li")
        inventoryListItemAll.forEach(function(el){
            el.remove();//인벤토리 이미지 제거
        });
    });
}

//(13) 퀴즈 리스트 팝업
quizBtn.addEventListener("click", quizListEvent);
function quizListEvent(){
    quizList.classList.add('on');//리스트 팝업 열기
    quizListLi.forEach((el, idx) => {
        el.addEventListener("click", function(){//문제 선택
            if(el.classList.contains('off') == false){//안 푼 문제일때만 실행
                quizPopDim.classList.add('on');//선택한 문제 풀기 팝업 열기

                //선택한 문제 풀기 팝업 start
                let quizPopLayer = document.querySelector(".quiz_pop .quiz_" + (idx + 1) + ".layer");
                let quizPopCheck = document.querySelectorAll(".quiz_pop .quiz_" + (idx + 1) + ".layer ul li label");
                let quizPopLayerClose = document.querySelector(".quiz_pop .quiz_" + (idx + 1) + ".layer .close");
                quizPopLayer.classList.add('on');//선택한 문제 idx에 따라서 매칭, 팝업 오픈

                quizPopCheck.forEach((e)=>{//동전 지급 이벤트
                    e.addEventListener("click", function(){
                        console.log(e)
                        let quizSelect = e.getAttribute("for");//선택한 label의 for값 가져오기
                        let quizId = document.getElementById(quizSelect);//for랑 일치하는 id가진 태그 찾기
                        let quizPlusCoin = parseInt(quizId.value);
                        // console.log(quizPlusCoin)
                        coinCount += quizPlusCoin//value 만큼 동전 추가
                        moneyCount.textContent = coinCount;//동전 카운트 텍스트 동기화
                        console.log('coinCount += quizPlusCoin', coinCount)
                        // priceCount();
                        if(parseInt(coinCount) == parseInt(price) || parseInt(coinCount) > parseInt(price) ){//동전이 가격과 같거나, 클 때
                            capsuleOut();//캡슐 애니메이션 실행
                        }

                        // alert("정답 선택 완료");
                        quizPopDim.classList.remove('on');//문제 풀기 딤처리 해제
                        quizPopLayer.classList.remove('on');//문제 풀기 팝업 닫기
                        el.classList.add('off')//리스트 팝업 푼 문제 체크
                    })
                })

                quizPopLayerClose.addEventListener("click", function(){//문제 풀기 팝업 닫기 버튼 클릭
                    if(confirm("지금 창을 닫으면 다시 이 문제를 풀 수 없습니다. 그래도 닫으시겠습니까 ?")){//"예" 선택
                        quizPopLayer.classList.remove('on')//문제 풀기 팝업 닫기
                        quizPopDim.classList.remove('on')//문제 풀기 딤처리 해제
                        el.classList.add('off')//리스트 팝업 푼 문제 체크
                    }else{//"아니오" 선택
                       return false;
                    }
                }) 
            }
        })
    })
    quizListClose.addEventListener("click", function(){//리스트 팝업 닫기
        quizList.classList.remove('on');
    })
}

//(15) 리셋
resetBtn.addEventListener("click", resetEvent);
function resetEvent(){
    playCount = 0;//플레이 횟수 초기화
    coinCount = 0;//동전 카운트 초기화
    moneyCount.textContent = 0;//동전 카운트 텍스트 초기화
    coinImg.style.display = 'none';//동전 이미지 숨김
    startArea.style.display = "block";
    mainArea.style.display = "none";
}


/*
문제 정답 리스트

1. 쿠로미가 속한 애니메이션 제목은? ->500
- 마이멜로디 ㅇㅇ
- 쿠로미
- 시나모롤
- 헬로키티

2. 산리오 캐릭터가 아닌 것은 ? ->500
- 헬로키티
- 마이멜로디
- 시나모롤
- 흰둥이 ㅇㅇㅇ

3. 마이멜로디의 리본 컬러는 ? ->1000
- 핑크 ㅇㅇㅇ
- 하늘색
- 하얀색
- 노란색

4. 쿠로미의 꼬리 색은 ? ->1000
- 핑크
- 블랙 ㅇㅇㅇ
- 회색
- 보라색

5. 마이멜로디가 운동하는 방법 ->1000
- 귀 굽혀펴기ㅇㅇㅇ
- 귀 철봉
- 귀 아령
- 귀 물구나무서기

6. 마이멜로디의 보물은 ? ->1500
- 두건ㅇㅇㅇㅇ
- 리본
- 앞치마
- 꽃

7. 헬로키티의 최애 음식은 ? ->1500
- 애플 파이 ㅇㅇㅇㅇㅇ
- 푸딩
- 아몬드파운드 케이크
- 시나몬 컵케익

8. 쿠로미가 흑화한 이유는 ? ->2000
- 마이멜로디랑 비교를 당해서ㅇㅇ
- 쿠로미가 사춘기라서
- 검은색이 최애라서
- 마이멜로디가 생일을 까먹어서

9. 쿠로미가 최근에 빠진 소설 종류는 ? ->2000
- 추리소설
- 판타지소설
- 연애소설 ㅇㅇㅇㅇㅇㅇㅇ
- 스릴러 소설

10. 헬로키티 친구인 로티의 성격은 ? ->2000
- 다혈질
- 건방짐
- 느긋함ㅇㅇㅇㅇㅇ
- 온화함
 
11. 마이멜로디의 친구가 아닌 캐릭터는 ? ->2500
- 캥거루
- 마이스윗피아노
- 나비
- 기린ㅇㅇㅇㅇ

12. 마이멜로디의 남동생 이름은? ->2500
- 플랫
- 음표
- 크레센도
- 리듬ㅇㅇㅇ

13. 시나모롤의 친구가 아닌 캐릭터는 ? ->3500 
- 카푸치노
- 모카
- 에스프레소
- 라떼ㅇㅇㅇㅇㅇ

14. 헬로키티의 형제 이름은 ? ->3500
- 피피
- 미미ㅇㅇㅇㅇ
- 나나
- 키키

15. 쿠로미즈 파이브가 아닌 캐릭터는 ? ->3000
- 팡미ㅇㅇㅇㅇ
- 왕미
- 콘미
- 츄미

*/