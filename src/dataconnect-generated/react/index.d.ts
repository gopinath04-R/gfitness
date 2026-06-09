import { CreateNutritionLogData, CreateNutritionLogVariables, UpdateProgressEntryData, UpdateProgressEntryVariables, DeleteWorkoutLogData, DeleteWorkoutLogVariables, ListUserNutritionLogsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNutritionLog(options?: useDataConnectMutationOptions<CreateNutritionLogData, FirebaseError, CreateNutritionLogVariables>): UseDataConnectMutationResult<CreateNutritionLogData, CreateNutritionLogVariables>;
export function useCreateNutritionLog(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNutritionLogData, FirebaseError, CreateNutritionLogVariables>): UseDataConnectMutationResult<CreateNutritionLogData, CreateNutritionLogVariables>;

export function useUpdateProgressEntry(options?: useDataConnectMutationOptions<UpdateProgressEntryData, FirebaseError, UpdateProgressEntryVariables>): UseDataConnectMutationResult<UpdateProgressEntryData, UpdateProgressEntryVariables>;
export function useUpdateProgressEntry(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProgressEntryData, FirebaseError, UpdateProgressEntryVariables>): UseDataConnectMutationResult<UpdateProgressEntryData, UpdateProgressEntryVariables>;

export function useDeleteWorkoutLog(options?: useDataConnectMutationOptions<DeleteWorkoutLogData, FirebaseError, DeleteWorkoutLogVariables>): UseDataConnectMutationResult<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;
export function useDeleteWorkoutLog(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteWorkoutLogData, FirebaseError, DeleteWorkoutLogVariables>): UseDataConnectMutationResult<DeleteWorkoutLogData, DeleteWorkoutLogVariables>;

export function useListUserNutritionLogs(options?: useDataConnectQueryOptions<ListUserNutritionLogsData>): UseDataConnectQueryResult<ListUserNutritionLogsData, undefined>;
export function useListUserNutritionLogs(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserNutritionLogsData>): UseDataConnectQueryResult<ListUserNutritionLogsData, undefined>;
