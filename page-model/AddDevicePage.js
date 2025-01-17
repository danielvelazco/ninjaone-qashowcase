import { Selector } from 'testcafe';
import mainPage from './MainPage';

class AddDevicePage {
    constructor () {
        this.sysmeNameInput = Selector("#system_name")
        this.typeSelect = Selector("#type");
        this.typeOption = this.typeSelect.find("option")
        this.hddCapacityInput = Selector("#hdd_capacity")
        this.saveButton = Selector("button[class='submitButton']")
    }

    newDevice = async (t, newUserData) => {
        await t
            .click(mainPage.addDeviceButton)
            .typeText(this.sysmeNameInput, newUserData.systemName)
            .click(this.typeSelect)
            .click(this.typeOption.withText(newUserData.type))
            .expect(this.typeSelect.value).eql(newUserData.type)
            .typeText(this.hddCapacityInput, newUserData.hdd_capacity)
            .click(this.saveButton)
    }
}

export default new AddDevicePage();
