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
    }
}

export default utils;
