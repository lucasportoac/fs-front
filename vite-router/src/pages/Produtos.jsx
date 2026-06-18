import { useEffect, useState } from "react";
import CardProduto from "../components/CardProduto";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  async function buscarProdutos() {
    const resposta = await fetch(
      "https://dummyjson.com/products/category/mens-watches"
    );

    const dados = await resposta.json();

    setProdutos(dados.products);
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <section className="page">
      <h1>Produtos</h1>

      <div className="produtos-grid">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
          />
        ))}
      </div>
    </section>
  );
}