#!/usr/bin/env node
/**
 * Phase 3 translation keys: service-user dashboard sub-pages.
 *
 * Scope: heading + intro on every /dashboard/* page wrapper, plus the most
 * visible top-of-page heading + body on the engagement detail flow
 * (booking-success, review-form). Form internals (intake fields, payment
 * method labels, etc.) and table column headers are deferred to Phase 3.x.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

const T = {
  serviceUserPages: {
    engagements: {
      title: { en: "My Engagements", es: "Mis citas y proyectos", fr: "Mes engagements", pt: "Meus agendamentos", ar: "ارتباطاتي", sw: "Miadi yangu", zh: "我的预约", hi: "मेरे एंगेजमेंट" },
      intro: { en: "View, manage, and track your appointments and projects.", es: "Visualiza, gestiona y haz seguimiento de tus citas y proyectos.", fr: "Visualisez, gérez et suivez vos rendez-vous et projets.", pt: "Veja, gerencie e acompanhe seus agendamentos e projetos.", ar: "اعرض وأدِر وتابع مواعيدك ومشاريعك.", sw: "Tazama, simamia, na fuatilia miadi na miradi yako.", zh: "查看、管理并跟踪您的预约和项目。", hi: "अपनी अपॉइंटमेंट और परियोजनाओं को देखें, प्रबंधित करें और ट्रैक करें।" },
    },
    experts: {
      title: { en: "Find Experts", es: "Encuentra expertos", fr: "Trouver des experts", pt: "Encontre especialistas", ar: "ابحث عن الخبراء", sw: "Pata wataalamu", zh: "寻找专家", hi: "विशेषज्ञ खोजें" },
      intro: { en: "Discover professionals across clinical care, research, grant writing, and mentorship.", es: "Descubre profesionales en atención clínica, investigación, redacción de subvenciones y mentoría.", fr: "Découvrez des professionnels en soins cliniques, recherche, rédaction de subventions et mentorat.", pt: "Descubra profissionais em cuidado clínico, pesquisa, redação de subvenções e mentoria.", ar: "اكتشف محترفين في الرعاية السريرية والبحث وكتابة المنح والإرشاد.", sw: "Gundua wataalamu katika utunzaji wa kliniki, utafiti, uandishi wa ufadhili na ushauri.", zh: "在临床护理、研究、资助撰写和指导领域发现专业人士。", hi: "नैदानिक देखभाल, अनुसंधान, अनुदान लेखन और मार्गदर्शन में पेशेवरों की खोज करें।" },
    },
    messages: {
      title: { en: "Messages", es: "Mensajes", fr: "Messages", pt: "Mensagens", ar: "الرسائل", sw: "Ujumbe", zh: "消息", hi: "संदेश" },
      intro: { en: "Communicate with your healthcare providers.", es: "Comunícate con tus proveedores de salud.", fr: "Communiquez avec vos prestataires de santé.", pt: "Comunique-se com seus profissionais de saúde.", ar: "تواصل مع مقدمي الرعاية الصحية لديك.", sw: "Wasiliana na watoa huduma wako wa afya.", zh: "与您的医疗服务提供者沟通。", hi: "अपने स्वास्थ्य देखभाल प्रदाताओं के साथ संवाद करें।" },
    },
    payments: {
      title: { en: "Payment History", es: "Historial de pagos", fr: "Historique des paiements", pt: "Histórico de pagamentos", ar: "سجل المدفوعات", sw: "Historia ya malipo", zh: "付款历史", hi: "भुगतान इतिहास" },
      intro: { en: "View your transactions, receipts, and manage payment methods.", es: "Visualiza tus transacciones, recibos y administra los métodos de pago.", fr: "Consultez vos transactions, reçus et gérez vos moyens de paiement.", pt: "Veja suas transações, recibos e gerencie métodos de pagamento.", ar: "اعرض معاملاتك وإيصالاتك وأدِر وسائل الدفع.", sw: "Angalia miamala yako, risiti, na simamia njia za malipo.", zh: "查看您的交易、收据并管理支付方式。", hi: "अपने लेनदेन, रसीदें देखें और भुगतान विधियों का प्रबंधन करें।" },
    },
    preferences: {
      title: { en: "Preferences", es: "Preferencias", fr: "Préférences", pt: "Preferências", ar: "التفضيلات", sw: "Mapendeleo", zh: "偏好设置", hi: "प्राथमिकताएँ" },
      intro: { en: "Customize how SandiLink works for you.", es: "Personaliza cómo funciona SandiLink para ti.", fr: "Personnalisez SandiLink selon vos besoins.", pt: "Personalize como o SandiLink funciona para você.", ar: "خصّص كيفية عمل SandiLink بما يناسبك.", sw: "Boresha jinsi SandiLink inavyokufanyia kazi.", zh: "自定义 SandiLink 的使用方式。", hi: "SandiLink आपके लिए कैसे काम करता है, इसे अनुकूलित करें।" },
    },
    profile: {
      title: { en: "Profile", es: "Perfil", fr: "Profil", pt: "Perfil", ar: "الملف الشخصي", sw: "Wasifu", zh: "个人资料", hi: "प्रोफ़ाइल" },
      intro: { en: "Manage your personal information and how others see you on the platform.", es: "Gestiona tu información personal y cómo te ven otros en la plataforma.", fr: "Gérez vos informations personnelles et la manière dont les autres vous voient.", pt: "Gerencie suas informações pessoais e como os outros veem você na plataforma.", ar: "أدِر معلوماتك الشخصية وكيف يراك الآخرون على المنصة.", sw: "Simamia maelezo yako binafsi na jinsi wengine wanavyokuona kwenye jukwaa.", zh: "管理您的个人信息以及其他人在平台上看到您的方式。", hi: "अपनी व्यक्तिगत जानकारी और प्लेटफ़ॉर्म पर अन्य लोग आपको कैसे देखते हैं, इसका प्रबंधन करें।" },
    },
    settings: {
      title: { en: "Account Settings", es: "Configuración de cuenta", fr: "Paramètres du compte", pt: "Configurações da conta", ar: "إعدادات الحساب", sw: "Mipangilio ya akaunti", zh: "帐户设置", hi: "खाता सेटिंग्स" },
      intro: { en: "Manage your account security, notifications, and data.", es: "Gestiona la seguridad de tu cuenta, notificaciones y datos.", fr: "Gérez la sécurité de votre compte, les notifications et les données.", pt: "Gerencie a segurança da conta, notificações e dados.", ar: "أدِر أمان حسابك والإشعارات والبيانات.", sw: "Simamia usalama wa akaunti yako, arifa, na data.", zh: "管理您的帐户安全、通知和数据。", hi: "अपने खाते की सुरक्षा, सूचनाएँ और डेटा प्रबंधित करें।" },
    },
  },
  serviceUserDetail: {
    bookingSuccess: {
      heading: { en: "Booking Confirmed!", es: "¡Reserva confirmada!", fr: "Réservation confirmée !", pt: "Reserva confirmada!", ar: "تم تأكيد الحجز!", sw: "Nafasi imethibitishwa!", zh: "预订已确认！", hi: "बुकिंग की पुष्टि हो गई!" },
      body: { en: "Your appointment has been successfully booked and payment processed.", es: "Tu cita se ha reservado correctamente y el pago se procesó.", fr: "Votre rendez-vous est confirmé et le paiement a été traité.", pt: "Seu agendamento foi confirmado e o pagamento processado.", ar: "تم حجز موعدك بنجاح وتمت معالجة الدفع.", sw: "Miadi yako imewekwa kwa mafanikio na malipo yameshughulikiwa.", zh: "您的预约已成功预订，付款已处理。", hi: "आपकी अपॉइंटमेंट सफलतापूर्वक बुक हो गई और भुगतान संसाधित हो गया।" },
      confirmationIdLabel: { en: "Confirmation ID:", es: "ID de confirmación:", fr: "ID de confirmation :", pt: "ID de confirmação:", ar: "رقم التأكيد:", sw: "Kitambulisho cha uthibitisho:", zh: "确认编号：", hi: "पुष्टिकरण ID:" },
    },
    reviewForm: {
      thankYouHeading: { en: "Thank you for your review!", es: "¡Gracias por tu reseña!", fr: "Merci pour votre avis !", pt: "Obrigado pela sua avaliação!", ar: "شكرًا على تقييمك!", sw: "Asante kwa hakiki yako!", zh: "感谢您的评价！", hi: "आपकी समीक्षा के लिए धन्यवाद!" },
    },
    bookingDetails: {
      backToBookings: { en: "Back to bookings", es: "Volver a las reservas", fr: "Retour aux réservations", pt: "Voltar às reservas", ar: "العودة إلى الحجوزات", sw: "Rudi kwenye nafasi", zh: "返回预订", hi: "बुकिंग पर वापस जाएँ" },
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
