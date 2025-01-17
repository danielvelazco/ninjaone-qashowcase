import { Selector } from 'testcafe';

class MainPage {
    constructor () {
        this.addDeviceButton = Selector("a[class='submitButton']")
        this.getDeviceBySystemName = async (systemName) => {
            const deviceInfo = Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-info']").find('span')
            const deviceCount = await deviceInfo.count
            const deviceEditButton = Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-main-box']").find('a')
            const deviceRemoveButton = Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-main-box']").find('button')
            if (deviceCount > 0) {
                return {
                    found: true,
                    systemName: {
                        value: await deviceInfo.nth(0).innerText,
                        isVisible: await deviceInfo.nth(0).visible,
                    },
                    type: {
                        value: await deviceInfo.nth(1).innerText,
                        isVisible: await deviceInfo.nth(1).visible,
                    },
                    hdd_capacity: {
                        value: await deviceInfo.nth(2).innerText,
                        isVisible: await deviceInfo.nth(2).visible,
                    },
                    editButton: {
                        value: await deviceEditButton.innerText,
                        isVisible: await deviceEditButton.visible
                    },
                    removeButton: {
                        value: await deviceRemoveButton.innerText,
                        isVisible: await deviceRemoveButton.visible
                    }
                }
            } else {
                return {
                    found: false
                }
            }
        }
    }
}

export default new MainPage();
