import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  categoryName: string;
  id: string;
  jumlahProduct: number;
}

const AddDataForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({}) => {
  const form = useForm();

  const onSubmit = () => {
    console.log();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="category name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddDataForm;
