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

이벤트 동작 순서

1. start 버튼 클릭, 메인 영역('.main_area') 노출

2. 동전 이미지 드래그(pc), 터치(mobile) 시 메인 영역('.main_area')안에서 움직이는 효과 transform:"translate3d(X ,Y, 0) 또는 position top, left
                                                                                -> 웹 문서 기준으로 각각 얼마나 떨어져 있는지 clientX축, clientY축 구해서 스타일 변경

3. 동전 넣는 곳('.coin_drop_area') 영역에 진입했는지 체크

4. 영역에 진입하여 해당 영역에서 마우스를 떼는 동작을 했는지 체크, 몇번했는지 카운팅

5. 3번에서의 카운팅이 가격('.price')/500 과 같아지면 핸들을 돌리라는 표시('.turn.on') 노출

6. 핸들('.handle')을 클릭했을 때 ('.handle.on')이 되고 ('.capsule_exit.on img')이 되면서 애니매이션 노출

*/

//(1) start button event
$('.start_btn').click(function() {
    $(this).parent().fadeOut();
    setTimeout(function() {//스크롤 생기면서 버튼이 밀리는 현상때문에 setTimeout 사용
        $('.main_area').fadeIn()
    }, 500);
});

let coinDragArea = document.querySelector(".main_area");//메인 영역
let coinImg = document.querySelector(".coin");//동전 이미지
let coinDropArea = document.querySelector(".coin_drop_area");// 동전 넣는 영역

// 동전 갯수 카운트
let count = 0;

//가격
let price = document.querySelector(".machine_area .price span").innerText;

//내가 낸 동전
let coinCount = document.querySelector(".coin_count strong span");

//핸들
let handle = document.querySelector(".handle");

//핸들 돌려! 알림
let turn = document.querySelector(".turn");

//가챠 출구 캡슐 이미지
let capsule = document.querySelector(".capsule_exit");

//드래그 이벤트 처리를 위한 변수
let initialX = parseInt(getComputedStyle(coinImg).top);//초기 동전 이미지의 left 값
let initialY = parseInt(getComputedStyle(coinImg).left);//초기 동전 이미지의 top 값
let currentX;//현재 동전 이미지의 left 값
let currentY;//현재 동전 이미지의 top 값
let active = false;//동전 이미지의 드래그인지 확인하기 위한 변수

//(2) 동전 드래그 이벤트
coinDragArea.addEventListener("mousedown", dragStart);//마우스 왼쪽 버튼을 누를 때
coinDragArea.addEventListener("mouseup", dragEnd);//마우스 왼쪽 버튼을 누르고 있다가 뗄 때
coinDragArea.addEventListener("mousemove", drag);//마우스 왼쪽 버튼을 누르면서 움직일 때

function dragStart(e) {
    if (e.target === coinImg) {
        active = true;
    }
    console.log('dragStart')
}

function drag(e) {
    if (active) {
        e.preventDefault();//드래그 기본 동작 취소, 이벤트 발생할 때 style 업데이트
        currentX = e.clientX - (coinImg.getBoundingClientRect().width)/2;//현재 top 값은 웹 문서상 top 값과 같음, 마우스 가운데 정렬
        currentY = e.clientY - (coinImg.getBoundingClientRect().height)/2;//현재 left 값은 웹 문서상 left 값과 같음, 마우스 가운데 정렬
        coinImg.style.left = currentX + "px";
        coinImg.style.top = currentY + "px";
        console.log('drag')
    }
}

function dragEnd() {
    initialX = currentX;//변경된 top값
    initialY = currentY;//변경된 left값
    active = false;
    console.log('dragEnd')
    checkElementEnter();//(3) coinDropArea 진입 체크
}

//(3) 동전 넣는 곳('.coin_drop_area') 영역에 진입했는지 체크
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
        console.log('coin_drop_area 진입 !')

        if(parseInt(count) < parseInt(price)){//가격표보다 카운트가 적을 때만 실행(가격표보다 적을때만 동전 넣을 수 있음)
            count += 500; // 마우스 클릭을 뗐을 때만 카운트 500씩 증가
            coinCount.textContent = count;
            console.log("Count:", count); // 콘솔에 카운트 출력
        } 
        if(parseInt(count) == parseInt(price)){
            turn.classList.add('on');
            console.log('돌려 !')
            handle.addEventListener("click", function(){
                turn.classList.remove('on');
                handle.classList.add('on');
                setTimeout(function(){
                    handle.classList.remove('on');
                    capsule.classList.add('on');
                }, 2000);
            })
        }
    }
}