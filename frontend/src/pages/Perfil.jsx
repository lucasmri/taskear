import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../components/Menu.jsx";
import { apiFetch } from "../services/api";
import styles from "./styles/Perfil.module.css";

import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";

const formPerfilInicial = {
  nome: "",
  email: "",
  senhaAtual: "",
};

const formSenhaInicial = {
  senhaAtual: "",
  novaSenha: "",
  confirmarNovaSenha: "",
};

export default function Perfil() {
  const navigate = useNavigate();
  const [formPerfil, setFormPerfil] = useState(formPerfilInicial);
  const [formSenha, setFormSenha] = useState(formSenhaInicial);

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    
    try {
      const resposta = await apiFetch("/usuario/me");

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar seu perfil.");
      }

      const usuario = await resposta.json();

      setFormPerfil({
        nome: usuario.nome || "",
        email: usuario.email || "",
        senhaAtual: "",
      });
    } catch (error) {
      console.error(error);
    } 
  }

  function alterarFormPerfil(event) {
    const { name, value } = event.target;

    setFormPerfil((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function alterarFormSenha(event) {
    const { name, value } = event.target;

    setFormSenha((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  async function salvarPerfil(event) {
    event.preventDefault();

    try {
      const resposta = await apiFetch("/usuario/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formPerfil.nome.trim(),
          email: formPerfil.email.trim(),
          senhaAtual: formPerfil.senhaAtual,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível salvar as alterações.");
      }

      const usuarioAtualizado = await resposta.json();

      setFormPerfil({
        nome: usuarioAtualizado.nome || "",
        email: usuarioAtualizado.email || "",
        senhaAtual: "",
      });

      const usuarioSalvo = localStorage.getItem("usuario");

      if (usuarioSalvo) {
        try {
          const usuarioAtual = JSON.parse(usuarioSalvo);

          localStorage.setItem(
            "usuario",
            JSON.stringify({
              ...usuarioAtual,
              nome: usuarioAtualizado.nome,
              email: usuarioAtualizado.email,
            })
          );
        } catch {
          // Ignora se não for possível atualizar o cache local
        }
      }

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } 
  }

  async function alterarSenha(event) {
    event.preventDefault();

    try {
      const resposta = await apiFetch("/usuario/me/senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formSenha),
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível alterar a senha.");
      }

      setFormSenha(formSenhaInicial);
      alert("Senha alterada com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } 
  }

  async function excluirConta() {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita."
    );

    if (!confirmou) {
      return;
    }

    try {
      const resposta = await apiFetch("/usuario/me", {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível excluir sua conta.");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.perfil_page}>
      <Menu />

      <main className={styles.perfil_section}>
        <section className={styles.container}>

          <div className={styles.page_header}>
            <div>
              <span className={styles.eyebrow}>Configurações</span>

              <div className={styles.title}>
                <PersonIcon />
                <h1>Meu Perfil</h1>
              </div>

              <p className={styles.subtitle}>
                Gerencie seus dados pessoais, senha e configurações da conta.
              </p>
            </div>
          </div>

          <div className={styles.profile_grid}>

                <form className={styles.profile_card} onSubmit={salvarPerfil}>
                  <div className={styles.card_header}>
                    <div>
                      <h2>Dados pessoais</h2>
                      <p>Altere seu nome e e-mail cadastrados.</p>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="nome">Nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Seu nome"
                      value={formPerfil.nome}
                      onChange={alterarFormPerfil}
                      required
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seuemail@email.com"
                      value={formPerfil.email}
                      onChange={alterarFormPerfil}
                      required
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="senhaAtualPerfil">Senha atual</label>
                    <input
                      id="senhaAtualPerfil"
                      name="senhaAtual"
                      type="password"
                      placeholder="Digite sua senha atual"
                      value={formPerfil.senhaAtual}
                      onChange={alterarFormPerfil}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.save_btn}
                  >
                    <SaveIcon />
                    Salvar alterações
                  </button>
                </form>

                <form className={styles.profile_card} onSubmit={alterarSenha}>
                  <div className={styles.card_header}>
                    <div>
                      <h2>Alterar senha</h2>
                      <p>Atualize sua senha de acesso ao sistema.</p>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="senhaAtual">Senha atual</label>
                    <input
                      id="senhaAtual"
                      name="senhaAtual"
                      type="password"
                      placeholder="Digite sua senha atual"
                      value={formSenha.senhaAtual}
                      onChange={alterarFormSenha}
                      required
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="novaSenha">Nova senha</label>
                    <input
                      id="novaSenha"
                      name="novaSenha"
                      type="password"
                      placeholder="Digite a nova senha"
                      value={formSenha.novaSenha}
                      onChange={alterarFormSenha}
                      minLength={6}
                      required
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="confirmarNovaSenha">Confirmar nova senha</label>
                    <input
                      id="confirmarNovaSenha"
                      name="confirmarNovaSenha"
                      type="password"
                      placeholder="Confirme a nova senha"
                      value={formSenha.confirmarNovaSenha}
                      onChange={alterarFormSenha}
                      minLength={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.password_btn}
                  >
                    <LockIcon />
                    Alterar senha
                  </button>
                </form>

              </div>

              <section className={styles.danger_zone}>
                <div>
                  <h2>Zona de perigo</h2>
                  <p>
                    Excluir sua conta removerá seus dados do sistema. Essa ação não poderá ser desfeita.
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.delete_btn}
                  onClick={excluirConta}
                >
                  <DeleteIcon />
                  Excluir conta
                </button>
              </section>

        </section>
      </main>
    </div>
  );
}