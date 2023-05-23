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
  
//start button event
$('.start_btn').click(function() {
    $(this).parent().fadeOut();
    setTimeout(function() {//스크롤 생기면서 버튼이 밀리는 현상때문에 setTimeout 사용
        $('.main_area').fadeIn()
    }, 500);
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
    
// //coin drag and drop event
// // 처음 드래그 요소가 위치하고 있는 좌측 박스 영역
// const CoinDragArea = document.querySelector(".coin_drag_area");

// CoinDragArea.addEventListener("dragover", (e) => {
//   e.preventDefault();
// });
// CoinDragArea.addEventListener("drop", (e) => {
//   e.preventDefault();
//   console.log("드래그 요소가 '첫' 번째 박스 영역에 드롭");
// });
    
    
// // 드래그 요소가 이동하여 위치할 우측 박스 영역
// const CoinDropArea = document.querySelector(".coin_drop_area");

// CoinDropArea.addEventListener("dragover", (e) => {
//   e.preventDefault();
// });
// CoinDropArea.addEventListener("drop", (e) => {
//   e.preventDefault();
//   console.log("드래그 요소가 '두' 번째 박스 영역에 드롭");
// });
    
    
//코인 이미지 이동, 드롭 이벤트 start
let coinImg = document.querySelector(".coin_drag_area a img");
let coinDragArea = document.querySelector(".main_area");
let coinDropArea = document.querySelector(".coin_drop_area");

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
  
//드래그 이벤트 처리를 위한 변수들
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
  
//터치 이벤트와 마우스 이벤트를 등록. 이벤트 종류에 따라 dragStart, dragEnd, drag 함수가 호출
coinDragArea.addEventListener("touchstart", dragStart, false);
coinDragArea.addEventListener("touchend", dragEnd, false);
coinDragArea.addEventListener("touchmove", drag, false);

coinDragArea.addEventListener("mousedown", dragStart, false);
coinDragArea.addEventListener("mouseup", dragEnd, false);
coinDragArea.addEventListener("mousemove", drag, false);
  
function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === coinImg) {
        active = true;
    }
}
/*
드래그가 시작될 때 호출되는 함수.
터치 이벤트인 경우 touches[0]을 사용하여 초기 좌표를 설정.
마우스 이벤트인 경우 마우스의 클라이언트 좌표와 xOffset, yOffset을 사용하여 초기 좌표를 설정.
coinImg를 클릭한 경우에만 active를 true로 설정.
*/
  
function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;

    // 드래그 종료 시 특정 요소 진입 확인 함수 호출
    checkElementEnter();
}
/*
드래그가 종료될 때 호출되는 함수.
initialX, initialY를 현재 좌표로 업데이트.
active를 false로 설정하여 드래그 중이 아님을 나타냄.
checkElementEnter() 함수를 호출하여 특정 요소에 진입되었는지 확인.
*/
  
function drag(e) {
    if (active) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, coinImg);

        // 드래그 중 특정 요소 진입 확인 함수 호출
        checkElementEnter();
    }
}
/*
drag 함수는 드래그 중에 호출되는 함수입니다.
active가 true인 경우에만 실행됩니다.
이벤트의 기본 동작을 막기 위해 e.preventDefault()를 호출합니다.
터치 이벤트와 마우스 이벤트에 따라 현재 좌표(currentX, currentY)를 업데이트합니다.
좌표의 변화량(xOffset, yOffset)를 업데이트합니다.
setTranslate 함수를 호출하여 이미지를 현재 좌표로 이동시킵니다.
checkElementEnter() 함수를 호출하여 특정 요소에 진입되었는지 확인합니다.
*/
  
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
/*
setTranslate 함수는 요소를 주어진 좌표로 이동시키는 역할을 합니다.
xPos와 yPos를 이용하여 요소의 transform 속성을 업데이트합니다.
*/
  
function handleElementEnter() {
    console.log("Entered the target element!");
    // 특정 요소에 진입했을 때 처리할 내용을 여기에 작성합니다.
}
/*
handleElementEnter 함수는 특정 요소에 진입했을 때 호출되는 함수.
*/

let count = 0; // 카운트 변수
let mouseDown = false; // 마우스 클릭 여부를 나타내는 변수 - true면 클릭이 눌려져있는 상태

