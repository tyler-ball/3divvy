# 3divvy

Crowdsharing for 3d printers. Whether you need to print a 3d model or have a 3d printer
and want to enable others to get their models printed while making a return doing it,
3Divvy is for you!

## Requirements

* NPM installed and on your path
* AWS cli and log in with `aws configure`

## Installation and setup

In order to run the 3Divvy application you must have an AWS account with permissions to
manage Amplify, S3, DynamoDB, Lambda, and AppSync. This account should be configured
so that your AWS CLI operates successfully.

First, fork the 3divvy application to your own repository. Then follow the AWS Amplify
[instructions](https://console.aws.amazon.com/amplify/home#/create) to host your
instance of 3divvy. After that is completed, to facilitate local development:

```
npm install
npx ampx sandbox # Run this in a separate terminal and allow it to complete
npm run dev
```

The output of `npm run dev` should give you a local address to access the web
application. It will run using the sandbox backend that is created by `npx ampx sandbox`.
Create a user and check out the application!