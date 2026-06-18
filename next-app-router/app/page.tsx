import Image from "next/image";

export default function Home() {
  return (
    <section className="page">
      <h1>Porto Watches</h1>

      <p className="home-descricao">
        Relógios elegantes para todos os momentos.
      </p>

      <p className="home-texto">
        A Porto Watches nasceu para oferecer relógios que unem sofisticação,
        qualidade e estilo para todos os perfis.
      </p>

      <div className="quem-somos-cards">
        <div className="info-card">
          <h3>Missão</h3>
          <p>Oferecer relógios elegantes e de qualidade para todos os momentos.</p>
        </div>

        <div className="info-card">
          <h3>Visão</h3>
          <p>Ser referência em relógios premium no mercado digital.</p>
        </div>

        <div className="info-card">
          <h3>Valores</h3>
          <p>Qualidade, confiança, transparência e inovação.</p>
        </div>
      </div>

      <div className="home-imagem">
        <Image
          src="/FotoRelogio.avif"
          alt="Relógio Porto Watches"
          width={600}
          height={600}
          className="home-image"
        />
      </div>

      <div className="contato-home">
        <h2>Entre em contato</h2>

        <form>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <textarea placeholder="Mensagem"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}