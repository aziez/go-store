"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteMutation } from "@/utils/mutation/useMutationHook";
import { useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";

interface DeleteInterface {
  //   handleClick(value: string): void;
  id: string;
  nama_kategori: string;
}

function AlertDelete({ id, nama_kategori }: DeleteInterface) {
  const deletecategory = useDeleteMutation("kategori", ["kategori-list"]);
  const [isAlertOpen, setIsAlertOpenChange] = useState(false);

  const handleDelete = async () => {
    await deletecategory.mutateAsync(
      {
        row: "id_kategori",
        value: id,
      },
      {
        onSuccess: () => {
          setIsAlertOpenChange(false);
        },
      }
    );
    // return console.log("delete data");
  };
  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpenChange}>
      <AlertDialogTrigger>
        <Button variant={"ghost"}>
          <FcEmptyTrash className="h-4 w-4 mx-2" />
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Are you sure?</AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete this data? {nama_kategori}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => handleDelete()}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDelete;
