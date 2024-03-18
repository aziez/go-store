"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData = {
  category_name: string;
};

type EditCategoryFormProps = {
  defaultCategoryName: string;
};

const EditCategoryForm = ({ defaultCategoryName }: EditCategoryFormProps) => {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      category_name: defaultCategoryName,
    },
  });

  useEffect(() => {
    // Simulating fetching the category data from an API
    const fetchCategoryData = async () => {
      const response = await fetch("api/category/1"); // Replace with your API endpoint
      const data = await response.json();
      setValue("category_name", data.category_name);
    };

    fetchCategoryData();
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    // Submit the form data to the server
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
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
