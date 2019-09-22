'use strict'

const _ = require('lodash');

module.exports = {
  generateCreateTableInput(tableDescription) {
    let createTableInput = _.pick(tableDescription, ['AttributeDefinitions', 'TableName', 'KeySchema']);
    createTableInput.BillingMode = tableDescription.BillingModeSummary.BillingMode;

    createTableInput.LocalSecondaryIndexes = _.map(tableDescription.LocalSecondaryIndexes, (li) => {
      return _.pick(gi, ['IndexName', 'KeySchema', 'Projection']);
    });

    createTableInput.GlobalSecondaryIndexes =_.map(tableDescription.GlobalSecondaryIndexes, (gi) => {
      let modifiedGI = _.pick(gi, ['IndexName', 'KeySchema', 'Projection']);
      if (createTableInput.BillingMode === 'PROVISIONED') {
        modifiedGI.ProvisionedThroughput = _.pick(gi.ProvisionedThroughput, ['ReadCapacityUnits', 'WriteCapacityUnits']);
      }
      return modifiedGI;
    });

    return createTableInput;
  }
}
