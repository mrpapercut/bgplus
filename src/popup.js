import {
    getStorage,
    setStorage
} from './util/storage';

class BGPlusPopup {
    constructor() {
        this.settingsElements = [
            'markUnreadTopics',
            'individualConsoleIcons',
            'darkmode'
        ];
        this.settingsObject = [];

        // chrome.storage.local.remove('settings');

        this.initialize();
    }

    initialize() {
        getStorage('settings').then(settingsObject => {
            this.settingsObject = settingsObject;

            if (this.settingsObject.length === 0) {
                this.settingsObject = this.settingsElements.map(el => ({
                    setting: el,
                    value: true
                }));

                setStorage('settings', this.settingsObject);
            }

            this.processSettings();
            
            this.addListeners();
        });

        // Set name and version in popup
        const manifest = chrome.runtime.getManifest();
        document.getElementById('header').innerHTML = `${manifest.name} v${manifest.version}`;
    }

    addListeners() {
        this.settingsElements.forEach(el => {
            document.getElementById(el).addEventListener('change', e => {
                this.updateStorage(el, e.target.checked);
            });
        });
    }

    processSettings() {
        this.settingsObject.forEach(({setting, value}) => {
            document.getElementById(setting).checked = value;
        })
    }

    updateStorage(setting, value) {
        const newSettingsObj = this.settingsObject.map(key => {
            if (key.setting === setting) {
                key.value = value;
            }

            return key;
        });

        setStorage('settings', newSettingsObj).then(() => {
            this.processSettings();

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    message: 'settingsUpdated'
                }, res => console.log(res));
            });
        });
    }
}

new BGPlusPopup();
