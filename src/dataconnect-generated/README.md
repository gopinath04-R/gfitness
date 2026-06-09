# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListUserNutritionLogs*](#listusernutritionlogs)
- [**Mutations**](#mutations)
  - [*CreateNutritionLog*](#createnutritionlog)
  - [*UpdateProgressEntry*](#updateprogressentry)
  - [*DeleteWorkoutLog*](#deleteworkoutlog)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListUserNutritionLogs
You can execute the `ListUserNutritionLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserNutritionLogs(options?: ExecuteQueryOptions): QueryPromise<ListUserNutritionLogsData, undefined>;

interface ListUserNutritionLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserNutritionLogsData, undefined>;
}
export const listUserNutritionLogsRef: ListUserNutritionLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserNutritionLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserNutritionLogsData, undefined>;

interface ListUserNutritionLogsRef {
  ...
  (dc: DataConnect): QueryRef<ListUserNutritionLogsData, undefined>;
}
export const listUserNutritionLogsRef: ListUserNutritionLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserNutritionLogsRef:
```typescript
const name = listUserNutritionLogsRef.operationName;
console.log(name);
```

### Variables
The `ListUserNutritionLogs` query has no variables.
### Return Type
Recall that executing the `ListUserNutritionLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserNutritionLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserNutritionLogsData {
  nutritionLogs: ({
    date: DateString;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  })[];
}
```
### Using `ListUserNutritionLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserNutritionLogs } from '@dataconnect/generated';


// Call the `listUserNutritionLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserNutritionLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserNutritionLogs(dataConnect);

console.log(data.nutritionLogs);

// Or, you can use the `Promise` API.
listUserNutritionLogs().then((response) => {
  const data = response.data;
  console.log(data.nutritionLogs);
});
```

### Using `ListUserNutritionLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserNutritionLogsRef } from '@dataconnect/generated';


// Call the `listUserNutritionLogsRef()` function to get a reference to the query.
const ref = listUserNutritionLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserNutritionLogsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.nutritionLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.nutritionLogs);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNutritionLog
You can execute the `CreateNutritionLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNutritionLog(vars: CreateNutritionLogVariables): MutationPromise<CreateNutritionLogData, CreateNutritionLogVariables>;

interface CreateNutritionLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNutritionLogVariables): MutationRef<CreateNutritionLogData, CreateNutritionLogVariables>;
}
export const createNutritionLogRef: CreateNutritionLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNutritionLog(dc: DataConnect, vars: CreateNutritionLogVariables): MutationPromise<CreateNutritionLogData, CreateNutritionLogVariables>;

interface CreateNutritionLogRef {
  ...
  (dc: DataConnect, vars: CreateNutritionLogVariables): MutationRef<CreateNutritionLogData, CreateNutritionLogVariables>;
}
export const createNutritionLogRef: CreateNutritionLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNutritionLogRef:
```typescript
const name = createNutritionLogRef.operationName;
console.log(name);
```

### Variables
The `CreateNutritionLog` mutation requires an argument of type `CreateNutritionLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNutritionLogVariables {
  date: DateString;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
```
### Return Type
Recall that executing the `CreateNutritionLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNutritionLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNutritionLogData {
  nutritionLog_insert: NutritionLog_Key;
}
```
### Using `CreateNutritionLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNutritionLog, CreateNutritionLogVariables } from '@dataconnect/generated';

// The `CreateNutritionLog` mutation requires an argument of type `CreateNutritionLogVariables`:
const createNutritionLogVars: CreateNutritionLogVariables = {
  date: ..., 
  calories: ..., 
  protein: ..., 
  carbs: ..., 
  fat: ..., 
};

// Call the `createNutritionLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNutritionLog(createNutritionLogVars);
// Variables can be defined inline as well.
const { data } = await createNutritionLog({ date: ..., calories: ..., protein: ..., carbs: ..., fat: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNutritionLog(dataConnect, createNutritionLogVars);

console.log(data.nutritionLog_insert);

// Or, you can use the `Promise` API.
createNutritionLog(createNutritionLogVars).then((response) => {
  const data = response.data;
  console.log(data.nutritionLog_insert);
});
```

### Using `CreateNutritionLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNutritionLogRef, CreateNutritionLogVariables } from '@dataconnect/generated';

// The `CreateNutritionLog` mutation requires an argument of type `CreateNutritionLogVariables`:
const createNutritionLogVars: CreateNutritionLogVariables = {
  date: ..., 
  calories: ..., 
  protein: ..., 
  carbs: ..., 
  fat: ..., 
};

// Call the `createNutritionLogRef()` function to get a reference to the mutation.
const ref = createNutritionLogRef(createNutritionLogVars);
// Variables can be defined inline as well.
const ref = createNutritionLogRef({ date: ..., calories: ..., protein: ..., carbs: ..., fat: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNutritionLogRef(dataConnect, createNutritionLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.nutritionLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.nutritionLog_insert);
});
```

## UpdateProgressEntry
You can execute the `UpdateProgressEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProgressEntry(vars: UpdateProgressEntryVariables): MutationPromise<UpdateProgressEntryData, UpdateProgressEntryVariables>;

interface UpdateProgressEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgressEntryVariables): MutationRef<UpdateProgressEntryData, UpdateProgressEntryVariables>;
}
export const updateProgressEntryRef: UpdateProgressEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProgressEntry(dc: DataConnect, vars: UpdateProgressEntryVariables): MutationPromise<UpdateProgressEntryData, UpdateProgressEntryVariables>;

