# BalcaoUFF

## Sobre o projeto

O **Balcão UFF** é uma plataforma desenvolvida para promover a economia circular e a sustentabilidade dentro da comunidade da Universidade Federal Fluminense (UFF). Este repositório contém o código do **frontend**, desenvolvido com React, e inclui funcionalidades como login via Amazon Cognito, criação de anúncios com upload de imagens e um sistema de reputação baseado em avaliações dos usuários.

## Funcionalidades

- **Autenticação segura**: Login utilizando Amazon Cognito e integração com Google.  
- **Criação de anúncios**: Formulário dinâmico para cadastro de anúncios, incluindo upload de imagens.  
- **Busca de anúncios**: Ferramenta de pesquisa com exibição inicial de todos os anúncios e filtragem por categoria.  
- **Sistema de reputação**: Avaliações que permitem aos usuários avaliar anunciantes com base em suas experiências.  
- **Gerenciamento de perfil**: Opções de editar informações pessoais, gerenciar anúncios criados e acessar avaliações.  

## Tecnologias utilizadas

- **React**: Framework principal para construção da interface.  
- **Axios**: Para comunicação com a API do backend.  
- **Bootstrap**: Para estilos e layout responsivo.  
- **Amazon Cognito**: Para autenticação de usuários.  
- **React Router**: Para gerenciamento de navegação entre páginas.  

## Como executar o projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior).  
- **NPM** ou **Yarn** para instalação de pacotes.  

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/balcao-uff.git
   cd balcao-uff
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Substitua os valores `xxxxxxxxxxxxxxxxxxxxx` pelas suas chaves de API.

4. Execute o projeto:
   ```bash
   npm run dev
   ```

5. Acesse o sistema no navegador:
   ```plaintext
   http://localhost:3000
   ```

## Observações importantes

- **Chaves de API**: Certas partes do código foram deixadas em branco para proteger as chaves sensíveis do Google e do Cognito. Você precisará configurá-las.
- **Upload de imagens**: O sistema utiliza um bucket no Amazon S3 para armazenar as imagens enviadas pelos usuários. Certifique-se de configurar corretamente o S3 no backend.

## Contribuindo

Contribuições são bem-vindas! Siga as etapas abaixo para colaborar:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug:
   ```bash
   git checkout -b minha-feature
   ```
3. Realize suas alterações e faça commit:
   ```bash
   git commit -m "Descrição clara do que foi alterado"
   ```
4. Envie suas alterações para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request descrevendo suas alterações.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
