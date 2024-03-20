/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { promises as fs } from "fs";
import AddData from "./add";
import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import { useSteinData } from "@/utils/fetchingData";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";

function Categories() {
  const {
    data: categoryData,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => useSteinData("kategori"),
    queryKey: ["kategori-list"],
    staleTime: 1000 * 60 * 60 * 24,
  });

  const filteredCategoryData = categoryData
    ? categoryData.filter(
        (item: { nama_kategori: null }) => item.nama_kategori !== null
      )
    : [];

  return (
    <div className="container mx-auto py-10">
      {isError ? (
        <div>Error occurred while fetching data</div>
      ) : isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <AddData />
          <DataTable columns={columns} data={filteredCategoryData} />
        </>
      )}
    </div>
  );
}

export default Categories;
