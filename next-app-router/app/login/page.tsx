"use client";

import { useState } from "react";
import { z } from "zod";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAppContext();

  const [erro, setErro] = useState("");

  function realizarLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const dados = {
      email: String(formData.get("email")),
      senha: String(formData.get("senha")),
    };

    const resultado = loginSchema.safeParse(dados);

    if (!resultado.success) {
      setErro(resultado.error.issues[0].message);
      return;
    }

    login(resultado.data.email);
    setErro("");

    router.push("/produtos");
  }

  return (
    <section className="page">
      <h1>Login</h1>

      <form onSubmit={realizarLogin}>
        <input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
        />

        <input
          name="senha"
          type="password"
          placeholder="Digite sua senha"
        />

        <button type="submit">Entrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}
    </section>
  );
}