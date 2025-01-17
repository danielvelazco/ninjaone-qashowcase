
## Background

QA Showcase for NinjaOne

## Technical Stack

NodeJS application implementing the testcafe testing tool to execute API & UI tests. 

## Prerequisites
- NodeJs v22.x.x
- Chrome Browser installed in the host machine
- Backend Server
    - Clone the repo from [here](https://github.com/NinjaRMM/devicesTask_serverApp).
    - Follow the [README](https://github.com/NinjaRMM/devicesTask_serverApp/blob/master/README.md) instructions

- Frontend app
    - Clone the repo from [here](https://github.com/Yastrenky/devices-clientapp) 
    - Follow the [README](https://github.com/Yastrenky/devices-clientapp/blob/master/README.md) instructions

## Run tests
- Clone this repo and install the dependencies
- Before running the tests make sure both, the backend and the frontend servers are up and running (see notes above)

To run the tests, open a terminal and execute the following command:

    npm test

By default, the tests run in headless mode. If you want to see how testcafe interacts with the web app, go to the `.testcaferc.js` file located in / and switch the browser property to `browsers: "chrome"`
