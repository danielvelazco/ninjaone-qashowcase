import { Selector } from 'testcafe';

class MainPage {
    constructor () {
        this.listOfDevices = Selector("div[class='device-main-box']")        
        this.device = {
            name: (deviceIndex) => this.listOfDevices.nth(deviceIndex).find("span[class='device-name']"),
            type: (deviceIndex) => this.listOfDevices.nth(deviceIndex).find("span[class='device-type']"),
            capacity: (deviceIndex) => this.listOfDevices.nth(deviceIndex).find("span[class='device-capacity']"),
            editButton: (deviceIndex) => this.listOfDevices.nth(deviceIndex).find("a[class='device-edit']"),
            removeButton: (deviceIndex) => this.listOfDevices.nth(deviceIndex).find("button[class='device-remove']")
        }
        this.addDeviceButton = Selector("a[class='submitButton']")
        this.getDeviceInfoBySystemName = async (systemName) => {
            const device = Selector("span[class='device-name']").withExactText(systemName).parent("div[class='device-info']").find('span')
            const deviceCount = await device.count
            if (deviceCount > 0) {
                return {
                    found: true,
                    systemName: {
                        value: await device.nth(0).innerText,
                        isVisible: await device.nth(0).visible,
                    },
                    type: {
                        value: await device.nth(1).innerText,
                        isVisible: await device.nth(1).visible,
                    },
                    capacity: {
                        value: await device.nth(2).innerText,
                        isVisible: await device.nth(2).visible,
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
