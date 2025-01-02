import React, { createContext, useContext, useEffect } from "react";
import { AuthProvider, useAuth } from "react-oidc-context";

// Configuração do Cognito
const cognitoAuthConfig = {
  authority: "",
  client_id: "",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "openid email phone",
  automaticSilentRenew: true,
};

// Contexto de autenticação
const AuthContext = createContext();

// Função para salvar os tokens no localStorage
export const saveTokens = (auth) => {
  console.log("Auth User:", auth.user);
  if (auth.user?.access_token) {
    console.log("Salvando tokens...");
    localStorage.setItem("AccessToken", auth.user.access_token);
    localStorage.setItem("idToken", auth.user.id_token);
    localStorage.setItem("refreshToken", auth.user.refresh_token);
    
  } else {
    console.error("Tokens não encontrados.");
  }
};

export const handleLogout = async (auth) => {
  const clientId = "";
  const logoutUri = "http://localhost:5173/logout";
  const cognitoDomain =
    "";
  const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;

  try {
    // Realiza o logout no OIDC e limpa o estado local
    if (auth?.removeUser) {
      await auth.removeUser();
    }
    clearTokens();

    // Redireciona para o Cognito para finalizar a sessão
    window.location.href = logoutUrl;
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
  }
};

// Função para limpar os tokens do localStorage

export const clearTokens = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("");
};

// Hook para acessar o contexto de autenticação
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthProviderWrapper"
    );
  }
  return context;
};

// Wrapper para fornecer o contexto
export const AuthProviderWrapper = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      saveTokens(auth);
    }
  }, [auth?.isAuthenticated]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Exporta o AuthProvider configurado
export const AuthProviderRoot = ({ children }) => (
  <AuthProvider
    {...cognitoAuthConfig}
    monitorSession={true}
    onSigninCallback={(auth) => {
      console.log("Login concluído com sucesso");
      saveTokens(auth); // Salva os tokens imediatamente após o login
    }}
    onSignoutCallback={() => {
      console.log("Logout concluído");
      clearTokens();
      window.location.reload(); // Atualiza o estado do AuthProvider
    }}
    onSigninError={(error) => console.error("Erro no login:", error)}
    onSilentRenewError={(error) =>
      console.error("Erro na renovação silenciosa:", error)
    }
  >
    <AuthProviderWrapper>{children}</AuthProviderWrapper>
  </AuthProvider>
);
