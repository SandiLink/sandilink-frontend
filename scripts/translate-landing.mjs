import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

const TRANSLATIONS = {
  fr: {
    hero: {
      badge: "Plus de 500 professionnels dans plus de 20 pays nous font confiance",
      headlinePart1: "Connecter les gens à",
      headlineHighlight: "soins, apprentissage et recherche",
      headlinePart2: "— partout dans le monde.",
      subheadline:
        "SandiLink est la place de marché mondiale qui réunit utilisateurs de services de santé, prestataires, étudiants, précepteurs, chercheurs et rédacteurs de subventions au sein d'une plateforme transparente et humaine.",
      primaryCta: "Commencer",
      secondaryCta: "Parcourir les services",
    },
    explainer: {
      eyebrow: "Aperçu de 60 secondes",
      heading: "Découvrez comment fonctionne SandiLink.",
      subheading:
        "Et si se connecter à un soin, un mentor ou un rédacteur de subventions était aussi simple qu'un clic ?",
      placeholderTitle: "Vidéo explicative de 60 secondes",
      placeholderSubtitle:
        "Bientôt disponible — hébergée sur YouTube, lecture au clic.",
    },
    about: {
      eyebrow: "À propos de SandiLink",
      heading:
        "Une plateforme. Des possibilités illimitées d'accès et d'expertise.",
      lede: "Une place de marché mondiale conçue pour l'accès, la connexion et l'opportunité.",
      body: "SandiLink est la place de marché phare de One Sandi Platform — conçue pour lever les barrières et faciliter l'accès au soutien, à l'expertise et aux parcours dont les gens ont besoin. Que l'on recherche des services de santé, des stages cliniques ou une collaboration en recherche, SandiLink rassemble tout en un seul système intuitif, inclusif et accessible mondialement.",
      tilesHealthcare: "Santé",
      tilesHealthcareDesc: "Prestataires, bien-être, aidants",
      tilesEducation: "Éducation",
      tilesEducationDesc: "Étudiants, précepteurs, écoles",
      tilesResearch: "Recherche",
      tilesResearchDesc: "Subventions, revues, collaboration",
      tilesGlobal: "Mondial",
      tilesGlobalDesc: "Plus de 20 pays, une mission",
    },
    marketplaces: {
      heading: "Une plateforme. Trois places de marché interconnectées.",
      subheading: "Des possibilités illimitées.",
      healthcare: {
        tag: "Services de santé",
        title: "Place de marché des services de santé",
        lede: "Un point d'accès mondial pour le soutien sanitaire.",
        body: "Les particuliers, les familles et les communautés peuvent entrer en contact avec des professionnels de santé indépendants et des non-professionnels — médecins, infirmiers, professionnels de santé alliés, aidants, praticiens du bien-être, agents de santé communautaires et compagnons de soins de soutien.",
        callout:
          "SandiLink élargit l'accès, réduit les barrières et aide les gens à trouver les bons soins au bon moment.",
        cta: "Trouver un prestataire",
        roleDoctors: "Médecins & Spécialistes",
        roleNurses: "Infirmiers & Santé alliée",
        roleWellness: "Bien-être & Aidants",
        roleCommunity: "Agents de santé communautaires",
      },
      education: {
        tag: "Preceptor Connect™",
        title: "Place de marché de l'éducation",
        lede: "Une voie dédiée aux stages cliniques et au mentorat.",
        bullet1: "Les étudiants peuvent trouver des précepteurs et des mentors cliniques",
        bullet2: "Les précepteurs peuvent publier leurs disponibilités et spécialités",
        bullet3:
          "Les écoles et programmes académiques gagnent en structure, clarté et transparence",
        callout:
          "SandiLink simplifie le processus de placement clinique et soutient le développement professionnel.",
        cta: "Trouver un précepteur",
        studentsLabel: "Étudiants",
        preceptorsLabel: "Précepteurs",
      },
      research: {
        tag: "Recherche & Subventions",
        title: "Place de marché Recherche & Subventions",
        lede: "Un hub mondial pour la collaboration en recherche et le soutien au financement.",
        bullet1:
          "Les chercheurs peuvent se connecter avec des rédacteurs de subventions, explorer les financements et accéder aux revues",
        bullet2:
          "Les rédacteurs de subventions peuvent démontrer leur expertise et développer leur pratique",
        bullet3:
          "Les revues et équipes académiques disposent d'un espace unifié pour collaborer",
        callout:
          "SandiLink connecte la communauté de recherche mondiale avec les outils et les personnes dont elle a besoin.",
        cta: "Trouver un rédacteur de subventions",
        stat1Label: "Découverte de subventions",
        stat1Value: "Plus de 1 200 subventions",
        stat2Label: "Mise en relation",
        stat2Value: "67 experts",
        stat3Label: "Accès aux revues",
        stat3Value: "Plus de 45 revues",
      },
    },
    whySandilink: {
      heading: "Pourquoi SandiLink ?",
      subheading:
        "Des scénarios réels. Des personnes réelles. Une portée réelle — sur trois places de marché.",
      groups: {
        healthcare: "Santé",
        education: "Éducation / Preceptor Connect™",
        research: "Recherche & Subventions",
      },
      scenarios: {
        hc1Headline:
          "Un fils à Houston se connecte avec un médecin en Sierra Leone pour prendre soin de sa mère — sans que les frontières ne fassent obstacle.",
        hc1Body:
          "SandiLink permet aux familles de coordonner les soins pour leurs proches à travers les continents.",
        hc2Headline:
          "Une jeune femme à Atlanta trouve une infirmière praticienne de confiance à Lagos pour des conseils de santé reproductive virtuelle.",
        hc2Body:
          "L'accès à des soins alignés culturellement devient simple, sûr et direct.",
        hc3Headline:
          "Une aidante au New Jersey se connecte avec un agent de santé communautaire au Ghana pour soutenir les besoins quotidiens de son père vieillissant.",
        hc3Body:
          "SandiLink étend les réseaux de soins au-delà de la géographie, de la langue et des ressources locales.",
        ed1Headline:
          "Une étudiante en soins infirmiers aux Philippines se connecte avec un précepteur certifié à Houston — pas de gardien, pas de listes d'attente.",
        ed1Body:
          "SandiLink supprime les barrières à l'apprentissage clinique et au mentorat.",
        ed2Headline:
          "Une étudiante en santé publique en Inde sécurise un stage à distance avec un mentor basé aux États-Unis qui comprend ses objectifs.",
        ed2Body: "La géographie ne limite plus le développement professionnel.",
        ed3Headline:
          "Un précepteur au Mississippi publie sa disponibilité et se connecte instantanément avec des étudiants qui ont besoin de placements maintenant.",
        ed3Body:
          "SandiLink soutient les deux côtés du parcours d'apprentissage.",
        rg1Headline:
          "Un chercheur à Nairobi se connecte avec un rédacteur de subventions à Londres pour préparer une demande de financement mondial compétitive.",
        rg1Body:
          "SandiLink accélère la recherche en connectant l'expertise au-delà des frontières.",
        rg2Headline:
          "Une doctorante à Chicago trouve un éditeur de revue en Afrique du Sud pour guider sa soumission de manuscrit.",
        rg2Body:
          "Le soutien devient accessible, personnel et opportun.",
        rg3Headline:
          "Une équipe de recherche au Brésil collabore avec des rédacteurs de subventions américains pour sécuriser le financement d'un projet de santé communautaire.",
        rg3Body:
          "SandiLink renforce la découverte mondiale par des partenariats significatifs.",
      },
    },
    approach: {
      heading: "Une technologie conçue autour des gens — pas des institutions.",
      pillar1Title: "Conception centrée sur l'humain",
      pillar1Body:
        "Construite autour des expériences réelles, des besoins réels et des défis réels auxquels sont confrontés les gens cherchant des soins, de l'éducation et de la collaboration.",
      pillar2Title: "Accessibilité mondiale",
      pillar2Body:
        "Conçue pour s'adapter à travers les frontières, les cultures et les communautés — rendant le soutien d'experts accessible à tous, partout.",
      pillar3Title: "Confiance & Transparence",
      pillar3Body:
        "Conception éthique, communication claire et principes centrés sur l'utilisateur. Chaque professionnel est vérifié avant d'être mis en ligne.",
      pillar4Title: "Automatisation avec un but",
      pillar4Body:
        "Appariement intelligent, flux de travail rationalisés et outils intelligents qui réduisent les frictions pour que les gens puissent se concentrer sur l'essentiel.",
    },
    mission: {
      eyebrow: "Notre Mission",
      heading: "Parce que l'accès devrait être simple — pas stressant.",
      lede: "SandiLink a été créé pour résoudre un problème mondial : partout, les gens peinent à accéder aux soins, à sécuriser des stages cliniques ou à trouver un soutien en recherche.",
      missionTitle: "Notre Mission",
      missionBody:
        "Construire des systèmes évolutifs et centrés sur l'humain qui autonomisent les gens indépendamment de la géographie, des antécédents ou des ressources.",
      visionTitle: "Notre Vision",
      visionBody:
        "Un monde où les soins de santé sont accessibles, l'éducation est soutenue et la recherche est collaborative et connectée mondialement.",
      tileHealthcare: "Santé",
      tileHealthcareValue: "Accessible",
      tileEducation: "Éducation",
      tileEducationValue: "Soutenue",
      tileResearch: "Recherche",
      tileResearchValue: "Connectée",
      tileCommunity: "Communauté",
      tileCommunityValue: "Mondiale",
    },
    community: {
      heading: "Une communauté mondiale d'utilisateurs, de prestataires et de partenaires.",
      body: "SandiLink soutient les particuliers, les familles, les prestataires de soins de santé, les étudiants, les précepteurs, les chercheurs, les rédacteurs de subventions, les revues et les institutions à travers le monde.",
      accent:
        "Nous construisons un écosystème connecté qui renforce les soins, l'apprentissage et la découverte.",
      cta: "Rejoindre la communauté",
      roleServiceUsers: "Utilisateurs de services",
      roleProviders: "Prestataires",
      roleStudents: "Étudiants",
      rolePreceptors: "Précepteurs",
      roleResearchers: "Chercheurs",
      roleGrantWriters: "Rédacteurs de subventions",
      roleInstitutions: "Institutions",
    },
    founding: {
      statProviders: "Prestataires",
      statCountries: "Pays",
      statMarketplaces: "Places de marché",
      statMission: "Mission",
      testimonialsHeading: "Ce que disent nos membres",
      testimonialsBody: "Des voix réelles de la première communauté SandiLink.",
      founderBadge: "Un message de notre fondatrice",
      founderQuote:
        "Nous avons construit SandiLink parce que le talent ne devrait pas être limité par l'accès. De la santé au préceptorat, en passant par la recherche et les subventions, nous connectons les gens à travers trois places de marché dédiées. Nous ne faisons que commencer — et chaque personne qui nous rejoint maintenant aide à façonner ce qui vient ensuite.",
      founderRole: "Fondatrice & PDG",
      founderCompany: "SandiLink",
      limitedTime: "Durée limitée",
      heading: "Devenez membre fondateur",
      subheading:
        "Rejoignez-nous maintenant et recevez des avantages exclusifs réservés à nos premiers membres.",
      benefit1Title: "Accès anticipé",
      benefit1Body:
        "Soyez parmi les premiers sur les trois places de marché : Services de santé, Preceptor Connect™ et Recherche & Subventions.",
      benefit2Title: "Placement prioritaire",
      benefit2Body:
        "Les membres fondateurs bénéficient d'un positionnement prioritaire dans l'annuaire, vous rendant plus visible pour les apprenants, les collaborateurs et les opportunités.",
      benefit3Title: "Contribution directe aux fonctionnalités",
      benefit3Body:
        "Façonnez la plateforme. Les membres fondateurs ont un lien direct avec l'équipe produit, et vos retours influencent ce que nous construisons ensuite.",
      benefit4Title: "Badge membre fondateur à vie",
      benefit4Body:
        "Un badge permanent sur votre profil qui signale que vous étiez là depuis le début — visible par chaque utilisateur qui consulte votre profil.",
      cta: "Devenir membre fondateur",
    },
    finalCta: {
      heading: "Rejoignez la plateforme qui redéfinit la connexion mondiale.",
      body: "Créez votre compte et commencez à vous connecter avec des prestataires de soins de santé, des mentors, des chercheurs et des rédacteurs de subventions dès aujourd'hui.",
      primary: "Créer votre compte",
      secondary: "Se connecter",
    },
  },
  pt: {
    hero: {
      badge: "Confiado por mais de 500 profissionais em mais de 20 países",
      headlinePart1: "Conectando pessoas a",
      headlineHighlight: "cuidados, aprendizado e pesquisa",
      headlinePart2: "— em qualquer lugar do mundo.",
      subheadline:
        "SandiLink é o marketplace global que reúne usuários de serviços de saúde, prestadores, estudantes, preceptores, pesquisadores e redatores de subsídios em uma plataforma integrada e humanizada.",
      primaryCta: "Começar",
      secondaryCta: "Navegar pelos serviços",
    },
    explainer: {
      eyebrow: "Visão geral de 60 segundos",
      heading: "Veja como o SandiLink funciona.",
      subheading:
        "E se se conectar a um cuidado, um mentor ou um redator de subsídios fosse tão fácil quanto um clique?",
      placeholderTitle: "Vídeo explicativo de 60 segundos",
      placeholderSubtitle:
        "Em breve — hospedado no YouTube, clique para reproduzir.",
    },
    about: {
      eyebrow: "Sobre o SandiLink",
      heading:
        "Uma plataforma. Caminhos ilimitados para suporte e expertise.",
      lede: "Um marketplace global construído para acesso, conexão e oportunidade.",
      body: "SandiLink é o marketplace principal da One Sandi Platform — projetado para remover barreiras e facilitar o acesso ao suporte, à expertise e aos caminhos de que as pessoas precisam. Seja buscando serviços de saúde, estágios clínicos ou colaboração em pesquisa, o SandiLink reúne tudo em um único sistema intuitivo, inclusivo e acessível globalmente.",
      tilesHealthcare: "Saúde",
      tilesHealthcareDesc: "Prestadores, bem-estar, cuidadores",
      tilesEducation: "Educação",
      tilesEducationDesc: "Estudantes, preceptores, escolas",
      tilesResearch: "Pesquisa",
      tilesResearchDesc: "Subsídios, periódicos, colaboração",
      tilesGlobal: "Global",
      tilesGlobalDesc: "Mais de 20 países, uma missão",
    },
    marketplaces: {
      heading: "Uma plataforma. Três marketplaces interconectados.",
      subheading: "Possibilidades ilimitadas.",
      healthcare: {
        tag: "Serviços de Saúde",
        title: "Marketplace de Serviços de Saúde",
        lede: "Um ponto de acesso global para suporte à saúde.",
        body: "Indivíduos, famílias e comunidades podem se conectar com profissionais de saúde independentes e não profissionais — incluindo médicos, enfermeiros, profissionais de saúde aliados, cuidadores, praticantes de bem-estar, agentes comunitários de saúde e companheiros de cuidados de apoio.",
        callout:
          "SandiLink expande o acesso, reduz barreiras e ajuda as pessoas a encontrar o cuidado certo na hora certa.",
        cta: "Encontrar um prestador",
        roleDoctors: "Médicos & Especialistas",
        roleNurses: "Enfermeiros & Saúde Aliada",
        roleWellness: "Bem-estar & Cuidadores",
        roleCommunity: "Agentes Comunitários de Saúde",
      },
      education: {
        tag: "Preceptor Connect™",
        title: "Marketplace de Educação",
        lede: "Uma via dedicada a estágios clínicos e mentoria.",
        bullet1: "Estudantes podem encontrar preceptores e mentores clínicos",
        bullet2: "Preceptores podem listar sua disponibilidade e especialidades",
        bullet3:
          "Escolas e programas acadêmicos ganham estrutura, clareza e transparência",
        callout:
          "SandiLink simplifica o processo de estágio clínico e apoia o desenvolvimento profissional.",
        cta: "Encontrar um preceptor",
        studentsLabel: "Estudantes",
        preceptorsLabel: "Preceptores",
      },
      research: {
        tag: "Pesquisa & Subsídios",
        title: "Marketplace de Pesquisa & Subsídios",
        lede: "Um hub global para colaboração em pesquisa e suporte a financiamentos.",
        bullet1:
          "Pesquisadores podem se conectar com redatores de subsídios, explorar financiamentos e acessar periódicos",
        bullet2:
          "Redatores de subsídios podem demonstrar expertise e expandir sua prática",
        bullet3:
          "Periódicos e equipes acadêmicas ganham um espaço unificado para colaboração",
        callout:
          "SandiLink conecta a comunidade de pesquisa global com as ferramentas e pessoas de que precisa.",
        cta: "Encontrar um redator de subsídios",
        stat1Label: "Descoberta de subsídios",
        stat1Value: "Mais de 1.200 subsídios",
        stat2Label: "Correspondência",
        stat2Value: "67 especialistas",
        stat3Label: "Acesso a periódicos",
        stat3Value: "Mais de 45 periódicos",
      },
    },
    whySandilink: {
      heading: "Por que SandiLink?",
      subheading:
        "Cenários reais. Pessoas reais. Alcance real — em três marketplaces.",
      groups: {
        healthcare: "Saúde",
        education: "Educação / Preceptor Connect™",
        research: "Pesquisa & Subsídios",
      },
      scenarios: {
        hc1Headline:
          "Um filho em Houston se conecta com um médico na Serra Leoa para cuidar de sua mãe — sem fronteiras no caminho.",
        hc1Body:
          "SandiLink torna possível para famílias coordenar cuidados para entes queridos através dos continentes.",
        hc2Headline:
          "Uma jovem em Atlanta encontra uma enfermeira praticiante de confiança em Lagos para orientação virtual de saúde reprodutiva.",
        hc2Body:
          "O acesso a cuidados culturalmente alinhados torna-se simples, seguro e direto.",
        hc3Headline:
          "Uma cuidadora em Nova Jersey se conecta com um agente comunitário de saúde em Gana para apoiar as necessidades diárias de seu pai idoso.",
        hc3Body:
          "SandiLink estende redes de cuidado além da geografia, idioma e recursos locais.",
        ed1Headline:
          "Uma estudante de enfermagem nas Filipinas se conecta com um preceptor certificado em Houston — sem gatekeepers, sem listas de espera.",
        ed1Body:
          "SandiLink remove barreiras ao aprendizado clínico e à mentoria.",
        ed2Headline:
          "Uma estudante de saúde pública na Índia garante um estágio remoto com um mentor nos EUA que entende seus objetivos.",
        ed2Body: "A geografia não limita mais o desenvolvimento profissional.",
        ed3Headline:
          "Um preceptor no Mississippi lista sua disponibilidade e se conecta instantaneamente com estudantes que precisam de agora.",
        ed3Body:
          "SandiLink apoia ambos os lados da jornada de aprendizado.",
        rg1Headline:
          "Um pesquisador em Nairóbi se conecta com um redator de subsídios em Londres para preparar uma aplicação competitiva de financiamento global.",
        rg1Body:
          "SandiLink acelera a pesquisa conectando expertise através das fronteiras.",
        rg2Headline:
          "Uma doutoranda em Chicago encontra um editor de periódico na África do Sul para guiar sua submissão de manuscrito.",
        rg2Body: "O suporte torna-se acessível, pessoal e oportuno.",
        rg3Headline:
          "Uma equipe de pesquisa no Brasil colabora com redatores de subsídios dos EUA para garantir financiamento para um projeto de saúde comunitária.",
        rg3Body:
          "SandiLink fortalece a descoberta global através de parcerias significativas.",
      },
    },
    approach: {
      heading: "Tecnologia projetada em torno das pessoas — não das instituições.",
      pillar1Title: "Design Centrado no Humano",
      pillar1Body:
        "Construído em torno de experiências reais, necessidades reais e desafios reais enfrentados por pessoas que buscam cuidados, educação e colaboração.",
      pillar2Title: "Acessibilidade Global",
      pillar2Body:
        "Projetado para escalar através de fronteiras, culturas e comunidades — tornando o suporte de especialistas acessível a todos, em toda parte.",
      pillar3Title: "Confiança & Transparência",
      pillar3Body:
        "Design ético, comunicação clara e princípios centrados no usuário. Cada profissional é verificado antes de entrar no ar.",
      pillar4Title: "Automação com Propósito",
      pillar4Body:
        "Correspondência inteligente, fluxos de trabalho simplificados e ferramentas inteligentes que reduzem a fricção para que as pessoas possam focar no que importa.",
    },
    mission: {
      eyebrow: "Nossa Missão",
      heading: "Porque o acesso deve ser simples — não estressante.",
      lede: "SandiLink foi criado para resolver um problema global: em todo lugar, as pessoas lutam para acessar cuidados, garantir estágios clínicos ou encontrar suporte em pesquisa.",
      missionTitle: "Nossa Missão",
      missionBody:
        "Construir sistemas escaláveis e centrados no humano que empoderem as pessoas independentemente da geografia, origem ou recursos.",
      visionTitle: "Nossa Visão",
      visionBody:
        "Um mundo onde a saúde é acessível, a educação é apoiada e a pesquisa é colaborativa e conectada globalmente.",
      tileHealthcare: "Saúde",
      tileHealthcareValue: "Acessível",
      tileEducation: "Educação",
      tileEducationValue: "Apoiada",
      tileResearch: "Pesquisa",
      tileResearchValue: "Conectada",
      tileCommunity: "Comunidade",
      tileCommunityValue: "Global",
    },
    community: {
      heading: "Uma comunidade global de usuários, prestadores e parceiros.",
      body: "SandiLink apoia indivíduos, famílias, prestadores de saúde, estudantes, preceptores, pesquisadores, redatores de subsídios, periódicos e instituições ao redor do mundo.",
      accent:
        "Estamos construindo um ecossistema conectado que fortalece cuidados, aprendizado e descoberta.",
      cta: "Junte-se à comunidade",
      roleServiceUsers: "Usuários de serviços",
      roleProviders: "Prestadores",
      roleStudents: "Estudantes",
      rolePreceptors: "Preceptores",
      roleResearchers: "Pesquisadores",
      roleGrantWriters: "Redatores de subsídios",
      roleInstitutions: "Instituições",
    },
    founding: {
      statProviders: "Prestadores",
      statCountries: "Países",
      statMarketplaces: "Marketplaces",
      statMission: "Missão",
      testimonialsHeading: "O que nossos membros dizem",
      testimonialsBody: "Vozes reais da primeira comunidade SandiLink.",
      founderBadge: "Uma mensagem de nossa fundadora",
      founderQuote:
        "Construímos o SandiLink porque o talento não deveria ser limitado pelo acesso. Da saúde ao preceptorado, passando pela pesquisa e subsídios, conectamos pessoas através de três marketplaces dedicados. Estamos apenas começando — e cada pessoa que se junta agora ajuda a moldar o que vem a seguir.",
      founderRole: "Fundadora & CEO",
      founderCompany: "SandiLink",
      limitedTime: "Tempo limitado",
      heading: "Torne-se um membro fundador",
      subheading:
        "Junte-se agora e receba benefícios exclusivos reservados aos nossos primeiros membros.",
      benefit1Title: "Acesso antecipado",
      benefit1Body:
        "Seja um dos primeiros nos três marketplaces: Serviços de Saúde, Preceptor Connect™ e Pesquisa & Subsídios.",
      benefit2Title: "Posicionamento prioritário",
      benefit2Body:
        "Membros fundadores recebem posicionamento prioritário no diretório, tornando-o mais visível para aprendizes, colaboradores e oportunidades.",
      benefit3Title: "Contribuição direta para funcionalidades",
      benefit3Body:
        "Moldure a plataforma. Membros fundadores têm uma linha direta com a equipe de produto, e seus feedbacks influenciam o que construímos em seguida.",
      benefit4Title: "Badge de membro fundador vitalício",
      benefit4Body:
        "Um badge permanente em seu perfil que sinaliza que você estava lá desde o início — visível para cada usuário que visualiza seu perfil.",
      cta: "Tornar-se membro fundador",
    },
    finalCta: {
      heading: "Junte-se à plataforma que está redefinindo a conexão global.",
      body: "Crie sua conta e comece a se conectar com prestadores de saúde, mentores, pesquisadores e redatores de subsídios hoje.",
      primary: "Criar sua conta",
      secondary: "Entrar",
    },
  },
  ar: {
    hero: {
      badge: "موثوق به من قبل أكثر من 500 محترف في أكثر من 20 دولة",
      headlinePart1: "ربط الناس بـ",
      headlineHighlight: "الرعاية والتعلم والبحث",
      headlinePart2: "— في أي مكان في العالم.",
      subheadline:
        "SandiLink هو السوق العالمي الذي يجمع بين مستخدمي الخدمات الصحية ومقدمي الخدمات والطلاب والمرشدين السريريين والباحثين وكتاب المنح في منصة سلسة وموجهة نحو الإنسان.",
      primaryCta: "البدء",
      secondaryCta: "تصفح الخدمات",
    },
    explainer: {
      eyebrow: "نظرة عامة لمدة 60 ثانية",
      heading: "شاهد كيف يعمل SandiLink.",
      subheading:
        "ماذا لو كان الاتصال برعاية صحية أو مرشد أو كاتب منح سهلاً مثل النقر فوق زر؟",
      placeholderTitle: "فيديو توضيحي لمدة 60 ثانية",
      placeholderSubtitle:
        "قريباً — مستضاف على YouTube، انقر للتشغيل.",
    },
    about: {
      eyebrow: "حول SandiLink",
      heading: "منصة واحدة. طرق لا حصر لها للوصول إلى الدعم والخبرة.",
      lede: "سوق عالمي مبني من أجل الوصول والتواصل والفرص.",
      body: "SandiLink هو السوق الرائد لمنصة One Sandi — مصمم لإزالة الحواجز وتسهيل العثور على الدعم والخبرة والمسارات التي يحتاجها الناس. سواء كان البحث عن خدمات الرعاية الصحية أو التدريبات السريرية أو التعاون البحثي، يجمع SandiLink كل شيء في نظام واحد بديهي وشامل ومتاح عالمياً.",
      tilesHealthcare: "الرعاية الصحية",
      tilesHealthcareDesc: "مقدمو الخدمات، الصحة، مقدمو الرعاية",
      tilesEducation: "التعليم",
      tilesEducationDesc: "الطلاب، المرشدون، المدارس",
      tilesResearch: "البحث",
      tilesResearchDesc: "المنح، المجلات، التعاون",
      tilesGlobal: "عالمي",
      tilesGlobalDesc: "أكثر من 20 دولة، مهمة واحدة",
    },
    marketplaces: {
      heading: "منصة واحدة. ثلاثة أسواق مترابطة.",
      subheading: "إمكانيات لا حصر لها.",
      healthcare: {
        tag: "الخدمات الصحية",
        title: "سوق الخدمات الصحية",
        lede: "بوابة وصول عالمية للدعم الصحي.",
        body: "يمكن للأفراد والعائلات والمجتمعات التواصل مع متخصصي الرعاية الصحية المستقلين وغير المحترفين — بما في ذلك الأطباء والممرضين ومقدمي الرعاية الصحية المساعدين ومقدمي الرعاية وممارسي الصحة والعاملين الصحيين المجتمعيين ومرافقي الرعاية الداعمة.",
        callout:
          "يوسع SandiLink الوصول ويقلل الحواجز ويساعد الناس في العثور على الرعاية المناسبة في الوقت المناسب.",
        cta: "البحث عن مقدم خدمة",
        roleDoctors: "الأطباء والمتخصصون",
        roleNurses: "الممرضون والصحة المساعدة",
        roleWellness: "الصحة والعافية ومقدمو الرعاية",
        roleCommunity: "العاملون الصحيون المجتمعيون",
      },
      education: {
        tag: "Preceptor Connect™",
        title: "سوق التعليم",
        lede: "مسار مخصص للتدريب السريري والإرشاد.",
        bullet1: "يمكن للطلاب العثور على مرشدين سريريين ومعلمين",
        bullet2: "يمكن للمرشدين السريريين إدراج توافرهم وتخصصاتهم",
        bullet3: "تكتسب المدارس والبرامج الأكاديمية بنية ووضوح وشفافية",
        callout:
          "يبسط SandiLink عملية التدريب السريري ويدعم التطوير المهني.",
        cta: "البحث عن مرشد سريري",
        studentsLabel: "الطلاب",
        preceptorsLabel: "المرشدون",
      },
      research: {
        tag: "البحث والمنح",
        title: "سوق البحث والمنح",
        lede: "مركز عالمي للتعاون البحثي ودعم التمويل.",
        bullet1:
          "يمكن للباحثين التواصل مع كتاب المنح واستكشاف التمويل والوصول إلى المجلات",
        bullet2: "يمكن لكتاب المنح عرض خبراتهم وتنمية ممارستهم",
        bullet3: "تحصل المجلات والفرق الأكاديمية على مساحة موحدة للتعاون",
        callout:
          "يربط SandiLink مجتمع البحث العالمي بالأدوات والأشخاص الذين يحتاجون إليهم.",
        cta: "البحث عن كاتب منح",
        stat1Label: "اكتشاف المنح",
        stat1Value: "أكثر من 1200 منحة",
        stat2Label: "ربط الخبراء",
        stat2Value: "67 خبيراً",
        stat3Label: "الوصول إلى المجلات",
        stat3Value: "أكثر من 45 مجلة",
      },
    },
    whySandilink: {
      heading: "لماذا SandiLink؟",
      subheading:
        "سيناريوهات حقيقية. أشخاص حقيقيون. تأثير حقيقي — عبر ثلاثة أسواق.",
      groups: {
        healthcare: "الرعاية الصحية",
        education: "التعليم / Preceptor Connect™",
        research: "البحث والمنح",
      },
      scenarios: {
        hc1Headline:
          "يتواصل ابن في هيوستن مع طبيب في سيراليون لرعاية أمه — دون أن تقف الحدود في طريقهما.",
        hc1Body:
          "يجعل SandiLink من الممكن للعائلات تنسيق الرعاية لأحبائهم عبر القارات.",
        hc2Headline:
          "تجد شابة في أتلانتا ممرضة موثوقة في لاغوس للحصول على إرشاد صحي تناسلي افتراضي.",
        hc2Body:
          "يصبح الوصول إلى رعاية متوافقة ثقافياً بسيطاً وآمناً ومباشراً.",
        hc3Headline:
          "تتواصل مقدمة رعاية في نيوجيرسي مع عامل صحي مجتمعي في غانا لدعم احتياجات والدها المسن اليومية.",
        hc3Body:
          "يمتد SandiLink بشبكات الرعاية إلى ما وراء الجغرافيا واللغة والموارد المحلية.",
        ed1Headline:
          "تتواصل طالبة تمريض في الفلبين مع مرشد سريري معتمد في هيوستن — بدون حراس أو قوائم انتظار.",
        ed1Body:
          "يزيل SandiLink الحواجز أمام التعلم السريري والإرشاد.",
        ed2Headline:
          "تحصل طالبة صحة عامة في الهند على تدريب عملي عن بُعد مع مرشع مقره الولايات المتحدة يفهم أهدافها.",
        ed2Body: "الجغرافيا لم تعد تحد من التطوير المهني.",
        ed3Headline:
          "يُدرج مرشد سريري في مسيسيبي توافره ويتواصل فوراً مع الطلاب الذين يحتاجون إلى تدريب الآن.",
        ed3Body: "يدعم SandiLink كلا جانبي رحلة التعلم.",
        rg1Headline:
          "يتواصل باحث في نيروبي مع كاتب منح في لندن لإعداد طلب تمويل عالمي تنافسي.",
        rg1Body:
          "يسرع SandiLink البحث من خلال ربط الخبرات عبر الحدود.",
        rg2Headline:
          "تجد طالبة دكتوراه في شيكاغو محرر مجلة في جنوب أفريقيا لإرشادها في تقديم مخطوطتها.",
        rg2Body: "يصبح الدعم متاحاً وشخصياً وسريعاً.",
        rg3Headline:
          "تتعاون فريق بحث في البرازيل مع كتاب منح أمريكيين لتأمين تمويل لمشروع صحة مجتمعية.",
        rg3Body:
          "يقوي SandiLink الاكتشاف العالمي من خلال شراكات ذات معنى.",
      },
    },
    approach: {
      heading: "تصميم تكنولوجي يدور حول الناس — لا المؤسسات.",
      pillar1Title: "تصميم موجه نحو الإنسان",
      pillar1Body:
        "مبني حول التجارب الحقيقية والاحتياجات الحقيقية والتحديات الحقيقية التي يواجهها الناس الباحثون عن رعاية وتعليم وتعاون.",
      pillar2Title: "الإمكانية الوصول العالمية",
      pillar2Body:
        "مصمم للتوسع عبر الحدود والثقافات والمجتمعات — مما يجعل دعم الخبراء متاحاً للجميع، في كل مكان.",
      pillar3Title: "الثقة والشفافية",
      pillar3Body:
        "تصميم أخلاقي، وتواصل واضح، ومبادئ تضع المستخدم أولاً. يتم التحقق من كل محترف قبل الظهور.",
      pillar4Title: "الأتمتة بهدف",
      pillar4Body:
        "ربط ذكي، وسير عمل مبسط، وأدوات ذكية تقلل الاحتكاك حتى يمكن للناس التركيز على ما يهم.",
    },
    mission: {
      eyebrow: "مهمتنا",
      heading: "لأن الوصول يجب أن يكون بسيطاً — وليس مرهقاً.",
      lede: "تم إنشاء SandiLink لحل مشكلة عالمية: يكافح الناس في كل مكان للوصول إلى الرعاية، وتأمين التدريبات السريرية، أو العثور على دعم بحثي.",
      missionTitle: "مهمتنا",
      missionBody:
        "بناء أنظمة قابلة للتطوير وموجهة نحو الإنسان تمكّن الناس بغض النظر عن الجغرافيا أو الخلفية أو الموارد.",
      visionTitle: "رؤيتنا",
      visionBody:
        "عالم تكون فيه الرعاية الصحية متاحة، والتعليم مدعوم، والبحث تعاوني ومتصل عالمياً.",
      tileHealthcare: "الصحة",
      tileHealthcareValue: "متاحة",
      tileEducation: "التعليم",
      tileEducationValue: "مدعوم",
      tileResearch: "البحث",
      tileResearchValue: "متصل",
      tileCommunity: "المجتمع",
      tileCommunityValue: "عالمي",
    },
    community: {
      heading: "مجتمع عالمي من المستخدمين ومقدمي الخدمات والشركاء.",
      body: "يدعم SandiLink الأفراد والعائلات ومقدمي الرعاية الصحية والطلاب والمرشدين السريريين والباحثين وكتاب المنح والمجلات والمؤسسات حول العالم.",
      accent:
        "نبني نظاماً بيئياً متصلاً يقوي الرعاية والتعلم والاكتشاف.",
      cta: "انضم إلى المجتمع",
      roleServiceUsers: "مستخدمي الخدمات",
      roleProviders: "مقدمو الخدمات",
      roleStudents: "الطلاب",
      rolePreceptors: "المرشدون",
      roleResearchers: "الباحثون",
      roleGrantWriters: "كتاب المنح",
      roleInstitutions: "المؤسسات",
    },
    founding: {
      statProviders: "مقدمو الخدمات",
      statCountries: "الدول",
      statMarketplaces: "الأسواق",
      statMission: "المهمة",
      testimonialsHeading: "ماذا يقول أعضاؤنا",
      testimonialsBody: "أصوات حقيقية من أول مجتمع SandiLink.",
      founderBadge: "رسالة من مؤسستنا",
      founderQuote:
        "بنينا SandiLink لأن المواهب لا يجب أن تكون محدودة بالوصول. من الرعاية الصحية إلى الإرشاد السريري إلى البحث والمنح، نربط الناس عبر ثلاثة أسواق مخصصة. لقد بدأنا للتو — وكل من ينضم إلينا الآن يساعد في تشكيل ما سيأتي.",
      founderRole: "المؤسسة والرئيسة التنفيذية",
      founderCompany: "SandiLink",
      limitedTime: "وقت محدود",
      heading: "كن عضواً مؤسساً",
      subheading:
        "انضم الآن واحصل على مزايا حصرية محفوظة لأوائل أعضاء مجتمعنا.",
      benefit1Title: "وصول مبكر",
      benefit1Body:
        "كن من أوائل المستخدمين للأسواق الثلاثة: الخدمات الصحية، وPreceptor Connect™، والبحث والمنح.",
      benefit2Title: "الموضع المسبق",
      benefit2Body:
        "يحصل الأعضاء المؤسسون على موضع مسبق في الدليل، مما يجعلك أكثر وضوحاً للمتعلمين والمتعاونين والفرص.",
      benefit3Title: "مساهمة مباشرة في الميزات",
      benefit3Body:
        "شكّل المنصة. يحصل الأعضاء المؤسسون على خط مباشر مع فريق المنتج، وتؤثر ملاحظاتك على ما سنبنيه لاحقاً.",
      benefit4Title: "شارة عضو مؤسس مدى الحياة",
      benefit4Body:
        "شارة دائمة على ملفك الشخصي تشير إلى أنك كنت هنا منذ البداية — مرئية لكل مستخدم يعرض ملفك.",
      cta: "كن عضواً مؤسساً",
    },
    finalCta: {
      heading: "انضم إلى المنصة التي تعيد تعريف التواصل العالمي.",
      body: "أنشئ حسابك وابدأ بالتواصل مع مقدمي الرعاية الصحية والمرشدين والباحثين وكتاب المنح اليوم.",
      primary: "إنشاء حسابك",
      secondary: "تسجيل الدخول",
    },
  },
  sw: {
    hero: {
      badge: "Inamuaminika na wataalamu zaidi ya 500 katika nchi zaidi ya 20",
      headlinePart1: "Kuunganisha watu kwa",
      headlineHighlight: "huduma za afya, kujifunza, na utafiti",
      headlinePart2: "— popote duniani.",
      subheadline:
        "SandiLink ni soko la kimataifa linalounganisha watumiaji wa huduma za afya, watoa huduma, wanafunzi, waelekezi, watafiti, na waandishi wa ufadhili katika jukwaa moja la pamoja la kibinadamu.",
      primaryCta: "Anza",
      secondaryCta: "Vinjari Huduma",
    },
    explainer: {
      eyebrow: "Muhtasari wa sekunde 60",
      heading: "Ona SandiLink inavyofanya kazi.",
      subheading:
        "Je, ikiwa kuungana na huduma ya afya, mshauri, au mwandishi wa ufadhili ingekuwa rahisi kama kubofya mara moja?",
      placeholderTitle: "Video ya muhtasari wa sekunde 60",
      placeholderSubtitle:
        "Inakuja hivi karibuni — inayohifadhiwa kwenye YouTube, bofya kucheza.",
    },
    about: {
      eyebrow: "Kuhusu SandiLink",
      heading:
        "Jukwaa moja. Njia zisizo na kikomo za msaada na utaalamu.",
      lede: "Soko la kimataifa lililojengwa kwa upatikanaji, muunganiko, na fursa.",
      body: "SandiLink ni soko kuu la One Sandi Platform — lililoundwa kuondoa vizuizi na kurahisisha watu kupata msaada, utaalamu, na njia wanazohitaji. Mtu akitafuta huduma za afya, nafasi za mafunzo ya kliniki, au ushirikiano wa utafiti, SandiLink hukusanya kila kitu katika mfumo mmoja wa kueleweka, wa kujumuisha, na unaopatikana kimataifa.",
      tilesHealthcare: "Afya",
      tilesHealthcareDesc: "Watoa huduma, ustawi, walezi",
      tilesEducation: "Elimu",
      tilesEducationDesc: "Wanafunzi, waelekezi, shule",
      tilesResearch: "Utafiti",
      tilesResearchDesc: "Ufadhili, majarida, ushirikiano",
      tilesGlobal: "Kimataifa",
      tilesGlobalDesc: "Nchi 20+, dhamira moja",
    },
    marketplaces: {
      heading: "Jukwaa moja. Masoko matatu yanayounganishwa.",
      subheading: "Uwezekano usio na kikomo.",
      healthcare: {
        tag: "Huduma za Afya",
        title: "Soko la Huduma za Afya",
        lede: "Kituo cha upatikanaji wa kimataifa cha msaada wa afya.",
        body: "Watu binafsi, familia, na jamii zinaweza kuungana na wataalamu wa afya huru na wasio wataalamu — ikiwa ni pamoja na madaktari, muuguzi, watoa huduma za afya rafiki, walezi, wataalamu wa ustawi, wafanyakazi wa afya ya jamii, na washirika wa malezi ya msaada.",
        callout:
          "SandiLink inapanua upatikanaji, inapunguza vizuizi, na inasaidia watu kupata huduma sahihi kwa wakati sahihi.",
        cta: "Tafuta Mtoa Huduma",
        roleDoctors: "Madaktari & Wataalamu",
        roleNurses: "Muuguzi & Afya Rafiki",
        roleWellness: "Ustawi & Walezi",
        roleCommunity: "Wafanyakazi wa Afya ya Jamii",
      },
      education: {
        tag: "Preceptor Connect™",
        title: "Soko la Elimu",
        lede: "Njia maalum ya mahali pa mafunzo ya kliniki na uelekezaji.",
        bullet1: "Wanafunzi wanaweza kupata waelekezi na waalimu wa kliniki",
        bullet2: "Waelekezi wanaweza kuorodhesha upatikanaji wao na utaalamu wao",
        bullet3: "Shule na programu za kitaaluma zinapata muundo, uwazi, na uwazi",
        callout:
          "SandiLink hurahisisha mchakato wa kuweka wanafunzi katika mafunzo ya kliniki na inasaidia maendeleo ya kitaaluma.",
        cta: "Tafuta Mwelekezi",
        studentsLabel: "Wanafunzi",
        preceptorsLabel: "Waelekezi",
      },
      research: {
        tag: "Utafiti & Ufadhili",
        title: "Soko la Utafiti & Ufadhili",
        lede: "Kituo cha kimataifa cha ushirikiano wa utafiti na msaada wa ufadhili.",
        bullet1:
          "Watafiti wanaweza kuungana na waandishi wa ufadhili, kuchunguza ufadhili, na kufikia majarida",
        bullet2: "Waandishi wa ufadhili wanaweza kuonyesha utaalamu wao na kukuza biashara yao",
        bullet3: "Majarida na timu za kitaaluma zinapata nafasi moja ya ushirikiano",
        callout:
          "SandiLink inaunganisha jamii ya utafiti ya kimataifa na zana na watu wanazohitaji.",
        cta: "Tafuta Mwandishi wa Ufadhili",
        stat1Label: "Uchunguzi wa Ufadhili",
        stat1Value: "Ufadhili 1,200+",
        stat2Label: "Ulinganifu wa Wataalamu",
        stat2Value: "Wataalamu 67",
        stat3Label: "Upatikanaji wa Majarida",
        stat3Value: "Majarida 45+",
      },
    },
    whySandilink: {
      heading: "Kwa nini SandiLink?",
      subheading:
        "Majira halisi. Watu halisi. Kufikia halisi — katika masoko matatu.",
      groups: {
        healthcare: "Afya",
        education: "Elimu / Preceptor Connect™",
        research: "Utafiti & Ufadhili",
      },
      scenarios: {
        hc1Headline:
          "Mwanaume mjini Houston anaungana na daktari nchini Sierra Leone kumtunza mama yake — mipaka haina nguvu.",
        hc1Body:
          "SandiLink inawezesha familia kuratibu huduma za wapendwa wao barani mbalimbali.",
        hc2Headline:
          "Msichana mdogo mjini Atlanta anapata muuguzi mwenye kujulikana mjini Lagos kwa mwongozo wa afya ya uzazi mtandaoni.",
        hc2Body:
          "Upatikanaji wa huduma zinazolingana kiutamaduni unakuwa rahisi, salama, na moja kwa moja.",
        hc3Headline:
          "Mlezi mjini New Jersey anaungana na mfanyakazi wa afya ya jamii nchini Ghana kusaidia mahitaji ya kila siku ya baba yake mkongwe.",
        hc3Body:
          "SandiLink inapanua mitandao ya huduma zaidi ya jiografia, lugha, na rasilimali za ndani.",
        ed1Headline:
          "Mwanafunzi wa uuguzi nchini Ufilipino anaungana na mwelekezi aliyethibitishwa mjini Houston — hakuna mlinzi, hakuna orodha ya kusubiri.",
        ed1Body:
          "SandiLink inaondoa vizuizi vya kujifunza kliniki na uelekezaji.",
        ed2Headline:
          "Mwanafunzi wa afya ya umma nchini India anapata mafunzo ya mbali na mshauri kutoka Marekani anayeelewa malengo yake.",
        ed2Body: "Jiografia haikubagui tena maendeleo ya kitaaluma.",
        ed3Headline:
          "Mwelekezi mjini Mississippi anaorodhesha upatikanaji wake na anaunganika mara moja na wanafunzi wanaohitaji mahali sasa.",
        ed3Body: "SandiLink inasaidia pande zote mbili za safari ya kujifunza.",
        rg1Headline:
          "Mtafiti mjini Nairobi anaungana na mwandishi wa ufadhili mjini London kuandaa maombi ya ufadhili wa kimataifa.",
        rg1Body:
          "SandiLink inaongeza kasi ya utafiti kwa kuunganisha utaalamu kuvuka mipaka.",
        rg2Headline:
          "Mwanafunzi wa shahada ya uzamivu mjini Chicago anapata mhariri wa jarida Afrika Kusini kumwongoza katika uwasilishaji wa maandishi yake.",
        rg2Body: "Msaada unakuwa wa kufikiwa, wa kibinafsi, na kwa wakati.",
        rg3Headline:
          "Timu ya utafiti nchini Brazil inashirikiana na waandishi wa ufadhili kutoka Marekani kupata ufadhili wa mradi wa afya ya jamii.",
        rg3Body:
          "SandiLink inaimarisha ugunduzi wa kimataifa kupitia ushirikiano wa maana.",
      },
    },
    approach: {
      heading: "Teknolojia iliyoundwa kuzunguka watu — si taasisi.",
      pillar1Title: "Ubunifu Unaolenga Mtu",
      pillar1Body:
        "Imejengwa kuzunguka uzoefu halisi, mahitaji halisi, na changamoto halisi zinazokabili watu wanaotafuta huduma, elimu, na ushirikiano.",
      pillar2Title: "Upatikanaji wa Kimataifa",
      pillar2Body:
        "Imeundwa kupanua kuvuka mipaka, tamaduni, na jamii — ikifanya msaada wa wataalamu kuwa wa kufikiwa kwa kila mtu, popote.",
      pillar3Title: "Imani & Uwazi",
      pillar3Body:
        "Ubunifu wa maadili, mawasiliano ya wazi, na kanuni zinazolenga mtumiaji. Kila mtaalamu anathibitishwa kabla ya kuwa hai.",
      pillar4Title: "Uomatishaji kwa Lengo",
      pillar4Body:
        "Ulinganifu mwerevu, mtiririko wa kazi uliorahisishwa, na zana zenye akili zinazopunguza mgongano ili watu waweze kuzingatia muhimu.",
    },
    mission: {
      eyebrow: "Dhamira Yetu",
      heading: "Kwa sababu upatikanaji unapaswa kuwa rahisi — si wa kuleta msongo.",
      lede: "SandiLink iliundwa kutatua tatizo la kimataifa: watu kila mahali wanakumbana na upatikanaji wa huduma, kupata nafasi za mafunzo ya kliniki, au kupata msaada wa utafiti.",
      missionTitle: "Dhamira Yetu",
      missionBody:
        "Kujenga mifumo inayoweza kupanuliwa na inayolenga binadamu inayowawezesha watu bila kujali jiografia, asili, au rasilimali.",
      visionTitle: "Dira Yetu",
      visionBody:
        "Dunia ambapo huduma za afya zinapatikana, elimu inasaidiwa, na utafiti ni wa ushirikiano na umeunganishwa kimataifa.",
      tileHealthcare: "Afya",
      tileHealthcareValue: "Inayopatikana",
      tileEducation: "Elimu",
      tileEducationValue: "Inayosaidiwa",
      tileResearch: "Utafiti",
      tileResearchValue: "Umeunganishwa",
      tileCommunity: "Jamii",
      tileCommunityValue: "Ya Kimataifa",
    },
    community: {
      heading: "Jamii ya kimataifa ya watumiaji, watoa huduma, na washirika.",
      body: "SandiLink inasaidia watu binafsi, familia, watoa huduma za afya, wanafunzi, waelekezi, watafiti, waandishi wa ufadhili, majarida, na taasisi duniani kote.",
      accent:
        "Tunajenga mfumo wa kiikolojia uliounganika unaouimarisha huduma, kujifunza, na ugunduzi.",
      cta: "Jiunge na Jamii",
      roleServiceUsers: "Watumiaji wa Huduma",
      roleProviders: "Watoa Huduma",
      roleStudents: "Wanafunzi",
      rolePreceptors: "Waelekezi",
      roleResearchers: "Watafiti",
      roleGrantWriters: "Waandishi wa Ufadhili",
      roleInstitutions: "Taasisi",
    },
    founding: {
      statProviders: "Watoa Huduma",
      statCountries: "Nchi",
      statMarketplaces: "Masoko",
      statMission: "Dhamira",
      testimonialsHeading: "Wanachosema Wanachama Wetu",
      testimonialsBody: "Sauti halisi kutoka kwa jamii ya mapema ya SandiLink.",
      founderBadge: "Ujumbe kutoka kwa Mwanzilishi Wetu",
      founderQuote:
        "Tulijenga SandiLink kwa sababu kipaji hakipaswi kuwa na kikomo cha upatikanaji. Kutoka huduma za afya hadi uelekezaji wa kliniki hadi utafiti na ufadhili, tunaunganisha watu kuvuka masoko matatu yaliyotengenezwa kwa madhumuni. Tumekwisha tu — na kila mtu anayejiunga sasa husaidia kuunda kile kitakachokuja.",
      founderRole: "Mwanzilishi & Mkurugenzi Mtendaji",
      founderCompany: "SandiLink",
      limitedTime: "Muda Mfupi",
      heading: "Kuwa Mwanachama Mwanzilishi",
      subheading:
        "Jiunga sasa upokee faida za kipekee zilizohifadhiwa kwa wanachama wetu wa mapema.",
      benefit1Title: "Upatikanaji wa Mapema",
      benefit1Body:
        "Kuwa wa kwanza katika masoko matatu: Huduma za Afya, Preceptor Connect™, na Utafiti & Ufadhili.",
      benefit2Title: "Weka Kipaumbele",
      benefit2Body:
        "Wanachama wanaopatajiwa wanapokea nafasi ya kipaumbele katika orodha, ikifanya uweze kuonekana zaidi kwa wajifunzaji, washirika, na fursa.",
      benefit3Title: "Mchango Moja kwa Moja wa Vipengele",
      benefit3Body:
        "Chapa jukwaa. Wanachama wanaopatajiwa wanapokea mstari wa moja kwa moja wa timu ya bidhaa, na maoni yako yanayoathiri kile tunachojenga.",
      benefit4Title: "Bendi ya Mwanachama Mwanzilishi Maisha Yote",
      benefit4Body:
        "Bendi ya kudumu katika wasifu wako inayoashiria kuwa ulikuwa hapa tangu mwanzo — inayoonekana na kila mtumiaji anayeangalia wasifu wako.",
      cta: "Kuwa Mwanachama Mwanzilishi",
    },
    finalCta: {
      heading: "Jiunge na jukwaa linaloainisha upya muunganiko wa kimataifa.",
      body: "Unda akaunti yako and uanze kuunganika na watoa huduma za afya, waalimu, watafiti, na waandishi wa ufadhili leo.",
      primary: "Unda Akaunti Yako",
      secondary: "Ingia",
    },
  },
  zh: {
    hero: {
      badge: "受到 20 多个国家 500 多名专业人士的信赖",
      headlinePart1: "将人们与",
      headlineHighlight: "医疗、学习和研究",
      headlinePart2: "连接起来 — 遍及世界各地。",
      subheadline:
        "SandiLink 是全球性市场平台，将医疗服务用户、服务提供者、学生、临床导师、研究人员和资助撰写人汇聚在一个无缝、以人为中心的平台上。",
      primaryCta: "开始使用",
      secondaryCta: "浏览服务",
    },
    explainer: {
      eyebrow: "60 秒概览",
      heading: "了解 SandiLink 如何运作。",
      subheading: "如果连接医疗、导师或资助撰写人可以像一键点击一样简单呢？",
      placeholderTitle: "60 秒讲解视频",
      placeholderSubtitle: "即将推出 — 托管于 YouTube，点击播放。",
    },
    about: {
      eyebrow: "关于 SandiLink",
      heading: "一个平台。无限的支持与专业途径。",
      lede: "一个为全球通达、连接与机遇而打造的市场。",
      body: "SandiLink 是 One Sandi 平台的旗舰市场 — 旨在消除障碍，让人们更轻松地找到所需的支持、专业知识和路径。无论是寻求医疗服务、临床实习还是研究合作，SandiLink 都将一切汇聚在一个直观、包容且全球可及的系统中。",
      tilesHealthcare: "医疗",
      tilesHealthcareDesc: "服务提供者、健康、护理人员",
      tilesEducation: "教育",
      tilesEducationDesc: "学生、导师、学校",
      tilesResearch: "研究",
      tilesResearchDesc: "资助、期刊、合作",
      tilesGlobal: "全球",
      tilesGlobalDesc: "20 多个国家，同一个使命",
    },
    marketplaces: {
      heading: "一个平台。三个互联互通的市场。",
      subheading: "无限可能。",
      healthcare: {
        tag: "医疗服务",
        title: "医疗服务市场",
        lede: "全球医疗支持接入点。",
        body: "个人、家庭和社区可以与独立的医疗专业人员和非专业人员建立联系 — 包括医生、护士、联合医疗提供者、护理人员、健康从业者、社区卫生工作者和支持性护理伙伴。",
        callout: "SandiLink 扩大可及性，减少障碍，帮助人们在正确的时间找到正确的护理。",
        cta: "寻找服务提供者",
        roleDoctors: "医生与专家",
        roleNurses: "护士与联合医疗",
        roleWellness: "健康与护理人员",
        roleCommunity: "社区卫生工作者",
      },
      education: {
        tag: "Preceptor Connect™",
        title: "教育市场",
        lede: "专注于临床实习和指导的专属通道。",
        bullet1: "学生可以找到临床导师和带教老师",
        bullet2: "导师可以列出自己的空闲时间和专业领域",
        bullet3: "学校和学术项目获得结构、清晰度和透明度",
        callout: "SandiLink 简化临床实习流程，支持职业发展。",
        cta: "寻找临床导师",
        studentsLabel: "学生",
        preceptorsLabel: "导师",
      },
      research: {
        tag: "研究与资助",
        title: "研究与资助市场",
        lede: "全球研究合作与资助支持中心。",
        bullet1: "研究人员可以连接资助撰写人、探索资助机会并访问期刊",
        bullet2: "资助撰写人可以展示专业知识并拓展业务",
        bullet3: "期刊和学术团队获得统一的协作空间",
        callout: "SandiLink 将全球研究社区与他们需要的工具和人员连接起来。",
        cta: "寻找资助撰写人",
        stat1Label: "资助发现",
        stat1Value: "1,200+ 项资助",
        stat2Label: "专家匹配",
        stat2Value: "67 位专家",
        stat3Label: "期刊访问",
        stat3Value: "45+ 种期刊",
      },
    },
    whySandilink: {
      heading: "为什么选择 SandiLink？",
      subheading: "真实场景。真实人物。真实影响力 — 跨越三个市场。",
      groups: {
        healthcare: "医疗",
        education: "教育 / Preceptor Connect™",
        research: "研究与资助",
      },
      scenarios: {
        hc1Headline: "休斯顿的一位儿子与塞拉利昂的一位医生建立联系，为母亲提供护理 — 国界不再是障碍。",
        hc1Body: "SandiLink 让家庭能够跨越大洲协调亲人的护理。",
        hc2Headline: "亚特兰大的一位年轻女性找到了拉各斯一位值得信赖的执业护士，获得虚拟生殖健康指导。",
        hc2Body: "获得文化契合的医疗服务变得简单、安全且直接。",
        hc3Headline: "新泽西州的一位护理人员与加纳的一位社区卫生工作者建立联系，帮助支持年迈父亲的日常需求。",
        hc3Body: "SandiLink 将护理网络扩展到地理、语言和本地资源之外。",
        ed1Headline: "菲律宾的一位护理专业学生与休斯顿一位通过委员会认证的临床导师建立联系 — 无需中间人，没有等待名单。",
        ed1Body: "SandiLink 消除了临床学习和指导的障碍。",
        ed2Headline: "印度的一位公共卫生学生在美国导师的指导下获得了远程实习机会，导师理解她的目标。",
        ed2Body: "地理不再限制职业发展。",
        ed3Headline: "密西西比州的一位导师列出空闲时间，立即与现在需要实习安排的学生建立联系。",
        ed3Body: "SandiLink 支持学习旅程的双方。",
        rg1Headline: "内罗毕的一位研究人员与伦敦的一位资助撰写人建立联系，准备一份有竞争力的全球资助申请。",
        rg1Body: "SandiLink 通过连接跨境专业知识加速研究。",
        rg2Headline: "芝加哥的一位博士生找到了南非的一位期刊编辑，指导她提交稿件。",
        rg2Body: "支持变得可及、个性化且及时。",
        rg3Headline: "巴西的一个研究团队与美国的资助撰写人合作，为一个社区卫生项目争取资金。",
        rg3Body: "SandiLink 通过有意义的合作伙伴关系加强全球发现。",
      },
    },
    approach: {
      heading: "围绕人而非机构设计的科技。",
      pillar1Title: "以人为本的设计",
      pillar1Body: "围绕寻求医疗、教育和合作的人们所面临的真实经历、真实需求和真实挑战而构建。",
      pillar2Title: "全球可及性",
      pillar2Body: "旨在跨越国界、文化和社区进行扩展 — 让每个人都能随时随地获得专家支持。",
      pillar3Title: "信任与透明",
      pillar3Body: "道德设计、清晰沟通和用户至上原则。每位专业人士上线前都经过验证。",
      pillar4Title: "有目的的自动化",
      pillar4Body: "智能匹配、精简的工作流程和智能工具，减少摩擦，让人们能够专注于重要的事情。",
    },
    mission: {
      eyebrow: "我们的使命",
      heading: "因为获取应该简单 — 而不是令人压力重重。",
      lede: "SandiLink 的创立是为了解决一个全球性问题：各地的人们都在努力获取医疗服务、确保临床实习或找到研究支持。",
      missionTitle: "我们的使命",
      missionBody: "构建可扩展的、以人为本的系统，使人们无论地理位置、背景或资源如何都能获得自主权。",
      visionTitle: "我们的愿景",
      visionBody: "一个医疗保健可及、教育受支持、研究具有协作性和全球连接性的世界。",
      tileHealthcare: "医疗",
      tileHealthcareValue: "可及",
      tileEducation: "教育",
      tileEducationValue: "受支持",
      tileResearch: "研究",
      tileResearchValue: "互联",
      tileCommunity: "社区",
      tileCommunityValue: "全球",
    },
    community: {
      heading: "一个由用户、服务提供者和合作伙伴组成的全球社区。",
      body: "SandiLink 支持全球各地的个人、家庭、医疗服务提供者、学生、临床导师、研究人员、资助撰写人、期刊和机构。",
      accent: "我们正在构建一个互联的生态系统，加强护理、学习和发现。",
      cta: "加入社区",
      roleServiceUsers: "服务用户",
      roleProviders: "服务提供者",
      roleStudents: "学生",
      rolePreceptors: "导师",
      roleResearchers: "研究人员",
      roleGrantWriters: "资助撰写人",
      roleInstitutions: "机构",
    },
    founding: {
      statProviders: "服务提供者",
      statCountries: "国家",
      statMarketplaces: "市场",
      statMission: "使命",
      testimonialsHeading: "会员怎么说",
      testimonialsBody: "来自 SandiLink 最早社区的真实声音。",
      founderBadge: "来自创始人的寄语",
      founderQuote: "我们创立 SandiLink，是因为才华不应该被获取途径所限制。从医疗到临床指导，再到研究和资助，我们通过三个专门构建的市场将人们连接起来。我们才刚刚开始 — 现在加入的每个人都将帮助塑造未来。",
      founderRole: "创始人兼首席执行官",
      founderCompany: "SandiLink",
      limitedTime: "限时",
      heading: "成为创始会员",
      subheading: "立即加入，享受我们最早社区会员的专属福利。",
      benefit1Title: "抢先体验",
      benefit1Body: "率先进入所有三个市场：医疗服务、Preceptor Connect™ 和研究与资助。",
      benefit2Title: "优先展示",
      benefit2Body: "创始会员在目录中获得优先位置，让您对学习者、合作者和机会更加可见。",
      benefit3Title: "直接参与功能设计",
      benefit3Body: "塑造平台。创始会员与产品团队直接沟通，您的反馈将影响我们下一步的构建。",
      benefit4Title: "终身创始会员徽章",
      benefit4Body: "个人资料上的永久徽章，标志着您从一开始就参与其中 — 每个查看您资料的用户都能看到。",
      cta: "成为创始会员",
    },
    finalCta: {
      heading: "加入重新定义全球连接的平台。",
      body: "创建您的账户，今天就开始与医疗服务提供者、导师、研究人员和资助撰写人建立联系。",
      primary: "创建您的账户",
      secondary: "登录",
    },
  },
  hi: {
    hero: {
      badge: "20 से अधिक देशों में 500+ पेशेवरों द्वारा विश्वसनीय",
      headlinePart1: "लोगों को जोड़ना",
      headlineHighlight: "देखभाल, सीखने और अनुसंधान",
      headlinePart2: "से — दुनिया में कहीं भी।",
      subheadline:
        "SandiLink एक वैश्विक बाज़ार है जो स्वास्थ्य सेवा उपयोगकर्ताओं, प्रदाताओं, छात्रों, प्रिसेप्टरों, शोधकर्ताओं और अनुदान लेखकों को एक सहज, मानव-केंद्रित प्लेटफ़ॉर्म पर एक साथ लाता है।",
      primaryCta: "शुरू करें",
      secondaryCta: "सेवाएँ ब्राउज़ करें",
    },
    explainer: {
      eyebrow: "60-सेकंड का अवलोकन",
      heading: "देखें कि SandiLink कैसे काम करता है।",
      subheading: "क्या हो अगर देखभाल, मेंटर, या अनुदान लेखक से जुड़ना एक क्लिक जितना आसान हो?",
      placeholderTitle: "60-सेकंड की समझाने वाली वीडियो",
      placeholderSubtitle: "जल्द ही आ रहा है — YouTube पर होस्ट किया गया, क्लिक-टू-प्ले।",
    },
    about: {
      eyebrow: "SandiLink के बारे में",
      heading: "एक प्लेटफ़ॉर्म। सहायता और विशेषज्ञता के असीमित रास्ते।",
      lede: "पहुँच, जुड़ाव और अवसर के लिए बना एक वैश्विक बाज़ार।",
      body: "SandiLink One Sandi Platform का प्रमुख बाज़ार है — जो बाधाओं को दूर करने और लोगों को वह सहायता, विशेषज्ञता और रास्ते खोजने में आसान बनाने के लिए डिज़ाइन किया गया है जिनकी उन्हें ज़रूरत है। चाहे कोई स्वास्थ्य सेवाएँ, नैदानिक प्लेसमेंट, या अनुसंधान सहयोग खोज रहा हो, SandiLink सब कुछ एक सहज, समावेशी और वैश्विक रूप से सुलभ प्रणाली में लाता है।",
      tilesHealthcare: "स्वास्थ्य",
      tilesHealthcareDesc: "प्रदाता, कल्याण, देखभालकर्ता",
      tilesEducation: "शिक्षा",
      tilesEducationDesc: "छात्र, प्रिसेप्टर, स्कूल",
      tilesResearch: "अनुसंधान",
      tilesResearchDesc: "अनुदान, पत्रिकाएँ, सहयोग",
      tilesGlobal: "वैश्विक",
      tilesGlobalDesc: "20+ देश, एक मिशन",
    },
    marketplaces: {
      heading: "एक प्लेटफ़ॉर्म। तीन परस्पर जुड़े बाज़ार।",
      subheading: "असीमित संभावनाएँ।",
      healthcare: {
        tag: "स्वास्थ्य सेवाएँ",
        title: "स्वास्थ्य सेवाओं का बाज़ार",
        lede: "स्वास्थ्य सहायता के लिए एक वैश्विक पहुँच बिंदु।",
        body: "व्यक्ति, परिवार और समुदाय स्वतंत्र स्वास्थ्य पेशेवरों और गैर-पेशेवरों से जुड़ सकते हैं — जिसमें डॉक्टर, नर्स, संबद्ध स्वास्थ्य प्रदाता, देखभालकर्ता, कल्याण प्रचारक, सामुदायिक स्वास्थ्य कार्यकर्ता और सहायक देखभाल साथी शामिल हैं।",
        callout: "SandiLink पहुँच बढ़ाता है, बाधाएँ कम करता है, और लोगों को सही समय पर सही देखभाल खोजने में मदद करता है।",
        cta: "प्रदाता खोजें",
        roleDoctors: "डॉक्टर और विशेषज्ञ",
        roleNurses: "नर्स और संबद्ध स्वास्थ्य",
        roleWellness: "कल्याण और देखभालकर्ता",
        roleCommunity: "सामुदायिक स्वास्थ्य कार्यकर्ता",
      },
      education: {
        tag: "Preceptor Connect™",
        title: "शिक्षा बाज़ार",
        lede: "नैदानिक प्लेसमेंट और मेंटरशिप के लिए एक समर्पित मार्ग।",
        bullet1: "छात्र प्रिसेप्टर और नैदानिक मेंटर खोज सकते हैं",
        bullet2: "प्रिसेप्टर अपनी उपलब्धता और विशेषज्ञता सूचीबद्ध कर सकते हैं",
        bullet3: "स्कूल और शैक्षणिक कार्यक्रमों को संरचना, स्पष्टता और पारदर्शिता मिलती है",
        callout: "SandiLink नैदानिक प्लेसमेंट प्रक्रिया को सरल बनाता है और व्यावसायिक विकास का समर्थन करता है।",
        cta: "प्रिसेप्टर खोजें",
        studentsLabel: "छात्र",
        preceptorsLabel: "प्रिसेप्टर",
      },
      research: {
        tag: "अनुसंधान और अनुदान",
        title: "अनुसंधान और अनुदान बाज़ार",
        lede: "अनुसंधान सहयोग और वित्त पोषण सहायता के लिए एक वैश्विक केंद्र।",
        bullet1: "शोधकर्ता अनुदान लेखकों से जुड़ सकते हैं, वित्त पोषण का पता लगा सकते हैं, और पत्रिका मार्गों तक पहुँच सकते हैं",
        bullet2: "अनुदान लेखक विशेषज्ञता प्रदर्शित कर सकते हैं और अपना अभ्यास बढ़ा सकते हैं",
        bullet3: "पत्रिकाओं और अकादमिक टीमों को सहयोग के लिए एक एकीकृत स्थान मिलता है",
        callout: "SandiLink वैश्विक अनुसंधान समुदाय को उन उपकरणों और लोगों से जोड़ता है जिनकी उन्हें ज़रूरत है।",
        cta: "अनुदान लेखक खोजें",
        stat1Label: "अनुदान खोज",
        stat1Value: "1,200+ अनुदान",
        stat2Label: "लेखक मिलान",
        stat2Value: "67 विशेषज्ञ",
        stat3Label: "पत्रिका पहुँच",
        stat3Value: "45+ पत्रिकाएँ",
      },
    },
    whySandilink: {
      heading: "SandiLink क्यों?",
      subheading: "वास्तविक परिदृश्य। वास्तविक लोग। वास्तविक पहुँच — तीन बाज़ारों में।",
      groups: {
        healthcare: "स्वास्थ्य",
        education: "शिक्षा / Preceptor Connect™",
        research: "अनुसंधान और अनुदान",
      },
      scenarios: {
        hc1Headline: "ह्यूस्टन में एक बेटा सिएरा लियोन में एक डॉक्टर से अपनी माँ की देखभाल के लिए जुड़ता है — सीमाएँ बाधा नहीं बनतीं।",
        hc1Body: "SandiLink परिवारों को महाद्वीपों में प्रियजनों की देखभाल समन्वयित करना संभव बनाता है।",
        hc2Headline: "अटलांटा में एक युवा महिला लागोस में एक विश्वसनीय नर्स प्रैक्टिशनर से वर्चुअल प्रजनन स्वास्थ्य मार्गदर्शन के लिए जुड़ती है।",
        hc2Body: "सांस्कृतिक रूप से संरेखित देखभाल तक पहुँच सरल, सुरक्षित और सीधी हो जाती है।",
        hc3Headline: "न्यू जर्सी में एक देखभालकर्ता घाना में एक सामुदायिक स्वास्थ्य कार्यकर्ता से अपने बुज़ुर्ग पिता की दैनिक ज़रूरतों का समर्थन करने के लिए जुड़ता है।",
        hc3Body: "SandiLink देखभाल नेटवर्क को भूगोल, भाषा और स्थानीय संसाधनों से आगे बढ़ाता है।",
        ed1Headline: "फिलीपींस में एक नर्सिंग छात्रा ह्यूस्टन में एक बोर्ड-प्रमाणित प्रिसेप्टर से जुड़ती है — कोई प्रवेशद्वार नहीं, कोई प्रतीक्षा सूची नहीं।",
        ed1Body: "SandiLink नैदानिक सीखने और मेंटरशिप की बाधाओं को दूर करता है।",
        ed2Headline: "भारत में एक सार्वजनिक स्वास्थ्य छात्रा अमेरिका में एक मेंटर के साथ दूरस्थ अभ्यास सुरक्षित करती है जो उसके लक्ष्यों को समझता है।",
        ed2Body: "भूगोल अब व्यावसायिक विकास को सीमित नहीं करता।",
        ed3Headline: "मिसिसिपी में एक प्रिसेप्टर उपलब्धता सूचीबद्ध करता है और तुरंत उन छात्रों से जुड़ता है जिन्हें अभी प्लेसमेंट की ज़रूरत है।",
        ed3Body: "SandiLink सीखने की यात्रा दोनों पक्षों का समर्थन करता है।",
        rg1Headline: "नैरोबी में एक शोधकर्ता लंदन में एक अनुदान लेखक से एक प्रतिस्पर्धी वैश्विक वित्त पोषण आवेदन तैयार करने के लिए जुड़ता है।",
        rg1Body: "SandiLink सीमाओं में विशेषज्ञता को जोड़कर अनुसंधान को तेज़ करता है।",
        rg2Headline: "शिकागो में एक डॉक्टरेट छात्रा दक्षिण अफ्रीका में एक पत्रिका संपादक को अपने पांडुलिपि जमा करने का मार्गदर्शन करने के लिए खोजती है।",
        rg2Body: "सहायता सुलभ, व्यक्तिगत और समय पर हो जाती है।",
        rg3Headline: "ब्राज़ील में एक अनुसंधान टीम एक सामुदायिक स्वास्थ्य परियोजना के लिए वित्त पोषण सुरक्षित करने के लिए अमेरिकी अनुदान लेखकों के साथ सहयोग करती है।",
        rg3Body: "SandiLink सार्थक भागीदारी के माध्यम से वैश्विक खोज को मज़बूत करता है।",
      },
    },
    approach: {
      heading: "लोगों के इर्द-गिर्द डिज़ाइन की गई तकनीक — संस्थानों के नहीं।",
      pillar1Title: "मानव-केंद्रित डिज़ाइन",
      pillar1Body: "वास्तविक अनुभवों, वास्तविक ज़रूरतों और वास्तविक चुनौतियों के इर्द-गिर्द बना है जिनका सामना देखभाल, शिक्षा और सहयोग खोजने वाले लोग करते हैं।",
      pillar2Title: "वैश्विक पहुँच",
      pillar2Body: "सीमाओं, संस्कृतियों और समुदायों में स्केल करने के लिए डिज़ाइन किया गया — हर किसी को हर जगह विशेषज्ञ सहायता उपलब्ध कराना।",
      pillar3Title: "विश्वास और पारदर्शिता",
      pillar3Body: "नैतिक डिज़ाइन, स्पष्ट संचार और उपयोगकर्ता-प्रथम सिद्धांत। हर पेशेवर को लाइव जाने से पहले सत्यापित किया जाता है।",
      pillar4Title: "उद्देश्य के साथ स्वचालन",
      pillar4Body: "स्मार्ट मिलान, सुव्यवस्थित कार्यप्रवाह और बुद्धिमान उपकरण जो घर्षण कम करते हैं ताकि लोग महत्वपूर्ण चीज़ों पर ध्यान केंद्रित कर सकें।",
    },
    mission: {
      eyebrow: "हमारा मिशन",
      heading: "क्योंकि पहुँच सरली होनी चाहिए — तनावपूर्ण नहीं।",
      lede: "SandiLink को एक वैश्विक समस्या को हल करने के लिए बनाया गया था: हर जगह लोग देखभाल तक पहुँचने, नैदानिक प्लेसमेंट सुरक्षित करने, या अनुसंधान सहायता खोजने के लिए संघर्ष कर रहे हैं।",
      missionTitle: "हमारा मिशन",
      missionBody: "ऐसी स्केलेबल, मानव-केंद्रित प्रणालियाँ बनाना जो भूगोल, पृष्ठभूमि या संसाधनों की परवाह किए बिना लोगों को सशक्त बनाती हैं।",
      visionTitle: "हमारा दृष्टिकोण",
      visionBody: "एक ऐसी दुनिया जहाँ स्वास्थ्य सुलभ है, शिक्षा समर्थित है, और अनुसंधान सहयोगी और वैश्विक रूप से जुड़ा हुआ है।",
      tileHealthcare: "स्वास्थ्य",
      tileHealthcareValue: "सुलभ",
      tileEducation: "शिक्षा",
      tileEducationValue: "समर्थित",
      tileResearch: "अनुसंधान",
      tileResearchValue: "जुड़ा हुआ",
      tileCommunity: "समुदाय",
      tileCommunityValue: "वैश्विक",
    },
    community: {
      heading: "उपयोगकर्ताओं, प्रदाताओं और भागीदारों का एक वैश्विक समुदाय।",
      body: "SandiLink दुनिया भर में व्यक्तियों, परिवारों, स्वास्थ्य सेवा प्रदाताओं, छात्रों, प्रिसेप्टरों, शोधकर्ताओं, अनुदान लेखकों, पत्रिकाओं और संस्थानों का समर्थन करता है।",
      accent: "हम एक जुड़ा हुआ पारिस्थितिकी तंत्र बना रहे हैं जो देखभाल, सीखने और खोज को मज़बूत करता है।",
      cta: "समुदाय में शामिल हों",
      roleServiceUsers: "सेवा उपयोगकर्ता",
      roleProviders: "प्रदाता",
      roleStudents: "छात्र",
      rolePreceptors: "प्रिसेप्टर",
      roleResearchers: "शोधकर्ता",
      roleGrantWriters: "अनुदान लेखक",
      roleInstitutions: "संस्थान",
    },
    founding: {
      statProviders: "प्रदाता",
      statCountries: "देश",
      statMarketplaces: "बाज़ार",
      statMission: "मिशन",
      testimonialsHeading: "हमारे सदस्य क्या कहते हैं",
      testimonialsBody: "SandiLink के सबसे पहले समुदाय की असली आवाज़ें।",
      founderBadge: "हमारे संस्थापक का संदेश",
      founderQuote: "हमने SandiLink इसलिए बनाया क्योंकि प्रतिभा पहुँच तक सीमित नहीं होनी चाहिए। स्वास्थ्य सेवा से लेकर नैदानिक mentoring, अनुसंधान और अनुदान तक, हम लोगों को तीन विशेष रूप से निर्मित बाज़ारों में जोड़ते हैं। हम अभी शुरुआत कर रहे हैं — और अभी शामिल होने वाला हर व्यक्ति भविष्य को आकार देने में मदद करता है।",
      founderRole: "संस्थापक और CEO",
      founderCompany: "SandiLink",
      limitedTime: "सीमित समय",
      heading: "संस्थापक सदस्य बनें",
      subheading: "अभी शामिल हों और हमारे सबसे पहले सदस्यों के लिए आरक्षित विशेष लाभ प्राप्त करें।",
      benefit1Title: "जल्दी पहुँच",
      benefit1Body: "तीनों बाज़ारों में सबसे पहले: स्वास्थ्य सेवाएँ, Preceptor Connect™, और अनुसंधान और अनुदान।",
      benefit2Title: "प्राथमिकता स्थान",
      benefit2Body: "संस्थापक सदस्यों को निर्देशिका में प्राथमिकता स्थान मिलता है, जिससे आप सीखने वालों, सहयोगियों और अवसरों के लिए अधिक दृश्यमान होते हैं।",
      benefit3Title: "सुविधाओं पर सीधा योगदान",
      benefit3Body: "प्लेटफ़ॉर्म को आकार दें। संस्थापक सदस्यों को उत्पाद टीम के साथ सीधा संपर्क मिलता है, और आपकी प्रतिक्रिया हमारे अगले निर्माण को प्रभावित करती है।",
      benefit4Title: "जीवनभर संस्थापक सदस्य बैज",
      benefit4Body: "आपकी प्रोफ़ाइल पर एक स्थायी बैज जो यह संकेत देता है कि आप शुरुआत से यहाँ थे — हर उपयोगकर्ता के लिए दृश्यमान जो आपकी प्रोफ़ाइल देखता है।",
      cta: "संस्थापक सदस्य बनें",
    },
    finalCta: {
      heading: "उस प्लेटफ़ॉर्म से जुड़ें जो वैश्विक जुड़ाव को फिर से परिभाषित कर रहा है।",
      body: "अपना खाता बनाएँ और आज ही स्वास्थ्य सेवा प्रदाताओं, मेंटर, शोधकर्ताओं और अनुदान लेखकों से जुड़ना शुरू करें।",
      primary: "अपना खाता बनाएँ",
      secondary: "साइन इन करें",
    },
  },
};

async function applyTranslations() {
  for (const [code, translations] of Object.entries(TRANSLATIONS)) {
    const path = join(MESSAGES_DIR, `${code}.json`);
    const data = JSON.parse(await readFile(path, "utf8"));
    data.landing = translations;
    await writeFile(path, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`Updated ${code}.json`);
  }
}

applyTranslations().catch((err) => {
  console.error(err);
  process.exit(1);
});
