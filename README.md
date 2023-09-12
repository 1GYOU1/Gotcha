# Gotcha-project

### 1. Gotcha-vanilla version
 - 순수 바닐라 자바스크립트로 캡슐 뽑기 구현

<br>

### MainPage View

![ezgif com-gif-maker](https://github.com/1GYOU1/Javascript/assets/90018379/e423444a-98cc-410d-af47-8427cb57ea13)

![turn2](https://github.com/1GYOU1/Javascript/assets/90018379/7e0e79c3-eac0-452e-ad48-b52548b60cf0)


<br>

### 주요 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-F68212?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>

<img src="https://img.shields.io/badge/Adobe Photoshop-31A8FF?style=flat-square&logo=Adobe Photoshop&logoColor=white"/>
<img src="https://img.shields.io/badge/Adobe Illustrator-FF9A00?style=flat-square&logo=Adobe Illustrator&logoColor=white"/>

<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>

<br>

### 주요 기능
- 인트로 애니메이션
- 캡슐 뽑기 애니메이션
- 동전 드래그 앤 드롭
- 인벤토리 창
- 퀴즈 맞추기
- 리셋

<br>

### Github Page : 추후 업데이트 예정.

<br>

### 프로젝트 진행 과정

2023년 5월 1~2주차
- 디자인 (완료 ✔︎)
- html, css, scss 작성 (완료 ✔︎)
- start 버튼 클릭, 메인 영역('.main_area') 노출 (완료 ✔︎)

2023년 5월 3~4주차
- 애니메이션 효과 (완료 ✔︎)
- 드래그 앤 드롭 기능 구현 (완료 ✔︎)
- 동전 이미지 위치 초기화 (완료 ✔︎)
- 동전 몇 번 넣었는지 카운팅 ++ (완료 ✔︎)
- 가격과 넣은 동전의 갯수가 같을 때 애니메이션 실행 (완료 ✔︎)
- 뽑은 캡슐 클릭 시 딤처리, 확대 효과, 캡슐 오픈, 이어서 하기 버튼 클릭 이벤트 (완료 ✔︎)

2023년 6월 1주차
- 랜덤 배열을 이용한 결과 이미지 도출 (완료 ✔︎)
- for문 캡슐 이미지 태그 생성 (완료 ✔︎)
- 드래그 앤 드롭 터치 이벤트 추가 (완료 ✔︎)
- 리셋버튼 추가, 인벤토리 팝업 이벤트, 퀴즈 팝업 (완료 ✔︎)

2023년 6월 2주차
- 퀴즈 맞춰야 동전 지급 기능 (완료 ✔︎)
- 캡슐 이미지 불러오는 방식 createBallImg() 수정 (완료 ✔︎)
- 뽑기 열기 전에 인벤토리 창 열면 결과 이미지 보이는 오류 해결 (완료 ✔︎)
    - 핸들 돌리면 플레이 카운트++ 해주는 방식에서 <br/>
    뽑은 캡슐 오픈 클릭 후에 플레이 카운트++ 해주는 방식으로 수정하여 해결.
- 문제 팝업 클릭 이벤트 중복 오류 해결 (완료 ✔︎)
    - 해결 전 : quizPopCheck.forEach((e)=>{//동전 지급 이벤트
        e.addEventListener("click", quizAnswerSelectEvent);        
    해결 후 : quizPopCheck.forEach((e)=>{//동전 지급 이벤트
            e.addEventListener('click', () => coinPlusEvent(e))
    })
    <br/>
    화살표함수 형식으로 매개변수 전달하기.
- 넣은 동전 갯수 카운트 html, js 추가하기 (완료 ✔︎)

2023년 6월 3주차
- 화살표, 이어서 계속하기, 리셋 버튼 이미지 변경 (완료 ✔︎)
- 퀴즈 문제 풀이 부분 object 형식으로 변경 (완료 ✔︎)
- 리셋 버튼 클릭시 값 초기화

2023년 6월 4주차
- 인트로 애니메이션 만들기 (완료 ✔︎)

<br>

---

### 2. Gotcha-React version
 - React.js 라이브러리 사용하여 캡슐 뽑기 구현

 React.js 버전 이어서 보기 -> https://github.com/1GYOU1/Gotcha-react