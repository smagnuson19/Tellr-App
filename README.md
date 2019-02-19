# 18f-tellr-frontend

### See wiki tab for more details

### Links to other repos
[Backend](https://github.com/dartmouth-cs98/18f-tellr-backend)

# Tellr

Organize and streamline task assignment and chores in your household while teaching your kids the value of money! (testing branches and merging)
![alt text](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/18F-Tellr-Main.png)
![alt text](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/18F-Tellr-Parent.png)
![alt text](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/Tellr-18F-Child.png)


## Architecture

#### Tech Stack

We are using React Native for our frontend mobile app and flask / python for our backend.

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
4. Link in Pods
 `install pods`
6. cd to directory
run `yarn start`
7. run in Xcode

Issues: If you run into an issue on install pods with react-native-image-picker
1. cd into node_modules/react-native-image-picker
2. In package.json rename "name" value to RNImagePicker
3. Rename the .podspec file to RNImagePicker
4. cd ios and rename the .xcodeproject file to RNImagePicker.xcodeproject
5. `pod install` again

## Deployment
To run:
The scheme 'DeployTellrApp' is shipped with xcode and is the production version. Just select it as your target in Xcode and click build.

If you want a Debug version of TellrApp, you have to create a new scheme using TellrAppTests. Make sure in the build config that you build the React library first as you might encounter issues. No other libraries/dependencies need to be built. 

Run `yarn start` in Tellr root directory.
Once watchman is running open up the xcworkspace in xcode and build to the debug scheme you just made.

## Term 1 Demo Prioritizations
1. User Login and signup flow complete
2. Parents and children able to be a part of a Family and interact
3. Children and parents able to add tasks/Goals
4. Parents and kids able to complete / approve or deny tasks / Goals
5. In kid and parent view show goal page, show tasks page

## Authors

Hanting Guo, Scott Magnuson, Emily Pitts, Jed Rosen

## Acknowledgments
