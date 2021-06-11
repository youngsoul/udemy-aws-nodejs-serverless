# Codingly.io: Base Serverless Framework Template

https://codingly.io

## What's included
* Folder structure used consistently across our projects.
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

## Getting started
```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

You are ready to go!

## My Notes

Deploy:

```shell

sls deploy --stage dev -v --aws-profile <profile_name>
sls deploy -v --aws-profile <profile_name>

```

Deploy Only Function

```shell
sls deploy -f createAuction -v --aws-profile spr
```

UnDeploy

```shell
sls remove -v --aws-profile <profile name>
```

Install Node Packages

```shell
npm install uuid
npm install @middy/core @middy/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser
npm install http-errors
```