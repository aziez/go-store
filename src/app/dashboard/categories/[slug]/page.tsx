import EditCategoryForm from "@/components/pages/Categories/edit";
import { getData } from "@/utils/fetchingData";

async function EditCategory({ params }: { params: { slug: string } }) {
  const id_kategori = params.slug;
  const data = await getData("kategori", "id_kategori", id_kategori);

  console.log(data);

  return (
    <>
      <h1>{id_kategori}</h1>
      <EditCategoryForm
        defaultIdCategory={id_kategori}
        defaultCategoryName={data.data[0]?.nama_kategori}
      />
    </>
  );
}

export default EditCategory;
