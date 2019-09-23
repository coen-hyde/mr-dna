'use strict'

const _ = require('lodash');

module.exports = {
  generateCreateTableInput(tableDescription) {
    if (tableDescription.Table) tableDescription = tableDescription.Table;
    let createTableInput = _.pick(tableDescription, ['AttributeDefinitions', 'TableName', 'KeySchema']);
    createTableInput.BillingMode = tableDescription.BillingModeSummary.BillingMode;

    createTableInput.LocalSecondaryIndexes = _.map(tableDescription.LocalSecondaryIndexes, (li) => {
      return _.pick(li, ['IndexName', 'KeySchema', 'Projection']);
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
