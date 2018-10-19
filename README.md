# 18f-tellr-frontend

### See wiki tab for more details

### Links to other repos
[Backend](https://github.com/dartmouth-cs98/18f-tellr-backend)

# Tellr

Organize and streamline task assignment and chores in your household while teaching your kids the value of money!

![alt text](https://github.com/dartmouth-cs98/18f-tellr-frontend/blob/master/Data%20Model%20and%20Sketches/profile.png)

## Architecture

TODO:  overall descriptions of code organization and tools and libraries used

#### Tech Stack
We are using React Native for our frontend and mobile app

#### Data Objects

Our two primary data objects are the parentUser and the childUser. We currently believe we will be using three more secondary data objects to track transactions between the parentUsers and childUsers.

*ParentUser*
For the parentUser, we save their unique id, name, and savings currently in their account.

parentUser: { id, name, savings }

*childUser*
For the childUser, we will save their unique id, name, age, savings currently in their account, and a wishlist of items they are currently saving up for.

childUser: { id, name, age, savings, wishlist },

*task*
With the task model, the parentUser creates and approves the task, whereas a childUser signs up for and completes as task. When a childUser signs up for a task, it becomes locked to other childUsers. When the childUser marks the task as completed (status = complete), the parentUser must then approve the task before the reward is deposited into the childUsers’s savings.

task: { creator: parentUser.id, completor: task_name, description, deadline, reward, status },

*loan*
With the loan model, a childUser creates a transaction request, which a parentUser can sign up to complete, or deny (status = deny/approve). It includes the amount of money the child is requesting from the parent, the reason for the loan, and if there is a condition involved (ex/ it must be paid back within two weeks, or if it’s a gift for a special circumstance this would be empty). If the parent approves it, the amount requested will be transferred from the parent's savings to the child's savings.

loan: { requestor: childUser.id, approver, amount, reason, conditions, status }

*allowance*
With the allowance model, a parentUser simply transfers a specified amount of money to a designated childUser. There is no approval or request of an allowance from a parent or child. Additional request of money from a child to a parent are part of the loan model.

allowance: { distributor: parentUser.id, child: childUser.id, amount }

## Setup

#### Initial setup using Homebrew:
Install Homebrew, npm, node, yarn

#### Setup of React Native environment:
We followed [these](https://medium.com/@randerson112358/setup-react-native-environment-for-ios-97bf7faadf77) setup instructions:
1. Install watchman: brew install watchman
2. Install React Native: sudo npm install -g react-native-cli
3. Install XCode for iOS

## Deployment

To run: react-native start

## Authors

Gabe Corso, Hanting Guo, Scott Magnuson, Emily Pitts, Jed Rosen

## Acknowledgments
