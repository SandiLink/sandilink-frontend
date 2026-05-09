#!/usr/bin/env node
/**
 * Dashboard internals translation pass — stat cards, section card
 * titles/descriptions, quick-action labels, and shared UI ("View all",
 * "Full schedule", status pills like "Completed/In Progress/Upcoming") for
 * the 7 non-service-user dashboard homes (provider/student/preceptor/
 * institution/researcher/grant-writer/admin).
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

const T = {
  dashboardCard: {
    shared: {
      viewAll: { en: "View all", es: "Ver todo", fr: "Tout voir", pt: "Ver tudo", ar: "عرض الكل", sw: "Tazama yote", zh: "查看全部", hi: "सभी देखें" },
      fullSchedule: { en: "Full schedule", es: "Agenda completa", fr: "Planning complet", pt: "Agenda completa", ar: "الجدول الكامل", sw: "Ratiba kamili", zh: "完整日程", hi: "पूर्ण कार्यक्रम" },
      fullAnalytics: { en: "Full analytics", es: "Análisis completo", fr: "Analytique complète", pt: "Análises completas", ar: "تحليلات كاملة", sw: "Uchanganuzi kamili", zh: "完整分析", hi: "पूर्ण एनालिटिक्स" },
      quickActions: { en: "Quick Actions", es: "Acciones rápidas", fr: "Actions rapides", pt: "Ações rápidas", ar: "إجراءات سريعة", sw: "Vitendo vya haraka", zh: "快捷操作", hi: "त्वरित क्रियाएँ" },
      accept: { en: "Accept", es: "Aceptar", fr: "Accepter", pt: "Aceitar", ar: "قبول", sw: "Kubali", zh: "接受", hi: "स्वीकार करें" },
      decline: { en: "Decline", es: "Rechazar", fr: "Refuser", pt: "Recusar", ar: "رفض", sw: "Kataa", zh: "拒绝", hi: "अस्वीकार करें" },
    },
    status: {
      active: { en: "Active", es: "Activo", fr: "Actif", pt: "Ativo", ar: "نشط", sw: "Hai", zh: "进行中", hi: "सक्रिय" },
      pending: { en: "Pending", es: "Pendiente", fr: "En attente", pt: "Pendente", ar: "قيد الانتظار", sw: "Inasubiri", zh: "待处理", hi: "लंबित" },
      completed: { en: "Completed", es: "Completado", fr: "Terminé", pt: "Concluído", ar: "مكتمل", sw: "Imekamilika", zh: "已完成", hi: "पूर्ण" },
      inProgress: { en: "In Progress", es: "En curso", fr: "En cours", pt: "Em andamento", ar: "قيد التنفيذ", sw: "Inaendelea", zh: "进行中", hi: "प्रगति में" },
      upcoming: { en: "Upcoming", es: "Próximo", fr: "À venir", pt: "Próximo", ar: "قادم", sw: "Inakuja", zh: "即将开始", hi: "आगामी" },
      virtual: { en: "Virtual", es: "Virtual", fr: "Virtuel", pt: "Virtual", ar: "افتراضي", sw: "Virtual", zh: "线上", hi: "वर्चुअल" },
      inPerson: { en: "In-person", es: "Presencial", fr: "En personne", pt: "Presencial", ar: "حضوري", sw: "Ana kwa ana", zh: "线下", hi: "व्यक्तिगत" },
    },
    provider: {
      statTodaysEngagements: { en: "Today's Engagements", es: "Citas de hoy", fr: "Rendez-vous d'aujourd'hui", pt: "Atendimentos de hoje", ar: "ارتباطات اليوم", sw: "Miadi ya leo", zh: "今日预约", hi: "आज के एंगेजमेंट" },
      statTodaysEngagementsDesc: { en: "{virtual} virtual, {inPerson} in-person", es: "{virtual} virtuales, {inPerson} presenciales", fr: "{virtual} virtuels, {inPerson} en personne", pt: "{virtual} virtuais, {inPerson} presenciais", ar: "{virtual} افتراضية، {inPerson} حضورية", sw: "{virtual} virtual, {inPerson} ana kwa ana", zh: "{virtual} 线上，{inPerson} 线下", hi: "{virtual} वर्चुअल, {inPerson} व्यक्तिगत" },
      statPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      statPendingRequestsDesc: { en: "Awaiting your response", es: "Esperando tu respuesta", fr: "En attente de votre réponse", pt: "Aguardando sua resposta", ar: "بانتظار ردك", sw: "Yanasubiri jibu lako", zh: "等待您的回复", hi: "आपके उत्तर की प्रतीक्षा" },
      statMonthlyEarnings: { en: "This Month's Earnings", es: "Ingresos del mes", fr: "Revenus du mois", pt: "Ganhos do mês", ar: "أرباح هذا الشهر", sw: "Mapato ya mwezi huu", zh: "本月收入", hi: "इस माह की कमाई" },
      statMonthlyEarningsDesc: { en: "{trend} vs last month", es: "{trend} vs el mes pasado", fr: "{trend} vs mois dernier", pt: "{trend} vs mês passado", ar: "{trend} مقارنة بالشهر الماضي", sw: "{trend} dhidi ya mwezi uliopita", zh: "对比上月 {trend}", hi: "पिछले माह की तुलना में {trend}" },
      statOverallRating: { en: "Overall Rating", es: "Calificación general", fr: "Note globale", pt: "Avaliação geral", ar: "التقييم العام", sw: "Ukadiriaji wa jumla", zh: "总体评分", hi: "समग्र रेटिंग" },
      statOverallRatingDesc: { en: "{count} reviews", es: "{count} reseñas", fr: "{count} avis", pt: "{count} avaliações", ar: "{count} مراجعات", sw: "{count} hakiki", zh: "{count} 条评价", hi: "{count} समीक्षाएँ" },
      sectionTodaysSchedule: { en: "Today's Schedule", es: "Agenda de hoy", fr: "Planning du jour", pt: "Agenda de hoje", ar: "جدول اليوم", sw: "Ratiba ya leo", zh: "今日日程", hi: "आज का कार्यक्रम" },
      sectionPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      sectionPendingRequestsDesc: { en: "Awaiting your response", es: "Esperando tu respuesta", fr: "En attente de votre réponse", pt: "Aguardando sua resposta", ar: "بانتظار ردك", sw: "Yanasubiri jibu lako", zh: "等待您的回复", hi: "आपके उत्तर की प्रतीक्षा" },
      actionManageSchedule: { en: "Manage Schedule", es: "Gestionar agenda", fr: "Gérer le planning", pt: "Gerenciar agenda", ar: "إدارة الجدول", sw: "Simamia ratiba", zh: "管理日程", hi: "कार्यक्रम प्रबंधित करें" },
      actionViewMessages: { en: "View Messages", es: "Ver mensajes", fr: "Voir les messages", pt: "Ver mensagens", ar: "عرض الرسائل", sw: "Tazama ujumbe", zh: "查看消息", hi: "संदेश देखें" },
      actionEarnings: { en: "Earnings", es: "Ingresos", fr: "Revenus", pt: "Ganhos", ar: "الأرباح", sw: "Mapato", zh: "收入", hi: "कमाई" },
      actionClientReviews: { en: "Client Reviews", es: "Reseñas de clientes", fr: "Avis clients", pt: "Avaliações de clientes", ar: "مراجعات العملاء", sw: "Hakiki za wateja", zh: "客户评价", hi: "ग्राहक समीक्षाएँ" },
    },
    student: {
      statActivePlacements: { en: "Active Placements", es: "Rotaciones activas", fr: "Stages en cours", pt: "Estágios ativos", ar: "التدريبات النشطة", sw: "Nafasi zinazoendelea", zh: "进行中实习", hi: "सक्रिय प्लेसमेंट" },
      statPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      statPendingRequestsDesc: { en: "Awaiting preceptor response", es: "Esperando respuesta del preceptor", fr: "En attente de la réponse du précepteur", pt: "Aguardando resposta do preceptor", ar: "بانتظار رد المرشد", sw: "Yanasubiri jibu la mwelekezi", zh: "等待导师回复", hi: "प्रिसेप्टर के उत्तर की प्रतीक्षा" },
      statHoursCompleted: { en: "Hours Completed", es: "Horas completadas", fr: "Heures effectuées", pt: "Horas concluídas", ar: "الساعات المنجزة", sw: "Masaa yaliyokamilika", zh: "已完成小时数", hi: "पूर्ण घंटे" },
      statHoursCompletedDesc: { en: "of {total} required", es: "de {total} requeridas", fr: "sur {total} requises", pt: "de {total} necessárias", ar: "من أصل {total} مطلوبة", sw: "kati ya {total} zinazohitajika", zh: "共需 {total}", hi: "{total} में से" },
      statCredentials: { en: "Credentials", es: "Credenciales", fr: "Diplômes", pt: "Credenciais", ar: "المؤهلات", sw: "Vyeti", zh: "凭证", hi: "प्रमाण-पत्र" },
      statCredentialsDesc: { en: "{pending} pending verification", es: "{pending} pendiente(s) de verificación", fr: "{pending} en attente de vérification", pt: "{pending} pendente(s) de verificação", ar: "{pending} بانتظار التحقق", sw: "{pending} zinasubiri uthibitisho", zh: "{pending} 待验证", hi: "{pending} सत्यापन लंबित" },
      sectionActivePlacements: { en: "Active Placements", es: "Rotaciones activas", fr: "Stages en cours", pt: "Estágios ativos", ar: "التدريبات النشطة", sw: "Nafasi zinazoendelea", zh: "进行中实习", hi: "सक्रिय प्लेसमेंट" },
      sectionActivePlacementsDesc: { en: "Your current clinical rotations", es: "Tus rotaciones clínicas actuales", fr: "Vos stages cliniques en cours", pt: "Seus estágios clínicos atuais", ar: "تدريباتك السريرية الحالية", sw: "Nafasi zako za kliniki za sasa", zh: "您当前的临床实习", hi: "आपके वर्तमान नैदानिक रोटेशन" },
      sectionPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      sectionPendingRequestsDesc: { en: "Awaiting preceptor response", es: "Esperando respuesta del preceptor", fr: "En attente de la réponse du précepteur", pt: "Aguardando resposta do preceptor", ar: "بانتظار رد المرشد", sw: "Yanasubiri jibu la mwelekezi", zh: "等待导师回复", hi: "प्रिसेप्टर के उत्तर की प्रतीक्षा" },
      clinicalHoursLabel: { en: "Clinical hours", es: "Horas clínicas", fr: "Heures cliniques", pt: "Horas clínicas", ar: "الساعات السريرية", sw: "Masaa ya kliniki", zh: "临床小时数", hi: "नैदानिक घंटे" },
      sentLabel: { en: "Sent {date}", es: "Enviado el {date}", fr: "Envoyé le {date}", pt: "Enviado em {date}", ar: "أُرسلت في {date}", sw: "Imetumwa {date}", zh: "已发送 {date}", hi: "{date} को भेजा गया" },
      actionFindPreceptors: { en: "Find Preceptors", es: "Encontrar preceptores", fr: "Trouver des précepteurs", pt: "Encontrar preceptores", ar: "ابحث عن مرشدين سريريين", sw: "Pata waelekezi", zh: "寻找导师", hi: "प्रिसेप्टर खोजें" },
      actionUploadCredentials: { en: "Upload Credentials", es: "Subir credenciales", fr: "Importer des diplômes", pt: "Enviar credenciais", ar: "رفع المؤهلات", sw: "Pakia vyeti", zh: "上传凭证", hi: "प्रमाण-पत्र अपलोड करें" },
      actionMessages: { en: "Messages", es: "Mensajes", fr: "Messages", pt: "Mensagens", ar: "الرسائل", sw: "Ujumbe", zh: "消息", hi: "संदेश" },
      actionMyProfile: { en: "My Profile", es: "Mi perfil", fr: "Mon profil", pt: "Meu perfil", ar: "ملفي الشخصي", sw: "Wasifu wangu", zh: "我的档案", hi: "मेरी प्रोफ़ाइल" },
    },
    preceptor: {
      statActiveStudents: { en: "Active Students", es: "Estudiantes activos", fr: "Étudiants actifs", pt: "Estudantes ativos", ar: "الطلاب النشطون", sw: "Wanafunzi waliopo", zh: "在校学生", hi: "सक्रिय छात्र" },
      statActiveStudentsDesc: { en: "of {max} max capacity", es: "de capacidad máxima {max}", fr: "sur une capacité de {max}", pt: "de {max} capacidade máxima", ar: "من أصل {max} الحد الأقصى", sw: "kati ya uwezo wa juu wa {max}", zh: "共 {max} 名容量", hi: "{max} अधिकतम क्षमता में से" },
      statPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      statPendingRequestsDesc: { en: "Awaiting your response", es: "Esperando tu respuesta", fr: "En attente de votre réponse", pt: "Aguardando sua resposta", ar: "بانتظار ردك", sw: "Yanasubiri jibu lako", zh: "等待您的回复", hi: "आपके उत्तर की प्रतीक्षा" },
      statTotalMentored: { en: "Total Mentored", es: "Total mentorizados", fr: "Total accompagnés", pt: "Total mentorados", ar: "إجمالي الموجهين", sw: "Jumla iliyoshauriwa", zh: "已指导总数", hi: "कुल मार्गदर्शन" },
      statTotalMentoredDesc: { en: "Career total", es: "Total en la carrera", fr: "Total carrière", pt: "Total na carreira", ar: "إجمالي مسيرتك", sw: "Jumla ya kazi", zh: "职业总计", hi: "करियर कुल" },
      statAvgRating: { en: "Avg. Student Rating", es: "Calificación media", fr: "Note moyenne", pt: "Avaliação média", ar: "متوسط التقييم", sw: "Wastani wa ukadiriaji", zh: "平均学生评分", hi: "औसत छात्र रेटिंग" },
      statAvgRatingDesc: { en: "From {count} reviews", es: "De {count} reseñas", fr: "Sur {count} avis", pt: "De {count} avaliações", ar: "من {count} مراجعات", sw: "Kutoka kwa hakiki {count}", zh: "来自 {count} 条评价", hi: "{count} समीक्षाओं से" },
      sectionActiveStudents: { en: "Active Students", es: "Estudiantes activos", fr: "Étudiants actifs", pt: "Estudantes ativos", ar: "الطلاب النشطون", sw: "Wanafunzi waliopo", zh: "在校学生", hi: "सक्रिय छात्र" },
      sectionActiveStudentsDesc: { en: "Students currently in your rotation", es: "Estudiantes actualmente en tu rotación", fr: "Étudiants actuellement en stage chez vous", pt: "Estudantes em sua rotação no momento", ar: "الطلاب في تدريبك حاليًا", sw: "Wanafunzi walioko katika mzunguko wako", zh: "目前在您轮转中的学生", hi: "आपके रोटेशन में वर्तमान छात्र" },
      sectionPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      sectionPendingRequestsDesc: { en: "New placement requests", es: "Nuevas solicitudes de rotación", fr: "Nouvelles demandes de stage", pt: "Novas solicitações de estágio", ar: "طلبات تدريب جديدة", sw: "Maombi mapya ya nafasi", zh: "新的实习申请", hi: "नए प्लेसमेंट अनुरोध" },
      hoursLabel: { en: "Hours", es: "Horas", fr: "Heures", pt: "Horas", ar: "الساعات", sw: "Masaa", zh: "小时", hi: "घंटे" },
      sinceLabel: { en: "Since {date}", es: "Desde {date}", fr: "Depuis {date}", pt: "Desde {date}", ar: "منذ {date}", sw: "Tangu {date}", zh: "自 {date}", hi: "{date} से" },
      actionManageSchedule: { en: "Manage Schedule", es: "Gestionar agenda", fr: "Gérer le planning", pt: "Gerenciar agenda", ar: "إدارة الجدول", sw: "Simamia ratiba", zh: "管理日程", hi: "कार्यक्रम प्रबंधित करें" },
      actionViewRequests: { en: "View Requests", es: "Ver solicitudes", fr: "Voir les demandes", pt: "Ver solicitações", ar: "عرض الطلبات", sw: "Tazama maombi", zh: "查看请求", hi: "अनुरोध देखें" },
      actionMessages: { en: "Messages", es: "Mensajes", fr: "Messages", pt: "Mensagens", ar: "الرسائل", sw: "Ujumbe", zh: "消息", hi: "संदेश" },
      actionMyProfile: { en: "My Profile", es: "Mi perfil", fr: "Mon profil", pt: "Meu perfil", ar: "ملفي الشخصي", sw: "Wasifu wangu", zh: "我的档案", hi: "मेरी प्रोफ़ाइल" },
    },
    institution: {
      statTotalStudents: { en: "Total Students", es: "Total de estudiantes", fr: "Total étudiants", pt: "Total de estudantes", ar: "إجمالي الطلاب", sw: "Jumla ya wanafunzi", zh: "学生总数", hi: "कुल छात्र" },
      statTotalStudentsDesc: { en: "{active} active in placements", es: "{active} en rotaciones activas", fr: "{active} actifs en stage", pt: "{active} ativos em estágios", ar: "{active} نشطون في التدريب", sw: "{active} wapo kwenye nafasi", zh: "{active} 名实习中", hi: "{active} प्लेसमेंट में सक्रिय" },
      statActivePlacements: { en: "Active Placements", es: "Rotaciones activas", fr: "Stages en cours", pt: "Estágios ativos", ar: "التدريبات النشطة", sw: "Nafasi zinazoendelea", zh: "进行中实习", hi: "सक्रिय प्लेसमेंट" },
      statActivePlacementsDesc: { en: "Across {count} preceptors", es: "Con {count} preceptores", fr: "Avec {count} précepteurs", pt: "Com {count} preceptores", ar: "مع {count} مرشدين", sw: "Pamoja na waelekezi {count}", zh: "涉及 {count} 名导师", hi: "{count} प्रिसेप्टर के साथ" },
      statPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      statPendingRequestsDesc: { en: "Awaiting preceptor response", es: "Esperando respuesta del preceptor", fr: "En attente de la réponse du précepteur", pt: "Aguardando resposta do preceptor", ar: "بانتظار رد المرشد", sw: "Yanasubiri jibu la mwelekezi", zh: "等待导师回复", hi: "प्रिसेप्टर के उत्तर की प्रतीक्षा" },
      statPlacementRate: { en: "Placement Rate", es: "Tasa de colocación", fr: "Taux de placement", pt: "Taxa de colocação", ar: "معدل التنسيب", sw: "Kiwango cha nafasi", zh: "实习率", hi: "प्लेसमेंट दर" },
      statPlacementRateDesc: { en: "{trend} vs last semester", es: "{trend} vs el semestre pasado", fr: "{trend} vs semestre dernier", pt: "{trend} vs semestre passado", ar: "{trend} مقارنة بالفصل الماضي", sw: "{trend} dhidi ya muhula uliopita", zh: "对比上学期 {trend}", hi: "पिछले सेमेस्टर की तुलना में {trend}" },
      sectionRecentPlacements: { en: "Recent Placements", es: "Rotaciones recientes", fr: "Stages récents", pt: "Estágios recentes", ar: "التدريبات الأخيرة", sw: "Nafasi za hivi karibuni", zh: "最近实习", hi: "हाल के प्लेसमेंट" },
      sectionRecentPlacementsDesc: { en: "Student placement activity", es: "Actividad de rotaciones de estudiantes", fr: "Activité des stages étudiants", pt: "Atividade de estágios de estudantes", ar: "نشاط تنسيب الطلاب", sw: "Shughuli ya nafasi za wanafunzi", zh: "学生实习动态", hi: "छात्र प्लेसमेंट गतिविधि" },
      actionManageStudents: { en: "Manage Students", es: "Gestionar estudiantes", fr: "Gérer les étudiants", pt: "Gerenciar estudantes", ar: "إدارة الطلاب", sw: "Simamia wanafunzi", zh: "管理学生", hi: "छात्र प्रबंधित करें" },
      actionFindPreceptors: { en: "Find Preceptors", es: "Encontrar preceptores", fr: "Trouver des précepteurs", pt: "Encontrar preceptores", ar: "ابحث عن مرشدين", sw: "Pata waelekezi", zh: "寻找导师", hi: "प्रिसेप्टर खोजें" },
      actionAssignPlacements: { en: "Assign Placements", es: "Asignar rotaciones", fr: "Affecter des stages", pt: "Atribuir estágios", ar: "تعيين التدريبات", sw: "Pangia nafasi", zh: "分配实习", hi: "प्लेसमेंट असाइन करें" },
      actionImportStudents: { en: "Import Students", es: "Importar estudiantes", fr: "Importer des étudiants", pt: "Importar estudantes", ar: "استيراد الطلاب", sw: "Ingiza wanafunzi", zh: "导入学生", hi: "छात्र आयात करें" },
      actionViewReports: { en: "View Reports", es: "Ver informes", fr: "Voir les rapports", pt: "Ver relatórios", ar: "عرض التقارير", sw: "Tazama ripoti", zh: "查看报告", hi: "रिपोर्ट देखें" },
      actionAgreements: { en: "Agreements", es: "Acuerdos", fr: "Accords", pt: "Acordos", ar: "الاتفاقيات", sw: "Mikataba", zh: "协议", hi: "समझौते" },
    },
    researcher: {
      statActiveProjects: { en: "Active Projects", es: "Proyectos activos", fr: "Projets actifs", pt: "Projetos ativos", ar: "المشاريع النشطة", sw: "Miradi inayoendelea", zh: "活动项目", hi: "सक्रिय परियोजनाएँ" },
      statActiveProjectsDesc: { en: "{funded} funded, {inProgress} in progress", es: "{funded} financiados, {inProgress} en curso", fr: "{funded} financés, {inProgress} en cours", pt: "{funded} financiados, {inProgress} em andamento", ar: "{funded} ممولة، {inProgress} قيد التنفيذ", sw: "{funded} zimefadhiliwa, {inProgress} zinaendelea", zh: "{funded} 已资助，{inProgress} 进行中", hi: "{funded} वित्त-पोषित, {inProgress} प्रगति में" },
      statGrantApplications: { en: "Grant Applications", es: "Solicitudes de subvenciones", fr: "Demandes de subventions", pt: "Solicitações de subvenções", ar: "طلبات المنح", sw: "Maombi ya ufadhili", zh: "资助申请", hi: "अनुदान आवेदन" },
      statGrantApplicationsDesc: { en: "{awarded} awarded, {pending} pending review", es: "{awarded} otorgadas, {pending} en revisión", fr: "{awarded} accordées, {pending} en revue", pt: "{awarded} concedidas, {pending} em análise", ar: "{awarded} ممنوحة، {pending} قيد المراجعة", sw: "{awarded} zimepewa, {pending} zinakaguliwa", zh: "{awarded} 已获，{pending} 审核中", hi: "{awarded} स्वीकृत, {pending} समीक्षाधीन" },
      statPublications: { en: "Publications", es: "Publicaciones", fr: "Publications", pt: "Publicações", ar: "المنشورات", sw: "Machapisho", zh: "出版物", hi: "प्रकाशन" },
      statPublicationsDesc: { en: "{review} under review", es: "{review} en revisión", fr: "{review} en cours d'examen", pt: "{review} em análise", ar: "{review} قيد المراجعة", sw: "{review} zinakaguliwa", zh: "{review} 审核中", hi: "{review} समीक्षाधीन" },
      statHIndex: { en: "h-index", es: "índice h", fr: "indice h", pt: "índice h", ar: "مؤشر h", sw: "Kielelezo cha h", zh: "h 指数", hi: "h-इंडेक्स" },
      statHIndexDesc: { en: "{trend} this year", es: "{trend} este año", fr: "{trend} cette année", pt: "{trend} este ano", ar: "{trend} هذا العام", sw: "{trend} mwaka huu", zh: "今年 {trend}", hi: "इस साल {trend}" },
      sectionActiveGrants: { en: "Active Grants", es: "Subvenciones activas", fr: "Subventions actives", pt: "Subvenções ativas", ar: "المنح النشطة", sw: "Ufadhili unaoendelea", zh: "活动资助", hi: "सक्रिय अनुदान" },
      sectionActiveGrantsDesc: { en: "Your funded and pending grant applications", es: "Tus solicitudes financiadas y pendientes", fr: "Vos demandes financées et en attente", pt: "Suas solicitações financiadas e pendentes", ar: "طلباتك الممولة والمعلقة", sw: "Maombi yako yaliyofadhiliwa na yanayosubiri", zh: "您已资助和待审的资助申请", hi: "आपके वित्त-पोषित और लंबित आवेदन" },
      sectionUpcomingDeadlines: { en: "Upcoming Deadlines", es: "Próximas fechas límite", fr: "Échéances à venir", pt: "Prazos próximos", ar: "المواعيد النهائية القادمة", sw: "Tarehe za mwisho zinazokuja", zh: "即将到来的截止日期", hi: "आगामी समय सीमाएँ" },
      sectionUpcomingDeadlinesDesc: { en: "Grants, submissions & reports", es: "Subvenciones, envíos e informes", fr: "Subventions, soumissions et rapports", pt: "Subvenções, submissões e relatórios", ar: "المنح والتقديمات والتقارير", sw: "Ufadhili, mawasilisho na ripoti", zh: "资助、投稿和报告", hi: "अनुदान, सबमिशन और रिपोर्ट" },
      sectionRecentPublications: { en: "Recent Publications", es: "Publicaciones recientes", fr: "Publications récentes", pt: "Publicações recentes", ar: "المنشورات الأخيرة", sw: "Machapisho ya hivi karibuni", zh: "最近出版物", hi: "हाल के प्रकाशन" },
      sectionRecentPublicationsDesc: { en: "Your latest research output", es: "Tu producción de investigación más reciente", fr: "Vos dernières productions de recherche", pt: "Sua produção de pesquisa mais recente", ar: "أحدث إنتاج بحثي لك", sw: "Matokeo yako ya hivi karibuni ya utafiti", zh: "您最近的研究成果", hi: "आपका नवीनतम शोध आउटपुट" },
      actionFindGrants: { en: "Find Grants", es: "Buscar subvenciones", fr: "Trouver des subventions", pt: "Encontrar subvenções", ar: "ابحث عن منح", sw: "Pata ufadhili", zh: "寻找资助", hi: "अनुदान खोजें" },
      actionSubmitManuscript: { en: "Submit Manuscript", es: "Enviar manuscrito", fr: "Soumettre un manuscrit", pt: "Enviar manuscrito", ar: "إرسال مخطوطة", sw: "Wasilisha hati", zh: "提交手稿", hi: "पांडुलिपि सबमिट करें" },
      actionFindGrantWriters: { en: "Find Grant Writers", es: "Encontrar redactores", fr: "Trouver des rédacteurs", pt: "Encontrar redatores", ar: "ابحث عن كتّاب المنح", sw: "Pata waandishi wa ufadhili", zh: "寻找资助撰写者", hi: "अनुदान लेखक खोजें" },
      actionBrowseJournals: { en: "Browse Journals", es: "Explorar revistas", fr: "Parcourir les revues", pt: "Explorar periódicos", ar: "تصفح المجلات", sw: "Vinjari majarida", zh: "浏览期刊", hi: "जर्नल ब्राउज़ करें" },
    },
    grantWriter: {
      statActiveProjects: { en: "Active Projects", es: "Proyectos activos", fr: "Projets actifs", pt: "Projetos ativos", ar: "المشاريع النشطة", sw: "Miradi inayoendelea", zh: "活动项目", hi: "सक्रिय परियोजनाएँ" },
      statActiveProjectsDesc: { en: "{proposals} proposals, {revisions} revision, {reviews} review", es: "{proposals} propuestas, {revisions} revisión, {reviews} revisión", fr: "{proposals} propositions, {revisions} révision, {reviews} examen", pt: "{proposals} propostas, {revisions} revisão, {reviews} análise", ar: "{proposals} مقترحات، {revisions} مراجعة، {reviews} استعراض", sw: "{proposals} mapendekezo, {revisions} marekebisho, {reviews} ukaguzi", zh: "{proposals} 项提案，{revisions} 项修订，{reviews} 项审查", hi: "{proposals} प्रस्ताव, {revisions} संशोधन, {reviews} समीक्षा" },
      statEarningsMtd: { en: "Earnings (MTD)", es: "Ingresos (mes a la fecha)", fr: "Revenus (mois en cours)", pt: "Ganhos (do mês)", ar: "الأرباح (الشهر حتى الآن)", sw: "Mapato (mwezi hadi sasa)", zh: "本月收入", hi: "इस माह की कमाई" },
      statEarningsMtdDesc: { en: "{trend} vs last month", es: "{trend} vs el mes pasado", fr: "{trend} vs mois dernier", pt: "{trend} vs mês passado", ar: "{trend} مقارنة بالشهر الماضي", sw: "{trend} dhidi ya mwezi uliopita", zh: "对比上月 {trend}", hi: "पिछले माह की तुलना में {trend}" },
      statSuccessRate: { en: "Success Rate", es: "Tasa de éxito", fr: "Taux de succès", pt: "Taxa de sucesso", ar: "معدل النجاح", sw: "Kiwango cha mafanikio", zh: "成功率", hi: "सफलता दर" },
      statSuccessRateDesc: { en: "{won} of {total} grants funded", es: "{won} de {total} subvenciones financiadas", fr: "{won} sur {total} subventions financées", pt: "{won} de {total} subvenções financiadas", ar: "{won} من {total} منح ممولة", sw: "{won} kati ya {total} zilizofadhiliwa", zh: "{total} 项资助中已获 {won} 项", hi: "{total} में से {won} वित्त-पोषित" },
      statClientRating: { en: "Client Rating", es: "Calificación de clientes", fr: "Note client", pt: "Avaliação do cliente", ar: "تقييم العميل", sw: "Ukadiriaji wa wateja", zh: "客户评分", hi: "ग्राहक रेटिंग" },
      statClientRatingDesc: { en: "{count} reviews", es: "{count} reseñas", fr: "{count} avis", pt: "{count} avaliações", ar: "{count} مراجعات", sw: "{count} hakiki", zh: "{count} 条评价", hi: "{count} समीक्षाएँ" },
      sectionActiveProjects: { en: "Active Projects", es: "Proyectos activos", fr: "Projets actifs", pt: "Projetos ativos", ar: "المشاريع النشطة", sw: "Miradi inayoendelea", zh: "活动项目", hi: "सक्रिय परियोजनाएँ" },
      sectionActiveProjectsDesc: { en: "Proposals and reviews in progress", es: "Propuestas y revisiones en curso", fr: "Propositions et examens en cours", pt: "Propostas e análises em andamento", ar: "المقترحات والمراجعات قيد التنفيذ", sw: "Mapendekezo na mapitio yanayoendelea", zh: "正在进行的提案和审查", hi: "प्रगति में प्रस्ताव और समीक्षाएँ" },
      sectionPendingRequests: { en: "Pending Requests", es: "Solicitudes pendientes", fr: "Demandes en attente", pt: "Solicitações pendentes", ar: "الطلبات المعلقة", sw: "Maombi yanayosubiri", zh: "待处理请求", hi: "लंबित अनुरोध" },
      sectionPendingRequestsDesc: { en: "New collaboration requests", es: "Nuevas solicitudes de colaboración", fr: "Nouvelles demandes de collaboration", pt: "Novas solicitações de colaboração", ar: "طلبات تعاون جديدة", sw: "Maombi mapya ya ushirikiano", zh: "新的合作请求", hi: "नए सहयोग अनुरोध" },
      sectionRecentWins: { en: "Recent Wins", es: "Logros recientes", fr: "Récents succès", pt: "Vitórias recentes", ar: "إنجازات حديثة", sw: "Mafanikio ya hivi karibuni", zh: "最近成就", hi: "हाल की जीतें" },
      sectionRecentWinsDesc: { en: "Grants you helped fund", es: "Subvenciones que ayudaste a financiar", fr: "Subventions que vous avez aidé à obtenir", pt: "Subvenções que você ajudou a financiar", ar: "المنح التي ساعدت في تمويلها", sw: "Ufadhili uliosaidia kupata", zh: "您协助获得的资助", hi: "अनुदान जिन्हें आपने वित्त-पोषित करने में मदद की" },
      actionViewRequests: { en: "View Requests", es: "Ver solicitudes", fr: "Voir les demandes", pt: "Ver solicitações", ar: "عرض الطلبات", sw: "Tazama maombi", zh: "查看请求", hi: "अनुरोध देखें" },
      actionEarnings: { en: "Earnings", es: "Ingresos", fr: "Revenus", pt: "Ganhos", ar: "الأرباح", sw: "Mapato", zh: "收入", hi: "कमाई" },
      actionMessages: { en: "Messages", es: "Mensajes", fr: "Messages", pt: "Mensagens", ar: "الرسائل", sw: "Ujumbe", zh: "消息", hi: "संदेश" },
      actionMyProfile: { en: "My Profile", es: "Mi perfil", fr: "Mon profil", pt: "Meu perfil", ar: "ملفي الشخصي", sw: "Wasifu wangu", zh: "我的档案", hi: "मेरी प्रोफ़ाइल" },
    },
    admin: {
      statTotalUsers: { en: "Total Users", es: "Usuarios totales", fr: "Utilisateurs totaux", pt: "Total de usuários", ar: "إجمالي المستخدمين", sw: "Jumla ya watumiaji", zh: "用户总数", hi: "कुल उपयोगकर्ता" },
      statActiveBookings: { en: "Active Bookings", es: "Reservas activas", fr: "Réservations actives", pt: "Reservas ativas", ar: "الحجوزات النشطة", sw: "Nafasi zinazoendelea", zh: "活跃预订", hi: "सक्रिय बुकिंग" },
      statRevenueMtd: { en: "Revenue (MTD)", es: "Ingresos (mes a la fecha)", fr: "Revenus (mois en cours)", pt: "Receita (do mês)", ar: "الإيرادات (الشهر حتى الآن)", sw: "Mapato (mwezi hadi sasa)", zh: "本月收入", hi: "इस माह राजस्व" },
      statActivePlacements: { en: "Active Placements", es: "Rotaciones activas", fr: "Stages en cours", pt: "Estágios ativos", ar: "التدريبات النشطة", sw: "Nafasi zinazoendelea", zh: "进行中实习", hi: "सक्रिय प्लेसमेंट" },
      sectionUserRegistration: { en: "User Registration by Role", es: "Registro de usuarios por rol", fr: "Inscription par rôle", pt: "Registro de usuários por papel", ar: "تسجيل المستخدمين حسب الدور", sw: "Usajili wa watumiaji kwa jukumu", zh: "按角色注册用户", hi: "भूमिका के अनुसार उपयोगकर्ता पंजीकरण" },
      sectionUserRegistrationDesc: { en: "Breakdown of all registered users", es: "Desglose de todos los usuarios registrados", fr: "Répartition de tous les utilisateurs inscrits", pt: "Detalhamento de todos os usuários cadastrados", ar: "تفصيل جميع المستخدمين المسجلين", sw: "Mchanganuo wa watumiaji wote waliosajiliwa", zh: "所有注册用户的分布", hi: "सभी पंजीकृत उपयोगकर्ताओं का विवरण" },
      actionViewUsers: { en: "View Users", es: "Ver usuarios", fr: "Voir les utilisateurs", pt: "Ver usuários", ar: "عرض المستخدمين", sw: "Tazama watumiaji", zh: "查看用户", hi: "उपयोगकर्ता देखें" },
      actionAnalytics: { en: "Analytics", es: "Analíticas", fr: "Analytique", pt: "Análises", ar: "التحليلات", sw: "Uchanganuzi", zh: "分析", hi: "एनालिटिक्स" },
      actionDisputes: { en: "Disputes", es: "Disputas", fr: "Litiges", pt: "Disputas", ar: "النزاعات", sw: "Migogoro", zh: "争议", hi: "विवाद" },
      actionRevenue: { en: "Revenue", es: "Ingresos", fr: "Revenus", pt: "Receita", ar: "الإيرادات", sw: "Mapato", zh: "收入", hi: "राजस्व" },
      actionFlagged: { en: "Flagged", es: "Reportados", fr: "Signalés", pt: "Sinalizados", ar: "المُبلَّغ عنه", sw: "Iliyoripotiwa", zh: "已标记", hi: "ध्वजांकित" },
      actionAuditLogs: { en: "Audit Logs", es: "Registros de auditoría", fr: "Journaux d'audit", pt: "Registros de auditoria", ar: "سجلات التدقيق", sw: "Kumbukumbu za ukaguzi", zh: "审计日志", hi: "ऑडिट लॉग" },
    },
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
