chrome.runtime.onInstalled.addListener(() => {    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'www.budgetgaming.nl'
                }
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'www.budgetspelen.nl'
                }
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }])
    });
});
