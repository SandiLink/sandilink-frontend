#!/usr/bin/env node
/**
 * Sidebar + chrome translation pass — closes the most-visible English gap
 * across every authenticated page (sidebar nav, group labels, user
 * dropdown, topbar search/notifications). 65 unique nav items + 12 group
 * labels + topbar/dropdown chrome.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

const T = {
  sidebar: {
    groups: {
      overview: { en: "Overview", es: "Resumen", fr: "Aperçu", pt: "Visão geral", ar: "نظرة عامة", sw: "Muhtasari", zh: "概览", hi: "अवलोकन" },
      menu: { en: "Menu", es: "Menú", fr: "Menu", pt: "Menu", ar: "القائمة", sw: "Menyu", zh: "菜单", hi: "मेनू" },
      content: { en: "Content", es: "Contenido", fr: "Contenu", pt: "Conteúdo", ar: "المحتوى", sw: "Maudhui", zh: "内容", hi: "सामग्री" },
      account: { en: "Account", es: "Cuenta", fr: "Compte", pt: "Conta", ar: "الحساب", sw: "Akaunti", zh: "帐户", hi: "खाता" },
      configuration: { en: "Configuration", es: "Configuración", fr: "Configuration", pt: "Configuração", ar: "الإعدادات", sw: "Usanidi", zh: "配置", hi: "कॉन्फ़िगरेशन" },
      research: { en: "Research", es: "Investigación", fr: "Recherche", pt: "Pesquisa", ar: "الأبحاث", sw: "Utafiti", zh: "研究", hi: "अनुसंधान" },
      system: { en: "System", es: "Sistema", fr: "Système", pt: "Sistema", ar: "النظام", sw: "Mfumo", zh: "系统", hi: "सिस्टम" },
      internationalization: { en: "Internationalization", es: "Internacionalización", fr: "Internationalisation", pt: "Internacionalização", ar: "التدويل", sw: "Mataifa", zh: "国际化", hi: "अंतर्राष्ट्रीयकरण" },
      catalogs: { en: "Catalogs", es: "Catálogos", fr: "Catalogues", pt: "Catálogos", ar: "الكتالوجات", sw: "Katalogi", zh: "目录", hi: "कैटलॉग" },
      insights: { en: "Insights", es: "Información", fr: "Analyses", pt: "Insights", ar: "رؤى", sw: "Maarifa", zh: "洞察", hi: "अंतर्दृष्टि" },
      work: { en: "Work", es: "Trabajo", fr: "Travail", pt: "Trabalho", ar: "العمل", sw: "Kazi", zh: "工作", hi: "काम" },
      discover: { en: "Discover", es: "Descubrir", fr: "Découvrir", pt: "Descobrir", ar: "اكتشف", sw: "Gundua", zh: "发现", hi: "खोजें" },
    },
    items: {
      dashboard: { en: "Dashboard", es: "Panel", fr: "Tableau de bord", pt: "Painel", ar: "لوحة التحكم", sw: "Dashibodi", zh: "仪表板", hi: "डैशबोर्ड" },
      analytics: { en: "Analytics", es: "Analíticas", fr: "Analytique", pt: "Análises", ar: "التحليلات", sw: "Uchanganuzi", zh: "分析", hi: "एनालिटिक्स" },
      users: { en: "Users", es: "Usuarios", fr: "Utilisateurs", pt: "Usuários", ar: "المستخدمون", sw: "Watumiaji", zh: "用户", hi: "उपयोगकर्ता" },
      flaggedContent: { en: "Flagged Content", es: "Contenido reportado", fr: "Contenu signalé", pt: "Conteúdo sinalizado", ar: "المحتوى المُبلَّغ", sw: "Maudhui yaliyoripotiwa", zh: "已标记内容", hi: "ध्वजांकित सामग्री" },
      disputes: { en: "Disputes", es: "Disputas", fr: "Litiges", pt: "Disputas", ar: "النزاعات", sw: "Migogoro", zh: "争议", hi: "विवाद" },
      moderation: { en: "Moderation", es: "Moderación", fr: "Modération", pt: "Moderação", ar: "الإشراف", sw: "Usimamizi", zh: "审核", hi: "मॉडरेशन" },
      reviews: { en: "Reviews", es: "Reseñas", fr: "Avis", pt: "Avaliações", ar: "المراجعات", sw: "Hakiki", zh: "评价", hi: "समीक्षाएँ" },
      plans: { en: "Plans", es: "Planes", fr: "Formules", pt: "Planos", ar: "الخطط", sw: "Mipango", zh: "方案", hi: "योजनाएँ" },
      commission: { en: "Commission", es: "Comisión", fr: "Commission", pt: "Comissão", ar: "العمولة", sw: "Kamisheni", zh: "佣金", hi: "कमीशन" },
      matching: { en: "Matching", es: "Emparejamiento", fr: "Mise en relation", pt: "Correspondência", ar: "المطابقة", sw: "Ulinganishaji", zh: "匹配", hi: "मिलान" },
      payments: { en: "Payments", es: "Pagos", fr: "Paiements", pt: "Pagamentos", ar: "المدفوعات", sw: "Malipo", zh: "支付", hi: "भुगतान" },
      templates: { en: "Templates", es: "Plantillas", fr: "Modèles", pt: "Modelos", ar: "القوالب", sw: "Violezo", zh: "模板", hi: "टेम्प्लेट" },
      researchers: { en: "Researchers", es: "Investigadores", fr: "Chercheurs", pt: "Pesquisadores", ar: "الباحثون", sw: "Watafiti", zh: "研究人员", hi: "शोधकर्ता" },
      grantWriters: { en: "Grant Writers", es: "Redactores de subvenciones", fr: "Rédacteurs de subventions", pt: "Redatores de subvenções", ar: "كتّاب المنح", sw: "Waandishi wa ufadhili", zh: "资助撰写者", hi: "अनुदान लेखक" },
      grantsDirectory: { en: "Grants Directory", es: "Directorio de subvenciones", fr: "Annuaire des subventions", pt: "Diretório de subvenções", ar: "دليل المنح", sw: "Saraka ya ufadhili", zh: "资助目录", hi: "अनुदान निर्देशिका" },
      journals: { en: "Journals", es: "Revistas", fr: "Revues", pt: "Periódicos", ar: "المجلات", sw: "Majarida", zh: "期刊", hi: "जर्नल" },
      researchAnalytics: { en: "Research Analytics", es: "Análisis de investigación", fr: "Analytique recherche", pt: "Análises de pesquisa", ar: "تحليلات الأبحاث", sw: "Uchanganuzi wa utafiti", zh: "研究分析", hi: "अनुसंधान एनालिटिक्स" },
      researchMatching: { en: "Research Matching", es: "Emparejamiento de investigación", fr: "Mise en relation recherche", pt: "Correspondência de pesquisa", ar: "مطابقة الأبحاث", sw: "Ulinganishaji wa utafiti", zh: "研究匹配", hi: "अनुसंधान मिलान" },
      researcherPlans: { en: "Researcher Plans", es: "Planes para investigadores", fr: "Formules chercheur", pt: "Planos para pesquisadores", ar: "خطط الباحثين", sw: "Mipango ya watafiti", zh: "研究人员方案", hi: "शोधकर्ता योजनाएँ" },
      writerCommission: { en: "Writer Commission", es: "Comisión del redactor", fr: "Commission rédacteur", pt: "Comissão do redator", ar: "عمولة الكاتب", sw: "Kamisheni ya mwandishi", zh: "撰写者佣金", hi: "लेखक कमीशन" },
      languages: { en: "Languages", es: "Idiomas", fr: "Langues", pt: "Idiomas", ar: "اللغات", sw: "Lugha", zh: "语言", hi: "भाषाएँ" },
      translations: { en: "Translations", es: "Traducciones", fr: "Traductions", pt: "Traduções", ar: "الترجمات", sw: "Tafsiri", zh: "翻译", hi: "अनुवाद" },
      localizedContent: { en: "Localized Content", es: "Contenido localizado", fr: "Contenu localisé", pt: "Conteúdo localizado", ar: "المحتوى المحلي", sw: "Maudhui ya kienyeji", zh: "本地化内容", hi: "स्थानीयकृत सामग्री" },
      providerCategories: { en: "Provider Categories", es: "Categorías de proveedores", fr: "Catégories de prestataires", pt: "Categorias de prestadores", ar: "فئات مقدمي الخدمة", sw: "Aina za watoa huduma", zh: "服务提供者类别", hi: "प्रदाता श्रेणियाँ" },
      specialties: { en: "Specialties", es: "Especialidades", fr: "Spécialités", pt: "Especialidades", ar: "التخصصات", sw: "Utaalamu", zh: "专科", hi: "विशेषज्ञताएँ" },
      serviceTypes: { en: "Service Types", es: "Tipos de servicio", fr: "Types de service", pt: "Tipos de serviço", ar: "أنواع الخدمات", sw: "Aina za huduma", zh: "服务类型", hi: "सेवा प्रकार" },
      credentials: { en: "Credentials", es: "Credenciales", fr: "Diplômes", pt: "Credenciais", ar: "المؤهلات", sw: "Vyeti", zh: "凭证", hi: "प्रमाण-पत्र" },
      deliveryModes: { en: "Delivery Modes", es: "Modos de entrega", fr: "Modes de prestation", pt: "Modos de entrega", ar: "أساليب التقديم", sw: "Njia za kutoa", zh: "交付方式", hi: "वितरण मोड" },
      roleMappings: { en: "Role Mappings", es: "Mapeo de roles", fr: "Correspondance des rôles", pt: "Mapeamento de papéis", ar: "تعيين الأدوار", sw: "Ramani ya majukumu", zh: "角色映射", hi: "भूमिका मैपिंग" },
      auditLogs: { en: "Audit Logs", es: "Registros de auditoría", fr: "Journaux d'audit", pt: "Registros de auditoria", ar: "سجلات التدقيق", sw: "Kumbukumbu za ukaguzi", zh: "审计日志", hi: "ऑडिट लॉग" },
      system: { en: "System", es: "Sistema", fr: "Système", pt: "Sistema", ar: "النظام", sw: "Mfumo", zh: "系统", hi: "सिस्टम" },
      compliance: { en: "Compliance", es: "Cumplimiento", fr: "Conformité", pt: "Conformidade", ar: "الامتثال", sw: "Utiifu", zh: "合规", hi: "अनुपालन" },
      settings: { en: "Settings", es: "Configuración", fr: "Paramètres", pt: "Configurações", ar: "الإعدادات", sw: "Mipangilio", zh: "设置", hi: "सेटिंग्स" },
      findExperts: { en: "Find Experts", es: "Encontrar expertos", fr: "Trouver des experts", pt: "Encontrar especialistas", ar: "ابحث عن خبراء", sw: "Pata wataalamu", zh: "寻找专家", hi: "विशेषज्ञ खोजें" },
      myEngagements: { en: "My Engagements", es: "Mis citas", fr: "Mes engagements", pt: "Meus agendamentos", ar: "ارتباطاتي", sw: "Miadi yangu", zh: "我的预约", hi: "मेरे एंगेजमेंट" },
      messages: { en: "Messages", es: "Mensajes", fr: "Messages", pt: "Mensagens", ar: "الرسائل", sw: "Ujumbe", zh: "消息", hi: "संदेश" },
      profile: { en: "Profile", es: "Perfil", fr: "Profil", pt: "Perfil", ar: "الملف الشخصي", sw: "Wasifu", zh: "个人资料", hi: "प्रोफ़ाइल" },
      preferences: { en: "Preferences", es: "Preferencias", fr: "Préférences", pt: "Preferências", ar: "التفضيلات", sw: "Mapendeleo", zh: "偏好", hi: "प्राथमिकताएँ" },
      myWork: { en: "My Work", es: "Mi trabajo", fr: "Mon travail", pt: "Meu trabalho", ar: "عملي", sw: "Kazi yangu", zh: "我的工作", hi: "मेरा काम" },
      schedule: { en: "Schedule", es: "Agenda", fr: "Planning", pt: "Agenda", ar: "الجدول", sw: "Ratiba", zh: "日程", hi: "कार्यक्रम" },
      earnings: { en: "Earnings", es: "Ingresos", fr: "Revenus", pt: "Ganhos", ar: "الأرباح", sw: "Mapato", zh: "收入", hi: "कमाई" },
      billing: { en: "Billing", es: "Facturación", fr: "Facturation", pt: "Faturamento", ar: "الفواتير", sw: "Ankara", zh: "账单", hi: "बिलिंग" },
      findMentors: { en: "Find Mentors", es: "Encontrar mentores", fr: "Trouver des mentors", pt: "Encontrar mentores", ar: "ابحث عن مرشدين", sw: "Pata washauri", zh: "寻找导师", hi: "मेंटर खोजें" },
      myPlacements: { en: "My Placements", es: "Mis rotaciones", fr: "Mes stages", pt: "Meus estágios", ar: "تدريباتي", sw: "Nafasi zangu", zh: "我的实习", hi: "मेरी प्लेसमेंट" },
      availability: { en: "Availability", es: "Disponibilidad", fr: "Disponibilité", pt: "Disponibilidade", ar: "التوفر", sw: "Upatikanaji", zh: "可用时间", hi: "उपलब्धता" },
      requests: { en: "Requests", es: "Solicitudes", fr: "Demandes", pt: "Solicitações", ar: "الطلبات", sw: "Maombi", zh: "请求", hi: "अनुरोध" },
      myStudents: { en: "My Students", es: "Mis estudiantes", fr: "Mes étudiants", pt: "Meus estudantes", ar: "طلابي", sw: "Wanafunzi wangu", zh: "我的学生", hi: "मेरे छात्र" },
      students: { en: "Students", es: "Estudiantes", fr: "Étudiants", pt: "Estudantes", ar: "الطلاب", sw: "Wanafunzi", zh: "学生", hi: "छात्र" },
      placements: { en: "Placements", es: "Rotaciones", fr: "Stages", pt: "Estágios", ar: "التدريبات", sw: "Nafasi", zh: "实习", hi: "प्लेसमेंट" },
      findPreceptors: { en: "Find Preceptors", es: "Encontrar preceptores", fr: "Trouver des précepteurs", pt: "Encontrar preceptores", ar: "ابحث عن مرشدين سريريين", sw: "Pata waelekezi", zh: "寻找导师", hi: "प्रिसेप्टर खोजें" },
      agreements: { en: "Agreements", es: "Acuerdos", fr: "Accords", pt: "Acordos", ar: "الاتفاقيات", sw: "Mikataba", zh: "协议", hi: "समझौते" },
      reports: { en: "Reports", es: "Informes", fr: "Rapports", pt: "Relatórios", ar: "التقارير", sw: "Ripoti", zh: "报告", hi: "रिपोर्ट" },
      organizationProfile: { en: "Organization Profile", es: "Perfil de la organización", fr: "Profil de l'établissement", pt: "Perfil da organização", ar: "ملف المؤسسة", sw: "Wasifu wa shirika", zh: "组织资料", hi: "संगठन प्रोफ़ाइल" },
      myResearch: { en: "My Research", es: "Mi investigación", fr: "Mes recherches", pt: "Minha pesquisa", ar: "أبحاثي", sw: "Utafiti wangu", zh: "我的研究", hi: "मेरा अनुसंधान" },
      publications: { en: "Publications", es: "Publicaciones", fr: "Publications", pt: "Publicações", ar: "المنشورات", sw: "Machapisho", zh: "出版物", hi: "प्रकाशन" },
      grantApplications: { en: "Grant Applications", es: "Solicitudes de subvenciones", fr: "Demandes de subventions", pt: "Solicitações de subvenções", ar: "طلبات المنح", sw: "Maombi ya ufadhili", zh: "资助申请", hi: "अनुदान आवेदन" },
      findGrants: { en: "Find Grants", es: "Buscar subvenciones", fr: "Trouver des subventions", pt: "Encontrar subvenções", ar: "ابحث عن منح", sw: "Pata ufadhili", zh: "寻找资助", hi: "अनुदान खोजें" },
      journalDirectory: { en: "Journal Directory", es: "Directorio de revistas", fr: "Annuaire des revues", pt: "Diretório de periódicos", ar: "دليل المجلات", sw: "Saraka ya majarida", zh: "期刊目录", hi: "जर्नल निर्देशिका" },
      findGrantWriters: { en: "Find Grant Writers", es: "Encontrar redactores", fr: "Trouver des rédacteurs", pt: "Encontrar redatores", ar: "ابحث عن كتّاب المنح", sw: "Pata waandishi wa ufadhili", zh: "寻找资助撰写者", hi: "अनुदान लेखक खोजें" },
      savedGrants: { en: "Saved Grants", es: "Subvenciones guardadas", fr: "Subventions enregistrées", pt: "Subvenções salvas", ar: "المنح المحفوظة", sw: "Ufadhili uliohifadhiwa", zh: "已保存的资助", hi: "सहेजे गए अनुदान" },
      submissions: { en: "Submissions", es: "Envíos", fr: "Soumissions", pt: "Submissões", ar: "التقديمات", sw: "Mawasilisho", zh: "投稿", hi: "सबमिशन" },
      activeProjects: { en: "Active Projects", es: "Proyectos activos", fr: "Projets actifs", pt: "Projetos ativos", ar: "المشاريع النشطة", sw: "Miradi inayoendelea", zh: "活动项目", hi: "सक्रिय परियोजनाएँ" },
      myClients: { en: "My Clients", es: "Mis clientes", fr: "Mes clients", pt: "Meus clientes", ar: "عملائي", sw: "Wateja wangu", zh: "我的客户", hi: "मेरे ग्राहक" },
      portfolio: { en: "Portfolio", es: "Portafolio", fr: "Portfolio", pt: "Portfólio", ar: "ملف الأعمال", sw: "Kumbukumbu ya kazi", zh: "作品集", hi: "पोर्टफ़ोलियो" },
      deliverables: { en: "Deliverables", es: "Entregables", fr: "Livrables", pt: "Entregáveis", ar: "المخرجات", sw: "Mafanikio", zh: "交付物", hi: "डिलीवरेबल" },
      packages: { en: "Packages", es: "Paquetes", fr: "Forfaits", pt: "Pacotes", ar: "الباقات", sw: "Vifurushi", zh: "套餐", hi: "पैकेज" },
    },
  },
  chrome: {
    searchPlaceholder: { en: "Search...", es: "Buscar...", fr: "Rechercher...", pt: "Buscar...", ar: "بحث...", sw: "Tafuta...", zh: "搜索…", hi: "खोजें..." },
    notifications: { en: "Notifications", es: "Notificaciones", fr: "Notifications", pt: "Notificações", ar: "الإشعارات", sw: "Arifa", zh: "通知", hi: "सूचनाएँ" },
    adminNotifications: { en: "Admin Notifications", es: "Notificaciones de admin", fr: "Notifications admin", pt: "Notificações admin", ar: "إشعارات المسؤول", sw: "Arifa za msimamizi", zh: "管理员通知", hi: "एडमिन सूचनाएँ" },
    viewAll: { en: "View all", es: "Ver todo", fr: "Tout voir", pt: "Ver tudo", ar: "عرض الكل", sw: "Tazama yote", zh: "查看全部", hi: "सभी देखें" },
    viewAllNotifications: { en: "View all notifications", es: "Ver todas las notificaciones", fr: "Voir toutes les notifications", pt: "Ver todas as notificações", ar: "عرض كل الإشعارات", sw: "Tazama arifa zote", zh: "查看所有通知", hi: "सभी सूचनाएँ देखें" },
    signOut: { en: "Sign out", es: "Cerrar sesión", fr: "Se déconnecter", pt: "Sair", ar: "تسجيل الخروج", sw: "Toka", zh: "退出", hi: "साइन आउट" },
    lightMode: { en: "Light mode", es: "Modo claro", fr: "Mode clair", pt: "Modo claro", ar: "الوضع الفاتح", sw: "Hali nyepesi", zh: "浅色模式", hi: "लाइट मोड" },
    darkMode: { en: "Dark mode", es: "Modo oscuro", fr: "Mode sombre", pt: "Modo escuro", ar: "الوضع الداكن", sw: "Hali nyeusi", zh: "深色模式", hi: "डार्क मोड" },
    settings: { en: "Settings", es: "Configuración", fr: "Paramètres", pt: "Configurações", ar: "الإعدادات", sw: "Mipangilio", zh: "设置", hi: "सेटिंग्स" },
    profile: { en: "Profile", es: "Perfil", fr: "Profil", pt: "Perfil", ar: "الملف الشخصي", sw: "Wasifu", zh: "个人资料", hi: "प्रोफ़ाइल" },
    newCount: { en: "{count} new", es: "{count} nuevas", fr: "{count} nouvelles", pt: "{count} novas", ar: "{count} جديدة", sw: "{count} mpya", zh: "{count} 条新", hi: "{count} नई" },
  },
};

const LOCALES = ["en", "es", "fr", "pt", "ar", "sw", "zh", "hi"];

function buildLocaleTree(node, code) {
  if (node && typeof node === "object" && "en" in node && Object.values(node).every((v) => typeof v === "string")) {
    return node[code] ?? node.en;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = buildLocaleTree(v, code);
    return out;
  }
  return node;
}
function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object") deepMerge(target[k], v);
    else target[k] = v;
  }
  return target;
}

for (const code of LOCALES) {
  const path = join(MESSAGES_DIR, `${code}.json`);
  const json = JSON.parse(await readFile(path, "utf8"));
  deepMerge(json, buildLocaleTree(T, code));
  await writeFile(path, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`updated ${code}.json`);
}
