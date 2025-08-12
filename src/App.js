import React, { useState } from 'react';
import './App.css';

export default () => {

  const [tarefa, setTarefa] = useState([]);
  const [texto, setTexto]   = useState("");
  const [filtro, setFiltro] = useState("todas"); //todas concluida pendente

  const adicionarTarefa = (evento) => {
    evento.preventDefault();
    const textoLimpo = texto.trim();

    if(!textoLimpo) return;

    const novaLista = tarefa.slice();
    novaLista.push({
      id:Date.now(),
      texto: textoLimpo,
      concluida: false,
    });
    setTarefa(novaLista);
    setTexto("");
  }

  const alternarStatusTarefa = (id) => {
    const novaLista = [];
    for (let i = 0; i < tarefa.length; i++){
      const t = tarefa[i];
      if (t.id === id){
        novaLista.push({
          id: t.id,
          texto: t.texto,
          concluida: !t.concluida,
        })
      } else {
        novaLista.push(t)
      }
    }
    setTarefa(novaLista)
  }

  //todas concluida pendente
  const obterTarefasFiltradas = () => {
    if (filtro === "concluida") return tarefa.filter(t => t.concluida);
    if (filtro === "pendente") return tarefa.filter(t => !t.concluida);
    return tarefa;
  }

  return(
    <div className='container'>
        <h2>Lista de Tarefas (ToDO List) com Filtro</h2>
        <form onSubmit={adicionarTarefa}>
          <input placeholder='Nova Tarefa...'
                 onChange={(e) => setTexto(e.target.value)}
                 value={texto}
                 type='text'/>

          <button type='submit'>Adicionar</button>
        </form>

        <div className='filters'>
            <button className={filtro === "todas" ? "ativo" : ""}
                    onClick={() => setFiltro("todas")}>Todas</button>

            
            <button className={filtro === "concluida" ? "ativo" : ""}
                    onClick={() => setFiltro("concluida")}>Concluídas</button>
            
            
            <button className={filtro === "pendente" ? "ativo" : ""}
                    onClick={() => setFiltro("pendente")}>Pendentes</button>
        </div>

        <ul>
          {obterTarefasFiltradas().map((tarefa) => (
          <li key={tarefa.id}
              className={tarefa.concluida ? "concluida" : ""}
              onClick={() => alternarStatusTarefa(tarefa.id)}>{tarefa.texto}</li>
          ))}
        </ul>
    </div>
  )
}