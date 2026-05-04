# Portfolio

Portfólio pessoal — [portfolio-luizs-projects-9a2b01d1.vercel.app](https://portfolio-luizs-projects-9a2b01d1.vercel.app)

## Stack

HTML · CSS · JavaScript puro. Sem frameworks, sem bundler, sem dependências de runtime.

## Estrutura

```
Portfolio/
├── index.html
├── style.css
├── main.js
├── certificados/        imagens dos certificados
├── logo-ctt/            ícones de contato
└── skills-logo/         ícones de linguagens
```

## Funcionalidades

- Seção de projetos busca repositórios em tempo real via GitHub API (handles `001zk` e `Luiz-alt001`)
- Filtro de projetos por linguagem
- Filtro de certificados por categoria
- Lightbox para ampliar certificados
- Sidebar com navegação e destaque de seção ativa
- Layout responsivo com menu mobile
- Animações de entrada leves via IntersectionObserver

## Deploy

O site é deployado automaticamente na Vercel a cada push na branch `main`.

Para rodar localmente, qualquer servidor estático funciona:

```bash
npx serve .
# ou
python3 -m http.server 3000
```

## Contato

[LinkedIn](https://www.linkedin.com/in/luiz-gustavo-de-barros-175a79309) · luizgustavobarros32@gmail.com
