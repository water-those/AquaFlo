# AquaFlo

## Demo
Onboarding & Map            |  Repair & Community
:-------------------------:|:-------------------------:
![Demo1](https://user-images.githubusercontent.com/58123610/165380043-b02e32e7-117d-433e-b034-32fc5eb6352a.gif) | ![demo2](https://user-images.githubusercontent.com/58123610/165380063-b6f3781d-8ea5-40d5-82a5-4ff83560b3ae.gif)

## Getting Started

### Required Tools:

- Latest LTS version of [Node](https://nodejs.org/en/download/)
  - Latest version is 16.14.0 as of writing
- Expo CLI
  - `npm install -g expo-cli`
- Yarn
  - `npm install -g yarn`
- Visual Studo Code IDE for development

### Setup

- To install node modules

  - `npm install`

- Add a `.env` file in your root directory for environment variables and secret keys

#### To run project on a local device (Android or iOS)

- install the Expo Go app on your device
- run `yarn start` in the root directory of the app
- scan the QR code from the terminal with your device to run the application

##### Troubleshooting

- If you run into an error that says: "Unable to find expo in this project - have you run yarn / npm install yet?" Try the following:

  - run `sudo expo update`

- If you run into a permission or EACCES error while trying to install the node modules
  - run `sudo npm install`
