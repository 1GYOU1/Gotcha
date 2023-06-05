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

/*

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

++ 화살표, 이어서 계속하기 버튼 이미지 변경
++ 사칙연산, 퀴즈 등 맞춰야 동전 지급
++ 효과음 넣기 (https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9D%8C%EC%95%85-%EA%B0%9D%EC%B2%B4Audio-%EB%8B%A4%EB%A3%A8%EA%B8%B0)
++ 뽑기 열기 전에 인벤토리 창 열면 결과 이미지 보이는 오류

*/

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

// 캡슐 이미지 전체 셀렉
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

// 퀴즈 버튼
let quiz = document.querySelector(".quiz");

// 퀴즈창 닫기
let quizClose = document.querySelector(".quiz_list .close");

// 퀴즈 딤처리 레이어
let quizList = document.querySelector(".quiz_list");

// 다시 시작 하기
let resetBtn = document.querySelector(".reset");

// 랜덤 배열
let arr = [];
let randomArr = [];

// 게임 플레이 카운트
let playCount = 0;

// 동전 갯수 카운트
let coinCount = 0;

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
}

//(2) 랜덤 결과
function randomResult(){
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
}

//(3) 캡슐 이미지 생성
function createBallImg(){
    for(let i=1;i<=15;i++){
        let createBall = document.createElement("img");
        createBall.setAttribute("class", "ball_" + i);
        createBall.setAttribute("src", "./img/ball_" + i + ".png");
        createBall.setAttribute("alt", "캡슐 " + i);
        balls.append(createBall);
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
        priceCount()
    }
}

//(6) 넣은 동전 카운트
function priceCount(){
    if(parseInt(coinCount) < parseInt(price)){//가격보다 낸 동전이 적을때만 넣을 수 있음
        coinCount += 500;
        moneyCount.textContent = coinCount;//내가 낸 동전 화면에 보여주기
        console.log("Count:", coinCount);
        coinImgDisplay();//동전 위치 초기화
    } 
    if(parseInt(coinCount) == parseInt(price)){//내가 낸 동전이 가격과 같을 때
        capsuleOut();//캡슐 애니메이션 실행
    }
}

//(7) 동전 위치 초기화
function coinImgDisplay(){
    coinImg.style.display = 'none';
    if(parseInt(coinCount) !== parseInt(price)){//내가 낸 동전이 가격과 같을 때 제외
        setTimeout(function(){
            coinImg.style.display = 'block';
            coinImg.style.left = initialY + "px";
            coinImg.style.top = initialX + "px";
        }, 500)
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
    setTimeout(function(){
        handle.classList.remove('on');
        balls.classList.add('on');//캡슐통 애니메이션
    }, 1700);
    setTimeout(function(){
        balls.classList.remove('on');
        myCapsule();//통에 있던 캡슐이랑 이미지 매칭
        ballExit.classList.add('on');//캡슐 떨어지는 애니메이션
    }, 2800);
    handle.removeEventListener("click", handleAni);//핸들 클릭 이벤트 제거
}

//(9) 통에 있던 캡슐이랑 이미지 매칭
function myCapsule(){
    playCount++;//플레이 카운트 횟수 ++
    let removeBall = document.querySelector(".ball_" + playCount);
    removeBall.remove();
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
            e.setAttribute("src", "./img/open_img_" + randomArr[playCount - 1] + ".png");//랜덤 배열 index 기준으로 결과 이미지 노출
            e.setAttribute("alt", "뽑은 캡슐 오픈");
            //이어서 하기 버튼 생성
            keepGoingbtn.setAttribute("class", "keep_going_btn");
            keepGoingbtn.setAttribute("src", "./img/open_img_v2_7.png");//버튼 이미지
            keepGoingbtn.setAttribute("alt", "계속");
            outBallDim.append(keepGoingbtn);
        })
    }, {once : true})//한 번만 실행
    keepGoingEvent(keepGoingbtn, e);
}

//(11) 이어서 뽑기, 엔딩
function keepGoingEvent(keepGoingbtn, item){
    keepGoingbtn.addEventListener('click', function(){
        outBallDim.classList.remove('on');//딤 제거
        keepGoingbtn.remove();//이어서 하기 버튼 제거
        item.remove();//뽑은 이미지 제거
        if(playCount <= 15){//이어서 뽑기
            coinImgDisplay();//동전이미지 노출    
        }else{//끝 !
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
    if(playCount > 0){//뽑은 이미지 생성
        for(let e=1;e<=playCount;e++){//playCount == e
            let inventoryGetItem = document.querySelector('.inventory_open .layer ul li:nth-of-type('+ e +') img')
            inventoryGetItem.setAttribute("src", "./img/open_img_" + randomArr[e - 1] + ".png");//랜덤 배열 index 기준으로 결과 이미지 노출
            inventoryGetItem.setAttribute("alt", "내 아이템 " + e);
            inventoryGetItem.addEventListener("click", function(){
                inventoryDetail.classList.add("on");
                let inventoryDetailImg = document.createElement("img");
                inventoryDetailImg.setAttribute("src", "./img/open_img_" + randomArr[e - 1] + ".png");//랜덤 배열 index 기준으로 결과 이미지 노출
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

//(13) 퀴즈
quiz.addEventListener("click", quizEvent);
function quizEvent(){
    quizList.classList.add('on');
    quizClose.addEventListener("click", function(){
        quizList.classList.remove('on');
    })
    //작성중 !!@
}

//(14) 리셋
resetBtn.addEventListener("click", resetEvent);
function resetEvent(){
    playCount = 0;//플레이 횟수 초기화
    coinCount = 0;//동전 카운트 초기화
    moneyCount.textContent = 0;//동전 카운트 텍스트 초기화
    coinImg.style.display = 'none';//동전 이미지 숨김
    startArea.style.display = "block";
    mainArea.style.display = "none";
}