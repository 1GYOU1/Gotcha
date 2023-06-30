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