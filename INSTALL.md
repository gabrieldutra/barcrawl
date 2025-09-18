# Instruções de Instalação - Bar Crawl Tracker

## 🚀 Passo a Passo Completo

### 1. Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** versão 18 ou superior
- **npm** (vem com o Node.js)
- Uma conta no Google Cloud Platform

### 2. Obter Chave da API do Google Maps

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Faça login com sua conta Google
3. Crie um novo projeto ou selecione um existente
4. No menu lateral, vá em "APIs e Serviços" > "Biblioteca"
5. Procure por "Maps JavaScript API" e clique em "Ativar"
6. Vá em "APIs e Serviços" > "Credenciais"
7. Clique em "Criar Credenciais" > "Chave de API"
8. Copie a chave gerada

### 3. Configurar o Projeto

1. Clone ou baixe o projeto
2. Abra o terminal na pasta do projeto
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Crie o arquivo de configuração:

   ```bash
   cp env.example .env.local
   ```

5. Edite o arquivo `.env.local` e adicione sua chave:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui
   ```

### 4. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

### 5. Testar no Celular

Para testar no celular:

1. Descubra o IP da sua máquina:

   ```bash
   # No macOS/Linux:
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # No Windows:
   ipconfig
   ```

2. Acesse no celular: `http://SEU_IP:3000`

## 🔧 Solução de Problemas

### Erro: "Google Maps API key not found"

- Verifique se o arquivo `.env.local` existe
- Confirme se a chave está correta
- Reinicie o servidor após alterar o arquivo

### Erro: "Maps JavaScript API has not been used"

- Ative a API no Google Cloud Console
- Aguarde alguns minutos para a ativação

### Erro de CORS no celular

- Use o IP da máquina em vez de localhost
- Verifique se o firewall não está bloqueando a porta 3000

### Mapa não carrega

- Verifique se a chave da API está ativa
- Confirme se a API Maps JavaScript está habilitada
- Verifique o console do navegador para erros

## 📱 Otimizações para Mobile

O app já está otimizado para mobile, mas você pode:

1. Adicionar à tela inicial (PWA)
2. Usar em modo offline (funcionalidade futura)
3. Habilitar notificações (funcionalidade futura)

## 🎯 Pronto para Usar!

Agora você pode acompanhar Bruno e Vitor no bar crawl! 🍺
