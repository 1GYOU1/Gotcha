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

2. for문으로 캡슐 이미지 태그 생성

2. 동전 이미지 드래그(pc), 터치(mobile) 시 메인 영역('.main_area')안에서 움직이는 효과 transform:"translate3d(X ,Y, 0) 또는 position top, left
                                                                                -> 웹 문서 기준으로 각각 얼마나 떨어져 있는지 clientX축, clientY축 구해서 스타일 변경

3. 동전 넣는 곳('.coin_drop_area') 영역에 진입했는지, 해당 영역에서 마우스를 떼는 동작을 했는지 체크

4. 동전 몇 번 넣었는지 카운팅

5. 동전 이미지 위치 초기화

6. 가격과 넣은 동전의 갯수가 같을 때 애니메이션 실행

7. 뽑은 캡슐 클릭 시 


++ 뽑은 캡슐 클릭 시 딤처리, 애니메이션 효과, 줌인, 캡슐 열리기
++ 화살표 이미지 변경
++ 캐릭터 이미지 모으기 PNG
++ 플레이 여러번 -> 캡슐 이미지 출구로 나오는 이미지 주소 변경, 캡슐 이미지 매칭하면서 갯수 줄이기

*/

let coinDragArea = document.querySelector(".main_area");//메인 영역
let coinImg = document.querySelector(".coin");//동전 이미지
let coinDropArea = document.querySelector(".coin_drop_area");// 동전 넣는 영역

// 게임 플레이 카운트
let playCount = 0;

// 동전 갯수 카운트
let coinCount = 0;

// 가격
let price = document.querySelector(".machine_area .price span").innerText;

// 내가 낸 동전 문구 영역
let moneyCount = document.querySelector(".coin_count strong span");

// 핸들 이미지
let handle = document.querySelector(".handle");

// 핸들 돌려! 알림
let turn = document.querySelector(".turn");

// 출구
let capsule = document.querySelector(".capsule_exit");

// 캡슐 이미지 전체 셀렉
let balls = document.querySelector(".balls");

// 드래그 이벤트 처리를 위한 변수
let initialX = parseInt(getComputedStyle(coinImg).top);//초기 동전 이미지의 style css left 값
let initialY = parseInt(getComputedStyle(coinImg).left);//초기 동전 이미지의 style css top 값
let currentX;//현재 동전 이미지의 left 값
let currentY;//현재 동전 이미지의 top 값
let active = false;//동전 이미지의 드래그인지 확인하기 위한 변수

//(1) start !
$('.start_btn').click(function() {
    $(this).parent().fadeOut();
    setTimeout(function() {//스크롤 생기면서 버튼이 밀리는 현상때문에 setTimeout 사용
        $('.main_area').fadeIn()
        createBallImg()//캡슐 이미지 생성
    }, 500);
});

//(2) 캡슐 이미지 생성
function createBallImg(){
    for(let i=1;i<=15;i++){
        let createBall = document.createElement("img");
        createBall.setAttribute("class", "ball_" + i);
        createBall.setAttribute("src", "./img/ball_" + i + ".png");
        createBall.setAttribute("alt", "캡슐 " + i);
        balls.append(createBall);
    }
}

//(3) 동전 드래그 이벤트
coinDragArea.addEventListener("mousedown", dragStart);//마우스 왼쪽 버튼을 누를 때
coinDragArea.addEventListener("mouseup", dragEnd);//마우스 왼쪽 버튼을 누르고 있다가 뗄 때
coinDragArea.addEventListener("mousemove", drag);//마우스 왼쪽 버튼을 누르면서 움직일 때

function dragStart(e) {
    if (e.target === coinImg) {
        active = true;
    }
    // console.log('dragStart')
}

function drag(e) {
    if (active) {
        e.preventDefault();//드래그 기본 동작 취소, 이벤트 발생할 때 style 업데이트
        currentX = e.clientX - (coinImg.getBoundingClientRect().width)/2;//현재 top 값은 웹 문서상 top 값과 같음, 마우스 가운데 정렬
        currentY = e.clientY - (coinImg.getBoundingClientRect().height)/2;//현재 left 값은 웹 문서상 left 값과 같음, 마우스 가운데 정렬
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

//(4) 동전 넣는 영역에 진입했는지 체크
function checkElementEnter() {
    let targetRect = coinDropArea.getBoundingClientRect();//웹 문서상 위치 값
    let coinRect = coinImg.getBoundingClientRect();//웹 문서상 위치 값
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

//(5) 넣은 동전 카운트
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

//(6) 동전 위치 초기화
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

//(7) 캡슐 뽑기 애니메이션 실행
function capsuleOut(){
    turn.classList.add('on');
    console.log('돌려 !')
    handle.addEventListener("click", handleAni);//애니메이션 실행
    // 동전, 카운트 초기화
    coinCount = 0;
    moneyCount.textContent = 0;
}

function handleAni(){
    turn.classList.remove('on');
    handle.classList.add('on');//핸들 애니메이션
    setTimeout(function(){
        handle.classList.remove('on');
        balls.classList.add('on');//캡슐 전체 애니메이션
    }, 1700);
    setTimeout(function(){
        balls.classList.remove('on');
        myCapsule();//내가 뽑은 캡슐
        capsule.classList.add('on');//캡슐 떨어지는 애니메이션
    }, 2800);
    handle.removeEventListener("click", handleAni);//클릭 이벤트 제거
}

//(8) 내가 뽑은 캡슐
function myCapsule(){
    playCount++;//플레이 카운트 횟수 ++
    let removeBall = document.querySelector(".ball_" + playCount)
    removeBall.remove();
    let outBall = document.createElement("img");
    outBall.setAttribute("class", "my_ball")
    outBall.setAttribute("src", "./img/ball_" + playCount + ".png")
    outBall.setAttribute("alt", "내가 뽑은 캡슐")
    capsule.append(outBall)
}