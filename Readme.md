# Contact App

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure, core dependencies, and boilerplate to jumpstart development.

## Prerequisites

-   [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
-   Postman
-   VsCode
-   MongoDB Compass

## Base dependencies

-   [axios](https://github.com/axios/axios) for networking.
-   [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
-   [react-navigation](https://reactnavigation.org/) navigation library.
-   [react-navigation/native-stack](https://reactnavigation.org/) navigation stack component.
-   [react-native-async-storage](https://github.com/react-native-async-storage/async-storage) as storage solution.
-   [redux](https://redux.js.org/) for state management.
-   [tailwind-react-native-classnames](https://github.com/jaredh159/tailwind-react-native-classnames) for styling.

## Steps to start the app

-   install an android emulator to run the app
-   install node.js with version higher than 12.0.0
-   install expo with the command <code> npm install expo -g </code>
-   install all the dependencies in the root folder by running the command <code> npm install </code>
-   move to the backend folder and install all the dependencies <code> npm install </code>
-   start the mongo server on your local machine
-   now start the backend server of your app
-   to start the server, move to the backend folder and run the command <code> npm run devStart </code>
-   now it time to run the appp. To run the app start an android emulator on your device.
-   now move to the root folder and run the command <code> expo start </code> . Before this make sure all the dependencies and packages are installed, the backend server is         running and the emulator is on.
-   now a open a tab in your browser with the link <link> http://localhost:19002/ </link> . This will open the expo developer tools.
-   now click on the run <code> Android emulator </code> button. This will start your app on the emulator running in the background.
