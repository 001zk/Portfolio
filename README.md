# Luiz Gustavo — Portfólio

Este repositório reúne meu portfólio pessoal e apresenta minha experiência em suporte de TI, redes, infraestrutura, NOC, automação, desenvolvimento web, análise de dados e pesquisa aplicada.

A Home foi construída com uma direção editorial inspirada pela relação entre arte, ciência e tecnologia. Usei pinturas renascentistas, estudos anatômicos, manuscritos e desenhos de engenharia como referências visuais para representar uma forma de trabalho baseada em observação, diagnóstico, construção e continuidade.

## Conceito visual

O conceito visual é **The Renaissance of Technology**. A proposta é aproximar o olhar investigativo dos cadernos de invenções e estudos científicos de uma prática contemporânea de tecnologia.

A direção combina papel mineral, carvão, vermelho sanguíneo, verde-azulado e ocre. Para a tipografia, usei uma serifada editorial nos títulos, uma sans-serif para leitura e uma fonte monoespaçada para datas, categorias, tecnologias e referências técnicas.

As imagens participam da narrativa da página:

- **The Creation of Adam**, de Michelangelo, aparece na abertura como referência visual para conexão;
- o estudo anatômico de Leonardo da Vinci acompanha a apresentação do meu trabalho;
- o **Codex Atlanticus** representa engenharia, processo e infraestrutura;
- a **Mona Lisa** encerra a página com a ideia de observação e investigação.

## O que apresento

A Home está organizada em cinco partes:

1. **Sobre** — minha atuação entre suporte, redes, infraestrutura e desenvolvimento;
2. **Experiência profissional** — meu cargo atual na Minsait / Indra Company e minha experiência anterior na Arroba Banda Larga;
3. **Formação e pesquisa** — Ensino Técnico em Informática, Bacharelado em Engenharia de Software e participação no NASA Radio JOVE;
4. **Projetos** — CGNAT Audit, HortaEduca e GeoPass;
5. **Contato** — meus canais profissionais e a pesquisa publicada no Zenodo.

A experiência profissional foi mantida separada da formação, da pesquisa e dos projetos independentes para deixar a trajetória mais clara.

## Experiência profissional

Atualmente trabalho como **Analista de Suporte de TI Jr. na Minsait / Indra Company**, atuando com suporte, infraestrutura e resolução de problemas em ambiente corporativo.

Anteriormente trabalhei como **Analista de NOC / TI Interno na Arroba Banda Larga**, com experiência em GPON, EPON, OLT, ONU, Zabbix, IXC, Proxmox, VPN, troubleshooting de redes, infraestrutura corporativa e suporte N2/N3.

## Projetos em destaque

### CGNAT Audit

Desenvolvi esta automação em Python no contexto de NOC para auxiliar na identificação de assinantes em redes CGNAT. A ferramenta percorre dados JSON do roteador de borda, cruza logs de acesso com ranges de portas e exporta os resultados para uma planilha estruturada.

Durante os testes, o processo identificou um pico de **593 ocorrências concentradas em um único IP privado**, enquanto os demais ranges apresentavam médias entre duas e oito ocorrências. O repositório público utiliza dados sintéticos para preservar as informações reais da operadora.

Tecnologias: Python, pandas, openpyxl, expressões regulares e JSON.

### HortaEduca

A HortaEduca é uma plataforma EdTech que conecta educação, agricultura e tecnologia por meio da gamificação de hortas escolares. Os alunos registram atividades de cultivo, acumulam pontos e acompanham o próprio desempenho; professores gerenciam turmas; e escolas acompanham alunos, docentes e relatórios.

Desenvolvi o MVP em parceria com **Larissa Rangel**, cofundadora e COO, durante o programa Ignite Brasil Startec da TEC Incubadora Norte Fluminense com a Wadhwani Foundation. Enquanto Larissa conduziu operações, pesquisa de mercado e validação, cuidei do desenvolvimento técnico, da prototipação e da arquitetura do produto.

