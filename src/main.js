import "./style.css";

// Timeline Details
const timelineDetails = {
	"1month": {
		title: "1 Month into Addiction",
		content: `The first month marks the beginning of a dangerous journey. During this period, individuals experience:
• Increased tolerance to the substance
• Regular cravings and urges
• Changes in sleep patterns
• Mood swings and irritability
• Denial of developing problems`,
		signs: [
			"Unexplained changes in behavior and routine",
			"Secretive phone calls or messages",
			"Sudden changes in friend groups",
			"Decreased interest in previously enjoyed activities",
			"Unexplained need for money",
		],
	},
	"3months": {
		title: "3 Months into Addiction",
		content: `By the third month, the addiction's grip tightens considerably:
• Significant financial problems emerge
• Work or school performance declines
• Regular lying about substance use
• Isolation from family and friends
• Failed attempts to quit or cut back`,
		signs: [
			"Missing work or school regularly",
			"Borrowing or stealing money",
			"Neglecting basic responsibilities",
			"Physical appearance changes",
			"Defensive behavior when confronted",
		],
	},
	"6months": {
		title: "6 Months into Addiction",
		content: `Half a year of substance abuse leads to severe relationship damage:
• Trust completely broken with loved ones
• Manipulation becomes common
• Legal problems may begin
• Health issues become noticeable
• Social isolation intensifies`,
		signs: [
			"Broken promises and commitments",
			"Aggressive or defensive behavior",
			"Legal troubles or arrests",
			"Visible health deterioration",
			"Complete withdrawal from family events",
		],
	},
	"1year": {
		title: "1 Year into Addiction",
		content: `After a year, the physical and mental toll becomes severe:
• Chronic health problems develop
• Mental health significantly deteriorates
• Career or education severely impacted
• Financial crisis deepens
• Relationships may be permanently damaged`,
		signs: [
			"Severe weight loss or gain",
			"Visible physical deterioration",
			"Mental health crisis",
			"Job loss or academic failure",
			"Complete financial dependency",
		],
	},
	"2years": {
		title: "2+ Years into Addiction",
		content: `Long-term addiction leads to catastrophic life changes:
• Severe organ damage
• Chronic diseases develop
• Complete professional failure
• Homelessness risk increases
• Total isolation from support system`,
		signs: [
			"Severe medical conditions",
			"Chronic unemployment",
			"Homelessness or unstable housing",
			"Complete social isolation",
			"Life-threatening health issues",
		],
	},
};

// Timeline Modal Functions
function showTimelineDetails(period) {
	const modal = document.getElementById("timelineModal");
	const title = document.getElementById("timelineModalTitle");
	const content = document.getElementById("timelineModalContent");
	const signs = document.getElementById("timelineModalSigns");
	const details = timelineDetails[period];
	title.textContent = details.title;
	content.innerHTML = `<p class="text-gray-700">${details.content}</p>`;
	signs.innerHTML = details.signs.map((sign) => `<li>${sign}</li>`).join("");
	modal.style.display = "flex";
	modal.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
}

function closeTimelineModal() {
	const modal = document.getElementById("timelineModal");
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "auto";
}

// Pledge Wall Logic
let pledges = JSON.parse(localStorage.getItem("pledges")) || [
	{
		initials: "JD",
		reason: "For my daughter who deserves a father who is present and healthy.",
		color: "bg-yellow-200",
		rotation: "-2",
	},
	{
		initials: "KM",
		reason:
			"To break the cycle of addiction in my family and be a positive example for my younger siblings.",
		color: "bg-blue-200",
		rotation: "1",
	},
	{
		initials: "RT",
		reason:
			"Because I've seen what drugs did to my best friend, and I choose a different path.",
		color: "bg-green-200",
		rotation: "3",
	},
];

function displayPledges() {
	const pledgeWall = document.getElementById("pledgeWall");
	pledgeWall.innerHTML = "";
	pledges.forEach((pledge, index) => {
		const pledgeCard = document.createElement("div");
		pledgeCard.className = `sticky-note ${
			pledge.color
		} p-6 rounded transform rotate-[${pledge.rotation}deg] ${
			index === 0 ? "new-pledge" : ""
		}`;
		pledgeCard.innerHTML = `
      <p class="text-gray-700 font-['Permanent_Marker']">"${pledge.reason}"</p>
      <p class="text-right text-primary font-['Permanent_Marker'] mt-2">${pledge.initials}</p>
    `;
		pledgeWall.prepend(pledgeCard);
	});
}

// Hero Section Tagline Rotation
const taglines = ["Choose Life.", "Break Free.", "Your Future Matters."];
let taglineIndex = 0;
function rotateTagline() {
	const tagline = document.getElementById("tagline");
	tagline.textContent = taglines[taglineIndex];
	taglineIndex = (taglineIndex + 1) % taglines.length;
}

