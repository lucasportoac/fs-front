export default function CardProduto({ produto }) {
  return (
    <div className="card">
      <img
        src={produto.thumbnail}
        alt={produto.title}
      />

      <h3>{produto.title}</h3>

      <p>{produto.description}</p>

      <strong>
        $ {produto.price}
      </strong>
    </div>
  );
}