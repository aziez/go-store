import EditCategoryForm from "@/components/pages/Categories/edit";

async function EditCategory({ params }: { params: { slug: string } }) {
  const id_kategori = params.slug;

  return (
    <>
      <h1>{id_kategori}</h1>
      <EditCategoryForm defaultCategoryName={id_kategori} />
    </>
  );
}

export default EditCategory;
