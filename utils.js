import page from './page-model/MainPage'
const apiBaseUrl = `http://localhost:3000`

const utils = {
    async getDevicesListFromServer(t) {
        return await t.request(`${apiBaseUrl}/devices/`).body
    },

    async updateDevice(t, data) {
        return await t.request(
            {
                url: `${apiBaseUrl}/devices/${data.id}`,
                method: "PUT",
                body: {
                    system_name: data.system_name,
                    type: data.type,
                    hdd_capacity: data.hdd_capacity
                }
            }
        )
    },

    async deleteDevice(t, data) {
        return await t.request(
            {
                url: `${apiBaseUrl}/devices/${data.id}`,
                method: "DELETE",
            }
        )
    },
    
    sortDevicesListByHddCapacityASC(devicesList) {
        const sortedByCapacityASC = devicesList.sort((a, b) => {
            return parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity);
        });
        return sortedByCapacityASC;
    },
    
    removeIdPropertyFromDevices(devicesList) {
        const devicesWithoutId = devicesList.map(({ id, ...rest }) => rest);
        return devicesWithoutId;
    },
    
    async getDevicesListFromWebApp(devicesSelector) {
        const devicesListFromWebApp = []
        
        for (let index = 0; index < await devicesSelector.count; index++) {
            let device = {
                "system_name": await page.device.name(index).innerText,
                "type": await page.device.type(index).innerText,
                "hdd_capacity": (await page.device.capacity(index).innerText).replace(" GB","")
            }
            devicesListFromWebApp.push(device)
        }
        return devicesListFromWebApp;
    }
}

export default utils;
