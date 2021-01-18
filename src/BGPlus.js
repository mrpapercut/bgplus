import MarkUnreadTopics from './modules/MarkUnreadTopics';
import IndividualConsoleIcons from './modules/IndividualConsoleIcons';
import Darkmode from './modules/Darkmode';

import addIdentifiableClasses from './util/addIdentifiableClasses';
import {getStorage} from './util/storage';

const manifestJson = chrome.runtime.getManifest();

require('./css/main.scss');

class BGPlus {
    constructor() {
        this.version = manifestJson.version;

        this.modules = {};

        this.settings = {};

        this.initialize();
    }

    async initialize() {
        addIdentifiableClasses();

        await this.getSettings();
        await this.initializeModules();
    }

    async getSettings() {
        try {
            this.settings = await getStorage('settings');
        } catch (e) {
            console.error(e);
        }
    }

    async initializeModules() {
        if (typeof MarkUnreadTopics === 'function') {
            const storedSetting = this.settings.find(({setting, value}) => setting === 'markUnreadTopics');
            if (storedSetting && storedSetting.value === true) {
                this.modules['markUnreadTopics'] = new MarkUnreadTopics();    
            }
        }
        
        if (typeof IndividualConsoleIcons === 'function') {
            const storedSetting = this.settings.find(({setting, value}) => setting === 'individualConsoleIcons');
            if (storedSetting && storedSetting.value === true) {
                this.modules['individualConsoleIcons'] = new IndividualConsoleIcons();
            }
        }

        if (typeof Darkmode === 'function') {
            const storedSetting = this.settings.find(({setting, value}) => setting === 'darkmode');
            if (storedSetting && storedSetting.value === true) {
                this.modules['darkmode'] = new Darkmode();
            }
        }

        for (const mod in this.modules) {
            await this.modules[mod].initialize();
        }
    }
}

const bgplus = new BGPlus();

chrome.runtime.onMessage.addListener(({message}) => {
    console.log('got message', message);
    if (message === 'settingsUpdated') {
        console.log('settings updated');
        // document.location.reload();
        // bgplus.initizalize();
    }

    return true;
});
