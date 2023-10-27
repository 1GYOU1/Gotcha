import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
	const startAreaRef = useRef();//start_area
	const startBtnRef = useRef();//start_btn

	const navigate = useNavigate();

	const startBtnClickEvent = () => {

		//버튼 애니메이션
		const startBtnElement = startBtnRef.current;
		startBtnElement.classList.add('on');

		// 영역 fadeOut 애니메이션
		const startAreaElement = startAreaRef.current;
		setTimeout(() => {
			startAreaElement.classList.add('out');
		}, 500);

		//Main.js로 이동
		setTimeout(() => {
			navigate('/main');
			// window.location.href = '/Gotcha-react/main';
		}, 1000);
	};

	return (
		<div>
			<div ref={startAreaRef} className="start_area">
				<div className="inner p_r">
				<button ref={startBtnRef} className="start_btn p_r" onClick={startBtnClickEvent}>
					<span>START</span>
					<span></span>
				</button>
				</div>
			</div>
		</div>
	);
};

export default Start;
