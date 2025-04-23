import "./pledge-wall.css";

// Initial Pledges
let pledges = JSON.parse(localStorage.getItem("pledgeWall")) || [
	{
		pledgeText:
			"I pledge to stay drug-free because my future is too bright to dim with substances. My dreams deserve my full potential.",
		name: "Emily Johnson",
		color: "bg-yellow-200",
		rotation: "-2",
		date: "April 21, 2025",
	},
	{
		pledgeText:
			"I choose clarity over confusion, health over harm. My body is a temple, not a testing ground for drugs.",
		name: "Marcus Williams",
		color: "bg-blue-200",
		rotation: "1",
		date: "April 18, 2025",
	},
	{
		pledgeText:
			"For my family, for my future, for myself - I pledge to make choices that keep me healthy, happy and drug-free.",
		name: "Sophia Rodriguez",
		color: "bg-green-200",
		rotation: "3",
		date: "April 15, 2025",
	},
	{
		pledgeText:
			"My mind is my greatest asset. I promise to protect it by saying no to drugs and yes to a clear, focused future.",
		name: "James Chen",
		color: "bg-pink-200",
		rotation: "-1",
		date: "April 22, 2025",
	},
	{
		pledgeText:
			"I pledge to find my highs in achievements, adventures, and authentic connections - not in substances that harm me.",
		name: "Olivia Thompson",
		color: "bg-purple-200",
		rotation: "2",
		date: "April 19, 2025",
	},
	{
		pledgeText:
			"My story will be one of strength, not struggle with addiction. I pledge to write my own ending by staying drug-free.",
		name: "Ethan Patel",
		color: "bg-yellow-100",
		rotation: "-3",
		date: "April 17, 2025",
	},
	{
		pledgeText:
			"I promise to respect my body, value my mind, and nurture my spirit by choosing a path free from drugs and addiction.",
		name: "Isabella Martinez",
		color: "bg-blue-100",
		rotation: "4",
		date: "April 20, 2025",
	},
	{
		pledgeText:
			"For every challenge I face, I pledge to find healthy coping mechanisms instead of turning to drugs. My resilience is my strength.",
		name: "Noah Wilson",
		color: "bg-green-100",
		rotation: "-4",
		date: "April 16, 2025",
	},
	{
		pledgeText:
			"I pledge to be the example for others who struggle, showing that a life without drugs is a life full of possibilities.",
		name: "Ava Jackson",
		color: "bg-red-100",
		rotation: "1.5",
		date: "April 14, 2025",
	},
	{
		pledgeText:
			"My pledge: to live each day with clarity and purpose, making choices that lead to health, not harm. No drugs, no exceptions.",
		name: "Liam Davis",
		color: "bg-orange-200",
		rotation: "-1.5",
		date: "April 23, 2025",
	},
	{
		pledgeText:
			"I promise to fill my life with real experiences, not artificial highs. My future deserves my best self, drug-free and determined.",
		name: "Charlotte Kim",
		color: "bg-teal-200",
		rotation: "2.5",
		date: "April 12, 2025",
	},
	{
		pledgeText:
			"Today I pledge: my dreams are worth more than any momentary escape drugs might offer. I choose reality, however challenging.",
		name: "Benjamin Taylor",
		color: "bg-pink-100",
		rotation: "-2.5",
		date: "April 13, 2025",
	},
];

// Display Pledges
function displayPledges() {
	const grid = document.getElementById("pledgeGrid");
	grid.innerHTML = "";
	pledges.forEach((pledge, index) => {
		const note = document.createElement("div");
		note.className = `sticky-note ${
			pledge.color
		} p-6 rounded-md transform rotate-[${pledge.rotation}deg] ${
			index === 0 ? "new-pledge" : ""
		}`;
		note.innerHTML = `
      <p class="text-gray-800">${pledge.pledgeText}</p>
      <div class="signature">
        <p>${pledge.name}</p>
        <p class="date">${pledge.date}</p>
      </div>
    `;
		grid.prepend(note);
	});
}

// Scroll Progress Bar
function updateProgressBar() {
	const winScroll = document.documentElement.scrollTop;
	const height =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;
	const scrolled = (winScroll / height) * 100;
	document.querySelector(".progress-bar-fill").style.width = `${scrolled}%`;
}

// Button Ripple Effect
function addRippleEffect() {
	document.querySelectorAll(".ripple").forEach((btn) => {
		Juliet: btn.addEventListener("click", (e) => {
			const ripple = document.createElement("span");
			ripple.classList.add("ripple");
			btn.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);
		});
	});
}

