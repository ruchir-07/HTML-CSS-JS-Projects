// Core selectors
const elSelector = gsap.utils.selector(".logo"),
			whoosh = document.querySelector(".whoosh"),
			audioToggle = document.querySelector(".audio-toggle")

// State
let muted = true

// GSAP selectors
const el = {
	g: elSelector(".logo-g"),
	line: elSelector(".logo-g-line svg"),
	sap: elSelector(".logo-sap"),
	plane: elSelector(".logo-plane"),
	path: elSelector(".logo-path .motion-path path"),
	offset1: elSelector(".logo-path .offset-1 path"),
	offset2: elSelector(".logo-path .offset-2 path"),
	offset3: elSelector(".logo-path .offset-3 path"),
	offset4: elSelector(".logo-path .offset-4 path")
}

// Audio button event
audioToggle.addEventListener("click", () => {
	muted = !muted
	audioToggle.innerHTML = muted ? "Sound" : "Mute"
})

// Timeline vars
const logoGap = 72,
			pathEase = CustomEase.create("custom", "M0,0 C0.096,0.014 0.212,0.101 0.242,0.134 0.418,0.328 0.788,0.754 1,1 ")

// Timeline
const createTimeline = () => {
	// Initial setup for paths
	gsap.set([
		el.path,
		el.offset1,
		el.offset2,
		el.offset3,
		el.offset4,
	], {drawSVG: 0, visibility: "visible"});

	// Logo <- ->
	const logoStretch = () => {
		var tl = gsap.timeline({ defaults: {ease: "power4.inOut", duration: 1}});
		tl.to(el.g, {
			x: `-${logoGap}%`,
		})
		tl.to(el.sap, {
			x: `${logoGap}%`,
		}, "<")
		tl.to(el.line, {
			x: 0,
		}, "<")
		return tl;
	}

	// Plane --->
	const planeFlying = () => {
		var tl = gsap.timeline()
	
		// Plane visible
		tl.set(el.plane, {opacity: 1})

		// Plane scale
		tl.to(el.plane, {
			keyframes: [
				{scale: 1.5, duration: 1},
				{scale: .5, duration: .5},
				{scale: 1, duration: .5}
			]
		}, 0)

		// Center path draw
		tl.fromTo(el.path, {
			drawSVG: 0
		}, {
			keyframes: [
				{drawSVG: "30% 50%"},
				{drawSVG: "99% 100%"}
			],
			duration: 2,
			ease: pathEase,
		}, 0)

		// Left path draw
		tl.fromTo(el.offset1, {
			drawSVG: 0
		}, {
			keyframes: [
				{drawSVG: "8% 20%"},
				{drawSVG: "45% 60%"},
				{drawSVG: "99% 100%"}
			],
			duration: 2,
			ease: pathEase,
		}, 0)
		
		// Left path 2 draw
		tl.fromTo(el.offset3, {
			drawSVG: 0
		}, {
			keyframes: [
				{drawSVG: "14% 20%"},
				{drawSVG: "37% 38%"},
				{drawSVG: "94% 95%"}
			],
			duration: 2,
			ease: pathEase,
		}, 0)

		// Right path draw
		tl.fromTo(el.offset2, {
			drawSVG: 0
		},
		{
			keyframes: [
				{drawSVG: "0% 10%"},
				{drawSVG: "50% 56%"},
				{drawSVG: "99% 100%"}
			],
			duration: 2,
			ease: pathEase
		}, 0)
		
		// Right path 2 draw
		tl.fromTo(el.offset4, {
			drawSVG: 0
		},
		{
			keyframes: [
				{drawSVG: "0% 10%"},
				{drawSVG: "30% 32%"},
				{drawSVG: "96% 97%"}
			],
			duration: 2,
			ease: pathEase
		}, 0)
		
		// Plane flight
		tl.to(el.plane, {
			motionPath: {
				path: el.path[0],
				align: el.path[0],
				alignOrigin: [0.5, 0.5],
				autoRotate: true
			},
			duration: 2,
			ease: pathEase
		}, 0)
		
		return tl;
	}

	// Logo -> <-
	const logoShrink = () => {
		var tl = gsap.timeline({defaults: {ease: "power4.inOut", duration: 1}});
		tl.to(el.g, {
			x: 0,
		})
		tl.to(el.sap, {
			x: 0,
		}, "<")
		tl.to(el.line, {
			x: "-92%",
		}, "<")
		tl.set(el.plane, {opacity: 0})
		return tl;
	}

	// Parent timeline handling audio and repeat
	const logoLoop = gsap.timeline({
		onRepeat: () => {
			if (!muted) whoosh.play(0)
		},
		repeatRefresh: true,
		repeat: -1,
		repeatDelay: 1
	});
	
	// logoLoop.timeScale(.2)

	logoLoop.add(logoStretch())
	logoLoop.add(planeFlying(), "-=.5")
	logoLoop.add(logoShrink(), "-=.5")
}

createTimeline()