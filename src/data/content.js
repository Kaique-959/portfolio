export const content = {
  name: 'Kaique Calefi',
  firstName: 'Kaique',
  lastName: 'Calefi',
  role: 'Desenvolvedor, Editor & Fundador',
  tagline: 'Tecnologia que funciona enquanto você dorme',
  location: 'Brasília, DF',

  hero: {
    subtitle: 'Desenvolvedor, editor e fundador da Kalefi_Org',
    cta: 'Ver projetos',
    secondaryCta: 'Falar comigo',
  },

  services: [
    {
      title: 'Sites Profissionais',
      description: 'Sites modernos com 3D interativo, animações fluídas e performance real. De landing pages a sistemas completos.',
      tags: ['React', 'Next.js', 'Three.js', 'GSAP'],
    },
    {
      title: 'Automação WhatsApp',
      description: 'Bots de atendimento inteligentes que organizam agendamentos, respondem clientes e integram com seu CRM.',
      tags: ['WhatsApp API', 'N8N', 'CRM'],
    },
    {
      title: 'Pipelines de Prospecção',
      description: 'Sistemas de outreach automatizado com limites de segurança, segmentação de leads e métricas de conversão.',
      tags: ['N8N', 'Automação', 'CRM'],
    },
    {
      title: 'Web Scraping & Dados',
      description: 'Monitores de preço, scraping de e-commerce e coleta automatizada de dados públicos para inteligência de negócio.',
      tags: ['Python', 'Scraping', 'Automação'],
    },
    {
      title: 'Landing Pages',
      description: 'Páginas de conversão com design estratégico, copy persuasiva e otimizadas para performance e SEO.',
      tags: ['React', 'Vite', 'SEO'],
    },
    {
      title: 'Sistemas Web',
      description: 'Aplicações completas com dashboard, autenticação, banco de dados e deploy automatizado na Vercel.',
      tags: ['React', 'Node.js', 'Vercel'],
    },
    {
      title: 'Deploy & Infra',
      description: 'Configuração de domínio, deploy contínuo via GitHub, Vercel, e integração com serviços externos.',
      tags: ['Vercel', 'GitHub', 'DNS'],
    },
    {
      title: 'Consultoria Técnica',
      description: 'Da ideia ao produto: desenho a arquitetura, escolho as ferramentas e entrego funcionando — sem time de TI.',
      tags: ['Arquitetura', 'Automação', 'Produto'],
    },
    {
      title: 'Edição de Vídeos',
      description: 'Vídeos para empresas, anúncios e redes sociais com montagem dinâmica, legendas, cortes precisos e identidade visual consistente.',
      tags: ['Edição', 'Motion', 'Conteúdo'],
    },
  ],

  about: {
    bio: 'Sou Kaique, desenvolvedor e fundador da Kalefi_Org, baseado em Brasília. Ainda estudante, decidi transformar interesse em tecnologia em produto real: construo sites, automações e ferramentas de IA que resolvem problema de negócio de verdade — não protótipo, não teoria.',
    bio2: 'Comecei atendendo meu primeiro cliente e, desde então, venho construindo um portfólio de sistemas, vídeos e automações que rodam em produção todos os dias — de bots de atendimento via WhatsApp a peças de conteúdo para empresas. Meu foco é simples: tecnologia e comunicação que funcionam sem precisar de um time de TI por trás.',
    image: '/images/kaique/about.jpg',
    techStack: ['Next.js & React', 'Automação com N8N', 'Edição e Motion', 'Baseado em Brasília'],
  },

  projects: [
    {
      title: 'Site Portfólio',
      category: 'Site e presença digital',
      description: 'Site pessoal com shader LiquidMetal, animações de scroll e navegação fluida',
      tags: ['React', 'Vite', 'GSAP', 'Shader'],
      image: '/images/projects/portfolio.jpg',
      url: 'https://site.kaiquecalefi.online',
      status: 'Concluído',
      details: {
        context: 'Presença digital para apresentar serviços, projetos e carreira de forma memorável.',
        challenge: 'Combinar identidade editorial, performance e interatividade sem parecer mais um template.',
        solution: 'Single page com shader reativo, parallax no hero, cards sticky de habilidades e seções narrativas com animações discretas.',
        deliverables: ['Direção visual', 'Interface responsiva', 'Animações de scroll', 'Deploy e domínio próprios'],
      },
    },
    {
      title: 'Ferro & Fio Barbearia',
      category: 'Site completo de barbearia',
      description: 'Site premium com serviços, preços, unidades, equipe e solicitação de agendamento via WhatsApp',
      tags: ['Next.js', 'TypeScript', 'GSAP', 'SEO'],
      image: '/images/projects/barbearia.jpg',
      url: 'https://ferro-fio-barbearia-kaique.vercel.app',
      status: 'Concluído',
      details: {
        context: 'Barbearia premium que precisa converter visitantes em solicitações de agendamento reais.',
        challenge: 'Apresentar serviços, preços, equipe e unidades com clareza, mantendo uma identidade editorial coerente.',
        solution: 'Site completo com fluxo de agendamento, SEO local, dados estruturados e integração direta com WhatsApp para confirmação.',
        deliverables: ['Design noir brasileiro', 'Fluxo de agendamento', 'Conteúdo editorial', 'Deploy automatizado'],
      },
    },
    {
      title: 'FonoCRM',
      category: 'CRM para empresas e clínicas',
      description: 'CRM com pacientes, agenda, integração com Google Calendar e Supabase',
      tags: ['Next.js', 'Supabase', 'Google Calendar', 'CRM'],
      image: '/images/projects/fonocrm.jpg',
      url: 'https://fono-crm.vercel.app',
      status: 'Concluído',
      details: {
        context: 'Clínica que precisava organizar pacientes, agenda e atendimentos em um só lugar.',
        challenge: 'Substituir planilhas manuais por um sistema simples que a equipe conseguisse usar sozinha.',
        solution: 'CRM web com cadastro de pacientes, agenda integrada ao Google Calendar, histórico e painel operacional conectado ao Supabase.',
        deliverables: ['Cadastro de pacientes', 'Agenda sincronizada', 'Histórico de atendimentos', 'Painel operacional'],
      },
    },
    {
      title: 'Atendimento Libertad',
      category: 'Bot de WhatsApp',
      description: 'Bot de atendimento para clínica com menu de exames, coleta de dados, horários e confirmação',
      tags: ['WhatsApp', 'N8N', 'Google Calendar', 'Automação'],
      image: null,
      visual: 'whatsapp',
      url: 'https://github.com/Kaique-959/botlibertad-crm',
      status: 'Concluído',
      details: {
        context: 'Clínica de fonoaudiologia que perdia atendimentos por demora no retorno manual.',
        challenge: 'Atender, qualificar e agendar pacientes via WhatsApp sem aumentar a equipe.',
        solution: 'Bot de WhatsApp com menu numérico de exames, coleta de dados, consulta de horários em tempo real e confirmação automática no Google Calendar.',
        deliverables: ['Fluxo de atendimento', 'Agenda automática', 'Notificação da clínica', 'Documentação operacional'],
      },
    },
    {
      title: 'Radar de Ofertas',
      category: 'Monitor de preços',
      description: 'Monitor de promoções em e-commerce com filtros de oportunidade e publicação automática',
      tags: ['Python', 'Scraping', 'Automação'],
      image: null,
      visual: 'radar',
      url: null,
      status: 'Concluído',
      details: {
        context: 'Distribuição automática de ofertas relevantes para grupos e canais de compras.',
        challenge: 'Identificar quedas reais de preço sem depender de checagem manual.',
        solution: 'Scraper com monitoramento contínuo, filtros de oportunidade, histórico de preços e publicação automática nos canais.',
        deliverables: ['Coleta automatizada', 'Filtro de ofertas', 'Histórico de preços', 'Publicação em grupos'],
      },
    },
    {
      title: 'Monitor Mercado Livre',
      category: 'Monitor de produtos',
      description: 'Monitor de produtos e preços no Mercado Livre com alertas de oportunidade',
      tags: ['Python', 'Scraping', 'Dados'],
      image: null,
      visual: 'mercado-livre',
      url: null,
      status: 'Concluído',
      details: {
        context: 'Acompanhamento de produtos e preços no Mercado Livre para decisão de compra.',
        challenge: 'Enxergar variação de preço entre anúncios sem precisar visitar cada página.',
        solution: 'Monitor dedicado ao Mercado Livre com coleta periódica, alertas de queda de preço e organização dos dados para análise.',
        deliverables: ['Monitor de produtos', 'Alertas de preço', 'Histórico de variação', 'Relatório consolidado'],
      },
    },
  ],

  experience: [
    {
      role: 'Desenvolvimento web e experiências digitais',
      company: 'Site Portfólio · Ferro & Fio',
      period: 'Concluído',
      description: 'Sites completos com identidade editorial, animações e performance: o portfólio pessoal com shader LiquidMetal e o site da Ferro & Fio Barbearia com agendamento via WhatsApp.',
    },
    {
      role: 'CRM e sistemas operacionais',
      company: 'FonoCRM',
      period: 'Concluído',
      description: 'CRM web para a clínica com pacientes, agenda sincronizada com Google Calendar, histórico de atendimentos e painel operacional conectado ao Supabase.',
    },
    {
      role: 'Automação de atendimento via WhatsApp',
      company: 'Atendimento Libertad',
      period: 'Concluído',
      description: 'Bot de WhatsApp com menu de exames, coleta de dados, consulta de horários em tempo real e confirmação automática, reduzindo o tempo de resposta da clínica.',
    },
    {
      role: 'Monitoramento de preços e dados',
      company: 'Radar de Ofertas · Monitor Mercado Livre',
      period: 'Concluído',
      description: 'Monitores de preço em e-commerce e no Mercado Livre com filtros de oportunidade, histórico de variação e publicação automática de ofertas.',
    },
    {
      role: 'Fundador',
      company: 'Kalefi_Org',
      period: '2024 — Presente',
      description: 'Agência focada em sites, CRM e automação para pequenas empresas, entregando tecnologia que funciona sem depender de um time de TI.',
    },
  ],

  testimonials: [
    {
      name: 'Libertad',
      role: 'Clínica de Fonoaudiologia e Audiologia',
      text: 'O sistema de automação via WhatsApp reduziu nosso tempo de resposta no atendimento e organizou totalmente o fluxo de agendamentos.',
    },
  ],

  faq: [
    {
      q: 'Que tipo de projeto você faz?',
      a: 'Sites profissionais, automações de WhatsApp, sistemas de prospecção, scraping de dados, landing pages e edição de vídeos para empresas. Tudo que rode em produção e resolva problema real.',
    },
    {
      q: 'Quanto tempo leva um projeto?',
      a: 'Depende da complexidade. Um site institucional leva de 1 a 2 semanas. Uma automação completa pode levar de 2 a 4 semanas.',
    },
    {
      q: 'Preciso ter time de TI para manter?',
      a: 'Não. Meu foco é justamente entregar tecnologia que funciona sem depender de suporte técnico constante. Tudo é documentado e automatizado.',
    },
    {
      q: 'Como funciona o processo?',
      a: 'Primeiro entendemos o problema, depois desenho a solução e entrego funcionando. Simples, direto e sem burocracia.',
    },
  ],

  social: {
    github: 'https://github.com/Kaique-959',
    linkedin: 'https://www.linkedin.com/in/kaique-calefi-b713b13ab/',
    email: 'comercial.kalefiorg@gmail.com',
    whatsapp: 'https://wa.me/5518981993718',
    whatsappNumber: '5518981993718',
  },

  contact: {
    email: 'comercial.kalefiorg@gmail.com',
    cta: 'Vamos trabalhar juntos',
    whatsappNumber: '5518981993718',
  },
}

export const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Habilidades', href: '#services' },
  { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#portfolio' },
  { label: 'Contato', href: '#contact' },
]
