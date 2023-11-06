import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepository from "../repository/userRepository";
import NotFoundError from "../error/not-found";
import { ProductDataType } from "../helpers/types";
import ProductRepository from "../repository/productRepository";

const ProductController = {
  addProduct: async (req: Request, res: Response) => {
    const {
      name,
      price,
      description,
      image,
      category,
      company,
      colors,
      userId,
    } = req.body;

    const prodData: ProductDataType = {
      name,
      price,
      description,
      image,
      category,
      company,
      colors,
      userId,
    };

    const checkUser = await UserRepository.getUserById(userId);

    if (!checkUser) {
      throw new NotFoundError(`User ${userId} not found`);
    }

    const newProduct = await ProductRepository.createProduct(prodData);

    return res.status(StatusCodes.CREATED).json({
      message: `Product created successfully`,
      newProduct,
    });
  },
  getAllProduct: async (req: Request, res: Response) => {
    const products = await ProductRepository.getAllProducts();

    if (!products || products.length === 0) {
      throw new NotFoundError(`Products not found`);
    }

    return res.status(StatusCodes.OK).json({
      message: `success`,
      count: products.length,
      products,
    });
  },
  getOneProduct: async (req: Request, res: Response) => {
    const id = req.params.id;

    const product = await ProductRepository.getProductById(id);

    if (!product) {
      throw new NotFoundError(`product not found`);
    }

    return res.status(StatusCodes.OK).json({
      message: `successfully`,
      product,
    });
  },

  deleteProduct: async (req: Request, res: Response) => {
    const id = req.params.id;

    const deletedProduct = await ProductRepository.deleteProduct(id);

    if (!deletedProduct) {
      throw new NotFoundError(`product not found`);
    }

    res.status(StatusCodes.OK).json({
      message: `Product deleted successfully`,
    });
  },

  updateProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const updates = req.body;

    const updatedProduct = await ProductRepository.updateProduct(id, updates);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Product updated successfully", updatedProduct });
  },
};

export default ProductController;
