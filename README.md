# Projeto UEX - Agenda de Contatos

Projeto full-stack com backend em Laravel e frontend em React + TypeScript + Vite.

## Visão geral

- **Backend**: `api/` - Laravel com autenticação via Sanctum, geração de documentação OpenAPI e API REST.
- **Frontend**: `web/` - SPA React com roteamento TanStack Router, Material UI e cliente gerado a partir da API OpenAPI.
- **Imagens**: `imgs/` contém capturas de tela do sistema em funcionamento.
- **Documentação da API**: disponível em `/docs/api` no backend.

## Funcionalidades principais

### Autenticação e conta

- Cadastro de usuário com nome, email e senha.
- Login de usuário com token de autenticação.
- Logout seguro.
- Redefinição de senha via fluxo de esqueci minha senha.
- Exclusão de conta autenticada.

### Gestão de contatos

- Criação de contatos com campos:
  - nome
  - CPF
  - telefone
  - CEP
  - logradouro
  - número
  - complemento
  - bairro
  - cidade
  - estado
  - latitude
  - longitude
- Listagem de contatos do usuário autenticado.
- Exibição de detalhes de um contato.
- Edição de contato.
- Exclusão de contato.

### Validações e serviços

- Validação de CPF válida e formatada.
- Pesquisa de endereço por CEP usando serviço externo.
- Formulários com validação no frontend e backend.
- Tratamento de erros de validação e autenticação.

### Integração e documentação

- API documentada com OpenAPI.
- `api/api.json` gera a especificação da API.
- `web/src/http/generated/` contém cliente HTTP gerado a partir da especificação.
- Documentação interativa acessível em `/docs/api`.

### Experiência do usuário

- Telas públicas para login, registro e recuperação de senha.
- Área autenticada com dashboard de contatos.
- Modal de criação de contato.
- Barra lateral com lista de contatos, edição e exclusão.
- Visualização de contatos geolocalizados em mapa.

## Arquitetura do projeto

- `api/`
  - `app/` controllers, modelos, serviços e regras de validação.
  - `routes/api.php` define todas as rotas REST.
  - `config/scramble.php` configura a geração da documentação OpenAPI.
  - `database/migrations` e `factories` para persistência de usuários e contatos.

- `web/`
  - `src/pages` rotas públicas e privadas.
  - `src/components` componentes UI como sidebar e mapa.
  - `src/http/generated` client HTTP gerado com base no OpenAPI.
  - `src/contexts` gerenciamento de autenticação e coordenadas.

## Como executar

### Backend

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend

```bash
cd web
npm install
npm run dev
```

## Capturas de tela

- `imgs/login.png`
- `imgs/home.png`
- `imgs/create-contact.png`
- `imgs/delete-contact.png`

## Observações

- A API de documentação está disponível em `/docs/api`.
- O backend gera a especificação OpenAPI em `api/api.json`.
- O frontend consome a API e usa código gerado automaticamente para manter os contratos sincronizados.
