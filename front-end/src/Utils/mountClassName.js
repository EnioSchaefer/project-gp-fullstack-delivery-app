const mountClassName = (preClass, status) => {
  switch (status) {
  case 'Pendente':
    return `${preClass} ${'bg-yellow-400'}`;
  case 'Preparando':
    return `${preClass} ${'bg-green-400'}`;
  case 'Em Trânsito':
    return `${preClass} ${'bg-purple-400'}`;
  case 'Entregue':
    return `${preClass} ${'bg-teal-400'}`;
  default:
  }
};

export default mountClassName;