// Quote Generator
const quotes = [
	"Your future is brighter without drugs.",
	"Choose strength, say no to drugs.",
	"Freedom starts with a drug-free life.",
];

function showRandomQuote() {
	const quote = document.getElementById("quote");
	quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
	quote.classList.remove("hidden");
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
		btn.addEventListener("click", (e) => {
			const ripple = document.createElement("span");
			ripple.classList.add("ripple");
			btn.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	// Timeline Event Listeners
	["1month", "3months", "6months", "1year", "2years"].forEach((period) => {
		document
			.getElementById(`timeline-${period}`)
			.addEventListener("click", () => showTimelineDetails(period));
	});

	// Pledge Modal
	const pledgeModal = document.getElementById("pledgeModal");
	const openPledgeModal = document.getElementById("openPledgeModal");
	const closeModal = document.getElementById("closeModal");
	const pledgeForm = document.getElementById("pledgeForm");
	const reasonTextarea = document.getElementById("reason");
	const charCount = document.getElementById("charCount");
	const rotationValue = document.getElementById("rotationValue");
	const colorOptions = document.querySelectorAll(".color-option");
	const rotationButtons = document.querySelectorAll(".rotation-btn");
	let currentRotation = 0;
	let selectedColor = "bg-yellow-200";

	openPledgeModal.addEventListener("click", () => {
		pledgeModal.style.display = "flex";
		pledgeModal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
	});

	closeModal.addEventListener("click", () => {
		pledgeModal.style.display = "none";
		pledgeModal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "auto";
	});

	pledgeModal.addEventListener("click", (e) => {
		if (e.target === pledgeModal) {
			pledgeModal.style.display = "none";
			pledgeModal.setAttribute("aria-hidden", "true");
			document.body.style.overflow = "auto";
		}
	});

	reasonTextarea.addEventListener("input", () => {
		charCount.textContent = reasonTextarea.value.length;
	});

	colorOptions.forEach((option) => {
		option.addEventListener("click", () => {
			colorOptions.forEach((opt) =>
				opt.classList.replace("border-gray-600", "border-transparent")
			);
			option.classList.replace("border-transparent", "border-gray-600");
			selectedColor = option.dataset.color;
		});
	});

	rotationButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			currentRotation += parseInt(btn.dataset.rotation);
			if (currentRotation > 5) currentRotation = 5;
			if (currentRotation < -5) currentRotation = -5;
			rotationValue.textContent = `${currentRotation}°`;
		});
	});

	pledgeForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const initials = document
			.getElementById("initials")
			.value.toUpperCase()
			.trim();
		const reason = document.getElementById("reason").value.trim();
		if (!initials || !reason) {
			alert("Please fill out all fields");
			return;
		}
		pledges.unshift({
			initials,
			reason,
			color: selectedColor,
			rotation: currentRotation,
		});
		if (pledges.length > 12) pledges.pop();
		localStorage.setItem("pledges", JSON.stringify(pledges));
		displayPledges();
		let count = parseInt(
			document.getElementById("pledgeCount").textContent.replace(/,/g, "")
		);
		count++;
		document.getElementById("pledgeCount").textContent = count.toLocaleString();
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
		document.body.style.overflow = "auto";
		pledgeWall.scrollIntoView({ behavior: "smooth" });
	});

	// Initialize Pledges
	displayPledges();

	// Tagline Rotation
	setInterval(rotateTagline, 5000);

	// Quote Generator
	document
		.getElementById("quoteBtn")
		.addEventListener("click", showRandomQuote);

	// Scroll Progress
	window.addEventListener("scroll", updateProgressBar);

	// Ripple Effect
	addRippleEffect();
});

// Throttle function to limit smoke spawning
function throttle(fn, wait) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < wait) return;
    lastCall = now;
    return fn(...args);
  };
}

// Smoke animation
function createSmoke(e) {
  const hero = document.querySelector('.hero-container');
  const smoke = document.createElement('div');
  smoke.className = 'smoke';
  smoke.style.left = `${e.clientX - 10}px`; // Center smoke on cursor
  smoke.style.top = `${e.clientY - 10}px`;
  hero.appendChild(smoke);
  setTimeout(() => smoke.remove(), 1500); // Remove after animation
}

document.addEventListener('DOMContentLoaded', () => {
  // Existing event listeners remain unchanged

  const hero = document.querySelector('.hero-container');
  let isDragging = false;

  // Start smoke on mousedown
  hero.addEventListener('mousedown', () => {
    isDragging = true;
  });

  // Stop smoke on mouseup
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Create smoke on mousemove while dragging, throttled to every 100ms
  const throttledSmoke = throttle((e) => {
    if (isDragging && e.target.closest('.hero-container')) {
      createSmoke(e);
    }
  }, 100);

  hero.addEventListener('mousemove', throttledSmoke);

  // Existing code continues...
});