## ⚡ Dashboard de dados em tempo real

&nbsp; &nbsp; Este é um projeto Full-Stack de alto desempenho que demonstra o consumo e a visualização de dados em tempo real via WebSockets. Ele foi construído com uma arquitetura moderna de monorepo leve, garantindo um fluxo de trabalho eficiente e código escalável.


## 🌟 Stack utilizada

**Front-end:** React, Typescript, TailwindCSS, Recharts

**Back-end:** Node, Express, Socket.IO

## ✨ Funcionalidades

**Streaming de Dados E2E**: Servidor Node.js simula dados de séries temporais com flutuação e os envia a cada 2 segundos via WebSockets.

**Gráfico Dinâmico "Rolling"**: O gráfico Recharts foi configurado para rolar horizontalmente, sempre exibindo a janela de tempo mais recente, criando um efeito visual suave e profissional.

**Design Clean**: Layout responsivo construído com Tailwind CSS, utilizando um fundo bg-gray-50 para contraste elegante com os cards de KPI.

**Orquestração de Instalação**: O ambiente pode ser configurado com um único comando.
## ⚙️ Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/lucasolib/realtime-dashboard-react
```

Entre no diretório do projeto

```bash
  cd realtime-dashboard-react
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## 🧪 Rodando os testes

Para rodar os testes, rode o seguinte comando na pasta client

```bash
  npm run test
```

Para ver o coverage, rode o próximo comando.

```bash
  npm run coverage
```
## 📖 Aprendizados

Existem ferramentas que podem acelerar muito o processo de programação, tal qual TailWind para estilização ou ReCharts para os gráficos. É muito importante você buscar e estudar as tecnologias antes do projeto para ter um código sólido e otimizado.