// Zoom Functionality
function setupZoom() {
	const mainContent = document.querySelector(".zoomable");
	let scale = 1;
	const ZOOM_SPEED = 0.1;
	const MIN_SCALE = 0.5;
	const MAX_SCALE = 2;

	document.addEventListener(
		"wheel",
		function (e) {
			if (e.ctrlKey) {
				e.preventDefault();
				const rect = mainContent.getBoundingClientRect();
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;
				const zoomDelta = -Math.sign(e.deltaY) * ZOOM_SPEED;
				const newScale = Math.min(
					Math.max(scale + zoomDelta, MIN_SCALE),
					MAX_SCALE
				);

				if (newScale !== scale) {
					const scaleRatio = newScale / scale;
					const boundingRect = mainContent.getBoundingClientRect();
					const pinX = mouseX / boundingRect.width;
					const pinY = mouseY / boundingRect.height;
					const translateX = mouseX - mouseX * scaleRatio;
					const translateY = mouseY - mouseY * scaleRatio;
					mainContent.style.transform = `scale(${newScale}) translate(${translateX}px, ${translateY}px)`;
					scale = newScale;
				}
			}
		},
		{ passive: false }
	);

	mainContent.addEventListener("dblclick", function () {
		scale = 1;
		mainContent.style.transform = `scale(${scale})`;
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const pledgeModal = document.getElementById("pledgeModal");
	const openPledgeModal = document.getElementById("openPledgeModal");
	const closeModal = document.getElementById("closeModal");
	const pledgeForm = document.getElementById("pledgeForm");
	const pledgeText = document.getElementById("pledgeText");
	const charCount = document.getElementById("charCount");
	const rotationValue = document.getElementById("rotationValue");
	const colorOptions = document.querySelectorAll(".color-option");
	const rotationButtons = document.querySelectorAll(".rotation-btn");
	let currentRotation = 0;
	let selectedColor = "bg-yellow-200";

	// Modal Controls
	openPledgeModal.addEventListener("click", () => {
		pledgeModal.style.display = "flex";
		pledgeModal.setAttribute("aria-hidden", "false");
		pledgeText.focus();
	});

	closeModal.addEventListener("click", () => {
		pledgeModal.style.display = "none";
		pledgeModal.setAttribute("aria-hidden", "true");
	});

	pledgeModal.addEventListener("click", (e) => {
		if (e.target === pledgeModal) {
			pledgeModal.style.display = "none";
			pledgeModal.setAttribute("aria-hidden", "true");
		}
	});

	// Character Counter
	pledgeText.addEventListener("input", () => {
		charCount.textContent = pledgeText.value.length;
	});

	// Color Selection
	colorOptions.forEach((option) => {
		option.addEventListener("click", () => {
			colorOptions.forEach((opt) =>
				opt.classList.replace("border-gray-600", "border-transparent")
			);
			option.classList.replace("border-transparent", "border-gray-600");
			selectedColor = option.dataset.color;
		});
	});

	// Rotation Controls
	rotationButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			currentRotation += parseInt(btn.dataset.rotation);
			if (currentRotation > 5) currentRotation = 5;
			if (currentRotation < -5) currentRotation = -5;
			rotationValue.textContent = `${currentRotation}°`;
		});
	});

	// Form Submission
	pledgeForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const pledgeTextValue = pledgeText.value.trim();
		const name = document.getElementById("name").value.trim();
		if (!pledgeTextValue || !name) {
			alert("Please fill out all fields");
			return;
		}
		const currentDate = new Date();
		const formattedDate = `${currentDate.toLocaleString("default", {
			month: "long",
		})} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
		pledges.unshift({
			pledgeText: pledgeTextValue,
			name,
			color: selectedColor,
			rotation: currentRotation.toString(),
			date: formattedDate,
		});
		if (pledges.length > 12) pledges.pop();
		localStorage.setItem("pledgeWall", JSON.stringify(pledges));
		displayPledges();
		pledgeForm.reset();
		charCount.textContent = "0";
		currentRotation = 0;
		rotationValue.textContent = "0°";
		colorOptions.forEach((opt) =>
			opt.classList.replace("border-gray-600", "border-transparent")
		);
		colorOptions[0].classList.replace("border-transparent", "border-gray-600");
		selectedColor = "bg-yellow-200";
		pledgeModal.style.display = "none";
		pledgeModal.setAttribute("aria-hidden", "true");
		document
			.getElementById("pledgeGrid")
			.scrollIntoView({ behavior: "smooth" });
	});

	// Initialize
	displayPledges();
	addRippleEffect();
	setupZoom();
	window.addEventListener("scroll", updateProgressBar);
});
