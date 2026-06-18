export default function Contato() {
  return (
    <section className="page">
      <h1>Contato</h1>

      <form>
        <input
          type="text"
          placeholder="Nome"
        />

        <input
          type="email"
          placeholder="E-mail"
        />

        <textarea
          placeholder="Mensagem"
        ></textarea>

        <button type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}