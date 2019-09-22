Mr DNA
======

A small utility to convert Dynamodb Describe Table output to Dynamodb Create Table input. Useful for copying dynamodb table structures.

Usage
-----

In your project directory:
`npm install mr-dna --save`

In node:
```
const MrDNA = require('mr-dna');

let describeTableOutput = {};
let createTableInput = MrDNA.generateCreateTableInput(describeTableOutput);
```

Use cases
---------

This library was built to copy DynamoDB table structure from AWS into a locally running `dyanamodb-local` instance. You should be able to use it in reverse or copying table structure to other AWS accounts.
