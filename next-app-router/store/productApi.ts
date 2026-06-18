import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
};

type ProductsResponse = {
  products: Produto[];
  total: number;
  skip: number;
  limit: number;
};

type ProductsQueryArgs = {
  search?: string;
  category?: string;
  limit?: number;
  skip?: number;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryArgs>({
      query: ({ search, category, limit = 10, skip = 0 }) => {
        if (search) {
          return `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }

        if (category) {
          return `/products/category/${category}?limit=${limit}&skip=${skip}`;
        }

        return `/products?limit=${limit}&skip=${skip}`;
      },
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<Produto, Partial<Produto>>({
      query: (novoProduto) => ({
        url: "/products/add",
        method: "POST",
        body: novoProduto,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
} = productApi;