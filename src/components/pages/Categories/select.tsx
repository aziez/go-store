"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FcEditImage } from "react-icons/fc";

interface SelectData {
  id_kategori: any;
  nama_kategori: string;
}

function Select({ id_kategori, nama_kategori }: SelectData) {
  const router = useRouter();

  const handleSelect = (id_kategori: any) => {
    console.log(id_kategori, "INI IDDNYA");
    console.log(nama_kategori, "INI IDDNYA");

    router.push(`categories/${id_kategori}`);
  };

  return (
    <Button variant={"ghost"} onClick={() => handleSelect(id_kategori)}>
      <FcEditImage className="h-4 w-4 mx-4" /> Edit
    </Button>
  );
}

export default Select;
