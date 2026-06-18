"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  adicionarProduto,
  removerProduto,
} from "../store/cartSlice";

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function CardProduto({ produto }: { produto: Produto }) {
  const dispatch = useDispatch();

  const quantidadeProduto = useSelector(
    (state: RootState) =>
      state.cart.produtos.filter((item) => item.id === produto.id).length
  );

  return (
    <div className="card">
      <img src={produto.thumbnail} alt={produto.title} />

      <h3>{produto.title}</h3>

      <p>{produto.description}</p>

      <strong>$ {produto.price}</strong>

      <p className="quantidade-produto">
        Quantidade: {quantidadeProduto}
      </p>

      <div className="acoes-produto">
        <button onClick={() => dispatch(adicionarProduto(produto))}>
          Adicionar
        </button>

        <button onClick={() => dispatch(removerProduto(produto.id))}>
          Remover
        </button>
      </div>
    </div>
  );
}