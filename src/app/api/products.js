import { retrieveData } from "@/utils/db/service";

export default async function handler() {
  const products = await retrieveData("test");
  res.status(200).json({ status: true, statusCode: 200, products });
  console.log(products);
}
