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

- **Display:** Cabinet Grotesk — `--font-display: 'Cabinet Grotesk', 'Satoshi', sans-serif`
- **Corpo:** Geist — `--font-body: 'Geist', sans-serif`
- Carregadas via Fontshare (`api.fontshare.com`), com `preconnect` no `index.html`.

| Papel | Tamanho | Peso | Entrelinha | Tracking |
|---|---|---|---|---|
| Nome no hero | `clamp(2.5rem, 6vw, 5.5rem)` | 900 | 0.85 | -0.06em |
| Título de seção (h2) | `clamp(1.8rem, 3vw, 2.8rem)` | 700 | 1.1 | -0.03em |
| Tagline do hero | `clamp(1rem, 1.3vw, 1.125rem)` | 400 | 1.6 | normal |
| Corpo | 1rem / 1.05rem | 400 | 1.6–1.8 | normal |
| Eyebrow | 0.8rem | 600 | 1 | 0.1em, uppercase |
| Legenda / tag | 0.75–0.85rem | 400–500 | 1.4 | normal |

- Parágrafos limitados a `65ch` por padrão (`p` em `global.css`); blocos específicos usam `40–46ch`.
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

- **Hero** (`ui/liquid-metal-hero.jsx`): altura mínima de viewport; grid de três colunas
  `nome | shader | nome` no desktop, coluna única alinhada à esquerda no mobile. Abaixo: tagline
  centralizada e dois CTAs (primário terracota + secundário claro). Kickers no topo (função, cidade).
- **Habilidades** (`Services.jsx`): duas colunas — à esquerda 15 cartões que se empilham e rotacionam
  levemente durante o scroll; à direita um painel de foto `position: sticky`. Vira coluna única abaixo de 900px.
- **Projetos** (`Portfolio.jsx`): grade de cartões; projetos sem foto recebem um visual sintético
  (chat, radar, tracker). Clique abre modal com contexto, desafio, solução e entregas, com foco preso
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
  (`backdrop-filter: blur(18px)`), com ícones `lucide-react` e rótulo que desliza no hover.
  Seção ativa detectada por `IntersectionObserver` (`rootMargin: -40% 0px -55% 0px`).
  O item de contato é terracota, destacado dos demais.
- **Mobile (<768px):** barra fixa no topo em `#141414` com marca e botão de 44×44px,
  abrindo painel em tela cheia com `role="dialog"`, foco movido para o primeiro item,
  fechamento por `Esc` e `overflow` do body travado.

## 7. Movimento

- **Scroll suave:** Lenis (`duration: 1.2`), sincronizado com o `ticker` do GSAP (`SmoothScrollProvider`).
- **Revelações:** GSAP + ScrollTrigger, `fromTo` com `y: 15–20` ou `x: ±30` e `opacity: 0`,
  `duration: 0.4–0.7s`, `ease: power3.out`, `stagger: 0.06–0.08`,
  `toggleActions: 'play none none reverse'`, disparo em `top 75–80%`.
- **Hero:** parallax por `scrub` (nome, kickers e shader se afastam em ritmos diferentes) via
  `gsap.matchMedia()`, com amplitudes menores no mobile.
- **Shader:** `@paper-design/shaders-react` — `LiquidMetal`, forma `metaballs`, `speed: 0.4`.
- **Botões:** `motion/react` — preenchimento circular a partir do ponto do clique
  (`OriginButton` / `OriginLink`), `0.5s`, `cubic-bezier(0.16, 1, 0.3, 1)`, `whileTap: scale(0.985)`.
- **Transições de estado:** 100–300ms; cor e `background-color` preferidos a propriedades de layout.

### Movimento reduzido

`prefers-reduced-motion: reduce` é respeitado nas quatro camadas, porque só o CSS não alcançaria
animação feita em JavaScript:

1. `MotionConfig reducedMotion="user"` em `main.jsx` cobre os componentes `motion/react`.
2. `SmoothScrollProvider` não instancia o Lenis e aplica `gsap.globalTimeline.timeScale(200)`,
   entregando o estado final das revelações sem percorrer o movimento.
3. `useHeroParallax` tem a condição `reduceMotion` no `gsap.matchMedia()` e não monta a timeline.
4. O CSS global zera animações decorativas, mas mantém transições em `120ms` — feedback de
   hover e foco continua legível em vez de sumir.

## 8. Voz

- **Tom:** direto, primeira pessoa, sem jargão de agência.
- **CTA:** verbo + objeto concreto — "Ver projetos", "Falar comigo", "Continuar no WhatsApp".
- **Promessa central:** "Sites e automações que trabalham pela sua empresa, mesmo quando você não está."
  Usada no hero, na meta description e no card de compartilhamento — a mesma frase nos três lugares.
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
- Sem depender de CSS para respeitar `prefers-reduced-motion` quando a animação é feita em JS.

## 10. Assets

- Fotos: `public/images/kaique/` (`about.webp`, `skills.webp`) e `public/images/projects/` (`.webp`, qualidade 82).
- Compartilhamento: `public/og-image.jpg` — 1200×630, retrato sobre fundo `#0E0E0E` com acento terracota.
  Referenciado em `og:image` e `twitter:image` com URL absoluta (exigência das duas especificações).
- Currículo: `public/Curriculo_Kaique_Calefi_Foto_1_Pagina.pdf`.
- Favicon: `public/favicon.svg`.
