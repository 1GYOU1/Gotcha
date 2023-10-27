import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './css/common.min.css';
import './css/intro.min.css';
import './css/gotcha-react.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Start from "./components/Start";
import Intro from "./components/Intro";

function App() {
	const [showIntro, setShowIntro] = useState(true);
	const location = useLocation();
  
	//intro
	useEffect(() => {
		const showTime = setTimeout(() => {
			setShowIntro(false);
			console.log('main 진입 ?')
		}, 8900);
	
		return () => {
			clearTimeout(showTime);
		};
	}, []);
	
	//main에서 intro 재실행되는 오류 때문에 추가
	useEffect(() => {
		if (location.pathname === "/main" || location.pathname === "/start") {
		
		//gh-pages 배포용 루트
		// if (location.pathname === "/Gotcha-react/main" || location.pathname === "/Gotcha-react/start") {
			console.log('router test')
			setShowIntro(false);
		}
	}, [location]);

	return (
		<div>
			{showIntro ? (
				<Routes>
					<Route path="/" element={<Intro />} />
				</Routes>
			) : (
				<div>
					<Header />
					<Routes>
					<Route path="/start" element={<Start />} />
					<Route path="/main" element={<Main />} />
				</Routes>
				</div>
			)}
		</div>
	);
}

export default App;
