"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getData, updateData } from "@/utils/fetchingData";
import { useRouter } from "next/navigation";
import {
  useAddDataMutation,
  useEditDataMutation,
} from "@/utils/mutation/useMutationHook";

type FormData = {
  id_category: string;
  category_name: string;
};

type EditCategoryFormProps = {
  defaultCategoryName: any;
  defaultIdCategory: any;
};

const EditCategoryForm = ({
  defaultCategoryName,
  defaultIdCategory,
}: EditCategoryFormProps) => {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      category_name: defaultCategoryName,
      id_category: defaultIdCategory,
    },
  });

  const editCategory = useEditDataMutation("kategori", ["kategori-list"]);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    await editCategory.mutateAsync(
      {
        rowId: "id_kategori",
        value: data?.id_category,
        rowEdit: "nama_kategori",
        valueEdit: data?.category_name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/categories");
        },
      }
    );
    // updateData(
    //   "kategori",
    //   "id_kategori",
    //   data?.id_category,
    //   "nama_kategori",
    //   data?.category_name
    // ).then((res) => {
    //   console.log(res, "RESPONSEE");
    //   if (res?.code === 200) {
    //     router.push("/dashboard/categories");
    //   }
    // });

    // Submit the form data to the server
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <Input type="hidden" {...register("id_category")} />
      <Input
        {...register("category_name")}
        placeholder="Category Name"
        className="mb-4"
      />

      <Button type="submit" variant={"secondary"}>
        Save
      </Button>
    </form>
  );
};

export default EditCategoryForm;
