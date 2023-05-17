//include html
window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
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
  
  
  //코인 이미지 이동, 드롭 이벤트
  var coinImg = document.querySelector(".coin_drag_area a img");
  var coinDragArea = document.querySelector(".main_area");
  var targetElement = document.querySelector(".coin_drop_area");
  
  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;
  
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
  
  function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
  
      active = false;
  
      // 드래그 종료 시 특정 요소 진입 확인 함수 호출
      checkElementEnter();
  }
  
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
  
  function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
  
  function handleElementEnter() {
      console.log("Entered the target element!");
      // 특정 요소에 진입했을 때 처리할 내용을 여기에 작성합니다.
      // 예: 콘솔 로그, 추가 작업 등
  }
  
  function checkElementEnter() {
      var targetRect = targetElement.getBoundingClientRect();
      var coinRect = coinImg.getBoundingClientRect();
  
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
1. 코드의 첫 부분은 필요한 요소들을 선택하는 변수들을 정의합니다. coinImg는 동전 이미지를 나타내는 <img> 요소를 선택하고, coinDragArea는 드래그 가능한 영역을 나타내는 요소를 선택합니다. targetElement는 동전을 드롭할 목표 영역을 선택합니다.

2. active, currentX, currentY, initialX, initialY, xOffset, yOffset 등의 변수들을 초기화합니다. 이들 변수는 드래그 동작을 추적하고 제어하는 데 사용됩니다.

3. coinDragArea 요소에 터치 이벤트와 마우스 이벤트에 대한 리스너들을 추가합니다. 이벤트들은 드래그 시작, 드래그 종료, 드래그 중에 호출될 함수들을 지정합니다.

4. dragStart 함수는 드래그가 시작될 때 호출되는 함수입니다. 이 함수는 이벤트의 타입에 따라 초기 좌표를 설정하고, 동전 이미지를 드래그 중으로 표시하기 위해 active 변수를 활성화합니다.

5. dragEnd 함수는 드래그가 종료될 때 호출되는 함수입니다. 이 함수는 최종 위치를 업데이트하고 active 변수를 비활성화합니다. 또한 checkElementEnter 함수를 호출하여 특정 요소에 진입했는지 확인합니다.

6. drag 함수는 드래그 중에 호출되는 함수로, 드래그 중인 경우에만 동작합니다. 이 함수는 현재 좌표를 업데이트하고 이미지의 위치를 변경합니다. 또한 checkElementEnter 함수를 호출하여 특정 요소에 진입했는지 확인합니다.

7. setTranslate 함수는 요소의 위치를 변경하기 위해 transform 속성을 설정합니다. 이 함수는 xPos와 yPos 매개변수로 전달된 좌표를 사용하여 요소를 이동시킵니다.

8. handleElementEnter 함수는 특정 요소에 진입했을 때 실행되는 처리를 수행하는 함수입니다. 현재 구현에서는 간단한 콘솔 로그만 포함되어 있습니다. 이 함수는 필요에 따라 특정 요소에 진입했을 때 수행해야 할 작업을 추가할 수 있습니다.

9. checkElementEnter 함수는 동전 이미지와 목표 영역의 경계를 비교하여 특정 요소에 진입했는지

10. checkElementEnter 함수는 동전 이미지와 목표 영역의 경계를 비교하여 특정 요소에 진입했는지를 확인합니다. getBoundingClientRect() 메서드를 사용하여 동전 이미지와 목표 영역의 위치와 크기를 가져옵니다. 그런 다음, 동전 이미지가 목표 영역 내에 들어왔는지를 확인하기 위해 좌표 비교를 수행합니다. 동전 이미지가 목표 영역 내에 위치하면 handleElementEnter 함수를 호출하여 특정 요소에 진입했음을 처리합니다.
*/