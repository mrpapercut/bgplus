/**
 * This function removes existing stylesheets so we can replace them rather than override
 */
const removeExistingStylesheets = () => {
	const stylesheetQueries = [
		'/css/style.css',
		'/css/rood.css',
		'/css/blauw.css',
		'/css/groen.css',
		'/css/donkergrijs.css',
		'/css/menu.css',
		'/css/rating.css'
	];
	stylesheetQueries.forEach(q => {
		const el = document.querySelector(`link[href^="${q}"]`);
		if (el) el.parentElement.removeChild(el);
	});
}

export default removeExistingStylesheets;
