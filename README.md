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
2. Install React Native: `sudo npm install -g react-native-cli`
3. Install XCode for iOS

#### Setup of React Native dependencies

1. `yarn install`
2. `react-native link`

## Deployment
To run:

`yarn start`
Once watchman is running open up the project in xcode

## Term 1 Demo Prioritizations
1. User Login and signup flow complete
2. Parents and children able to be a part of a Family and interact
3. Children and parents able to add tasks/Goals
4. Parents and kids able to complete / approve or deny tasks / Goals
5. In kid and parent view show goal page, show tasks page

## Authors

Hanting Guo, Scott Magnuson, Emily Pitts, Jed Rosen

## Acknowledgments
