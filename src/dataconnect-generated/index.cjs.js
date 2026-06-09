const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'fitness-website',
  location: 'us-south1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createNutritionLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNutritionLog', inputVars);
}
createNutritionLogRef.operationName = 'CreateNutritionLog';
exports.createNutritionLogRef = createNutritionLogRef;

exports.createNutritionLog = function createNutritionLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNutritionLogRef(dcInstance, inputVars));
}
;

const updateProgressEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProgressEntry', inputVars);
}
updateProgressEntryRef.operationName = 'UpdateProgressEntry';
exports.updateProgressEntryRef = updateProgressEntryRef;

exports.updateProgressEntry = function updateProgressEntry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProgressEntryRef(dcInstance, inputVars));
}
;

const deleteWorkoutLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteWorkoutLog', inputVars);
}
deleteWorkoutLogRef.operationName = 'DeleteWorkoutLog';
exports.deleteWorkoutLogRef = deleteWorkoutLogRef;

exports.deleteWorkoutLog = function deleteWorkoutLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteWorkoutLogRef(dcInstance, inputVars));
}
;

const listUserNutritionLogsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserNutritionLogs');
}
listUserNutritionLogsRef.operationName = 'ListUserNutritionLogs';
exports.listUserNutritionLogsRef = listUserNutritionLogsRef;

exports.listUserNutritionLogs = function listUserNutritionLogs(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listUserNutritionLogsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
