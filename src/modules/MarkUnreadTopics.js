import {
    getStorage,
    setStorage
} from '../util/storage';

class MarkUnreadTopics {
    constructor(debug = false) {
        this.originurl = document.location.origin;
        this.forumRegex = /topic_id=(\d+)&forum_id=\d+&start=\d+#c(\d+)/;
        this.newsRegex = new RegExp(`^${this.originurl}/nieuws/`);
        this.surveyRegex = new RegExp(`^${this.originurl}/shopsurvey/`);

        this.debug = debug;
    }

    _log(msg) {
        if (this.debug === true) console.log(msg);
    } 

    async initialize() {
        /**
         * Forum posts
         * id: topic_id
         * test if newer: comment_id
         * 
         * Others
         * id: hash of url
         * test if newer: timestamp
         */
		try {
        	await this.addCurrentPage();
		} catch(_) {
			
		} finally {
    		this.checkVisitedPages();
		}
    }

    async _addOrUpdatePage(pageObject) {
        const topics = await getStorage('topics');

        return new Promise((resolve, reject) => {
            const existingIdx = topics.findIndex(topic => topic.id === pageObject.id);

            if (existingIdx === -1) {
                topics.push(pageObject);
            } else {
                if (topics[existingIdx].last < pageObject.last) {
                    topics[existingIdx].last = pageObject.last;
                }
            }

            setStorage('topics', topics).then(() => resolve());
        });
    }

    _hash(str) {
        let hval = 0x91fc257c;

        for (let i = 0; i < str.length; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }

        return (hval >>> 0).toString(16).padStart(0, 8);
    }
    
    parsePageURL() {
    	const {hash, search} = document.location;
	    const searchParts = search.split('&');
	    const parsed = {
	        hash: null,
	        search: []
	    };
	    
	    if (hash.length > 0) {
	        parsed.hash = parseInt(hash.replace(/^#c/, ''), 10);
	    }
	    
	    searchParts.forEach(part => {
	        if (part.indexOf('?') === 0) {
	            part = part.replace(/^\?/, '');
	        }
	        
	        let [key, val] = part.split('=');
	        
	        parsed.search[key] = val;
	    });
	    
	    return parsed;
    }
    
    isLastPageInThread() {
    	const pages = [...document.querySelectorAll('#budgetnieuws .titel span b')];
    	const currentPage = parseInt(pages[0].innerText, 10);
    	const totalPages = parseInt(pages[1].innerText.replace(/[^0-9]+/g, ''), 10);
    	
    	return currentPage === totalPages;
    }
    
    getLastComment() {
    	const lastCommentElement = [...document.querySelectorAll('.gamereactie')].pop();
    	return parseInt(lastCommentElement.querySelector('a').getAttribute('name').replace(/^c/, ''), 10);
    }

    addCurrentPage() {
    	return new Promise((resolve, reject) => {
	        if (document.location.pathname === '/forum.php') {
	            const parsedURL = this.parsePageURL();
	            
	            // Not on thread page (like forum overview page)
	            if (!parsedURL.search.hasOwnProperty('topic_id')) reject();
	            
	        	if (this.isLastPageInThread()) {
	        		this._log('last page in thread, adding last comment');
	        		const comment_id = this.getLastComment();
		
		            this._addOrUpdatePage({
		                id: parsedURL.search.topic_id,
		                last: comment_id
		            }).then(() => {
		            	this._log('added page');
		            	resolve()
	            	});
	        	} else reject();
	        } else reject();
    	});
    }

    async checkVisitedPages() {
        const rows = this.getRows();

        const topics = await getStorage('topics');
        this._log('checking visited pages');

        rows.forEach(r => {
            if (this.forumRegex.test(r.ahref)) {
                const [, topic_id, comment_id] = r.ahref.match(this.forumRegex);

                const existingIdx = topics.findIndex(topic => topic.id === topic_id);

                if (existingIdx !== -1 && topics[existingIdx].last === parseInt(comment_id, 10)) {
                    r.row.querySelector('a').classList.add('topicRead');
                }
            }
        });
    }

    getRows() {
    	if (document.location.pathname === '/') {
    	    return this._getHomepageRows();	
    	} else if (/page=laatsteforumreacties$/.test(document.location.href)) {
            return this._getOverviewpageRows();
        } else {
            return this._getSidebarRows();
        }
    }
    
    _getHomepageRows() {
    	const rows = [...document.querySelectorAll('#laatste-forum')[0].querySelectorAll('.itemrow')].slice(0, 9);
    	
    	return rows.map(r => {
            const [, day, month, hour, minute] = r.querySelector('.date').innerHTML.match(/(\d{2})\/(\d{2})\s(\d{2}):(\d{2})/);
            const ts = +new Date(`2020-${month}-${day} ${hour}:${minute}:00`);
            const a = r.querySelector('a');
            const [atitle, ahref] = [a.title, a.href];

            return {
                row: r,
                ts,
                atitle,
                ahref
            }
        });
    }

    _getSidebarRows() {
        const rows = [...document.querySelectorAll('ul.laatstegames')[0].querySelectorAll('.itemrow')].slice(0, 30);

        return rows.map(r => {
            const [, day, month, hour, minute] = r.querySelector('.date').innerHTML.match(/(\d{2})\/(\d{2})\s(\d{2}):(\d{2})/);
            const ts = +new Date(`2020-${month}-${day} ${hour}:${minute}:00`);
            const a = r.querySelector('a');
            const [atitle, ahref] = [a.title, a.href];

            return {
                row: r,
                ts,
                atitle,
                ahref
            }
        });
    }

    _getOverviewpageRows() {
        const rows = [...document.querySelectorAll('#budgetnieuws .itemrow')];

        return rows.map(r => {
            const [, day, month, hour, minute] = r.firstChild.wholeText.trim().match(/(\d{2})\/(\d{2})\s(\d{2}):(\d{2})/);
            const ts = +new Date(`2020-${month}-${day} ${hour}:${minute}:00`);
            const a = r.querySelector('a');
            const [atitle, ahref] = [a.firstChild.wholeText.trim(), a.href];

            return {
                row: r,
                ts,
                atitle,
                ahref
            }
        });
    }
}

export default MarkUnreadTopics;
