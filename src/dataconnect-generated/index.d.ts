import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNutritionLogData {
  nutritionLog_insert: NutritionLog_Key;
}

export interface CreateNutritionLogVariables {
  date: DateString;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DeleteWorkoutLogData {
  workoutLog_delete?: WorkoutLog_Key | null;
}

export interface DeleteWorkoutLogVariables {
  id: UUIDString;
}

export interface Exercise_Key {
  id: UUIDString;
  __typename?: 'Exercise_Key';
}

export interface ListUserNutritionLogsData {
  nutritionLogs: ({
    date: DateString;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  })[];
}

export interface NutritionLog_Key {
  id: UUIDString;
  __typename?: 'NutritionLog_Key';
}

export interface ProgressEntry_Key {
  id: UUIDString;
  __typename?: 'ProgressEntry_Key';
}

export interface UpdateProgressEntryData {
  progressEntry_update?: ProgressEntry_Key | null;
}

export interface UpdateProgressEntryVariables {
  id: UUIDString;
  weight: number;
  bmiScore: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WorkoutLog_Key {
  id: UUIDString;
  __typename?: 'WorkoutLog_Key';
}

export interface WorkoutPlan_Key {
  id: UUIDString;
  __typename?: 'WorkoutPlan_Key';
}

interface CreateNutritionLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNutritionLogVariables): MutationRef<CreateNutritionLogData, CreateNutritionLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNutritionLogVariables): MutationRef<CreateNutritionLogData, CreateNutritionLogVariables>;
  operationName: string;
}
export const createNutritionLogRef: CreateNutritionLogRef;

export function createNutritionLog(vars: CreateNutritionLogVariables): MutationPromise<CreateNutritionLogData, CreateNutritionLogVariables>;
export function createNutritionLog(dc: DataConnect, vars: CreateNutritionLogVariables): MutationPromise<CreateNutritionLogData, CreateNutritionLogVariables>;

interface UpdateProgressEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgressEntryVariables): MutationRef<UpdateProgressEntryData, UpdateProgressEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProgressEntryVariables): MutationRef<UpdateProgressEntryData, UpdateProgressEntryVariables>;
  operationName: string;
}
export const updateProgressEntryRef: UpdateProgressEntryRef;

export function updateProgressEntry(vars: UpdateProgressEntryVariables): MutationPromise<UpdateProgressEntryData, UpdateProgressEntryVariables>;
export function updateProgressEntry(dc: DataConnect, vars: UpdateProgressEntryVariables): MutationPromise<UpdateProgressEntryData, UpdateProgressEntryVariables>;

interface DeleteWorkoutLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkoutLogVariables): MutationRef<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteWorkoutLogVariables): MutationRef<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;
  operationName: string;
}
export const deleteWorkoutLogRef: DeleteWorkoutLogRef;

export function deleteWorkoutLog(vars: DeleteWorkoutLogVariables): MutationPromise<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;
export function deleteWorkoutLog(dc: DataConnect, vars: DeleteWorkoutLogVariables): MutationPromise<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;

interface ListUserNutritionLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserNutritionLogsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserNutritionLogsData, undefined>;
  operationName: string;
}
export const listUserNutritionLogsRef: ListUserNutritionLogsRef;

export function listUserNutritionLogs(options?: ExecuteQueryOptions): QueryPromise<ListUserNutritionLogsData, undefined>;
export function listUserNutritionLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserNutritionLogsData, undefined>;

