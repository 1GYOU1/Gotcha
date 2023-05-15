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
  
  var coinImg = document.querySelector(".coin_drag_area a img");
  var coinDragArea = document.querySelector(".main_area");
  
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
      }
  }
  
  function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }