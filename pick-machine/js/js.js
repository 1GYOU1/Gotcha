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