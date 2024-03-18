"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormData {
  category_name: any;
  nama_kategori: string;
}

import { z } from "zod";
import { useAddDataMutation } from "@/utils/mutation/useMutationHook";
import { useState } from "react";

const schema = z.object({
  category_name: z.string().nonempty("Category Name is required"),
});

function AddData() {
  const addCategory = useAddDataMutation("kategori", ["kategori-list"]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const dataSubmit = { nama_kategori: data.category_name };

    await addCategory.mutateAsync(
      { ...dataSubmit },
      {
        onSuccess: () => {
          setDialogOpen(false);
          form.reset({
            category_name: "",
          });
        },
      }
    );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Data</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add data categories</DialogTitle>
          <DialogDescription>Input data categories</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="category name" {...field} />
                      </FormControl>
                      {form.formState.errors.category_name && (
                        <>
                          <span className="text-red-500">
                            category name must be not empty
                          </span>
                        </>
                      )}
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              className="mx-4 mb-4 text-blue-500"
              onClick={form.handleSubmit(
                onSubmit as SubmitHandler<FieldValues>
              )}
            >
              Tambah
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddData;
