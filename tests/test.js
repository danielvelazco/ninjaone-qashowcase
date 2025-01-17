import mainPage from '../page-model/MainPage';
import addDevicePage from '../page-model/AddDevicePage';
import utils from '../utils'

fixture `Devices Management`

// Tests
test('Devices Visibility', async t => {
    // Make an API call to retrieve the list of devices. 
    const devicesListFromServer = await utils.getDevicesListFromServer(t);

    for (const deviceFromApi of devicesListFromServer) {
        // Get device from the web app using the system_name returned in the API
        const deviceFromApp = await mainPage.getDeviceBySystemName(deviceFromApi.system_name)
        
        // Check device info and options
        await t
            .expect(deviceFromApp.systemName.value).eql(deviceFromApi.system_name)
            .expect(deviceFromApp.systemName.isVisible).eql(true)
            
            .expect(deviceFromApp.type.value).eql(deviceFromApi.type)
            .expect(deviceFromApp.type.isVisible).eql(true)

            .expect(deviceFromApp.hdd_capacity.value.replace(" GB","")).eql(deviceFromApi.hdd_capacity)
            .expect(deviceFromApp.hdd_capacity.isVisible).eql(true)
            
            .expect(deviceFromApp.editButton.value).eql("EDIT")
            .expect(deviceFromApp.editButton.isVisible).eql(true)
            
            .expect(deviceFromApp.removeButton.value).eql("REMOVE")
            .expect(deviceFromApp.removeButton.isVisible).eql(true)
    }
});

test('Add a new device', async t => {
    // data for the new device
    const data = {
        systemName: "daniel",
        type: "MAC",
        hdd_capacity: "5"
    }

    // add new device
    await addDevicePage.new(t, data)
    
    // Get the new device info from the app
    const newDeviceAdded = await mainPage.getDeviceBySystemName(data.systemName)

    // Assert new device info is properly displayed
    await t
        .expect(newDeviceAdded.found).eql(true)
        .expect(newDeviceAdded.systemName.value).eql(data.systemName)
        .expect(newDeviceAdded.systemName.isVisible).ok()
        .expect(newDeviceAdded.type.value).eql(data.type)
        .expect(newDeviceAdded.type.isVisible).ok()
        .expect(newDeviceAdded.hdd_capacity.value).eql(`${data.hdd_capacity} GB`)
        .expect(newDeviceAdded.hdd_capacity.isVisible).ok()
});

test('Rename the first device in the list', async t => {
    // API call to get the device list
    let devicesListFromServer = await utils.getDevicesListFromServer(t);
    
    // Get the current system_name on the first device
    // Update the system_name on the first device to "Renamed Device"
    let firstDevice = devicesListFromServer[0];
    firstDevice.system_name = "Renamed Device";

    // API call to update the system_name to the firts device in the db
    await utils.updateDevice(t, firstDevice);

    // reload page
    await t.eval(() => location.reload(true));
    
    // Search the device using the new system_name
    // It should find the device with the new name
    const device = await mainPage.getDeviceBySystemName(firstDevice.system_name)
    await t
        .expect(device.found).eql(true)
        .expect(device.systemName.value).eql(firstDevice.system_name)
});

test('Delete the last device in the list', async t => {
    // API call to get the device list
    let devicesListFromServer = await utils.getDevicesListFromServer(t);
    
    // Get the last device from the list
    let lastDevice = devicesListFromServer[devicesListFromServer.length - 1];
    
    // API call to delete the last device in the list
    await utils.deleteDevice(t, lastDevice);

    // reload page
    await t.eval(() => location.reload(true));

    // Search the device using the old system_name
    // It should't find any device with the old name
    let device = await mainPage.getDeviceBySystemName(lastDevice.system_name)
    await t
        .expect(device.found).eql(false)
});
