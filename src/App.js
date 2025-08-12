import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [tarefa, setTarefa] = useState([]);
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas"); // todas, concluida, pendente

  const adicionarTarefa = (evento) => {
    evento.preventDefault();
    const textoLimpo = texto.trim();
    if (!textoLimpo) return;

    const novaLista = tarefa.slice();
    novaLista.push({
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    });
    setTarefa(novaLista);
    setTexto("");
  };

  const alternarStatusTarefa = (id) => {
    const novaLista = [];
    for (let i = 0; i < tarefa.length; i++) {
      const t = tarefa[i];
      if (t.id === id) {
        novaLista.push({
          id: t.id,
          texto: t.texto,
          concluida: !t.concluida,
        });
      } else {
        novaLista.push(t);
      }
    }
    setTarefa(novaLista);
  };

  const obterTarefasFiltradas = () => {
    if (filtro === "concluida") return tarefa.filter(t => t.concluida);
    if (filtro === "pendente") return tarefa.filter(t => !t.concluida);
    return tarefa;
  };

  return (
    <div className="container">
      <h2>Lista de Tarefas com Filtros</h2>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="filters">
        <button
          className={filtro === "todas" ? "ativo" : ""}
          onClick={() => setFiltro("todas")}
          type="button"
        >
          Todas
        </button>
        <button
          className={filtro === "concluida" ? "ativo" : ""}
          onClick={() => setFiltro("concluida")}
          type="button"
        >
          Concluídas
        </button>
        <button
          className={filtro === "pendente" ? "ativo" : ""}
          onClick={() => setFiltro("pendente")}
          type="button"
        >
          Pendentes
        </button>
      </div>

      <ul>
        {obterTarefasFiltradas().map((t) => (
          <li
            key={t.id}
            className={t.concluida ? "concluida" : ""}
            onClick={() => alternarStatusTarefa(t.id)}
          >
            {t.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}
