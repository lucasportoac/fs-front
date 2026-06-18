"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  adicionarProduto,
  removerProduto,
} from "../../store/cartSlice";

export default function Carrinho() {
  const dispatch = useDispatch();

  const produtos = useSelector(
    (state: RootState) => state.cart.produtos
  );

  const produtosAgrupados = produtos.reduce((acc, produto) => {
    const produtoExistente = acc.find((item) => item.id === produto.id);

    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      acc.push({
        ...produto,
        quantidade: 1,
      });
    }

    return acc;
  }, [] as Array<(typeof produtos)[number] & { quantidade: number }>);

  const total = produtos.reduce(
    (soma, produto) => soma + produto.price,
    0
  );

  return (
    <section className="page">
      <div className="carrinho-topo">
        <Link href="/produtos" className="botao-voltar">
          ← Voltar
        </Link>
      </div>

      <h1>Carrinho</h1>

      {produtosAgrupados.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="carrinho-lista">
            {produtosAgrupados.map((produto) => (
              <div className="carrinho-item" key={produto.id}>
                <img
                  src={produto.thumbnail}
                  alt={produto.title}
                />

                <div className="carrinho-info">
                  <h3>{produto.title}</h3>
                  <p>Preço unitário: $ {produto.price}</p>
                  <p>Quantidade: {produto.quantidade}</p>
                  <strong>
                    Subtotal: $ {(produto.price * produto.quantidade).toFixed(2)}
                  </strong>
                </div>

                <div className="carrinho-acoes">
                  <button onClick={() => dispatch(adicionarProduto(produto))}>
                    +
                  </button>

                  <button onClick={() => dispatch(removerProduto(produto.id))}>
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="total-carrinho">
            Total: $ {total.toFixed(2)}
          </h2>
        </>
      )}
    </section>
  );
}