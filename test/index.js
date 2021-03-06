'use strict'

const expect = require('expect.js');
const lib = require('../');
const fixtures = require('./fixtures');

describe('Dynamodb Table Copy', function() {
  it('should transform dynamodb describe into create table input', function(done) {
    let tableDescribe = fixtures.createPayPerRequestTable;
    let output = lib.generateCreateTableInput(fixtures.describeTable);

    // Simple attribute copy
    expect(output.AttributeDefinitions).to.eql(tableDescribe.AttributeDefinitions);
    expect(output.TableName).to.equal(tableDescribe.TableName);
    expect(output.KeySchema).to.eql(tableDescribe.KeySchema);

    // GlobalSecondaryIndexes
    expect(output.LocalSecondaryIndexes).to.eql([
      {
        "IndexName":"RunAtIndex",
        "KeySchema":[
          {
            "AttributeName":"PartitionKey",
            "KeyType":"HASH"
          },
          {
            "AttributeName":"RunAt",
            "KeyType":"RANGE"
          }
        ],
        "Projection":{
          "ProjectionType":"KEYS_ONLY"
        }
      }
    ]);

    expect(output.GlobalSecondaryIndexes).to.eql([
      {
        "IndexName":"MapListIndex",
        "KeySchema":[
          {
            "AttributeName":"SortKey",
            "KeyType":"HASH"
          },
          {
            "AttributeName":"RunAt",
            "KeyType":"RANGE"
          }
        ],
        "Projection":{
          "ProjectionType":"ALL"
        }
      },
      {
        "IndexName":"SeedDomainIndex",
        "KeySchema":[
          {
            "AttributeName":"SeedDomain",
            "KeyType":"HASH"
          },
          {
            "AttributeName":"RunAt",
            "KeyType":"RANGE"
          }
        ],
        "Projection":{
          "NonKeyAttributes": [
            "PartitionKey"
          ],
          "ProjectionType":"INCLUDE"
        }
      }
    ]);

    done();
  });
});