interface UpdateProgressEntryRef {
  ...
  (dc: DataConnect, vars: UpdateProgressEntryVariables): MutationRef<UpdateProgressEntryData, UpdateProgressEntryVariables>;
}
export const updateProgressEntryRef: UpdateProgressEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProgressEntryRef:
```typescript
const name = updateProgressEntryRef.operationName;
console.log(name);
```

### Variables
The `UpdateProgressEntry` mutation requires an argument of type `UpdateProgressEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProgressEntryVariables {
  id: UUIDString;
  weight: number;
  bmiScore: number;
}
```
### Return Type
Recall that executing the `UpdateProgressEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProgressEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProgressEntryData {
  progressEntry_update?: ProgressEntry_Key | null;
}
```
### Using `UpdateProgressEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProgressEntry, UpdateProgressEntryVariables } from '@dataconnect/generated';

// The `UpdateProgressEntry` mutation requires an argument of type `UpdateProgressEntryVariables`:
const updateProgressEntryVars: UpdateProgressEntryVariables = {
  id: ..., 
  weight: ..., 
  bmiScore: ..., 
};

// Call the `updateProgressEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProgressEntry(updateProgressEntryVars);
// Variables can be defined inline as well.
const { data } = await updateProgressEntry({ id: ..., weight: ..., bmiScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProgressEntry(dataConnect, updateProgressEntryVars);

console.log(data.progressEntry_update);

// Or, you can use the `Promise` API.
updateProgressEntry(updateProgressEntryVars).then((response) => {
  const data = response.data;
  console.log(data.progressEntry_update);
});
```

### Using `UpdateProgressEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProgressEntryRef, UpdateProgressEntryVariables } from '@dataconnect/generated';

// The `UpdateProgressEntry` mutation requires an argument of type `UpdateProgressEntryVariables`:
const updateProgressEntryVars: UpdateProgressEntryVariables = {
  id: ..., 
  weight: ..., 
  bmiScore: ..., 
};

// Call the `updateProgressEntryRef()` function to get a reference to the mutation.
const ref = updateProgressEntryRef(updateProgressEntryVars);
// Variables can be defined inline as well.
const ref = updateProgressEntryRef({ id: ..., weight: ..., bmiScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProgressEntryRef(dataConnect, updateProgressEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.progressEntry_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.progressEntry_update);
});
```

## DeleteWorkoutLog
You can execute the `DeleteWorkoutLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteWorkoutLog(vars: DeleteWorkoutLogVariables): MutationPromise<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;

interface DeleteWorkoutLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkoutLogVariables): MutationRef<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;
}
export const deleteWorkoutLogRef: DeleteWorkoutLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWorkoutLog(dc: DataConnect, vars: DeleteWorkoutLogVariables): MutationPromise<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;

interface DeleteWorkoutLogRef {
  ...
  (dc: DataConnect, vars: DeleteWorkoutLogVariables): MutationRef<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;
}
export const deleteWorkoutLogRef: DeleteWorkoutLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWorkoutLogRef:
```typescript
const name = deleteWorkoutLogRef.operationName;
console.log(name);
```

### Variables
The `DeleteWorkoutLog` mutation requires an argument of type `DeleteWorkoutLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWorkoutLogVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWorkoutLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWorkoutLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWorkoutLogData {
  workoutLog_delete?: WorkoutLog_Key | null;
}
```
### Using `DeleteWorkoutLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWorkoutLog, DeleteWorkoutLogVariables } from '@dataconnect/generated';

// The `DeleteWorkoutLog` mutation requires an argument of type `DeleteWorkoutLogVariables`:
const deleteWorkoutLogVars: DeleteWorkoutLogVariables = {
  id: ..., 
};

// Call the `deleteWorkoutLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWorkoutLog(deleteWorkoutLogVars);
// Variables can be defined inline as well.
const { data } = await deleteWorkoutLog({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWorkoutLog(dataConnect, deleteWorkoutLogVars);

console.log(data.workoutLog_delete);

// Or, you can use the `Promise` API.
deleteWorkoutLog(deleteWorkoutLogVars).then((response) => {
  const data = response.data;
  console.log(data.workoutLog_delete);
});
```

### Using `DeleteWorkoutLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWorkoutLogRef, DeleteWorkoutLogVariables } from '@dataconnect/generated';

// The `DeleteWorkoutLog` mutation requires an argument of type `DeleteWorkoutLogVariables`:
const deleteWorkoutLogVars: DeleteWorkoutLogVariables = {
  id: ..., 
};

// Call the `deleteWorkoutLogRef()` function to get a reference to the mutation.
const ref = deleteWorkoutLogRef(deleteWorkoutLogVars);
// Variables can be defined inline as well.
const ref = deleteWorkoutLogRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWorkoutLogRef(dataConnect, deleteWorkoutLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutLog_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutLog_delete);
});
```

