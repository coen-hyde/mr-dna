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
