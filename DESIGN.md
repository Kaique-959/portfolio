# Design System — Portfólio Kaique Calefi

> Categoria: Portfólio editorial claro
> Documento gerado a partir do código em produção (`src/`), não de intenção de projeto.
> Fonte da verdade dos tokens: `src/styles/global.css`.

## 1. Tema e atmosfera

Portfólio editorial em base clara, com um único acento terracota e tipografia display pesada.
A identidade vem da composição — nome partido ao meio por um shader líquido, cartões que se
empilham durante o scroll, foto fixa acompanhando a leitura — e não de ornamento visual.

- **Estilo:** claro, editorial, tipográfico, direto
- **Postura de cor:** base off-white neutra, um acento quente
- **Intenção:** parecer trabalho autoral, nunca template

## 2. Cor

Tokens em `:root` (`src/styles/global.css`):

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#FAFAF8` | Fundo da página (off-white, nunca `#fff`) |
| `--surface` | `#F2F2F0` | Seções alternadas, tags, FAQ |
| `--surface-elevated` | `#EBEBE8` | Estados elevados |
| `--fg` | `#141414` | Texto principal, header mobile, botões escuros |
| `--muted` | `#66666D` | Texto secundário, eyebrows, legendas |
| `--accent` | `#C24E2E` | Terracota: CTA primário, numeração, destaques |
| `--accent-hover` | `#A83E22` | Hover do acento |
| `--accent-subtle` | `rgba(194,78,46,0.08)` | Brilhos radiais de fundo |
| `--border` | `#E5E5E2` | Hairlines |
| `--border-hover` | `#D4D4D0` | Hairlines em hover |
| `--glass-bg` | `rgba(250,250,248,0.82)` | Pílula de navegação |
| `--glass-border` | `rgba(229,229,226,0.7)` | Borda da pílula |
| `--success` / `--danger` | `#16a34a` / `#dc2626` | Estados |

Regras verificadas em produção:

- Sem preto puro (`#000`) ou branco puro como fundo; `#fff` só como texto sobre superfície escura.
- Contrastes medidos: `--muted` sobre `--bg` = 5,45:1 · branco sobre `--accent` = 4,75:1 ·
  `--fg` sobre `--bg` = 17,6:1. Todos passam WCAG AA.
- O acento aparece no máximo duas vezes por dobra — um CTA e uma numeração.
- Painéis escuros (foto de habilidades, cards de projeto) usam gradiente
  `linear-gradient(145deg, #141414, #35120d, #8f321f)` como ponte entre o fundo claro e o acento.

## 3. Tipografia

- **Display:** Cabinet Grotesk — `--font-display: 'Cabinet Grotesk', sans-serif`
- **Corpo:** Geist — `--font-body: 'Geist', sans-serif`
- **Só na hero:** Clash Display (nome) e General Sans (pequenos dados).
- Origem, em `@import` no topo de `global.css`:
  - Cabinet Grotesk: Fontshare, sozinha na URL (700/800/900).
  - Clash Display + General Sans: Fontshare, URL própria.
  - Geist: Google Fonts (400/500/600) — a Fontshare não tem Geist.
- `preconnect` no `index.html` para `api.fontshare.com`, `fonts.googleapis.com` e `fonts.gstatic.com`.
- Não voltar a juntar várias famílias numa URL da Fontshare: a antiga (satoshi + geist + cabinet-grotesk) só
  devolvia a Satoshi, então títulos e corpo renderizavam na fonte reserva.
- Conferir fontes por `document.fonts` com `status === 'loaded'`; `document.fonts.check()` retorna `true` também
  para famílias que nunca foram registradas.

| Papel | Tamanho | Peso | Entrelinha | Tracking |
|---|---|---|---|---|
| Nome no hero (`.hero-name`, Clash Display, `#333`) | `clamp(2.5rem, 6vw, 5.75rem)` · mobile `20vw` | 600 | 0.95 · mobile 0.9 | -0.5px |
| Pequenos dados da hero (`.hero-meta`, General Sans) | `1rem` · mobile `0.875rem` | 400 | 1.4 | -0.5px |
| Título de seção (h2) | `clamp(1.8rem, 3vw, 2.8rem)` | 700 | 1.1 | -0.03em |
| Corpo | 1rem / 1.05rem | 400 | 1.6–1.8 | normal |
| Eyebrow | 0.8rem | 600 | 1 | 0.1em, uppercase |
| Legenda / tag / categoria | 0.75–0.85rem (mínimo 12px no conteúdo) | 400–600 | 1.4 | normal |

