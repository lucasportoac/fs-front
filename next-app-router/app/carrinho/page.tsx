"use client";

import { limparCarrinho } from "../../store/cartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  adicionarProduto,
  removerProduto,
} from "../../store/cartSlice";
import { salvarPedido } from "../../services/pedidoService";
import { useAppContext } from "../../context/AppContext";

export default function Carrinho() {
  const { usuario } = useAppContext();

  const dispatch = useDispatch();

  const produtos = useSelector(
    (state: RootState) => state.cart.produtos
  );

  const produtosAgrupados = produtos.reduce((acc, produto) => {
    const produtoExistente = acc.find(
      (item) => item.id === produto.id
    );

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

  async function finalizarPedido() {
  if (!usuario) {
    alert("Você precisa fazer login para finalizar o pedido.");
    return;
  }

  try {
    await salvarPedido(
      produtosAgrupados,
      total,
      usuario.email
    );

    dispatch(limparCarrinho());

    alert("Pedido realizado com sucesso!");
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar pedido.");
  }
}

  return (
    <section className="page">
      <div className="carrinho-topo">
        <Link href="/produtos" className="botao-voltar">
          ← Voltar aos Produtos
        </Link>
      </div>

      <h1>Carrinho</h1>

      {produtosAgrupados.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="carrinho-lista">
            {produtosAgrupados.map((produto) => (
              <div
                className="carrinho-item"
                key={produto.id}
              >
                <img
                  src={produto.thumbnail}
                  alt={produto.title}
                />

                <div className="carrinho-info">
                  <h3>{produto.title}</h3>

                  <p>
                    Preço unitário: $
                    {produto.price}
                  </p>

                  <p>
                    Quantidade: {produto.quantidade}
                  </p>

                  <strong>
                    Subtotal: $
                    {(produto.price * produto.quantidade).toFixed(2)}
                  </strong>
                </div>

                <div className="carrinho-acoes">
                  <button
                    onClick={() =>
                      dispatch(adicionarProduto(produto))
                    }
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removerProduto(produto.id))
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="total-carrinho">
            Total: ${total.toFixed(2)}
          </h2>

          <button
            className="botao-finalizar"
            onClick={finalizarPedido}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </section>
  );
}