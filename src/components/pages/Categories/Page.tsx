import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { promises as fs } from "fs";
import AddData from "./add";

async function Categories() {
  const listData = await fs.readFile(
    process.cwd() + "/src/data/kategori.json",
    "utf-8"
  );

  const jsonData = JSON.parse(listData);

  return (
    <div className="container mx-auto py-10">
      <AddData />

      <DataTable columns={columns} data={jsonData} />
    </div>
  );
}

export default Categories;
