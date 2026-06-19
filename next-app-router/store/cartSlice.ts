import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type CartState = {
  produtos: Produto[];
};

const initialState: CartState = {
  produtos: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    adicionarProduto: (state, action: PayloadAction<Produto>) => {
      state.produtos.push(action.payload);
    },

    removerProduto: (state, action: PayloadAction<number>) => {
      const index = state.produtos.findIndex(
        (produto) => produto.id === action.payload
      );

      if (index !== -1) {
        state.produtos.splice(index, 1);
      }
    },

    limparCarrinho: (state) => {
      state.produtos = [];
    },
  },
});

export const { adicionarProduto, removerProduto, limparCarrinho } = cartSlice.actions;
export default cartSlice.reducer;