import {
    getStorage,
    setStorage
} from '../util/storage';

class IgnoreUsers {
    constructor(debug = false) {
        this.debug = debug;
    }

    _log(msg) {
        if (this.debug === true) console.log(msg);
    }

    async initialize() {
        const users = ['MarkD']; // await getStorage('ignoreUsers');

        [...document.querySelectorAll('.gamereactie')].forEach(el => {
            const nickname = el.querySelector('.gamereactie-content').querySelectorAll('a')[0].innerHTML;
            if (users.indexOf(nickname) !== -1) {
                el.classList.add('hidden');
                el.setAttribute('data-hidden', `This post by ${nickname} is hidden`);
                el.addEventListener('click', () => el.classList.toggle('hidden'))
            }
        });
    }
}

export default IgnoreUsers;