A primeira versão utiliza HTML5 semântico, CSS3, JavaScript vanilla e localStorage, com modelagem preparada para uma evolução com TypeScript, Node.js, PostgreSQL e Redis.

### GeoPass

O GeoPass é um WebGIS para prever, consultar e visualizar passagens de satélites sobre locais escolhidos, combinando mapas, dados orbitais e cálculos de trajetória.

Tecnologias: Python, Flask, JavaScript, Leaflet, Skyfield e SGP4.

## Formação e pesquisa

Concluí o **Ensino Técnico em Informática na Estácio**, realizado entre janeiro e dezembro de 2025. A formação incluiu desenvolvimento de software, administração de sistemas, redes, bancos de dados, web design, DevOps, montagem e manutenção de computadores e segurança da informação.

Atualmente curso o **Bacharelado em Engenharia de Software na Estácio**, iniciado em julho de 2026. Estudo engenharia de requisitos, arquitetura de software, banco de dados, desenvolvimento web, algoritmos, inteligência artificial, redes e metodologias ágeis.

Também participo do **NASA Radio JOVE — Radio Astronomy & Citizen Science**, desde agosto de 2026. O estudo envolve dados públicos de radioastronomia, processamento de sinais, automação, correlação de observações e identificação de padrões usando Python.

## Interações da página

Usei o scroll como parte da narrativa visual. Na seção de experiência, a imagem de apoio muda conforme a navegação passa pelo cargo atual e pela experiência anterior. A barra lateral acompanha a progressão da página e o menu móvel aparece em telas menores.

As animações possuem uma alternativa para quem prefere reduzir movimentos. Quando `prefers-reduced-motion: reduce` está ativo, o parallax e as transições mais intensas são removidos, mantendo o conteúdo acessível.

## Estrutura do projeto

```text
.
├── index.html              # Home do portfólio
├── style.css               # Direção visual, responsividade e animações CSS
├── main.js                 # Interações, navegação móvel e transições de experiência
└── assets/
    └── art/
        ├── creation-of-adam.webp
        ├── codex-atlanticus.webp
        ├── leonardo-anatomy.webp
        └── mona-lisa.webp
```

A página é estática e não precisa de backend, banco de dados ou dependências para funcionar. Os arquivos visuais usados na composição ficam dentro do próprio projeto.

## Como executar localmente

Na raiz do projeto, execute:

```bash
python3 -m http.server 3000
```

Depois, abra `http://localhost:3000` no navegador.

Também é possível usar Live Server, `npx serve` ou qualquer servidor estático equivalente. Não é necessário instalar dependências para executar esta versão.

## Publicação

O projeto pode ser publicado como um site estático no GitHub Pages, Vercel, Netlify ou em qualquer hospedagem que sirva arquivos HTML, CSS, JavaScript e imagens.

Para GitHub Pages, basta subir os arquivos para um repositório, selecionar a branch de publicação e apontar a hospedagem para a pasta que contém o `index.html`.

## Fontes visuais e créditos

As obras utilizadas na Home foram obtidas em arquivos públicos do Wikimedia Commons. As legendas da página identificam as obras e os arquivos foram otimizados em WebP para reduzir o peso de carregamento.

As fontes tipográficas utilizadas são:

- Playfair Display;
- DM Sans;
- DM Mono.

As informações profissionais, acadêmicas e de projetos foram organizadas a partir do meu perfil público no GitHub e dos dados apresentados no meu currículo e perfil profissional.

## Links

- GitHub: <https://github.com/001zk>
- Perfil técnico: <https://github.com/001zk/001zk>
- LinkedIn: <https://www.linkedin.com/in/luiz-gustavo-de-barros/>
- Pesquisa no Zenodo: <https://zenodo.org/records/18135901>

## Status

Este projeto está **em construção**.
