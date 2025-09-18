# 🚀 Deploy no Vercel - Campanha Eleitoral 29 anos

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Chave da API do Google Maps**: [Google Cloud Console](https://console.cloud.google.com)
3. **Repositório no GitHub**: Código deve estar em um repositório público ou privado

## 🔧 Configuração

### 1. Variáveis de Ambiente

No painel do Vercel, adicione as seguintes variáveis de ambiente:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_do_google_maps_aqui
```

### 2. Configurações do Projeto

- **Framework**: Next.js (detectado automaticamente)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (padrão)
- **Install Command**: `npm install`

## 🚀 Deploy

### Opção 1: Deploy via GitHub (Recomendado)

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 🔍 Verificações Pós-Deploy

- [ ] Site carrega corretamente
- [ ] Mapa do Google Maps aparece
- [ ] Interação com o mapa funciona
- [ ] Lista de bares é exibida
- [ ] Controles funcionam
- [ ] Responsividade em mobile

## 🛠️ Troubleshooting

### Erro: "Google Maps API key not found"

- Verifique se a variável `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` está configurada
- Certifique-se de que a chave está ativa no Google Cloud Console

### Erro: "Build failed"

- Verifique os logs de build no Vercel
- Execute `npm run build` localmente para testar

### Mapa não carrega

- Verifique se a chave da API tem as permissões corretas
- Confirme se o domínio está autorizado no Google Cloud Console

## 📱 PWA

O projeto está configurado como PWA e pode ser instalado em dispositivos móveis.

## 🔒 Segurança

- Headers de segurança configurados
- HTTPS obrigatório
- Proteção contra XSS e clickjacking

## 📊 Performance

- Compressão habilitada
- Imagens otimizadas (WebP/AVIF)
- CSS otimizado
- Bundle otimizado para produção

