import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";

import Menu from "../components/Menu";
import { apiFetch } from "../services/api";
import styles from "./styles/Equipe.module.css";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const formularioInicial = {
  titulo: "",
  descricao: "",
};

const colunas = [
  {
    status: "pendente",
    titulo: "Tarefas pendentes",
    icone: <PendingActionsIcon />,
  },
  {
    status: "em_andamento",
    titulo: "Em andamento",
    icone: <SyncAltIcon />,
  },
  {
    status: "concluido",
    titulo: "Concluídas",
    icone: <TaskAltIcon />,
  },
];

export default function Equipe() {
  const [searchParams] = useSearchParams();

  const equipeId = Number(searchParams.get("id"));

  const [equipe, setEquipe] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  
  const [formCriar, setFormCriar] = useState(formularioInicial);
  const [formEditar, setFormEditar] = useState(formularioInicial);
  
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [tarefaArrastadaId, setTarefaArrastadaId] = useState(null);
  const [colunaSobreposta, setColunaSobreposta] = useState("");

  const [usuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo);
    } catch {
      return null;
    }
  });

  const [membros, setMembros] = useState([]);
  const [painelEquipeAberto, setPainelEquipeAberto] = useState(true);
  const [menuMembroAberto, setMenuMembroAberto] = useState(null);
  const [posicaoMenuMembro, setPosicaoMenuMembro] = useState(null);

  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [emailAdicionar, setEmailAdicionar] = useState("");

  const [modalAtribuirAberto, setModalAtribuirAberto] = useState(false);
  const [membroAtribuir, setMembroAtribuir] = useState(null);
  const [tarefaIdAtribuir, setTarefaIdAtribuir] = useState("");

  const souLider = membros.some(
    (membro) =>
      membro.usuario?.email === usuarioLogado?.email &&
      membro.papel === "lider"
  );

  useEffect(() => {
    if (!equipeId) {
      return;
    }

    carregarDados();
  }, [equipeId]);

  async function carregarDados() {
    try {
      const [respostaEquipe, respostaTarefas, respostaMembros] =
        await Promise.all([
          apiFetch(`/equipe/${equipeId}`),
          apiFetch('/tarefa'),
          apiFetch(`/equipeusuario/${equipeId}`),
        ]);

      if (!respostaEquipe.ok) {
        throw new Error("Não foi possível carregar a equipe.");
      }

      if (!respostaTarefas.ok) {
        throw new Error("Não foi possível carregar as tarefas.");
      }

      if (!respostaMembros.ok) {
        throw new Error("Não foi possível carregar os membros da equipe.");
      }

      const equipeRecebida = await respostaEquipe.json();
      const tarefasRecebidas = await respostaTarefas.json();
      const membrosRecebidos = await respostaMembros.json();

      const tarefasDaEquipe = tarefasRecebidas.filter((tarefa) => {
        return (
          tarefa.equipeUsuario?.equipe?.equipeId === equipeId &&
          !tarefa.confirmacao
        );
      });

      setEquipe(equipeRecebida);
      setTarefas(tarefasDaEquipe);
      setMembros(membrosRecebidos);
    } catch (error) {
      console.error(error);
    }
  }

  function alterarFormCriar(event) {
    const { name, value } = event.target;

    setFormCriar({
      ...formCriar,
      [name]: value,
    });
  }

  function alterarFormEditar(event) {
    const { name, value } = event.target;

    setFormEditar({
      ...formEditar,
      [name]: value,
    });
  }

  function abrirModalCriar() {
    setFormCriar(formularioInicial);
    setModalCriarAberto(true);
  }

  function fecharModalCriar() {
    setModalCriarAberto(false);
    setFormCriar(formularioInicial);
  }

  function abrirModalEditar(tarefa) {
    setTarefaSelecionada(tarefa);

    setFormEditar({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
    });

    setModalEditarAberto(true);
  }

  function fecharModalEditar() {
    setModalEditarAberto(false);
    setTarefaSelecionada(null);
    setFormEditar(formularioInicial);
  }

  function abrirModalExcluir(tarefa) {
    setTarefaSelecionada(tarefa);
    setModalExcluirAberto(true);
  }

  function fecharModalExcluir() {
    setModalExcluirAberto(false);
    setTarefaSelecionada(null);
  }

  async function criarTarefa(event) {
    event.preventDefault();

    try {
      const resposta = await apiFetch(
        `/tarefa/${equipeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: formCriar.titulo.trim(),
            descricao: formCriar.descricao.trim(),
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível criar a tarefa.");
      }

      const novaTarefa = await resposta.json();

      setTarefas((tarefasAtuais) => [
        ...tarefasAtuais,
        novaTarefa,
      ]);

      setFormCriar(formularioInicial);
      setModalCriarAberto(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function editarTarefa(event) {
    event.preventDefault();

    if (!tarefaSelecionada) {
      return;
    }

    try {
      const resposta = await apiFetch(
        `/tarefa/${tarefaSelecionada.tarefaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: formEditar.titulo.trim(),
            descricao: formEditar.descricao.trim(),
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível editar a tarefa.");
      }

      const tarefaAtualizada = await resposta.json();

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefa) => {
          if (tarefa.tarefaId === tarefaAtualizada.tarefaId) {
            return {
              ...tarefa,
              titulo: tarefaAtualizada.titulo,
              descricao: tarefaAtualizada.descricao,
            };
          }

          return tarefa;
        })
      );

      setModalEditarAberto(false);
      setTarefaSelecionada(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function excluirTarefa() {
    if (!tarefaSelecionada) {
      return;
    }

    try {
      const resposta = await apiFetch(
        `/tarefa/${tarefaSelecionada.tarefaId}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível excluir a tarefa.");
      }

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter(
          (tarefa) =>
            tarefa.tarefaId !== tarefaSelecionada.tarefaId
        )
      );

      setModalExcluirAberto(false);
      setTarefaSelecionada(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function iniciarArraste(event, tarefaId) {
    setTarefaArrastadaId(tarefaId);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(tarefaId));
  }

  function permitirSoltar(event, status) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    setColunaSobreposta(status);
  }

  function finalizarArraste() {
    setTarefaArrastadaId(null);
    setColunaSobreposta("");
  }

  async function soltarTarefa(event, novoStatus) {
    event.preventDefault();

    const tarefaId = Number(
      event.dataTransfer.getData("text/plain")
    );

    setColunaSobreposta("");
    setTarefaArrastadaId(null);

    const tarefa = tarefas.find(
      (item) => item.tarefaId === tarefaId
    );

    if (!tarefa || tarefa.status === novoStatus) {
      return;
    }

    const statusAnterior = tarefa.status;

    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((item) => {
        if (item.tarefaId === tarefaId) {
          return {
            ...item,
            status: novoStatus,
          };
        }

        return item;
      })
    );

    try {
      const resposta = await apiFetch(
        `/tarefa/${tarefaId}/status?status=${novoStatus}`,
        {
          method: "PUT",
        }
      );

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível atualizar o status da tarefa."
        );
      }

      const tarefaAtualizada = await resposta.json();

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((item) => {
          if (item.tarefaId === tarefaAtualizada.tarefaId) {
            return tarefaAtualizada;
          }

          return item;
        })
      );
    } catch (error) {
      console.error(error);

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((item) => {
          if (item.tarefaId === tarefaId) {
            return {
              ...item,
              status: statusAnterior,
            };
          }

          return item;
        })
      );

      alert(error.message);
    }
  }

  function tarefasPorStatus(status) {
    return tarefas.filter(
      (tarefa) => tarefa.status === status
    );
  }

  function alternarPainelEquipe() {
    setPainelEquipeAberto((aberto) => !aberto);
    fecharMenuMembro();
  }

  function alternarMenuMembro(equipeUsuarioId, event) {
    if (menuMembroAberto === equipeUsuarioId) {
      setMenuMembroAberto(null);
      setPosicaoMenuMembro(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const direcao = rect.top < 130 ? "baixo" : "cima";

    setPosicaoMenuMembro({
      direcao,
      top: rect.bottom + 6,
      bottom: window.innerHeight - rect.top + 6,
      right: window.innerWidth - rect.right,
    });

    setMenuMembroAberto(equipeUsuarioId);
  }

  function fecharMenuMembro() {
    setMenuMembroAberto(null);
    setPosicaoMenuMembro(null);
  }


  useEffect(() => {
    if (!menuMembroAberto) {
      return;
    }

    function aoRolarOuRedimensionar() {
      fecharMenuMembro();
    }

    window.addEventListener("scroll", aoRolarOuRedimensionar, true);
    window.addEventListener("resize", aoRolarOuRedimensionar);

    return () => {
      window.removeEventListener("scroll", aoRolarOuRedimensionar, true);
      window.removeEventListener("resize", aoRolarOuRedimensionar);
    };
  }, [menuMembroAberto]);

  function abrirModalAdicionar() {
    setEmailAdicionar("");
    setModalAdicionarAberto(true);
  }

  function fecharModalAdicionar() {
    setModalAdicionarAberto(false);
    setEmailAdicionar("");
  }

  async function adicionarMembro(event) {
    event.preventDefault();

    try {
      const resposta = await apiFetch(
        `/equipeusuario/${equipeId}/convidar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAdicionar.trim(),
          }),
        }
      );

      if (!resposta.ok) {
        let mensagem = "Não foi possível adicionar o membro.";

        try {
          const corpoErro = await resposta.json();
          mensagem = corpoErro?.detail || corpoErro?.message || mensagem;
        } catch {
          // Resposta sem corpo JSON, mantém mensagem padrão
        }

        throw new Error(mensagem);
      }

      const novoMembro = await resposta.json();

      setMembros((membrosAtuais) => [...membrosAtuais, novoMembro]);

      setModalAdicionarAberto(false);
      setEmailAdicionar("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function removerMembro(membro) {
    const confirmou = window.confirm(
      `Tem certeza que deseja remover ${membro.usuario?.nome} da equipe?`
    );

    if (!confirmou) {
      return;
    }

    fecharMenuMembro();

    try {
      const resposta = await apiFetch(
        `/equipeusuario/${membro.equipeUsuarioId}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível remover o membro.");
      }

      setMembros((membrosAtuais) =>
        membrosAtuais.filter(
          (item) => item.equipeUsuarioId !== membro.equipeUsuarioId
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function nomePorEmail(email) {
    if (!email) {
      return null;
    }

    const membro = membros.find(
      (item) => item.usuario?.email === email
    );

    return membro?.usuario?.nome || email;
  }

  function abrirModalAtribuir(membro) {
    setMembroAtribuir(membro);
    setTarefaIdAtribuir("");
    setModalAtribuirAberto(true);
    fecharMenuMembro();
  }

  function fecharModalAtribuir() {
    setModalAtribuirAberto(false);
    setMembroAtribuir(null);
    setTarefaIdAtribuir("");
  }

  async function enviarAtribuicao(tarefaId, email) {
    const resposta = await apiFetch(`/tarefa/${tarefaId}/atribuir`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível atualizar a atribuição da tarefa.");
    }

    const tarefaAtualizada = await resposta.json();

    setTarefas((atuais) =>
      atuais.map((item) =>
        item.tarefaId === tarefaAtualizada.tarefaId
          ? tarefaAtualizada
          : item
      )
    );

    return tarefaAtualizada;
  }

  async function atribuirTarefaAoMembro(event) {
    event.preventDefault();

    if (!tarefaIdAtribuir || !membroAtribuir) {
      return;
    }

    try {
      await enviarAtribuicao(
        tarefaIdAtribuir,
        membroAtribuir.usuario?.email
      );

      fecharModalAtribuir();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function desatribuirTarefa(tarefa) {
    const confirmou = window.confirm(
      `Remover a atribuição de "${tarefa.titulo}"?`
    );

    if (!confirmou) {
      return;
    }

    try {
      await enviarAtribuicao(tarefa.tarefaId, null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function finalizarTarefa(tarefa) {
    const confirmou = window.confirm(
      `Finalizar "${tarefa.titulo}"? Ela sairá do quadro e passará a aparecer no Histórico.`
    );

    if (!confirmou) {
      return;
    }

    try {
      const resposta = await apiFetch(
        `/tarefa/confirmar/${tarefa.tarefaId}`,
        {
          method: "PUT",
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível finalizar a tarefa.");
      }

      setTarefas((atuais) =>
        atuais.filter((item) => item.tarefaId !== tarefa.tarefaId)
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.equipe_page}>
      <Menu />

      <main className={styles.kanban_section}>
        <section className={styles.container}>
          <div className={styles.page_header}>
            <div>
              <span className={styles.eyebrow}>
                Quadro de tarefas
              </span>

              <div className={styles.title}>
                <GroupsIcon />
                <h1>
                  {equipe?.nome || "Equipe"}
                </h1>
              </div>

              <p className={styles.subtitle}>
                Organize as tarefas arrastando os cards entre as
                colunas.
              </p>
            </div>

            <button
              type="button"
              className={styles.btn_create}
              onClick={abrirModalCriar}
              disabled={!equipe}
            >
              <AddIcon />
              Nova tarefa
            </button>
          </div>

          <div className={styles.kanban}>
              {colunas.map((coluna) => {
                const tarefasDaColuna = tarefasPorStatus(
                  coluna.status
                );

                return (
                  <section
                    key={coluna.status}
                    className={`
                      ${styles.kanban_column}
                      ${styles[coluna.status]}
                      ${
                        colunaSobreposta === coluna.status
                          ? styles.column_over
                          : ""
                      }
                    `}
                    onDragOver={(event) =>
                      permitirSoltar(event, coluna.status)
                    }
                    onDragLeave={() =>
                      setColunaSobreposta("")
                    }
                    onDrop={(event) =>
                      soltarTarefa(event, coluna.status)
                    }
                  >
                    <div className={styles.column_header}>
                      <div className={styles.column_title}>
                        {coluna.icone}
                        <h2>{coluna.titulo}</h2>
                      </div>
                    </div>

                    <div className={styles.column_content}>
                      {tarefasDaColuna.length === 0 && (
                        <div className={styles.empty_column}>
                          <p>Nenhuma tarefa nesta coluna.</p>
                        </div>
                      )}

                      {tarefasDaColuna.map((tarefa) => (
                        <article
                          key={tarefa.tarefaId}
                          className={`
                            ${styles.task_card}
                            ${
                              tarefaArrastadaId ===
                              tarefa.tarefaId
                                ? styles.dragging
                                : ""
                            }
                          `}
                          draggable
                          onDragStart={(event) =>
                            iniciarArraste(
                              event,
                              tarefa.tarefaId
                            )
                          }
                          onDragEnd={finalizarArraste}
                        >
                          <div className={styles.task_header}>
                            <span
                              className={styles.task_status}
                            >
                              {tarefa.status === "pendente" &&
                                "Pendente"}

                              {tarefa.status ===
                                "em_andamento" &&
                                "Em andamento"}

                              {tarefa.status === "concluido" &&
                                "Concluída"}
                            </span>

                            <div className={styles.task_actions}>
                              <button
                                type="button"
                                title="Editar tarefa"
                                onClick={() =>
                                  abrirModalEditar(tarefa)
                                }
                              >
                                <EditIcon />
                              </button>

                              <button
                                type="button"
                                title="Excluir tarefa"
                                onClick={() =>
                                  abrirModalExcluir(tarefa)
                                }
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>

                          <h3>{tarefa.titulo}</h3>

                          <p>{tarefa.descricao}</p>

                          <div className={styles.task_footer}>
                            <span>
                              Criada por{" "}
                              <strong>
                                {tarefa.equipeUsuario?.usuario
                                  ?.nome || "Usuário"}
                              </strong>
                            </span>

                            {tarefa.emailUsuarioAfetado && (
                              <span
                                className={
                                  styles.task_assigned
                                }
                              >
                                Atribuído para{" "}
                                <strong>
                                  {nomePorEmail(
                                    tarefa.emailUsuarioAfetado
                                  )}
                                </strong>

                                {souLider && (
                                  <button
                                    type="button"
                                    title="Remover atribuição"
                                    onClick={() =>
                                      desatribuirTarefa(tarefa)
                                    }
                                  >
                                    <CloseIcon />
                                  </button>
                                )}
                              </span>
                            )}
                          </div>

                          {tarefa.status === "concluido" && (
                            <button
                              type="button"
                              className={
                                styles.finish_button
                              }
                              onClick={() =>
                                finalizarTarefa(tarefa)
                              }
                            >
                              Finalizar tarefa
                            </button>
                          )}
                        </article>
                      ))}
                    </div>

                    {coluna.status === "pendente" && (
                      <button
                        type="button"
                        className={styles.add_task_bottom}
                        onClick={abrirModalCriar}
                      >
                        <AddIcon />
                        Adicionar tarefa
                      </button>
                    )}
                  </section>
                );
              })}
            </div>
        </section>
      </main>

      {equipe && (
        <div
          className={`
            ${styles.team_panel}
            ${
              painelEquipeAberto
                ? ""
                : styles.team_panel_collapsed
            }
          `}
        >
          <button
            type="button"
            className={styles.team_panel_header}
            onClick={alternarPainelEquipe}
          >
            <span>Minha Equipe</span>

            {painelEquipeAberto ? (
              <ExpandMoreIcon />
            ) : (
              <ExpandLessIcon />
            )}
          </button>

          {painelEquipeAberto && (
            <div className={styles.team_panel_body}>
              <div className={styles.team_panel_list}>
                {membros.length === 0 && (
                  <p className={styles.team_panel_empty}>
                    Nenhum membro na equipe.
                  </p>
                )}

                {membros.map((membro) => (
                  <div
                    key={membro.equipeUsuarioId}
                    className={styles.team_member}
                  >
                    <AccountCircleIcon
                      className={styles.team_member_avatar}
                    />

                    <div className={styles.team_member_info}>
                      <span className={styles.team_member_name}>
                        {membro.usuario?.nome}
                      </span>

                      <span className={styles.team_member_email}>
                        {membro.usuario?.email}
                      </span>
                    </div>

                    {souLider && (
                      <div className={styles.team_member_menu}>
                        <button
                          type="button"
                          title="Opções do membro"
                          onClick={(event) =>
                            alternarMenuMembro(
                              membro.equipeUsuarioId,
                              event
                            )
                          }
                        >
                          <MoreVertIcon />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {souLider && (
                <button
                  type="button"
                  className={styles.team_panel_add}
                  onClick={abrirModalAdicionar}
                >
                  Adicionar Membro
                  <AddIcon />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {menuMembroAberto &&
        posicaoMenuMembro &&
        createPortal(
          <>
            {/* Camada invisível para fechar o menu ao clicar fora dele */}
            <div
              className={styles.team_member_dropdown_backdrop}
              onClick={fecharMenuMembro}
            />

            <div
              className={styles.team_member_dropdown}
              style={{
                position: "fixed",
                right: posicaoMenuMembro.right,
                top:
                  posicaoMenuMembro.direcao === "baixo"
                    ? posicaoMenuMembro.top
                    : "auto",
                bottom:
                  posicaoMenuMembro.direcao === "cima"
                    ? posicaoMenuMembro.bottom
                    : "auto",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const membro = membros.find(
                    (item) =>
                      item.equipeUsuarioId === menuMembroAberto
                  );

                  if (membro) {
                    abrirModalAtribuir(membro);
                  }
                }}
              >
                <AssignmentIndIcon />
                Atribuir tarefa
              </button>

              {(() => {
                const membro = membros.find(
                  (item) =>
                    item.equipeUsuarioId === menuMembroAberto
                );

                if (!membro || membro.papel === "lider") {
                  return null;
                }

                return (
                  <button
                    type="button"
                    className={
                      styles.team_member_dropdown_danger
                    }
                    onClick={() => removerMembro(membro)}
                  >
                    <PersonRemoveIcon />
                    Remover da equipe
                  </button>
                );
              })()}
            </div>
          </>,
          document.body
        )}

      {modalAdicionarAberto && (
        <div
          className={styles.modal_overlay}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <div>
                <span>Novo membro</span>
                <h2>Adicionar membro</h2>
              </div>

              <button
                type="button"
                className={styles.modal_close}
                onClick={fecharModalAdicionar}
              >
                <CloseIcon />
              </button>
            </div>

            <form
              className={styles.modal_form}
              onSubmit={adicionarMembro}
            >
              <div className={styles.form_group}>
                <label htmlFor="emailAdicionar">
                  E-mail do usuário cadastrado
                </label>

                <input
                  id="emailAdicionar"
                  name="emailAdicionar"
                  type="email"
                  placeholder="usuario@email.com"
                  value={emailAdicionar}
                  onChange={(event) =>
                    setEmailAdicionar(event.target.value)
                  }
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className={styles.modal_submit}
              >
                Adicionar membro
              </button>
            </form>
          </div>
        </div>
      )}

      {modalAtribuirAberto && membroAtribuir && (
        <div
          className={styles.modal_overlay}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <div>
                <span>Delegação</span>
                <h2>Atribuir tarefa</h2>
              </div>

              <button
                type="button"
                className={styles.modal_close}
                onClick={fecharModalAtribuir}
              >
                <CloseIcon />
              </button>
            </div>

            <form
              className={styles.modal_form}
              onSubmit={atribuirTarefaAoMembro}
            >
              <div className={styles.form_group}>
                <label htmlFor="tarefaAtribuir">
                  Escolha a tarefa para atribuir a{" "}
                  <strong>{membroAtribuir.usuario?.nome}</strong>
                </label>

                <select
                  id="tarefaAtribuir"
                  name="tarefaAtribuir"
                  value={tarefaIdAtribuir}
                  onChange={(event) =>
                    setTarefaIdAtribuir(event.target.value)
                  }
                  required
                  autoFocus
                >
                  <option value="" disabled>
                    Selecione uma tarefa
                  </option>

                  {tarefas.map((tarefa) => {
                    const atribuidoAtual = tarefa.emailUsuarioAfetado
                      ? nomePorEmail(tarefa.emailUsuarioAfetado)
                      : "sem atribuição";

                    return (
                      <option
                        key={tarefa.tarefaId}
                        value={tarefa.tarefaId}
                      >
                        {tarefa.titulo} ({atribuidoAtual})
                      </option>
                    );
                  })}
                </select>

                {tarefas.length === 0 && (
                  <p className={styles.form_hint}>
                    Esta equipe ainda não possui tarefas cadastradas.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={styles.modal_submit}
                disabled={tarefas.length === 0}
              >
                Atribuir tarefa
              </button>
            </form>
          </div>
        </div>
      )}

      {modalCriarAberto && (
        <div
          className={styles.modal_overlay}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <div>
                <span>Nova tarefa</span>
                <h2>Criar uma tarefa</h2>
              </div>

              <button
                type="button"
                className={styles.modal_close}
                onClick={fecharModalCriar}
              >
                <CloseIcon />
              </button>
            </div>

            <form
              className={styles.modal_form}
              onSubmit={criarTarefa}
            >
              <div className={styles.form_group}>
                <label htmlFor="tituloCriar">
                  Título
                </label>

                <input
                  id="tituloCriar"
                  name="titulo"
                  type="text"
                  placeholder="Ex.: Atualizar computadores"
                  value={formCriar.titulo}
                  onChange={alterarFormCriar}
                  maxLength={100}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="descricaoCriar">
                  Descrição
                </label>

                <textarea
                  id="descricaoCriar"
                  name="descricao"
                  placeholder="Descreva o que deverá ser realizado"
                  value={formCriar.descricao}
                  onChange={alterarFormCriar}
                  maxLength={255}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.modal_submit}
              >
                Criar tarefa
              </button>
            </form>
          </div>
        </div>
      )}

      {modalEditarAberto && tarefaSelecionada && (
        <div
          className={styles.modal_overlay}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <div>
                <span>Alteração</span>
                <h2>Editar tarefa</h2>
              </div>

              <button
                type="button"
                className={styles.modal_close}
                onClick={fecharModalEditar}
              >
                <CloseIcon />
              </button>
            </div>

            <form
              className={styles.modal_form}
              onSubmit={editarTarefa}
            >
              <div className={styles.form_group}>
                <label htmlFor="tituloEditar">
                  Título
                </label>

                <input
                  id="tituloEditar"
                  name="titulo"
                  type="text"
                  value={formEditar.titulo}
                  onChange={alterarFormEditar}
                  maxLength={100}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="descricaoEditar">
                  Descrição
                </label>

                <textarea
                  id="descricaoEditar"
                  name="descricao"
                  value={formEditar.descricao}
                  onChange={alterarFormEditar}
                  maxLength={255}
                  required
                />
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

      {modalExcluirAberto && tarefaSelecionada && (
        <div className={styles.modal_overlay}>
          <div
            className={`${styles.modal} ${styles.delete_modal}`}
          >
            <div className={styles.delete_icon}>
              <WarningAmberIcon />
            </div>

            <h2>Excluir tarefa?</h2>

            <p>
              Tem certeza que deseja excluir a tarefa{" "}
              <strong>
                {tarefaSelecionada.titulo}
              </strong>
              ? Essa ação não poderá ser desfeita.
            </p>

            <div className={styles.delete_actions}>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={fecharModalExcluir}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.delete_button}
                onClick={excluirTarefa}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}