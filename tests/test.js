import mainPage from '../page-model/MainPage';
import addDevicePage from '../page-model/AddDevicePage';
import utils from '../utils'

fixture `Devices Management`

// Tests
test('Devices Visibility', async t => {
    // Make an API call to retrieve the list of devices. 
    const devicesListFromServer = await utils.getDevicesListFromServer(t);
    
    // Sort the API response by the hdd_capacity property in ASC order because it's what the app is doing after receiving the response
    // With the sorted list we can verify if the web app is sorting the devices list in the proper way
    const devicesListSortedByCapacityASC = utils.sortDevicesListByHddCapacityASC(devicesListFromServer);
    
    // Get devices list from the web app
    /* 
       By default, the devices list is sorted by the hdd_capacity property in ASC order 
       The device objects are created with the following structure because the ID is not displayed in the web app
        {
            "system_name": string,
            "type": string
            "hdd_capacity": string without "GB"
        }
    */   
    const devicesListFromWebApp = await utils.getDevicesListFromWebApp(mainPage.listOfDevices)
    
    // Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
    // Since each device is in the same index in both arrays we can say the devices are correctly displayed.
    for (let i = 0; i < devicesListSortedByCapacityASC.length; i++) {
        await t
            .expect(devicesListSortedByCapacityASC[i].system_name).eql(devicesListFromWebApp[i].system_name)
            .expect(devicesListSortedByCapacityASC[i].type).eql(devicesListFromWebApp[i].type)
            .expect(devicesListSortedByCapacityASC[i].hdd_capacity).eql(devicesListFromWebApp[i].hdd_capacity)
        
        // Verify that all devices contain the edit and remove buttons.    
        // EDIT button
        let editButton = mainPage.device.editButton(i)
        await t
            .expect(editButton.visible).eql(true)
            .expect(editButton.innerText).eql("EDIT")
            .expect(editButton.count).eql(1) // verify there is 1 button per device

        // REMOVE button
        let removeButton = mainPage.device.removeButton(i)
        await t
            .expect(removeButton.visible).eql(true)
            .expect(removeButton.innerText).eql("REMOVE")
            .expect(removeButton.count).eql(1) // verify there is 1 button per device
    }

    // Another way to verify the device info is by removing the ID from the sorted list and compare both arrays
    const devicesWithoutId = utils.removeIdPropertyFromDevices(devicesListSortedByCapacityASC)
    await t.expect(devicesWithoutId).eql(devicesListFromWebApp);
});

test('Add a new device', async t => {
    // data for the new device
    const data = {
        systemName: "daniel",
        type: "MAC",
        capacity: "5"
    }

    // add new device
    await addDevicePage.new(t, data)
    
    // Get the new device info from the app
    const newDeviceAdded = await mainPage.getDeviceInfoBySystemName(data.systemName)

    // Assert new device info is properly displayed
    await t
        .expect(newDeviceAdded.found).eql(true)
        .expect(newDeviceAdded.systemName.value).eql(data.systemName)
        .expect(newDeviceAdded.systemName.isVisible).ok()
        .expect(newDeviceAdded.type.value).eql(data.type)
        .expect(newDeviceAdded.type.isVisible).ok()
        .expect(newDeviceAdded.capacity.value).eql(`${data.capacity} GB`)
        .expect(newDeviceAdded.capacity.isVisible).ok()
});

test('Rename the first device in the list', async t => {
    // API call to get the device list
    let devicesListFromServer = await utils.getDevicesListFromServer(t);
    
    // Get the current system_name on the first device
    let firstDevice = devicesListFromServer[0];
    let currentSystemName = firstDevice.system_name
    
    // Update the system_name on the first device to "Renamed Device"
    firstDevice.system_name = "Renamed Device";

    // API call to update the system_name to the firts device in the db
    await utils.updateDevice(t, firstDevice);

    // reload page
    await t.eval(() => location.reload(true));


    // Search the device using the old system_name
    // It should't find any device with the old name
    let device = await mainPage.getDeviceInfoBySystemName(currentSystemName)
    await t
        .expect(device.found).eql(false)
    
    // Search the device using the new system_name
    // It should find the device with the new name
    device = await mainPage.getDeviceInfoBySystemName(firstDevice.system_name)
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
    let device = await mainPage.getDeviceInfoBySystemName(lastDevice.system_name)
    await t
        .expect(device.found).eql(false)
});
