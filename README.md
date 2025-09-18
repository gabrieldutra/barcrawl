# Bar Crawl Tracker

Um webapp Next.js para acompanhar o roteiro de Bruno e Vitor pelos 15 bares de Santa Tereza em comemoração ao aniversário de 29 anos.

## 🍺 Funcionalidades

- **Mapa Interativo**: Visualização dos 15 bares no Google Maps
- **Lista de Bares**: Visualização em lista com detalhes de cada bar
- **Controle de Progresso**: Marcar bares como visitados e navegar entre eles
- **Design Responsivo**: Otimizado para uso em dispositivos móveis
- **Tempo Real**: Acompanhamento do progresso em tempo real

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Chave da API do Google Maps

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd barcrawl
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp env.example .env.local
```

4. Edite o arquivo `.env.local` e adicione sua chave da API do Google Maps:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

5. Execute o projeto:

```bash
npm run dev
```

6. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

## 🗺️ Como Obter a Chave da API do Google Maps

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Maps JavaScript API"
4. Crie uma credencial (API Key)
5. Configure as restrições de domínio se necessário
6. Copie a chave e adicione no arquivo `.env.local`

## 📱 Uso

### Controles Principais

- **Iniciar/Pausar**: Controla o início e pausa do bar crawl
- **Resetar**: Volta ao estado inicial
- **Anterior/Próximo**: Navega entre os bares
- **Clique no Mapa/Lista**: Vai diretamente para um bar específico

### Visualizações

- **Mapa**: Visualização geográfica dos bares com marcadores coloridos
- **Lista**: Lista detalhada com horários e endereços

### Cores dos Marcadores

- 🟢 **Verde**: Bar já visitado
- 🟡 **Amarelo**: Bar atual
- ⚪ **Cinza**: Bar ainda não visitado

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BarCrawlControls.tsx
│   ├── BarList.tsx
│   └── Map.tsx
├── data/
│   └── bars.ts
├── hooks/
│   └── useBarCrawl.ts
└── types/
    └── bar.ts
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Google Maps API**: Mapas interativos
- **Lucide React**: Ícones

## 📋 Roteiro dos Bares

1. **13:00** - Bar do Mozart
2. **13:20** - Cunha's Bar
3. **13:40** - Bar du Pedro
4. **14:00** - Bar da Lili
5. **14:20** - Mercadinho Bicalho (Bar do Nivaldo)
6. **14:40** - Bolão Santa Tereza
7. **15:00** - Casa Mojubá (Mojubá Bar)
8. **15:20** - Protótipo
9. **15:40** - Espeto da Esquina
10. **16:00** - Fita Bar
11. **16:20** - Alpendre 70
12. **17:00** - Butiquim do Walter
13. **18:10** - Bar Bocaiuva
14. **18:30** - Old Bar
15. **19:00** - Bar do Orlando (Final)

## 🔮 Próximas Funcionalidades

- [ ] Integração com API de localização em tempo real
- [ ] Notificações push
- [ ] Compartilhamento de progresso
- [ ] Histórico de bar crawls
- [ ] Sistema de pontuação

## 📄 Licença

Este projeto é de uso pessoal para comemoração de aniversário.
