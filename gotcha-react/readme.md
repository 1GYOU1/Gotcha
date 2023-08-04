## gotcha-react
React.js 초기 세팅

macOs 기준

homebrew 설치
> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

설치 후 버전 확인
> brew -v

homebrew가 정상적으로 설치되었으나, 버전 확인이 안되는 경우 PATH 설정해주는 명령어 (내 맥북 기준)
> (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/1gyou1/.zprofile

> eval "$(/opt/homebrew/bin/brew shellenv)"

<br>

git 설치

> brew install git

<br>

node.js 설치

> node -v

> npx create-react-app gotcha-react

> cd gotcha-react

> npm start

<br>

react-router-dom 설치 (Link 태그 사용)

> cd 파일 경로 진입

> npm install react-router-dom

## gh-pages 배포(github.io 페이지에 배포)

### 1. repository 생성
1. public

* 하단 모두 실행했는데도 진입이 안된다면 branch 변경 !
2. Settings -> Pages -> branch 변경 -> gh-pages

### 2. git 연동

git config --global 사용자 이름, 이메일
>$ git config --global user.name "1gyou1"

>$ git config --global user.email "1gyou1@naver.com"

git config --global 유저정보 제거
>$ git config --unset --global user.name

git config --global 등록정보 확인
>$ git config --global --list

github 연결되었는지 확인 - 아무것도 나오지 않는다면 연결해야함.
>$ git remote -v

github repository 연결 (https://github.com/사용자이름/레파지토리)
>$ git remote add origin https://github.com/1gyou1/repository명

#### window

제어판 -> 자격 증명 관리자 -> 일반 자격 증명 추가
```
인터넷 또는 네트워크 주소 : https://github.com
사용자 이름 : 1gyou1
암호 : 토큰
```

### 3. 배포

#### 프로젝트 폴더 진입
>$ cd 폴더명

#### gh-pages : github pages에 업로드 해주는 패키지 설치
>$ npm i gh-pages

상단 명령어 입력하면 package.json 파일에 하단 코드가 추가됨.
```js
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build", //<-- 해당부분이 추가 됨.
"test": "react-scripts test",
"eject": "react-scripts eject"
},
```

#### package.json 파일에 하단 코드 추가

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "gh-pages -d build",//추가 - gh-pages를 실행시키고 build 디렉토리를 가져감
    "predeploy": "npm run build"//추가 - build 다음에 deploy를 해야하는 것을 자동으로 실행하게 해줌.(predeploy가 자동으로 먼저 실행되고 npm run build 실행)
  },
```

```json
},//최하단 부분에 추가
  "homepage": "https://1gyou1.github.io/repository명"
}
```

#### 프로젝트 압축된 build 폴더 생성

(npm run build 명령어 추가로 인해 자동 실행될 예정이라 맨 처음 제외 쓸 필요 없음.)

>$ npm run build

npm run build를 실행시키고 react-scripts build를 실행

압축, 최적화된 코드가 들어있는 build폴더 생성, gh-pages -d build(gh-pages가 build 폴더를 github홈페이지에 업로드)가 실행

>$ npm run deploy

마지막에 하단 명령어 실행해줘야 올라감 !
>$ git push -u origin master

#### package.json 폴더에 추가한 주소로 진입하여 확인

#### ※ route 오류 ※

<BrowserRouter> 사용 했을 때,
<br>https://1gyou1.github.io/repository경로 진입해서
<br>`<Link>`태그 타고 https://1gyou1.github.io/repository명/chocochococho
<br>이동은 가능하지만, 직접 url을 입력하거나 진입해서 새로고침하면 404 Error 발생.

`<HashRouter>`사용해도 된다는데 실패 & 플젝할 때 제대로 사용안해봄...👀

```js
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/chocochococho/Home";
import App1 from "./pages/page1/index";
import App2 from "./pages/page2/index";
import App3 from "./pages/page3/index";
import ChocoMain from "./pages/chocochococho/ChocoMain";

const NotFound = () => (
  <div>
    <h1>404 Not Found</h1>
    <p>The requested page could not be found.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter basename="/repository명">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page1">App1</Link></li>
          <li><Link to="/page2">App2</Link></li>
          <li><Link to="/page3">App3</Link></li>
          <li><Link to="/chocochococho">ChocoMain</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<App1 />} />
        <Route path="/page2" element={<App2 />} />
        <Route path="/page3" element={<App3 />} />
		<Route path="/chocochococho" element={<ChocoMain />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```