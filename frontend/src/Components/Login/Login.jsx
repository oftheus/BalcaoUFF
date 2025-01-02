import React from "react";
import { useAuth } from "react-oidc-context";

function Login() {
  const auth = useAuth();

  if (auth?.error) {
    return <div>Erro: {auth.error.message}</div>;
  }

  if (auth?.isAuthenticated) {
    return (
      <div>
        <p>Bem-vindo, {auth.user?.profile?.email}</p>
        <button onClick={() => auth.removeUser()}>Sair</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Entrar</button>
    </div>
  );
}

export default Login;
