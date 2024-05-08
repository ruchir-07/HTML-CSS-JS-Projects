window.addEventListener("DOMContentLoaded",() => {
	const plugs = new Plugs("button");
});

class Plugs {
	/** Button used for this component */
	button: HTMLButtonElement | null;
	/**
	 * @param buttonEl CSS selector of the button
	 */
	constructor(buttonEl: string) {
		this.button = document.querySelector(buttonEl);
		this.button?.addEventListener("click",this.toggleTheme.bind(this));
	}
	/**
	 * Set the theme to light or dark.
	 */
	toggleTheme(): void {
		const pressed = this.button?.getAttribute("aria-pressed") === "true";
		// set `aria-pressed`; when first applied, it’ll allow the CSS animations to be run
		this.button?.setAttribute("aria-pressed",`${!pressed}`);
		// set the opposite value for the document
		document.documentElement.setAttribute("data-dark",`${pressed}`);
	}
}