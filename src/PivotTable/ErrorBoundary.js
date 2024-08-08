// src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Atualiza o estado para mostrar a UI de fallback em caso de erro
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Você pode registrar o erro em um serviço de relatórios de erros
    console.error("Erro capturado por Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza uma UI de fallback se um erro for capturado
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
