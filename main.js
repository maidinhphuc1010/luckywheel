(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 7000; // Thời gian quay thành 10 giây
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');
	const wheelSound = $('#wheel-sound'); // Lấy âm thanh vòng quay

	// Danh sách phần thưởng
	const listGift = [
		{ text: 'Móc Khóa', percent: 10 / 100 },
		{ text: '1 chiếc kẹo mút', percent: 30 / 100 },
		{ text: 'Chúc bạn may mắn lần sau', percent: 40 / 100 },
		{ text: 'Giảm 100%', percent: 0 / 100 },
		{ text: 'Giảm 50%', percent: 1 / 100 },
		{ text: 'Giảm 10%', percent: 14 / 100 },
		{ text: 'Giảm 30%', percent: 5 / 100 },
		{ text: 'Giảm 70%', percent: 0 / 100 },
	];

	const size = listGift.length;
	const rotate = 360 / size;
	const skewY = 90 - rotate;

	listGift.map((item, index) => {
		const elm = document.createElement('li');
		elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

		if (index % 2 == 0) {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-1"><b>${item.text}</b></p>`;
		} else {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-2"><b>${item.text}</b></p>`;
		}

		wheel.appendChild(elm);
	});

	const start = () => {
		showMsg.innerHTML = '';
		isRotating = true;
		wheelSound.volume = 1; // Bắt đầu với âm lượng tối đa
		wheelSound.play(); // Phát âm thanh khi bắt đầu quay

		const random = Math.random();
		const gift = getGift(random);
		currentRotate += 360 * 10;
		rotateWheel(currentRotate, gift.index);
		showGift(gift);
	};

	const rotateWheel = (currentRotate, index) => {
		$('.wheel').style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
		reduceVolume(); // Giảm âm lượng trong khi quay
	};

	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			currentPercent += item.percent;
			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});

		return list[0];
	};

	const showGift = gift => {
		let timer = setTimeout(() => {
			isRotating = false;
			showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
			wheelSound.pause(); // Ngừng nhạc khi quay xong
			wheelSound.currentTime = 0; // Đặt lại âm thanh về đầu
			clearTimeout(timer);
		}, timeRotate);
	};

	const reduceVolume = () => {
		if (isRotating && wheelSound.volume > 0) {
			wheelSound.volume -= 0.01; // Giảm âm lượng dần dần
			if (wheelSound.volume < 0) wheelSound.volume = 0; // Đảm bảo âm lượng không nhỏ hơn 0
		}
	};

	btnWheel.addEventListener('click', () => {
		if (!isRotating) start();
	});
})();
