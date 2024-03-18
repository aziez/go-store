"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Aladin } from "next/font/google";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { FcEditImage, FcEmptyTrash } from "react-icons/fc";
import { RxDotsHorizontal } from "react-icons/rx";
import AlertDelete from "./delete";
import { useState } from "react";
import Select from "./select";

type Categories = {
  id_kategori: number;
  nama_kategori: string;
  jumlah_produk: number;
};

export const columns: ColumnDef<Categories>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id_kategori",
    header: "ID",
  },
  {
    accessorKey: "nama_kategori",
    header: ({ column }) => {
      const iconSort =
        column.getIsSorted() === "asc" ? (
          <FaArrowDownShortWide className="w-4 h-4 mx-2" />
        ) : (
          <FaArrowUpShortWide className="w-4 h-4 mx-2" />
        );
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori {iconSort}
        </Button>
      );
    },
  },
  {
    accessorKey: "jumlah_produk",
    header: "Jumlah Produk",
  },
  {
    id: "actions",
    enableHiding: false,

    header: () => <div className="text-black">Aksi</div>,
    cell: ({ row }) => {
      const id = row.getValue("id_kategori") as string;
      const nama_kategori = row.getValue("nama_kategori") as string;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <RxDotsHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <>
              <AlertDelete id={id} nama_kategori={nama_kategori} />
            </>
            <DropdownMenuSeparator />
            <Select id_kategori={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
