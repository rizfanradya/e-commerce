import axios from "axios";

export default async function CategoryPage() {
  const getDataProductCategories = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  const categories = getDataProductCategories.data;

  return (
    <>
      <title>Category</title>
      <div className="my-12">Coming Soon</div>
    </>
  );
}
