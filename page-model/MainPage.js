import { Selector } from 'testcafe';

class MainPage {
    constructor () {
        this.addDeviceButton = Selector("a[class='submitButton']")
        this.deviceInfo = (systemName) => Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-info']").find('span')
        this.deviceEditButton = (systemName) => Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-main-box']").find('a')
        this.deviceRemoveButton = (systemName) => Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-main-box']").find('button')
    }

    getDeviceBySystemName = async (systemName) => {
        const deviceInfo = this.deviceInfo(systemName)
        const deviceCount = await deviceInfo.count
        const deviceEditButton = this.deviceEditButton(systemName)
        const deviceRemoveButton = this.deviceRemoveButton(systemName)
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

export default new MainPage();
