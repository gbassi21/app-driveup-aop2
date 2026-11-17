// API RESTful com MockAPI (https://mockapi.io)
// 1) Crie um projeto no MockAPI
// 2) Crie os recursos "usuarios" e "agendamentos"
// 3) Cole abaixo o "API endpoint" do seu projeto (sem barra no final)
export const API_URL = 'https://6afca101892984c4494bcc0d.mockapi.io/api/v1';

// Função genérica com tratamento de erros (evita que o App quebre)
async function request(endpoint, options = {}) {
  if (API_URL.includes('COLE_SEU_ID')) {
    throw new Error('API não configurada: cole a URL da MockAPI em src/services/api.js');
  }

  let resposta;
  try {
    resposta = await fetch(`${API_URL}/${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch (erro) {
    throw new Error('Sem conexão com o servidor. Verifique sua internet e tente novamente.');
  }

  if (!resposta.ok) {
    throw new Error(`O servidor respondeu com erro (${resposta.status}). Tente novamente.`);
  }

  return resposta.json();
}

// POST - salva um novo usuário
export const cadastrarUsuario = (dados) =>
  request('usuarios', { method: 'POST', body: JSON.stringify(dados) });

// GET - lê todos os agendamentos
export const listarAgendamentos = () => request('agendamentos');

// POST - salva um novo agendamento de test drive
export const criarAgendamento = (dados) =>
  request('agendamentos', { method: 'POST', body: JSON.stringify(dados) });
