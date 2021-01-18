class IndividualConsoleIcons {
	constructor() {
		
	}
	
	async initialize() {
		const microsoftIcons = [...document.querySelectorAll('.console-label.microsoft')];
		const microsoftColor = '#107c10'; // '#9acc66';
		const sonyIcons = [...document.querySelectorAll('.console-label.sony')];
		const sonyColor = '#006fcd';
		const nintendoIcons = [...document.querySelectorAll('.console-label.nintendo')];
		const nintendoColor = '#e4030f';
		
		[]
			.concat(microsoftIcons)
			.concat(sonyIcons)
			.concat(nintendoIcons)
			.forEach(el => el.classList.add(el.innerHTML.toLowerCase()));
			
		const style = document.createElement('style');
		style.innerHTML = `
		.console-label.microsoft.xsx {color:${microsoftColor};background:#fff;box-shadow:0 0 0 1px ${microsoftColor};}
		.console-label.sony.ps5 {color:${sonyColor};background:#fff;box-shadow:0 0 0 1px ${sonyColor};}
		.console-label.nintendo.ns {color:${nintendoColor};background:#fff;box-shadow:0 0 0 1px ${nintendoColor};}
		`;
		
		document.head.appendChild(style);
	}
}

export default IndividualConsoleIcons;
