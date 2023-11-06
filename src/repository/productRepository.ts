import { ProductDataType } from "../helpers/types";
import Product from "../models/Product";

const ProductRepository = {
  createProduct: async (productDataType: ProductDataType) => {
    const product = await Product.create({
      ...productDataType,
      userId: productDataType.userId,
    });

    return product;
  },
  getProductById: async (id: string) => {
    const product = await Product.findById(id).populate({
      path: "userId",
      select: ["first_name", "last_name", "email", "phone_number"],
    });

    return product;
  },
  getAllProducts: async () => {
    const products = await Product.find({}).populate({
      path: "userId",
      select: ["first_name", "last_name", "email", "phone_number"],
    });
    return products;
  },

  deleteProduct: async (id: string) => {
    const product = await Product.findByIdAndRemove(id);

    return product;
  },

  updateProduct: async (id: string, updates: Partial<ProductDataType>) => {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    return product;
  },
};

export default ProductRepository;
