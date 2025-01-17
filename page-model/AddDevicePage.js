import { Selector } from 'testcafe';
import mainPage from './MainPage';

class AddDevicePage {
    constructor () {
        this.sysmeNameInput = Selector("#system_name")
        this.typeSelect = Selector("#type");
        this.typeOption = this.typeSelect.find("option")
        this.hddCapacityInput = Selector("#hdd_capacity")
        this.saveButton = Selector("button[class='submitButton']")
        this.new = async (t, data) => {
            await t
                .click(mainPage.addDeviceButton)
                .typeText(this.sysmeNameInput, data.systemName)
                .click(this.typeSelect)
                .click(this.typeOption.withText(data.type))
                .expect(this.typeSelect.value).eql(data.type)
                .typeText(this.hddCapacityInput, data.hdd_capacity)
                .click(this.saveButton)

        }
    }
}

export default new AddDevicePage();
