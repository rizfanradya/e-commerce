import axios from "axios";
import CategoryList from "../components/categoryList";

export default async function CategoryPage() {
  const getDataProductCategories = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  const categories = getDataProductCategories.data;
  return (
    <>
      <title>Category</title>
      <div>
        <CategoryList />
      </div>
    </>
  );
}
