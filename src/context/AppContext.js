import React, { createContext, useContext, useState } from 'react';

// Contexto global: comunicação INDIRETA entre as telas
export const AppContext = createContext({});

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  const adicionarAgendamento = (novo) => {
    setAgendamentos((listaAtual) => [novo, ...listaAtual]);
  };

  const sair = () => {
    setUsuario(null);
    setVeiculoSelecionado(null);
    setAgendamentos([]);
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
        veiculoSelecionado,
        setVeiculoSelecionado,
        agendamentos,
        setAgendamentos,
        adicionarAgendamento,
        sair,
      }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook auxiliar para usar o contexto nas telas
export const useApp = () => useContext(AppContext);
