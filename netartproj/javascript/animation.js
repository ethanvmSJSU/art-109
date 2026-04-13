const root = document.documentElement;
const submarine = document.getElementById("submarine");

let ticking = false;

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function mix(start, end, amount) {
	return start + (end - start) * amount;
}

function updateDescent() {
	const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollRange > 0 ? clamp(window.scrollY / scrollRange, 0, 1) : 0;
	const drift = Math.sin(progress * Math.PI * 5) * 10 + progress * 40;
	const tilt = mix(-4, 8, progress);
	const ambient = clamp(Math.pow(progress / 0.72, 1.45), 0, 1);
	const shellFade = clamp((progress - 0.46) / 0.26, 0, 1);
	const lightsOnly = clamp((progress - 0.7) / 0.12, 0, 1);
	const lightShutdown = clamp((progress - 0.992) / 0.008, 0, 1);
	const drop = clamp((progress - 0.9) / 0.1, 0, 1);
	const scale = mix(1, 0.92, progress);
	const shellOpacity = Math.max(0, 1 - shellFade * 0.98);
	const conningOpacity = Math.max(0, 1 - shellFade * 1.08);
	const windowOpacity = Math.max(0, 1 - lightShutdown * 1.35);
	const windowGlow = Math.max(0, 1.45 + lightsOnly * 1.25 - lightShutdown * 2.6);
	const submarineOpacity = mix(1, 0.98, progress);
	const submarineShadow = Math.max(0, 0.35 - shellFade * 0.28);

	root.style.setProperty("--ambient-opacity", ambient.toFixed(3));
	root.style.setProperty("--submarine-tilt", `${tilt.toFixed(2)}deg`);
	root.style.setProperty("--submarine-drift", `${drift.toFixed(2)}px`);
	root.style.setProperty("--submarine-drop", `${mix(0, window.innerHeight * 0.58, drop).toFixed(2)}px`);
	root.style.setProperty("--submarine-scale", scale.toFixed(3));
	root.style.setProperty("--shell-opacity", shellOpacity.toFixed(3));
	root.style.setProperty("--conning-opacity", conningOpacity.toFixed(3));
	root.style.setProperty("--window-opacity", windowOpacity.toFixed(3));
	root.style.setProperty("--window-glow", windowGlow.toFixed(3));
	root.style.setProperty("--submarine-shadow", submarineShadow.toFixed(3));

	if (submarine) {
		submarine.style.opacity = `${submarineOpacity.toFixed(3)}`;
	}

	ticking = false;
}

function requestUpdate() {
	if (!ticking) {
		window.requestAnimationFrame(updateDescent);
		ticking = true;
	}
}

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
window.addEventListener("load", updateDescent);
