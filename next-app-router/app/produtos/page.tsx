"use client";

import { useState } from "react";
import CardProduto from "../../components/CardProduto";
import { useGetProductsQuery } from "../../store/productApi";

export default function Produtos() {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  const {
    data: relogiosMasculinos,
    isLoading: carregandoMasculinos,
    isFetching: atualizandoMasculinos,
    error: erroMasculinos,
  } = useGetProductsQuery({
    category: "mens-watches",
    limit: 10,
    skip: 0,
  });

  const {
    data: relogiosFemininos,
    isLoading: carregandoFemininos,
    isFetching: atualizandoFemininos,
    error: erroFemininos,
  } = useGetProductsQuery({
    category: "womens-watches",
    limit: 10,
    skip: 0,
  });

  const produtos = [
    ...(relogiosMasculinos?.products || []),
    ...(relogiosFemininos?.products || []),
  ];

  const produtosFiltrados = produtos
    .filter((produto) =>
      produto.title.toLowerCase().includes(busca.toLowerCase())
    )
    .filter((produto) => {
      if (tipo === "todos") return true;
      return produto.category === tipo;
    })
    .filter((produto) => {
      if (!precoMaximo) return true;
      return produto.price <= Number(precoMaximo);
    })
    .sort((a, b) => {
      if (ordenacao === "menor-preco") return a.price - b.price;
      if (ordenacao === "maior-preco") return b.price - a.price;
      if (ordenacao === "nome") return a.title.localeCompare(b.title);
      return 0;
    });

  const isLoading = carregandoMasculinos || carregandoFemininos;
  const isFetching = atualizandoMasculinos || atualizandoFemininos;
  const error = erroMasculinos || erroFemininos;

  return (
    <section className="page">
      <h1>Produtos</h1>

      <div className="filtros-produtos">
        <input
          type="text"
          placeholder="Buscar relógio..."
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />

        <select
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="mens-watches">Masculinos</option>
          <option value="womens-watches">Femininos</option>
        </select>

        <input
          type="number"
          placeholder="Preço máximo"
          value={precoMaximo}
          onChange={(event) => setPrecoMaximo(event.target.value)}
        />

        <select
          value={ordenacao}
          onChange={(event) => setOrdenacao(event.target.value)}
        >
          <option value="">Ordenar</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="nome">Nome</option>
        </select>
      </div>

      {isLoading && <p>Carregando relógios...</p>}

      {isFetching && !isLoading && <p>Atualizando relógios...</p>}

      {error && <p className="erro">Erro ao carregar relógios.</p>}

      {!isLoading && produtosFiltrados.length === 0 && (
        <p>Nenhum relógio encontrado.</p>
      )}

      <div className="produtos-grid">
        {produtosFiltrados.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  );
}