- Parágrafos limitados a `65ch` por padrão (`p` em `global.css`); blocos específicos usam `40–50ch`.
- Títulos com `text-wrap: balance`.
- Nome do hero em caixa alta; o resto da página em caixa natural.
- Sem serifadas.

## 4. Espaçamento e grid

- Largura máxima de conteúdo: `1200px` (`--max-width`), container com `24px` de gutter (`20px` no mobile).
- Seções: `100px` verticais no desktop, `64px` no mobile (`.section`).
- Cabeçalho de seção: `56px` de respiro abaixo (`36px` no mobile).
- Raios: `--radius: 8px`, `--radius-sm: 4px`, `--radius-lg: 12px`; cartões grandes usam `20–24px`,
  controles em pílula usam `999px`.
- `[id] { scroll-margin-top: 80px }` para as âncoras não ficarem sob a navegação.

## 5. Layout e composição

- **Hero** (`ui/liquid-metal-hero.jsx`): o nome partido pelo blob, sem frase e sem botões. Pequenos dados
  em inglês, sem referência à Kalefi_Org: descritor acima do primeiro nome ("Websites & Automations"),
  função acima do segundo ("Developer & Editor") e cidade com relógio ao vivo abaixo do segundo
  ("Brasília, Brazil - HH:MM GMT-3", `Intl` com `America/Sao_Paulo`).
  - Desktop: altura `min(80svh, 2 × caixa do blob)` com conteúdo centralizado — o teto evita vazio em telas
    altas e estreitas. Container de `1128px`; grid `minmax(0,1fr) clamp(220px,26vw,360px) minmax(0,1fr)`;
    nomes nas bordas externas e pequenos dados absolutos ancorados nessas bordas. Os nomes descem
    `clamp(12px,2vw,28px)` via `top` para alinhar ao centro visual do blob.
  - Mobile: zigue-zague — KAIQUE à esquerda, shader centralizado em `64vw`, CALEFI à direita; pequenos
    dados empilhados junto de cada nome.
  - Nome e pequenos dados ficam no mesmo `.hero-name-group`, então o parallax move os dois juntos.
- **Habilidades** (`Services.jsx`): duas colunas — à esquerda 15 cartões que se empilham e rotacionam
  levemente durante o scroll; à direita um painel de foto `position: sticky`. Vira coluna única abaixo de 900px.
- **Projetos** (`Portfolio.jsx`): grade de cartões; projetos sem foto recebem um visual sintético
  (chat, radar, tracker). Thumbnails com captura ficam em 16:9 no mobile e têm degradê escuro na base
  para o status. Clique abre modal com contexto, desafio, solução e entregas, com foco preso
  e fechamento por `Esc`.
- **Experiência** (`Experience.jsx`): linha do tempo vertical.
- **Depoimentos** (`Testimonials.jsx`): carrossel horizontal com navegação por pontos.
- **FAQ** (`FAQ.jsx`): acordeão; painel anima por `grid-template-rows` e fica `visibility: hidden`
  quando fechado, para sair da ordem de foco e da árvore de acessibilidade.
- **Contato** (`Contact.jsx`): formulário que monta uma mensagem e abre o WhatsApp; e-mail e redes ao lado.

Cada seção usa uma família de layout diferente — não há duas grades iguais em sequência.

## 6. Navegação

Duas navegações distintas, não uma adaptada:

- **Desktop (≥768px):** pílula de vidro flutuante, fixa no **rodapé** centralizado
  (`backdrop-filter: blur(18px)`), com abas de texto (`ui/vercel-tabs.tsx`): Início, Habilidades, Sobre,
  Projetos e Contato. Destaque cinza desliza no hover e no foco; sublinhado de 2px acompanha a aba ativa.
  Seção ativa detectada por `IntersectionObserver` (`rootMargin: -40% 0px -55% 0px`) e passada como
  `activeTab`. Padding e cor das abas vão inline: o reset global fora de camada anula as utilidades do Tailwind.
