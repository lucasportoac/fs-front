"use client";

import { useState } from "react";
import { z } from "zod";

const contatoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export default function Contato() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function enviarFormulario(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const dados = {
      nome: String(formData.get("nome")),
      email: String(formData.get("email")),
      mensagem: String(formData.get("mensagem")),
    };

    const resultado = contatoSchema.safeParse(dados);

    if (!resultado.success) {
      setErro(resultado.error.issues[0].message);
      setSucesso("");
      return;
    }

    setErro("");
    setSucesso("Mensagem enviada com sucesso!");
    event.currentTarget.reset();
  }

  return (
    <section className="page">
      <h1>Contato</h1>

      <form onSubmit={enviarFormulario}>
        <input name="nome" type="text" placeholder="Nome" />
        <input name="email" type="email" placeholder="E-mail" />
        <textarea name="mensagem" placeholder="Mensagem"></textarea>

        <button type="submit">Enviar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">{sucesso}</p>}
    </section>
  );
}