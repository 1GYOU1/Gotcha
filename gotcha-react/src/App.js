import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './css/common.min.css';
import './css/intro.min.css';
import './css/pick-machine2.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Start from "./components/Start";

function App() {
	return (
		<div>
			<Header/>{/*top 고정 노출*/}

			<Start />

			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/Start" element={<Main />} />
			</Routes>
		</div>
	);
}

export default App;
