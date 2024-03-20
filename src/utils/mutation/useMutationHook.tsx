import { addData, deleteData, updateData } from "../fetchingData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddDataMutation(sheetName: string, queryKeyData: string[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: any) => {
      return addData(sheetName, newTodo);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyData });
    },
  });
}

export function useEditDataMutation(sheetName: string, queryKeyData: string[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rowId,
      value,
      rowEdit,
      valueEdit,
    }: {
      rowId: any;
      value: any;
      rowEdit: any;
      valueEdit: any;
    }) => {
      return updateData(sheetName, rowId, value, rowEdit, valueEdit);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyData });
    },
  });
}

export function useDeleteMutation(sheetName: string, querykeyData: string[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ row, value }: { row: any; value: any }) => {
      return deleteData(sheetName, row, value);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: querykeyData });
    },
  });
}
