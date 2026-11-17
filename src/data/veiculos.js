// Catálogo lido de um arquivo local (vetor) para alimentar o App.
// Preços ilustrativos, apenas para fins acadêmicos.
const veiculos = [
  { id: '1', modelo: 'Yaris Hatch XS', categoria: 'Hatch', ano: 2026, preco: 109990, combustivel: 'Flex', cambio: 'Automático CVT' },
  { id: '2', modelo: 'Yaris Sedan XLS', categoria: 'Sedan', ano: 2026, preco: 124990, combustivel: 'Flex', cambio: 'Automático CVT' },
  { id: '3', modelo: 'Corolla Altis Hybrid', categoria: 'Sedan', ano: 2026, preco: 199990, combustivel: 'Híbrido', cambio: 'Automático e-CVT' },
  { id: '4', modelo: 'Corolla Cross XRE', categoria: 'SUV', ano: 2026, preco: 184990, combustivel: 'Flex', cambio: 'Automático CVT' },
  { id: '5', modelo: 'Corolla Cross Hybrid', categoria: 'SUV', ano: 2026, preco: 209990, combustivel: 'Híbrido', cambio: 'Automático e-CVT' },
  { id: '6', modelo: 'RAV4 Hybrid', categoria: 'SUV', ano: 2026, preco: 329990, combustivel: 'Híbrido', cambio: 'Automático e-CVT' },
  { id: '7', modelo: 'SW4 Diamond', categoria: 'SUV', ano: 2026, preco: 449990, combustivel: 'Diesel', cambio: 'Automático 6 marchas' },
  { id: '8', modelo: 'Hilux SR', categoria: 'Picape', ano: 2026, preco: 259990, combustivel: 'Diesel', cambio: 'Automático 6 marchas' },
  { id: '9', modelo: 'Hilux SRX Plus', categoria: 'Picape', ano: 2026, preco: 349990, combustivel: 'Diesel', cambio: 'Automático 6 marchas' },
];

export const categorias = ['Todas', 'Hatch', 'Sedan', 'SUV', 'Picape'];

export const horarios = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export const formatarPreco = (valor) =>
  'R$ ' + valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default veiculos;
