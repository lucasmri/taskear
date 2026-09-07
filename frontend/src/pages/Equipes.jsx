import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/Menu';
import { apiFetch } from '../services/api';
import styles from './styles/Equipes.module.css';

import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

const formularioInicial = {
  nome: '',
  descricao: '',
};

export default function Equipes() {
  const navigate = useNavigate();
  const [equipes, setEquipes] = useState([]);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalSairAberto, setModalSairAberto] = useState(false);
  const [equipeSelecionada, setEquipeSelecionada] = useState(null);
  const [formCriar, setFormCriar] = useState(formularioInicial);
  const [formEditar, setFormEditar] = useState(formularioInicial);

  const [usuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    carregarEquipes();
  }, []);

  async function carregarEquipes() {
    try {
      const [respostaEquipes, respostaTarefas] = await Promise.all([
        apiFetch('/equipe'),
        apiFetch('/tarefa'),
      ]);

      if (!respostaEquipes.ok) {
        throw new Error('Não foi possível carregar suas equipes.');
      }

      if (!respostaTarefas.ok) {
        throw new Error('Não foi possível carregar as tarefas.');
      }

      const equipesRecebidas = await respostaEquipes.json();
      const tarefas = await respostaTarefas.json();

      const equipesComDados = await Promise.all(
        equipesRecebidas.map(async (equipe) => {
          const pendencias = tarefas.filter(
            (tarefa) =>
              tarefa.equipeUsuario?.equipe?.equipeId === equipe.equipeId &&
              tarefa.status !== 'concluido'
          ).length;

          let quantidadeMembros = 0;
          let meuPapel = null;

          try {
            const respostaMembros = await apiFetch(
              `/equipeusuario/${equipe.equipeId}`
            );

            if (respostaMembros.ok) {
              const membros = await respostaMembros.json();

              quantidadeMembros = membros.length;

              const meuVinculo = membros.find(
                (membro) => membro.usuario?.email === usuarioLogado?.email
              );

              meuPapel = meuVinculo?.papel || null;
            }
          } catch (error) {
            console.error(
              `Erro ao carregar membros da equipe ${equipe.equipeId}:`,
              error
            );
          }

          return {
            ...equipe,
            pendencias,
            quantidadeMembros,
            meuPapel,
          };
        })
      );

      setEquipes(equipesComDados);
    } catch (error) {
      console.error(error);
    }
  }

  function abrirModalCriar() {
    setFormCriar(formularioInicial);
    setModalCriarAberto(true);
  }

  function fecharModalCriar() {
    setModalCriarAberto(false);
  }

  function abrirModalEditar(equipe) {
    setEquipeSelecionada(equipe);
    setFormEditar({
      nome: equipe.nome || '',
      descricao: equipe.descricao || '',
    });
    setModalEditarAberto(true);
  }

  function fecharModalEditar() {
    setModalEditarAberto(false);
    setEquipeSelecionada(null);
  }

  function abrirModalExcluir(equipe) {
    setEquipeSelecionada(equipe);
    setModalExcluirAberto(true);
  }

  function fecharModalExcluir() {
    setModalExcluirAberto(false);
    setEquipeSelecionada(null);
  }

  function abrirModalSair(equipe) {
    setEquipeSelecionada(equipe);
    setModalSairAberto(true);
  }

  function fecharModalSair() {
    setModalSairAberto(false);
    setEquipeSelecionada(null);
  }

  async function criarEquipe(event) {
    event.preventDefault();

    try {
      const resposta = await apiFetch('/equipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formCriar),
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível criar a equipe.');
      }

      setModalCriarAberto(false);
      carregarEquipes();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function editarEquipe(event) {
    event.preventDefault();

    if (!equipeSelecionada) {
      return;
    }

    try {
      const resposta = await apiFetch(
        `/equipe/${equipeSelecionada.equipeId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formEditar),
        }
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível editar a equipe.');
      }

      fecharModalEditar();
      carregarEquipes();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function confirmarExclusao() {
    if (!equipeSelecionada) {
      return;
    }

    try {
      const resposta = await apiFetch(
        `/equipe/${equipeSelecionada.equipeId}`,
        {
          method: 'DELETE',
        }
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível excluir a equipe.');
      }

      fecharModalExcluir();

      setEquipes((equipesAtuais) =>
        equipesAtuais.filter(
          (equipe) => equipe.equipeId !== equipeSelecionada.equipeId
        )
      );

      setEquipeSelecionada(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function confirmarSaida() {
    if (!equipeSelecionada) {
      return;
    }

    try {
      const resposta = await apiFetch(
        `/equipeusuario/equipe/${equipeSelecionada.equipeId}/sair`,
        {
          method: 'DELETE',
        }
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível sair da equipe.');
      }

      fecharModalSair();

      setEquipes((equipesAtuais) =>
        equipesAtuais.filter(
          (equipe) => equipe.equipeId !== equipeSelecionada.equipeId
        )
      );

      setEquipeSelecionada(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.equipes_page}>
      <Menu />

      <main className={styles.teams_section}>
        <section className={styles.container}>
          <div className={styles.page_header}>
            <div>
              <span className={styles.eyebrow}>Gerenciamento</span>

              <div className={styles.title}>
                <GroupsIcon />
                <h1>Minhas Equipes</h1>
              </div>

              <p className={styles.subtitle}>
                Crie, acesse, edite e gerencie suas equipes.
              </p>
            </div>

            <button
              type="button"
              className={styles.btn_create}
              onClick={abrirModalCriar}
            >
              <AddIcon />
              Criar equipe
            </button>
          </div>

          {equipes.length === 0 && (
            <div className={styles.feedback_container}>
              <div className={styles.feedback_icon}>
                <GroupsIcon />
              </div>

              <h2>Você ainda não tem equipes</h2>
              <p>
                Crie sua primeira equipe para começar a organizar tarefas com
                o seu time.
              </p>

              <button
                type="button"
                className={styles.empty_create_button}
                onClick={abrirModalCriar}
              >
                <AddIcon />
                Criar equipe
              </button>
            </div>
          )}

          {equipes.length > 0 && (
            <div className={styles.teams_grid}>
              {equipes.map((equipe) => (
                <div key={equipe.equipeId} className={styles.team_card}>
                  <div className={styles.card_header}>
                    <div>
                      <h2>{equipe.nome}</h2>
                      <p>{equipe.descricao}</p>
                    </div>
                  </div>

                  <div className={styles.card_stats}>
                    <div className={styles.stat}>
                      <strong>{equipe.pendencias}</strong>
                      <span>Pendências</span>
                    </div>

                    <div className={styles.stat}>
                      <strong>{equipe.quantidadeMembros}</strong>
                      <span>Membros</span>
                    </div>
                  </div>

                  <div className={styles.card_actions}>
                    <button
                      type="button"
                      className={`${styles.action_btn} ${styles.access}`}
                      onClick={() =>
                        navigate(`/Equipe?id=${equipe.equipeId}`)
                      }
                    >
                      <LoginIcon />
                      Acessar
                    </button>

                    {equipe.meuPapel === 'lider' ? (
                      <>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.edit}`}
                          onClick={() => abrirModalEditar(equipe)}
                        >
                          <EditIcon />
                          Editar
                        </button>

                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.delete}`}
                          onClick={() => abrirModalExcluir(equipe)}
                        >
                          <DeleteIcon />
                          Excluir
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className={`${styles.action_btn} ${styles.delete}`}
                        onClick={() => abrirModalSair(equipe)}
                      >
                        <LogoutIcon />
                        Sair
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {modalCriarAberto && (
        <div
          className={styles.modal_overlay}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <h2>Criar equipe</h2>

              <button
                type="button"
                className={styles.modal_close}
                onClick={fecharModalCriar}
              >
                <CloseIcon />
              </button>
            </div>

            <form className={styles.modal_form} onSubmit={criarEquipe}>
              <div className={styles.form_group}>
                <label htmlFor="nomeCriar">Nome da equipe</label>
                <input
                  id="nomeCriar"
                  type="text"
                  placeholder="Ex: Equipe de Suporte"
                  maxLength={40}
                  value={formCriar.nome}
                  onChange={(event) =>
                    setFormCriar((atual) => ({
                      ...atual,
                      nome: event.target.value,
                    }))
                  }
                  required
                  autoFocus
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="descricaoCriar">Descrição</label>
                <textarea
                  id="descricaoCriar"
                  placeholder="Descreva brevemente o propósito da equipe"
                  maxLength={255}
                  value={formCriar.descricao}
                  onChange={(event) =>
                    setFormCriar((atual) => ({
                      ...atual,
                      descricao: event.target.value,
                    }))
                  }
                  required
                />
                <span className={styles.character_counter}>
                  {formCriar.descricao.length}/255
                </span>
              </div>

              <button
                type="submit"
                className={styles.modal_submit}
              >
                Criar
              </button>
            </form>
          </div>
        </div>
      )}

      {modalEditarAberto && equipeSelecionada && (
        <div
          className={styles.modal_overlay}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <h2>Editar equipe</h2>

              <button
                type="button"
                className={styles.modal_close}
                onClick={fecharModalEditar}
              >
                <CloseIcon />
              </button>
            </div>

            <form className={styles.modal_form} onSubmit={editarEquipe}>
              <div className={styles.form_group}>
                <label htmlFor="nomeEditar">Nome da equipe</label>
                <input
                  id="nomeEditar"
                  type="text"
                  maxLength={40}
                  value={formEditar.nome}
                  onChange={(event) =>
                    setFormEditar((atual) => ({
                      ...atual,
                      nome: event.target.value,
                    }))
                  }
                  required
                  autoFocus
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="descricaoEditar">Descrição</label>
                <textarea
                  id="descricaoEditar"
                  maxLength={255}
                  value={formEditar.descricao}
                  onChange={(event) =>
                    setFormEditar((atual) => ({
                      ...atual,
                      descricao: event.target.value,
                    }))
                  }
                  required
                />
                <span className={styles.character_counter}>
                  {formEditar.descricao.length}/255
                </span>
              </div>

              <button
                type="submit"
                className={styles.modal_submit}
              >
                Salvar alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {modalExcluirAberto && equipeSelecionada && (
        <div
          className={styles.modal_overlay}
        >
          <div
            className={`${styles.modal} ${styles.delete_modal}`}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-excluir"
          >
            <div className={styles.delete_icon}>
              <DeleteIcon />
            </div>

            <h2 id="titulo-modal-excluir">Excluir equipe?</h2>

            <p>
              Tem certeza de que deseja excluir a equipe{' '}
              <strong>{equipeSelecionada.nome}</strong>? Essa ação não pode
              ser desfeita e todas as tarefas relacionadas serão perdidas.
            </p>

            <div className={styles.delete_actions}>
              <button
                type="button"
                className={styles.cancel_delete_btn}
                onClick={fecharModalExcluir}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirm_delete_btn}
                onClick={confirmarExclusao}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {modalSairAberto && equipeSelecionada && (
        <div
          className={styles.modal_overlay}
        >
          <div
            className={`${styles.modal} ${styles.delete_modal}`}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-sair"
          >
            <div className={styles.delete_icon}>
              <LogoutIcon />
            </div>

            <h2 id="titulo-modal-sair">Sair da equipe?</h2>

            <p>
              Tem certeza de que deseja sair da equipe{' '}
              <strong>{equipeSelecionada.nome}</strong>? Você precisará ser
              adicionado novamente pelo líder caso queira voltar a fazer
              parte dela.
            </p>

            <div className={styles.delete_actions}>
              <button
                type="button"
                className={styles.cancel_delete_btn}
                onClick={fecharModalSair}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirm_delete_btn}
                onClick={confirmarSaida}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}