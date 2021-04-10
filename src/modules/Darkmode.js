class Darkmode {
	constructor() {

	}

	async initialize() {
        document.body.classList.add('darkmode');

        // Get color-specific for Budgetgaming.nl
        ['rood', 'paars', 'groen', 'blauw', 'donkergrijs', 'lichtgrijs'].forEach(color => {
            const existingStylesheet = document.querySelector(`link[href^="/css/${color}.css"]`);
            if (existingStylesheet) {
                document.body.classList.add(`darkmode-${color}`);
                existingStylesheet.parentElement.removeChild(existingStylesheet);
            }
        });

        // Get color-specific for Budgetspelen.nl
        ['rood', 'paars', 'groen', 'blauw', 'donkergrijs', 'lichtgrijs'].forEach(color => {
            const existingStylesheet = document.querySelector(`link[href^="https://www.budgetspelen.nl/css/${color}.css"]`);
            if (existingStylesheet) {
                document.body.classList.add(`darkmode-${color}`);
                existingStylesheet.parentElement.removeChild(existingStylesheet);
            }
        });

        // Force embedded Tweets to use darkmode
        [...document.querySelectorAll('.twitter-tweet')].forEach(tweet => {
            tweet.setAttribute('data-theme', 'dark');
            tweet.setAttribute('data-chrome', 'transparent'); // Should remove corners but doesn't work
        });

        const submitBtn = document.querySelector('#game-reactie-submit');
        if (submitBtn) submitBtn.setAttribute('value', 'Verzenden');

        // Add custom role to mrpapercut
        document.querySelectorAll('.gamereactie-meta a[href="/profile/Mrpapercut.html"]').forEach(el => {
            const div = document.createElement('div');
            div.innerText = 'Rol: Darkmod';
            el.parentElement.insertBefore(div, el.parentElement.querySelector('.gamereactie-meta-options'));
        });
    }
}

export default Darkmode;