- **Mobile (<768px):** barra fixa no topo em `#141414` com marca e botão de 44×44px,
  abrindo painel em tela cheia com `role="dialog"`, foco movido para o primeiro item,
  fechamento por `Esc` e `overflow` do body travado.

## 7. Movimento

- **Scroll suave:** Lenis (`duration: 1.2`), sincronizado com o `ticker` do GSAP (`SmoothScrollProvider`).
- **Revelações:** GSAP + ScrollTrigger, `fromTo` com `y: 15–20` ou `x: ±30` e `opacity: 0`,
  `duration: 0.4–0.7s`, `ease: power3.out`, `stagger: 0.06–0.08`,
  `toggleActions: 'play none none reverse'`, disparo em `top 75–80%`.
- **Hero:** parallax por `scrub` (grupos de nome + pequenos dados e shader se afastam em ritmos diferentes)
  via `gsap.matchMedia()`, com amplitudes menores no mobile.
- **Shader:** `@paper-design/shaders-react` — `LiquidMetal`, forma `metaballs`, `speed: 0.4`, `scale: 0.8`,
  `fit: cover`, `colorBack: #FAFAF800` (transparente), caixa `aspect-ratio: 1 / 1`.
- **Botões:** `motion/react` — preenchimento circular a partir do ponto do clique
  (`OriginButton` / `OriginLink`), `0.5s`, `cubic-bezier(0.16, 1, 0.3, 1)`, `whileTap: scale(0.985)`.
- **Transições de estado:** 100–300ms; cor e `background-color` preferidos a propriedades de layout.

### Preferência de movimento reduzido

Decisão do projeto: o site **não** reduz animações quando o sistema envia `prefers-reduced-motion: reduce`.
Scroll suave, reveals, parallax e transições rodam igual em qualquer máquina — inclusive no Windows
com "Efeitos de animação" desligado, que é o que dispara essa preferência no Chrome e no Edge.
Não reintroduzir `MotionConfig reducedMotion`, checagem em `SmoothScrollProvider`/`useHeroParallax`
ou `@media (prefers-reduced-motion)` sem rever essa decisão.

## 8. Voz

- **Tom:** direto, primeira pessoa, sem jargão de agência.
- **CTA:** verbo + objeto concreto — "Ver projetos", "Falar comigo", "Continuar no WhatsApp".
- **Promessa central:** "Sites e automações que trabalham pela sua empresa, mesmo quando você não está."
  Usada na meta description e no card de compartilhamento — a mesma frase nos dois lugares.
- **Evitar:** "elevar", "revolucionário", "seamless", números inventados.

## 9. Anti-padrões deste projeto

- Sem preto ou branco puro como fundo.
- Sem Inter como fonte display (a identidade é Cabinet Grotesk).
- Sem gradiente roxo-azul, sem emoji como ícone de seção, sem texto com gradiente.
- Sem grade simétrica de três colunas.
- Sem animar `width`, `height`, `max-height`, `margin` ou `padding` — use `transform`, `opacity`
  ou `grid-template-rows`.
- Sem `overflow: hidden` em ancestrais de elementos `sticky` (usar `overflow-x: clip`, como em `.about-section`).
- Sem elemento decorativo sobrepondo texto a ponto de prejudicar leitura.
- Sem imagem em JPEG/PNG quando WebP resolve: todas as fotos do site são `.webp`.
- Sem fundo opaco no canvas do shader: um `colorBack` sólido pinta por cima da letra vizinha.
- Sem caixa do shader mais baixa que larga: com `fit: cover` o mundo quadrado é recortado em cima e
  embaixo, e as gotas do metaball aparecem cortadas ao orbitar.
- Sem numeração decorativa sobre thumbnails de projeto: colide com o texto das próprias capturas.

## 10. Assets

- Fotos: `public/images/kaique/` (`about.webp`, `skills.webp`) e `public/images/projects/` (`.webp`, qualidade 82).
  `portfolio.webp` é uma captura 1425×900 da home atual — refazer quando a hero mudar.
- Compartilhamento: `public/og-image.jpg` — 1200×630, retrato sobre fundo `#0E0E0E` com acento terracota.
  Referenciado em `og:image` e `twitter:image` com URL absoluta (exigência das duas especificações).
- Currículo: `public/Curriculo_Kaique_Calefi_Foto_1_Pagina.pdf`.
- Favicon: `public/favicon.svg`.
