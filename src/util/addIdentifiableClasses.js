/**
 * This function adds css-classes to elements that are otherwise hard to target
 */
const addIdentifiableClasses = () => {
	const queries = {
		commentSignature: '.gamereactie-content hr + span',
		commentQuoteWrapper: '.gamereactie-content > div[style="margin: 10px, 10px, 10px, 10px;"]',
		commentQuote: '.gamereactie-content > div[style="margin: 10px, 10px, 10px, 10px;"] > div',
		commentUsername: '.gamereactie-meta > img[src^="/images/user-"] + a',
		commentUsernameOnline: '.gamereactie-meta > img[src="/images/user-online.jpg"] + a',
		commentUsernameOffline: '.gamereactie-meta > img[src="/images/user-offline.jpg"] + a',
		userOfflineImg: 'img[src="/images/user-offline.jpg"]',
		userOnlineImg: 'img[src="/images/user-online.jpg"]',
		whitespaceAboveFooter: '#container div[style="text-align:center;width:100%; padding-top: 4px; padding-bottom: 4px"]'
	};
	
	for (const i in queries) [...document.querySelectorAll(queries[i])].map(el => el.classList.add(i));
}

export default addIdentifiableClasses;
