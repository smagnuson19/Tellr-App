# 18f Tellr Frontend

### See wiki tab for more details

### Links to other repos
[Backend](https://github.com/dartmouth-cs98/18f-tellr-backend)

# Tellr

Organize and streamline task assignment and chores in your household while teaching your kids the value of money! (testing branches and merging)
![Parent](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/19W-Tellr-Parent.png)
![Main](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/19W-Tellr-Main.png)
![Child](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/Tellr-19W-Child.png)

### [View the App in action right here!](https://github.com/dartmouth-cs98/18f-tellr-frontend/wiki/In-Action)


## Architecture

#### Tech Stack

We are using React Native for our frontend mobile app and flask / python for our backend.
We use Metro Bundler and watchman as well.

#### Data Objects

See [Backend](https://github.com/dartmouth-cs98/18f-tellr-backend) for data objects and methods!

## Setup

#### Initial setup using Homebrew:
Install Homebrew, npm, node, yarn

#### Setup of React Native environment:
We followed [these](https://medium.com/@randerson112358/setup-react-native-environment-for-ios-97bf7faadf77) setup instructions:
1. Install watchman: `brew install watchman`
2. Install XCode for iOS

#### Setup of React Native dependencies

1.  Install Cocoapods with gem
`sudo gem install cocoapods`
(optional for bugsnag to upload dSYM files)
`sudo gem install cocoapods-bugsnag`
2. `yarn install`
3. `react-native link`
4. cd into ios folder and Link in Pods
 `pod install`

**Let's make sure it works!**
1. cd to root TellrApp directory
run `yarn start`
2. run in Xcode

**Issues**: If you run into an issue on install pods with react-native-image-picker
1. cd into node_modules/react-native-image-picker
2. In package.json rename "name" value to RNImagePicker
3. Rename the .podspec file to RNImagePicker
4. cd ios and rename the .xcodeproject file to RNImagePicker.xcodeproject
5. `pod install` again

Alternatively, if you get any linker issues, that means React-Native-Image-Picker may have added itself back in. Delete any duplicate library pods. Linker commands are specific to pods.

## Deployment


**Make sure you open the xcworkspace NOT the xcproject file.**

### Production Version
The scheme 'DeployTellrApp' is shipped with xcode and is the production version. Just select it as your target in Xcode and click build.

**Possible issues**: Make sure the main.js bundle is built. It can be built through running `yarn build:ios` and then has to be manually added by dragging the file into the directory of your project in Xcode. It is important that you just create a reference to the file.

Make sure certifications are setup correctly if trying to display on the phone. Easiest way is to create the certifications using your apple id. No developer account is required to run the app on your own phone.


### Dev Version
If you want a Debug version of TellrApp, you have to create a new scheme using 'TellrAppTests'. Make sure in the build config that you build the React library first as you might encounter issues. No other libraries/dependencies need to be built.

Run `yarn start` in Tellr root directory to boot up Metro Bundler. This bundles all of the JS files for you and will play nicely with watchman when developing. Once built, leave the window open.
 Go into the **xcworkspace** and build `TellrAppTests`. Note: the debug version won't build to the phone. Can only be used in the emulator due to certification complexities.

## Deployment To App Store or Testflight
In order to do this, you need certificates, which requires an apple developer account.
The app uses Push Notifications, App Groups, and Remote Notifications. This will put it on testflight, where you can check it out and then push it to the appstore from the developer portal.

1. `cd ~/Tellr/ios`
2. `fastlane ios production`


## Term 1 Demo Prioritization
1. User Login and signup flow complete
2. Parents and children able to be a part of a Family and interact
3. Children and parents able to add tasks/Goals
4. Parents and kids able to complete / approve or deny tasks / Goals
5. In kid and parent view show goal page, show tasks page

## Authors

Hanting Guo, Scott Magnuson, Emily Pitts, Jed Rosen

## Acknowledgments