let isDragging = false; // 드래그 중인지 여부를 나타내는 변수 - true이면 현재 드래그 중인 상태

coinDragArea.addEventListener("mousedown", function(e) {
    if (e.target === coinImg) {
        isDragging = true;
        mouseDown = true; // 마우스 클릭 시 mouseDown 변수를 true로 설정
    }
}, false);
/*
coinDragArea 요소에서 마우스 버튼이 눌릴 때(마우스 다운) 발생하는 이벤트에 대한 리스너
이벤트의 대상이 coinImg인 경우에만 isDragging을 true로 설정하고, mouseDown을 true로 설정
*/
    
coinDragArea.addEventListener("mouseup", function(e) {
    if (isDragging) {
        let isMouseUpInDropArea = isMouseUpInElement(e, coinDropArea);
        if (isMouseUpInDropArea && mouseDown) {
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
                    handle.classList.add('go');
                    setTimeout(function(){
                        handle.classList.remove('go');
                        capsule.classList.add('on');
                    }, 2000);
                })
            }
        }
    }
    isDragging = false;
    mouseDown = false; // mouseDown 변수를 false로 재설정
}, false);
/*
coinDragArea 요소에서 마우스 버튼이 눌린 후(마우스 업) 발생하는 이벤트에 대한 리스너
isDragging이 true인 경우에만 실행되며, 마우스 업이 coinDropArea 내부에서 발생하고 mouseDown이 true인 경우에만 count를 증가시킵니다. 그리고 isDragging과 mouseDown을 false로 재설정
*/

    
coinDragArea.addEventListener("mouseleave", function() {
    isDragging = false;
    mouseDown = false; // 마우스 영역을 벗어나면 드래그 중이 아니라고 설정
}, false);
/*
coinDragArea 요소를 마우스가 벗어났을 때 발생하는 이벤트에 대한 리스너
드래그 중이 아니라고(isDragging과 mouseDown을 false로 설정) 설정
*/

function isMouseUpInElement(event, element) {
    let rect = element.getBoundingClientRect();
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
}
/*
마우스 업 이벤트가 특정 요소 내에서 발생했는지를 확인하는 역할을 합니다.
event는 마우스 이벤트 객체이고, element는 확인하려는 요소입니다.
getBoundingClientRect()를 사용하여 요소의 경계 사각형 정보(rect)를 가져옵니다.
이벤트의 클라이언트 좌표(event.clientX, event.clientY)를 사용하여 마우스의 위치를 확인합니다.
마우스의 위치가 요소의 경계 사각형
*/

function checkElementEnter() {
    let targetRect = coinDropArea.getBoundingClientRect();
    let coinRect = coinImg.getBoundingClientRect();

    if (
        coinRect.left >= targetRect.left &&
        coinRect.right <= targetRect.right &&
        coinRect.top >= targetRect.top &&
        coinRect.bottom <= targetRect.bottom
    ) {
        // 특정 요소에 진입했을 때 처리할 함수 호출
        handleElementEnter();
    }
}
/*
targetRect와 coinRect 변수:

targetRect: coinDropArea 요소의 경계 사각형 정보를 저장합니다. getBoundingClientRect()를 사용하여 요소의 위치와 크기를 가져옵니다.
coinRect: coinImg 요소의 경계 사각형 정보를 저장합니다. 마찬가지로 getBoundingClientRect()를 사용하여 요소의 위치와 크기를 가져옵니다.

if 문을 사용하여 coinRect와 targetRect 간의 상대적인 위치 관계를 확인합니다.
coinRect.left가 targetRect.left보다 크거나 같고, coinRect.right가 targetRect.right보다 작거나 같으며, coinRect.top이 targetRect.top보다 크거나 같고, coinRect.bottom이 targetRect.bottom보다 작거나 같은 경우를 확인합니다.
이 조건을 만족하는 경우, 즉 coinImg가 coinDropArea 완전히 포함되는 경우에만 아래의 코드 블록이 실행됩니다.

특정 요소에 진입했을 때 처리할 함수인 handleElementEnter를 호출합니다.
*/

function coinRefresh(){
    coinImg.classList.add('on');
    setTimeout(function(){
        coinImg.classList.remove('on');
    }, 3000);
}