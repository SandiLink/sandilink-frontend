#!/usr/bin/env node
/**
 * One-shot helper to land Phase 1 translation keys (auth + dashboard
 * welcome blocks) across all 8 locale files. Idempotent — run once and
 * delete, or re-run after editing TRANSLATIONS to update.
 *
 * Tier 1 (en, es, fr) get full translations.
 * Tier 2 (pt, ar, sw, zh, hi) get best-effort placeholders consistent with
 * the existing pending-translation pattern. Native-speaker review is the
 * separate task already tracked in screens.md item 13.5.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

const TRANSLATIONS = {
  auth: {
    shared: {
      or: { en: "or", es: "o", fr: "ou", pt: "ou", ar: "أو", sw: "au", zh: "或", hi: "या" },
      orSignInManually: { en: "or sign in manually", es: "o inicia sesión manualmente", fr: "ou connectez-vous manuellement", pt: "ou faça login manualmente", ar: "أو سجّل الدخول يدويًا", sw: "au ingia mwenyewe", zh: "或手动登录", hi: "या मैन्युअल रूप से साइन इन करें" },
      showPassword: { en: "Show password", es: "Mostrar contraseña", fr: "Afficher le mot de passe", pt: "Mostrar senha", ar: "إظهار كلمة المرور", sw: "Onyesha nenosiri", zh: "显示密码", hi: "पासवर्ड दिखाएँ" },
      hidePassword: { en: "Hide password", es: "Ocultar contraseña", fr: "Masquer le mot de passe", pt: "Ocultar senha", ar: "إخفاء كلمة المرور", sw: "Ficha nenosiri", zh: "隐藏密码", hi: "पासवर्ड छिपाएँ" },
      continueWithGoogle: { en: "Continue with Google", es: "Continuar con Google", fr: "Continuer avec Google", pt: "Continuar com Google", ar: "المتابعة مع Google", sw: "Endelea na Google", zh: "使用 Google 继续", hi: "Google के साथ जारी रखें" },
      rememberPassword: { en: "Remember your password?", es: "¿Recuerdas tu contraseña?", fr: "Vous vous souvenez de votre mot de passe ?", pt: "Lembra-se da sua senha?", ar: "هل تتذكر كلمة المرور الخاصة بك؟", sw: "Unakumbuka nenosiri lako?", zh: "记得您的密码？", hi: "क्या आपको अपना पासवर्ड याद है?" },
      signIn: { en: "Sign in", es: "Iniciar sesión", fr: "Se connecter", pt: "Entrar", ar: "تسجيل الدخول", sw: "Ingia", zh: "登录", hi: "साइन इन" },
      signUp: { en: "Sign up", es: "Registrarse", fr: "S'inscrire", pt: "Cadastrar-se", ar: "إنشاء حساب", sw: "Jisajili", zh: "注册", hi: "साइन अप" },
      backToSignIn: { en: "Back to sign in", es: "Volver al inicio de sesión", fr: "Retour à la connexion", pt: "Voltar para entrar", ar: "العودة إلى تسجيل الدخول", sw: "Rudi kuingia", zh: "返回登录", hi: "साइन इन पर वापस जाएँ" },
      sidePanelTagline: { en: "Connecting healthcare professionals, students, and institutions on one seamless platform.", es: "Conectando a profesionales de la salud, estudiantes e instituciones en una plataforma fluida.", fr: "Réunir professionnels de santé, étudiants et établissements sur une plateforme unifiée.", pt: "Conectando profissionais de saúde, estudantes e instituições em uma plataforma única.", ar: "نربط بين ممارسي الرعاية الصحية والطلاب والمؤسسات في منصة واحدة.", sw: "Inaunganisha wataalamu wa afya, wanafunzi na taasisi katika jukwaa moja.", zh: "将医疗专业人员、学生和机构连接到一个无缝的平台。", hi: "स्वास्थ्य पेशेवरों, छात्रों और संस्थानों को एक सहज मंच पर जोड़ना।" },
    },
    login: {
      pageTitle: { en: "Welcome back", es: "Bienvenido de nuevo", fr: "Bon retour", pt: "Bem-vindo de volta", ar: "مرحبًا بعودتك", sw: "Karibu tena", zh: "欢迎回来", hi: "वापसी पर स्वागत है" },
      pageDescription: { en: "Sign in to access your SandiLink account", es: "Inicia sesión para acceder a tu cuenta de SandiLink", fr: "Connectez-vous à votre compte SandiLink", pt: "Entre para acessar sua conta SandiLink", ar: "سجّل الدخول للوصول إلى حسابك في SandiLink", sw: "Ingia ili kufikia akaunti yako ya SandiLink", zh: "登录以访问您的 SandiLink 帐户", hi: "अपने SandiLink खाते तक पहुँचने के लिए साइन इन करें" },
      quickDemoLogin: { en: "Quick demo login", es: "Inicio de sesión de demostración", fr: "Connexion démo rapide", pt: "Login de demonstração rápido", ar: "تسجيل دخول تجريبي سريع", sw: "Ingia haraka kwa onyesho", zh: "快速演示登录", hi: "त्वरित डेमो लॉगिन" },
      emailLabel: { en: "Email address", es: "Correo electrónico", fr: "Adresse e-mail", pt: "E-mail", ar: "البريد الإلكتروني", sw: "Anwani ya barua pepe", zh: "电子邮件地址", hi: "ईमेल पता" },
      emailPlaceholder: { en: "you@example.com", es: "tu@ejemplo.com", fr: "vous@exemple.com", pt: "voce@exemplo.com", ar: "you@example.com", sw: "wewe@mfano.com", zh: "you@example.com", hi: "aap@udaharan.com" },
      passwordLabel: { en: "Password", es: "Contraseña", fr: "Mot de passe", pt: "Senha", ar: "كلمة المرور", sw: "Nenosiri", zh: "密码", hi: "पासवर्ड" },
      passwordPlaceholder: { en: "Enter your password", es: "Ingresa tu contraseña", fr: "Entrez votre mot de passe", pt: "Digite sua senha", ar: "أدخل كلمة المرور الخاصة بك", sw: "Ingiza nenosiri lako", zh: "输入您的密码", hi: "अपना पासवर्ड दर्ज करें" },
      forgotPassword: { en: "Forgot password?", es: "¿Olvidaste tu contraseña?", fr: "Mot de passe oublié ?", pt: "Esqueceu a senha?", ar: "هل نسيت كلمة المرور؟", sw: "Umesahau nenosiri?", zh: "忘记密码？", hi: "पासवर्ड भूल गए?" },
      rememberMe: { en: "Remember me", es: "Recuérdame", fr: "Se souvenir de moi", pt: "Lembrar de mim", ar: "تذكرني", sw: "Nikumbuke", zh: "记住我", hi: "मुझे याद रखें" },
      signingIn: { en: "Signing in...", es: "Iniciando sesión...", fr: "Connexion...", pt: "Entrando...", ar: "جاري تسجيل الدخول...", sw: "Inaingia...", zh: "登录中…", hi: "साइन इन हो रहा है..." },
      signIn: { en: "Sign in", es: "Iniciar sesión", fr: "Se connecter", pt: "Entrar", ar: "تسجيل الدخول", sw: "Ingia", zh: "登录", hi: "साइन इन" },
      noAccount: { en: "Don't have an account?", es: "¿No tienes una cuenta?", fr: "Vous n'avez pas de compte ?", pt: "Não tem uma conta?", ar: "ليس لديك حساب؟", sw: "Huna akaunti?", zh: "没有帐户？", hi: "खाता नहीं है?" },
    },
    register: {
      pageTitle: { en: "Create your account", es: "Crea tu cuenta", fr: "Créer votre compte", pt: "Crie sua conta", ar: "أنشئ حسابك", sw: "Fungua akaunti yako", zh: "创建您的帐户", hi: "अपना खाता बनाएँ" },
      pageDescription: { en: "Join SandiLink to get started", es: "Únete a SandiLink para comenzar", fr: "Rejoignez SandiLink pour commencer", pt: "Junte-se ao SandiLink para começar", ar: "انضم إلى SandiLink للبدء", sw: "Jiunge na SandiLink kuanza", zh: "加入 SandiLink 即可开始使用", hi: "शुरू करने के लिए SandiLink से जुड़ें" },
      selectRolePrompt: { en: "Select the role that best describes you", es: "Selecciona el rol que mejor te describa", fr: "Sélectionnez le rôle qui vous correspond le mieux", pt: "Selecione o papel que melhor descreve você", ar: "اختر الدور الذي يصفك بشكل أفضل", sw: "Chagua jukumu linalokuelezea vizuri zaidi", zh: "选择最能描述您的角色", hi: "वह भूमिका चुनें जो आपका सबसे अच्छा वर्णन करती है" },
      continue: { en: "Continue", es: "Continuar", fr: "Continuer", pt: "Continuar", ar: "متابعة", sw: "Endelea", zh: "继续", hi: "जारी रखें" },
      firstNameLabel: { en: "First name", es: "Nombre", fr: "Prénom", pt: "Nome", ar: "الاسم الأول", sw: "Jina la kwanza", zh: "名字", hi: "पहला नाम" },
      lastNameLabel: { en: "Last name", es: "Apellido", fr: "Nom", pt: "Sobrenome", ar: "اسم العائلة", sw: "Jina la familia", zh: "姓氏", hi: "उपनाम" },
      emailLabel: { en: "Email address", es: "Correo electrónico", fr: "Adresse e-mail", pt: "E-mail", ar: "البريد الإلكتروني", sw: "Anwani ya barua pepe", zh: "电子邮件地址", hi: "ईमेल पता" },
      passwordLabel: { en: "Password", es: "Contraseña", fr: "Mot de passe", pt: "Senha", ar: "كلمة المرور", sw: "Nenosiri", zh: "密码", hi: "पासवर्ड" },
      passwordPlaceholder: { en: "Create a password", es: "Crea una contraseña", fr: "Créez un mot de passe", pt: "Crie uma senha", ar: "أنشئ كلمة مرور", sw: "Tengeneza nenosiri", zh: "创建密码", hi: "एक पासवर्ड बनाएँ" },
      passwordHint: { en: "Must be at least 8 characters", es: "Debe tener al menos 8 caracteres", fr: "Doit contenir au moins 8 caractères", pt: "Deve ter pelo menos 8 caracteres", ar: "يجب ألا يقل عن 8 أحرف", sw: "Lazima iwe na herufi 8 au zaidi", zh: "至少 8 个字符", hi: "कम से कम 8 अक्षर होने चाहिए" },
      termsAgreementBefore: { en: "I agree to the ", es: "Acepto los ", fr: "J'accepte les ", pt: "Concordo com os ", ar: "أوافق على ", sw: "Ninakubali ", zh: "我同意 ", hi: "मैं " },
      termsAgreementAnd: { en: " and ", es: " y la ", fr: " et la ", pt: " e a ", ar: " و", sw: " na ", zh: " 和 ", hi: " और " },
      termsLink: { en: "Terms of Service", es: "Términos de Servicio", fr: "Conditions d'utilisation", pt: "Termos de Serviço", ar: "شروط الخدمة", sw: "Masharti ya Huduma", zh: "服务条款", hi: "सेवा की शर्तें" },
      privacyLink: { en: "Privacy Policy", es: "Política de Privacidad", fr: "Politique de confidentialité", pt: "Política de Privacidade", ar: "سياسة الخصوصية", sw: "Sera ya Faragha", zh: "隐私政策", hi: "गोपनीयता नीति" },
      back: { en: "Back", es: "Atrás", fr: "Retour", pt: "Voltar", ar: "رجوع", sw: "Rudi", zh: "返回", hi: "वापस" },
      creatingAccount: { en: "Creating account...", es: "Creando cuenta...", fr: "Création du compte...", pt: "Criando conta...", ar: "جاري إنشاء الحساب...", sw: "Inaunda akaunti...", zh: "正在创建帐户…", hi: "खाता बनाया जा रहा है..." },
      createAccount: { en: "Create account", es: "Crear cuenta", fr: "Créer le compte", pt: "Criar conta", ar: "إنشاء حساب", sw: "Fungua akaunti", zh: "创建帐户", hi: "खाता बनाएँ" },
      haveAccount: { en: "Already have an account?", es: "¿Ya tienes una cuenta?", fr: "Vous avez déjà un compte ?", pt: "Já tem uma conta?", ar: "هل لديك حساب بالفعل؟", sw: "Tayari una akaunti?", zh: "已经有帐户？", hi: "पहले से एक खाता है?" },
      roles: {
        serviceUserLabel: { en: "Service User", es: "Usuario de Servicios", fr: "Utilisateur de services", pt: "Usuário de Serviços", ar: "مستخدم الخدمة", sw: "Mtumiaji wa Huduma", zh: "服务用户", hi: "सेवा उपयोगकर्ता" },
        serviceUserDescription: { en: "Search and book healthcare providers", es: "Busca y reserva proveedores de atención médica", fr: "Trouvez et réservez des soignants", pt: "Busque e agende com profissionais de saúde", ar: "ابحث عن مقدمي الرعاية الصحية واحجز معهم", sw: "Tafuta na uweke nafasi na watoa huduma za afya", zh: "搜索并预约医疗服务提供者", hi: "स्वास्थ्य देखभाल प्रदाताओं को खोजें और बुक करें" },
        careProviderLabel: { en: "Care Provider", es: "Proveedor de Atención", fr: "Soignant", pt: "Prestador de Cuidados", ar: "مقدم رعاية", sw: "Mtoa Huduma za Afya", zh: "医疗服务提供者", hi: "देखभाल प्रदाता" },
        careProviderDescription: { en: "Offer your healthcare services", es: "Ofrece tus servicios de salud", fr: "Proposez vos services de santé", pt: "Ofereça seus serviços de saúde", ar: "قدّم خدمات الرعاية الصحية الخاصة بك", sw: "Toa huduma zako za afya", zh: "提供您的医疗服务", hi: "अपनी स्वास्थ्य सेवाएँ प्रदान करें" },
        studentLabel: { en: "Healthcare Student", es: "Estudiante de Ciencias de la Salud", fr: "Étudiant en santé", pt: "Estudante de Saúde", ar: "طالب في مجال الرعاية الصحية", sw: "Mwanafunzi wa Afya", zh: "医疗保健学生", hi: "स्वास्थ्य देखभाल छात्र" },
        studentDescription: { en: "Find clinical placements and preceptors", es: "Encuentra rotaciones clínicas y preceptores", fr: "Trouvez des stages cliniques et des précepteurs", pt: "Encontre estágios clínicos e preceptores", ar: "اعثر على فرص تدريب سريرية ومرشدين", sw: "Pata nafasi za kliniki na waelekezi", zh: "寻找临床实习和导师", hi: "नैदानिक प्लेसमेंट और प्रिसेप्टर खोजें" },
        institutionLabel: { en: "Educational Institution", es: "Institución Educativa", fr: "Établissement d'enseignement", pt: "Instituição de Ensino", ar: "مؤسسة تعليمية", sw: "Taasisi ya Elimu", zh: "教育机构", hi: "शैक्षणिक संस्थान" },
        institutionDescription: { en: "Manage student placements at scale", es: "Gestiona rotaciones de estudiantes a gran escala", fr: "Gérez les stages des étudiants à grande échelle", pt: "Gerencie estágios de estudantes em escala", ar: "أدِر تدريبات الطلاب على نطاق واسع", sw: "Simamia nafasi za wanafunzi kwa kiwango kikubwa", zh: "大规模管理学生实习", hi: "बड़े पैमाने पर छात्र प्लेसमेंट प्रबंधित करें" },
        preceptorLabel: { en: "Preceptor", es: "Preceptor", fr: "Précepteur", pt: "Preceptor", ar: "مرشد سريري", sw: "Mwelekezi", zh: "临床导师", hi: "प्रिसेप्टर" },
        preceptorDescription: { en: "Mentor students in clinical settings", es: "Acompaña a estudiantes en entornos clínicos", fr: "Encadrez les étudiants en milieu clinique", pt: "Oriente estudantes em ambientes clínicos", ar: "قدّم التوجيه للطلاب في البيئات السريرية", sw: "Wafundishe wanafunzi katika mazingira ya kliniki", zh: "在临床环境中指导学生", hi: "नैदानिक सेटिंग्स में छात्रों को मार्गदर्शन दें" },
        researcherLabel: { en: "Researcher", es: "Investigador", fr: "Chercheur", pt: "Pesquisador", ar: "باحث", sw: "Mtafiti", zh: "研究员", hi: "शोधकर्ता" },
        researcherDescription: { en: "Discover grants, publish research, and find collaborators", es: "Descubre subvenciones, publica investigaciones y encuentra colaboradores", fr: "Trouvez des subventions, publiez des recherches et identifiez des collaborateurs", pt: "Descubra financiamentos, publique pesquisas e encontre colaboradores", ar: "اكتشف المنح وانشر الأبحاث واعثر على متعاونين", sw: "Gundua ufadhili, chapisha utafiti, na pata washirika", zh: "发现资助、发布研究并寻找合作伙伴", hi: "अनुदान खोजें, शोध प्रकाशित करें और सहयोगी खोजें" },
        grantWriterLabel: { en: "Grant Writer", es: "Redactor de Subvenciones", fr: "Rédacteur de subventions", pt: "Redator de Subvenções", ar: "كاتب منح", sw: "Mwandishi wa Ufadhili", zh: "资助提案撰写者", hi: "अनुदान लेखक" },
        grantWriterDescription: { en: "Help researchers write winning grant proposals", es: "Ayuda a investigadores a redactar propuestas ganadoras", fr: "Aidez les chercheurs à rédiger des propositions gagnantes", pt: "Ajude pesquisadores a escrever propostas vencedoras", ar: "ساعد الباحثين على كتابة مقترحات منح ناجحة", sw: "Wasaidie watafiti kuandika mapendekezo ya ufadhili yanayoshinda", zh: "帮助研究人员撰写成功的资助提案", hi: "शोधकर्ताओं को विजयी अनुदान प्रस्ताव लिखने में मदद करें" },
      },
    },
    forgotPassword: {
      pageTitle: { en: "Forgot your password?", es: "¿Olvidaste tu contraseña?", fr: "Mot de passe oublié ?", pt: "Esqueceu sua senha?", ar: "هل نسيت كلمة المرور؟", sw: "Umesahau nenosiri lako?", zh: "忘记密码？", hi: "पासवर्ड भूल गए?" },
      pageDescription: { en: "No worries, we'll help you reset it", es: "No te preocupes, te ayudaremos a restablecerla", fr: "Pas de souci, nous allons vous aider à le réinitialiser", pt: "Sem problema — vamos te ajudar a redefinir", ar: "لا تقلق، سنساعدك في إعادة تعيينها", sw: "Usijali, tutakusaidia kuirudisha", zh: "别担心，我们会帮您重置", hi: "चिंता न करें, हम इसे रीसेट करने में मदद करेंगे" },
      instructions: { en: "Enter the email address associated with your account and we'll send you a link to reset your password.", es: "Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.", fr: "Entrez l'adresse e-mail associée à votre compte et nous vous enverrons un lien de réinitialisation.", pt: "Digite o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.", ar: "أدخل البريد الإلكتروني المرتبط بحسابك وسنرسل لك رابط إعادة تعيين كلمة المرور.", sw: "Ingiza anwani ya barua pepe iliyounganishwa na akaunti yako na tutakutumia kiungo cha kurudisha nenosiri.", zh: "输入与您帐户关联的电子邮件地址，我们将向您发送重置密码的链接。", hi: "अपने खाते से जुड़ा ईमेल पता दर्ज करें और हम आपको पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे।" },
      sendingLink: { en: "Sending link...", es: "Enviando enlace...", fr: "Envoi du lien...", pt: "Enviando link...", ar: "جاري إرسال الرابط...", sw: "Inatuma kiungo...", zh: "正在发送链接…", hi: "लिंक भेजा जा रहा है..." },
      sendResetLink: { en: "Send reset link", es: "Enviar enlace de restablecimiento", fr: "Envoyer le lien de réinitialisation", pt: "Enviar link de redefinição", ar: "إرسال رابط إعادة التعيين", sw: "Tuma kiungo cha kurudisha", zh: "发送重置链接", hi: "रीसेट लिंक भेजें" },
      successPrefix: { en: "If an account exists for", es: "Si existe una cuenta para", fr: "Si un compte existe pour", pt: "Se houver uma conta para", ar: "إذا كان هناك حساب لـ", sw: "Iwapo kuna akaunti kwa", zh: "如果存在以下帐户", hi: "यदि निम्नलिखित के लिए कोई खाता मौजूद है" },
      successInstructions: { en: "you'll receive a password reset link shortly. Check your inbox and spam folder.", es: "recibirás un enlace de restablecimiento en breve. Revisa tu bandeja de entrada y carpeta de spam.", fr: "vous recevrez un lien de réinitialisation sous peu. Vérifiez votre boîte de réception et vos spams.", pt: "você receberá um link de redefinição em breve. Verifique sua caixa de entrada e pasta de spam.", ar: "ستتلقى رابط إعادة تعيين كلمة المرور قريبًا. تحقق من البريد الوارد ومجلد البريد العشوائي.", sw: "utapokea kiungo cha kurudisha nenosiri muda mfupi. Angalia kikasha chako na folda ya barua taka.", zh: "您稍后会收到重置密码的链接。请查看收件箱和垃圾邮件文件夹。", hi: "आपको शीघ्र ही पासवर्ड रीसेट लिंक प्राप्त होगा। अपना इनबॉक्स और स्पैम फ़ोल्डर देखें।" },
    },
    resetPassword: {
      pageTitle: { en: "Set new password", es: "Establecer nueva contraseña", fr: "Définir un nouveau mot de passe", pt: "Definir nova senha", ar: "تعيين كلمة مرور جديدة", sw: "Weka nenosiri jipya", zh: "设置新密码", hi: "नया पासवर्ड सेट करें" },
      pageDescription: { en: "Create a strong password for your account", es: "Crea una contraseña segura para tu cuenta", fr: "Créez un mot de passe robuste pour votre compte", pt: "Crie uma senha forte para sua conta", ar: "أنشئ كلمة مرور قوية لحسابك", sw: "Tengeneza nenosiri imara kwa akaunti yako", zh: "为您的帐户创建一个强密码", hi: "अपने खाते के लिए एक मजबूत पासवर्ड बनाएँ" },
      newPasswordLabel: { en: "New password", es: "Nueva contraseña", fr: "Nouveau mot de passe", pt: "Nova senha", ar: "كلمة المرور الجديدة", sw: "Nenosiri jipya", zh: "新密码", hi: "नया पासवर्ड" },
      newPasswordPlaceholder: { en: "Enter new password", es: "Ingresa la nueva contraseña", fr: "Saisir le nouveau mot de passe", pt: "Digite a nova senha", ar: "أدخل كلمة المرور الجديدة", sw: "Ingiza nenosiri jipya", zh: "输入新密码", hi: "नया पासवर्ड दर्ज करें" },
      confirmPasswordLabel: { en: "Confirm password", es: "Confirmar contraseña", fr: "Confirmer le mot de passe", pt: "Confirmar senha", ar: "تأكيد كلمة المرور", sw: "Thibitisha nenosiri", zh: "确认密码", hi: "पासवर्ड की पुष्टि करें" },
      confirmPasswordPlaceholder: { en: "Confirm new password", es: "Confirma la nueva contraseña", fr: "Confirmer le nouveau mot de passe", pt: "Confirme a nova senha", ar: "أكّد كلمة المرور الجديدة", sw: "Thibitisha nenosiri jipya", zh: "确认新密码", hi: "नए पासवर्ड की पुष्टि करें" },
      resettingPassword: { en: "Resetting password...", es: "Restableciendo contraseña...", fr: "Réinitialisation du mot de passe...", pt: "Redefinindo senha...", ar: "جاري إعادة تعيين كلمة المرور...", sw: "Inarudisha nenosiri...", zh: "正在重置密码…", hi: "पासवर्ड रीसेट हो रहा है..." },
      resetPassword: { en: "Reset password", es: "Restablecer contraseña", fr: "Réinitialiser le mot de passe", pt: "Redefinir senha", ar: "إعادة تعيين كلمة المرور", sw: "Rudisha nenosiri", zh: "重置密码", hi: "पासवर्ड रीसेट करें" },
      successHeading: { en: "Password reset successfully", es: "Contraseña restablecida con éxito", fr: "Mot de passe réinitialisé", pt: "Senha redefinida com sucesso", ar: "تم إعادة تعيين كلمة المرور بنجاح", sw: "Nenosiri limerudishwa kwa mafanikio", zh: "密码重置成功", hi: "पासवर्ड सफलतापूर्वक रीसेट किया गया" },
      successDescription: { en: "Your password has been updated. You can now sign in with your new password.", es: "Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión con tu nueva contraseña.", fr: "Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter avec.", pt: "Sua senha foi atualizada. Você já pode entrar com a nova senha.", ar: "تم تحديث كلمة المرور. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.", sw: "Nenosiri lako limesasishwa. Sasa unaweza kuingia kwa nenosiri lako jipya.", zh: "您的密码已更新。您现在可以使用新密码登录。", hi: "आपका पासवर्ड अपडेट हो गया है। अब आप अपने नए पासवर्ड से साइन इन कर सकते हैं।" },
    },
    mfaSetup: {
      pageTitle: { en: "Secure your account", es: "Asegura tu cuenta", fr: "Sécurisez votre compte", pt: "Proteja sua conta", ar: "أمّن حسابك", sw: "Linda akaunti yako", zh: "保护您的帐户", hi: "अपने खाते को सुरक्षित करें" },
      pageDescription: { en: "Set up two-factor authentication", es: "Configura la autenticación de dos factores", fr: "Activez l'authentification à deux facteurs", pt: "Configure a autenticação de dois fatores", ar: "إعداد المصادقة الثنائية", sw: "Sanidi uthibitishaji wa hatua mbili", zh: "设置双重验证", hi: "दो-कारक प्रमाणीकरण सेट करें" },
      introCopy: { en: "Add an extra layer of security to your account by enabling two-factor authentication using an authenticator app.", es: "Añade una capa extra de seguridad a tu cuenta activando la autenticación de dos factores con una app autenticadora.", fr: "Ajoutez une couche de sécurité supplémentaire à votre compte en activant l'authentification à deux facteurs.", pt: "Adicione uma camada extra de segurança ativando a autenticação de dois fatores com um app autenticador.", ar: "أضف طبقة أمان إضافية إلى حسابك بتفعيل المصادقة الثنائية باستخدام تطبيق مصادقة.", sw: "Ongeza usalama zaidi kwa akaunti yako kwa kuwasha uthibitishaji wa hatua mbili kupitia programu ya uthibitishaji.", zh: "启用使用身份验证应用的双重验证，为您的帐户添加额外一层安全保障。", hi: "एक प्रमाणीकरण ऐप का उपयोग करके दो-कारक प्रमाणीकरण सक्षम करके अपने खाते में अतिरिक्त सुरक्षा परत जोड़ें।" },
      youllNeed: { en: "You'll need", es: "Necesitarás", fr: "Vous aurez besoin de", pt: "Você precisará de", ar: "ستحتاج إلى", sw: "Utahitaji", zh: "您需要", hi: "आपको चाहिए होगा" },
      youllNeedAuthApp: { en: "An authenticator app (Google Authenticator, Authy, etc.)", es: "Una app autenticadora (Google Authenticator, Authy, etc.)", fr: "Une app d'authentification (Google Authenticator, Authy, etc.)", pt: "Um app autenticador (Google Authenticator, Authy, etc.)", ar: "تطبيق مصادقة (Google Authenticator، Authy، إلخ)", sw: "Programu ya uthibitishaji (Google Authenticator, Authy, n.k.)", zh: "身份验证器应用（Google Authenticator、Authy 等）", hi: "एक प्रमाणीकरण ऐप (Google Authenticator, Authy, आदि)" },
      getStarted: { en: "Get started", es: "Comenzar", fr: "Commencer", pt: "Começar", ar: "ابدأ الآن", sw: "Anza", zh: "开始使用", hi: "शुरू करें" },
      doLater: { en: "I'll do this later", es: "Lo haré más tarde", fr: "Je le ferai plus tard", pt: "Faço isto depois", ar: "سأفعل ذلك لاحقًا", sw: "Nitafanya baadaye", zh: "我稍后再做", hi: "मैं यह बाद में करूँगा" },
      scanInstructions: { en: "Scan the QR code below with your authenticator app, or enter the setup key manually.", es: "Escanea el código QR con tu app autenticadora o ingresa la clave manualmente.", fr: "Scannez le code QR avec votre app d'authentification ou saisissez la clé manuellement.", pt: "Escaneie o QR code com seu app autenticador ou digite a chave manualmente.", ar: "امسح رمز الاستجابة السريعة باستخدام تطبيق المصادقة، أو أدخل المفتاح يدويًا.", sw: "Skani msimbo wa QR hapa chini kwa programu yako ya uthibitishaji, au ingiza ufunguo wewe mwenyewe.", zh: "用您的身份验证器应用扫描下方的 QR 码，或手动输入密钥。", hi: "नीचे दिए गए QR कोड को अपने प्रमाणीकरण ऐप से स्कैन करें, या सेटअप कुंजी मैन्युअल रूप से दर्ज करें।" },
      qrPlaceholder: { en: "QR code will appear here", es: "El código QR aparecerá aquí", fr: "Le code QR apparaîtra ici", pt: "O QR code aparecerá aqui", ar: "سيظهر رمز QR هنا", sw: "Msimbo wa QR utaonekana hapa", zh: "QR 码将显示在此处", hi: "QR कोड यहाँ दिखाई देगा" },
      cantScan: { en: "Can't scan? Enter this key manually:", es: "¿No puedes escanear? Ingresa esta clave manualmente:", fr: "Impossible de scanner ? Saisissez cette clé manuellement :", pt: "Não consegue escanear? Digite esta chave manualmente:", ar: "غير قادر على المسح؟ أدخل هذا المفتاح يدويًا:", sw: "Huwezi kuskani? Ingiza ufunguo huu wewe mwenyewe:", zh: "无法扫描？请手动输入此密钥：", hi: "स्कैन नहीं कर सकते? यह कुंजी मैन्युअल रूप से दर्ज करें:" },
      iScanned: { en: "I've scanned the code", es: "He escaneado el código", fr: "J'ai scanné le code", pt: "Eu escaneei o código", ar: "لقد قمت بمسح الرمز", sw: "Nimeskani msimbo", zh: "我已扫描代码", hi: "मैंने कोड स्कैन कर लिया है" },
      verifyInstructions: { en: "Enter the 6-digit code from your authenticator app to verify the setup.", es: "Ingresa el código de 6 dígitos de tu app autenticadora para verificar la configuración.", fr: "Saisissez le code à 6 chiffres de votre app d'authentification pour valider la configuration.", pt: "Digite o código de 6 dígitos do seu app autenticador para verificar a configuração.", ar: "أدخل الرمز المكوّن من 6 أرقام من تطبيق المصادقة لتأكيد الإعداد.", sw: "Ingiza msimbo wa tarakimu 6 kutoka programu yako ya uthibitishaji ili kuthibitisha usanidi.", zh: "输入身份验证器应用中的 6 位代码以验证设置。", hi: "सेटअप सत्यापित करने के लिए अपने प्रमाणीकरण ऐप से 6-अंकीय कोड दर्ज करें।" },
      verifying: { en: "Verifying...", es: "Verificando...", fr: "Vérification...", pt: "Verificando...", ar: "جاري التحقق...", sw: "Inathibitisha...", zh: "正在验证…", hi: "सत्यापित किया जा रहा है..." },
      verifyAndActivate: { en: "Verify and activate", es: "Verificar y activar", fr: "Vérifier et activer", pt: "Verificar e ativar", ar: "تحقق وتفعيل", sw: "Thibitisha na washa", zh: "验证并激活", hi: "सत्यापित करें और सक्रिय करें" },
      backToQr: { en: "Back to QR code", es: "Volver al código QR", fr: "Retour au code QR", pt: "Voltar ao QR code", ar: "العودة إلى رمز QR", sw: "Rudi kwenye msimbo wa QR", zh: "返回 QR 码", hi: "QR कोड पर वापस जाएँ" },
      doneHeading: { en: "Two-factor authentication is now active", es: "La autenticación de dos factores está activa", fr: "L'authentification à deux facteurs est active", pt: "A autenticação de dois fatores está ativa", ar: "تم تفعيل المصادقة الثنائية", sw: "Uthibitishaji wa hatua mbili sasa unafanya kazi", zh: "双重验证已启用", hi: "दो-कारक प्रमाणीकरण अब सक्रिय है" },
      doneDescription: { en: "You'll be asked for a verification code each time you sign in. Keep your authenticator app accessible.", es: "Se te pedirá un código de verificación cada vez que inicies sesión. Mantén tu app autenticadora accesible.", fr: "Un code de vérification vous sera demandé à chaque connexion. Gardez votre app d'authentification à portée de main.", pt: "Um código será solicitado a cada login. Mantenha seu app autenticador acessível.", ar: "سيُطلب منك رمز تحقق في كل مرة تسجّل فيها الدخول. احتفظ بتطبيق المصادقة في متناول يدك.", sw: "Utaombwa msimbo wa uthibitishaji kila unapoingia. Hifadhi programu yako ya uthibitishaji ikiweza kufikiwa.", zh: "每次登录时都需要输入验证码。请保持身份验证器应用可访问。", hi: "हर बार साइन इन करने पर आपको सत्यापन कोड मांगा जाएगा। अपने प्रमाणीकरण ऐप को सुलभ रखें।" },
      continue: { en: "Continue", es: "Continuar", fr: "Continuer", pt: "Continuar", ar: "متابعة", sw: "Endelea", zh: "继续", hi: "जारी रखें" },
    },
    verifyEmail: {
      pageTitle: { en: "Check your email", es: "Revisa tu correo", fr: "Vérifiez votre e-mail", pt: "Verifique seu e-mail", ar: "تحقق من بريدك الإلكتروني", sw: "Angalia barua pepe yako", zh: "检查您的邮箱", hi: "अपना ईमेल देखें" },
      pageDescription: { en: "Enter the verification code to continue", es: "Ingresa el código de verificación para continuar", fr: "Entrez le code de vérification pour continuer", pt: "Digite o código de verificação para continuar", ar: "أدخل رمز التحقق للمتابعة", sw: "Ingiza msimbo wa uthibitishaji kuendelea", zh: "输入验证码以继续", hi: "जारी रखने के लिए सत्यापन कोड दर्ज करें" },
      sentCodeTo: { en: "We sent a 6-digit code to", es: "Enviamos un código de 6 dígitos a", fr: "Nous avons envoyé un code à 6 chiffres à", pt: "Enviamos um código de 6 dígitos para", ar: "أرسلنا رمزًا مكوّنًا من 6 أرقام إلى", sw: "Tumetuma msimbo wa tarakimu 6 kwa", zh: "我们已发送 6 位代码至", hi: "हमने 6-अंकीय कोड भेजा है" },
      verifying: { en: "Verifying...", es: "Verificando...", fr: "Vérification...", pt: "Verificando...", ar: "جاري التحقق...", sw: "Inathibitisha...", zh: "正在验证…", hi: "सत्यापित किया जा रहा है..." },
      verifyEmail: { en: "Verify email", es: "Verificar correo", fr: "Vérifier l'e-mail", pt: "Verificar e-mail", ar: "تحقق من البريد الإلكتروني", sw: "Thibitisha barua pepe", zh: "验证邮箱", hi: "ईमेल सत्यापित करें" },
      didntReceive: { en: "Didn't receive the code?", es: "¿No recibiste el código?", fr: "Code non reçu ?", pt: "Não recebeu o código?", ar: "لم تتلقَّ الرمز؟", sw: "Haukupokea msimbo?", zh: "没收到代码？", hi: "कोड प्राप्त नहीं हुआ?" },
      resendIn: { en: "Resend in {seconds}s", es: "Reenviar en {seconds}s", fr: "Renvoyer dans {seconds}s", pt: "Reenviar em {seconds}s", ar: "إعادة الإرسال خلال {seconds} ث", sw: "Tuma tena baada ya {seconds}s", zh: "{seconds} 秒后重新发送", hi: "{seconds}s में पुनः भेजें" },
      sending: { en: "Sending...", es: "Enviando...", fr: "Envoi...", pt: "Enviando...", ar: "جاري الإرسال...", sw: "Inatuma...", zh: "正在发送…", hi: "भेजा जा रहा है..." },
      resendCode: { en: "Resend code", es: "Reenviar código", fr: "Renvoyer le code", pt: "Reenviar código", ar: "إعادة إرسال الرمز", sw: "Tuma msimbo tena", zh: "重新发送代码", hi: "कोड पुनः भेजें" },
    },
  },
  dashboards: {
    serviceUser: {
      welcomeBack: { en: "Welcome back!", es: "¡Bienvenido de nuevo!", fr: "Bon retour !", pt: "Bem-vindo de volta!", ar: "مرحبًا بعودتك!", sw: "Karibu tena!", zh: "欢迎回来！", hi: "वापसी पर स्वागत है!" },
      welcomeSubhead: { en: "Here's an overview of your activity and upcoming appointments.", es: "Aquí tienes un resumen de tu actividad y próximas citas.", fr: "Voici un aperçu de votre activité et de vos prochains rendez-vous.", pt: "Veja um resumo da sua atividade e dos próximos agendamentos.", ar: "إليك ملخصًا لنشاطك ومواعيدك القادمة.", sw: "Hapa kuna muhtasari wa shughuli zako na miadi ijayo.", zh: "以下是您的活动概览和即将到来的预约。", hi: "यहाँ आपकी गतिविधि और आगामी अपॉइंटमेंट का अवलोकन है।" },
    },
    provider: {
      greetingMorning: { en: "Good morning, Dr. Johnson", es: "Buenos días, Dra. Johnson", fr: "Bonjour, Dr Johnson", pt: "Bom dia, Dra. Johnson", ar: "صباح الخير، د. جونسون", sw: "Habari za asubuhi, Dkt. Johnson", zh: "早上好，约翰逊医生", hi: "सुप्रभात, डॉ. जॉनसन" },
      welcomeSubhead: { en: "You have {engagements} engagements today and {requests} pending requests.", es: "Hoy tienes {engagements} citas y {requests} solicitudes pendientes.", fr: "Vous avez {engagements} rendez-vous aujourd'hui et {requests} demandes en attente.", pt: "Você tem {engagements} atendimentos hoje e {requests} solicitações pendentes.", ar: "لديك {engagements} مواعيد اليوم و{requests} طلبات معلقة.", sw: "Una miadi {engagements} leo na maombi {requests} yanayosubiri.", zh: "您今天有 {engagements} 次会面和 {requests} 个待处理请求。", hi: "आपके आज {engagements} सत्र हैं और {requests} लंबित अनुरोध हैं।" },
    },
    student: {
      welcomeBack: { en: "Welcome back, Jane", es: "Bienvenida de nuevo, Jane", fr: "Bon retour, Jane", pt: "Bem-vinda de volta, Jane", ar: "مرحبًا بعودتك يا Jane", sw: "Karibu tena, Jane", zh: "欢迎回来，Jane", hi: "वापसी पर स्वागत है, Jane" },
      welcomeSubhead: { en: "Track your clinical placements, hours, and credentials.", es: "Sigue tus rotaciones clínicas, horas y credenciales.", fr: "Suivez vos stages cliniques, heures et titres.", pt: "Acompanhe seus estágios clínicos, horas e credenciais.", ar: "تابع تدريباتك السريرية وساعاتك ومؤهلاتك.", sw: "Fuatilia nafasi zako za kliniki, masaa na vyeti.", zh: "跟踪您的临床实习、小时数和资格凭证。", hi: "अपने नैदानिक प्लेसमेंट, घंटे और प्रमाण पत्र ट्रैक करें।" },
    },
    preceptor: {
      welcomeBack: { en: "Welcome back, Dr. Williams", es: "Bienvenido de nuevo, Dr. Williams", fr: "Bon retour, Dr Williams", pt: "Bem-vindo de volta, Dr. Williams", ar: "مرحبًا بعودتك يا د. Williams", sw: "Karibu tena, Dkt. Williams", zh: "欢迎回来，Williams 医生", hi: "वापसी पर स्वागत है, डॉ. Williams" },
      welcomeSubhead: { en: "Manage your students, placement requests, and mentorship activities.", es: "Gestiona tus estudiantes, solicitudes de rotación y actividades de mentoría.", fr: "Gérez vos étudiants, demandes de stage et activités de mentorat.", pt: "Gerencie seus estudantes, pedidos de estágio e atividades de mentoria.", ar: "أدِر طلابك وطلبات التدريب وأنشطة التوجيه.", sw: "Simamia wanafunzi wako, maombi ya nafasi na shughuli za kufundisha.", zh: "管理您的学生、实习申请和指导活动。", hi: "अपने छात्रों, प्लेसमेंट अनुरोधों और मार्गदर्शन गतिविधियों का प्रबंधन करें।" },
    },
    institution: {
      pageTitle: { en: "Institution Dashboard", es: "Panel de la Institución", fr: "Tableau de bord de l'établissement", pt: "Painel da Instituição", ar: "لوحة المؤسسة", sw: "Dashibodi ya Taasisi", zh: "机构仪表板", hi: "संस्थान डैशबोर्ड" },
      welcomeSubhead: { en: "Manage your students, placements, and preceptor relationships.", es: "Gestiona tus estudiantes, rotaciones y relaciones con preceptores.", fr: "Gérez vos étudiants, stages et relations avec les précepteurs.", pt: "Gerencie estudantes, estágios e relações com preceptores.", ar: "أدِر طلابك وتدريباتك وعلاقاتك مع المرشدين.", sw: "Simamia wanafunzi wako, nafasi na uhusiano na waelekezi.", zh: "管理您的学生、实习和导师关系。", hi: "अपने छात्रों, प्लेसमेंट और प्रिसेप्टर संबंधों का प्रबंधन करें।" },
    },
    researcher: {
      welcomeBack: { en: "Welcome back, Dr. Rashid", es: "Bienvenido de nuevo, Dr. Rashid", fr: "Bon retour, Dr Rashid", pt: "Bem-vindo de volta, Dr. Rashid", ar: "مرحبًا بعودتك يا د. Rashid", sw: "Karibu tena, Dkt. Rashid", zh: "欢迎回来，Rashid 医生", hi: "वापसी पर स्वागत है, डॉ. Rashid" },
      welcomeSubhead: { en: "Track your research projects, grants, and publications.", es: "Sigue tus proyectos de investigación, subvenciones y publicaciones.", fr: "Suivez vos projets de recherche, subventions et publications.", pt: "Acompanhe seus projetos de pesquisa, financiamentos e publicações.", ar: "تابع مشاريع أبحاثك ومنحك ومنشوراتك.", sw: "Fuatilia miradi yako ya utafiti, ufadhili na machapisho.", zh: "跟踪您的研究项目、资助和发表成果。", hi: "अपनी शोध परियोजनाओं, अनुदानों और प्रकाशनों को ट्रैक करें।" },
    },
    grantWriter: {
      welcomeBack: { en: "Welcome back, Lisa", es: "Bienvenida de nuevo, Lisa", fr: "Bon retour, Lisa", pt: "Bem-vinda de volta, Lisa", ar: "مرحبًا بعودتك يا Lisa", sw: "Karibu tena, Lisa", zh: "欢迎回来，Lisa", hi: "वापसी पर स्वागत है, Lisa" },
      welcomeSubhead: { en: "Manage your projects, track earnings, and grow your grant writing practice.", es: "Gestiona tus proyectos, controla tus ingresos y haz crecer tu práctica de redacción de subvenciones.", fr: "Gérez vos projets, suivez vos revenus et développez votre activité de rédaction de subventions.", pt: "Gerencie seus projetos, acompanhe ganhos e expanda sua prática de redação de subvenções.", ar: "أدِر مشاريعك وتابع أرباحك ووسّع نشاط كتابة المنح الخاص بك.", sw: "Simamia miradi yako, fuatilia mapato na ukuze biashara yako ya uandishi wa ufadhili.", zh: "管理您的项目、跟踪收入，并扩大您的资助提案撰写业务。", hi: "अपनी परियोजनाओं का प्रबंधन करें, आय ट्रैक करें और अपनी अनुदान-लेखन प्रैक्टिस बढ़ाएँ।" },
    },
    admin: {
      pageTitle: { en: "Platform Overview", es: "Resumen de la Plataforma", fr: "Vue d'ensemble de la plateforme", pt: "Visão Geral da Plataforma", ar: "نظرة عامة على المنصة", sw: "Muhtasari wa Jukwaa", zh: "平台概览", hi: "प्लेटफ़ॉर्म अवलोकन" },
      welcomeSubhead: { en: "Monitor platform health, user activity, and revenue metrics.", es: "Monitorea el estado de la plataforma, la actividad de los usuarios y las métricas de ingresos.", fr: "Surveillez la santé de la plateforme, l'activité des utilisateurs et les indicateurs de revenus.", pt: "Monitore a saúde da plataforma, a atividade dos usuários e as métricas de receita.", ar: "راقب صحة المنصة ونشاط المستخدمين ومقاييس الإيرادات.", sw: "Fuatilia afya ya jukwaa, shughuli za watumiaji na vipimo vya mapato.", zh: "监控平台健康状况、用户活动和收入指标。", hi: "प्लेटफ़ॉर्म स्वास्थ्य, उपयोगकर्ता गतिविधि और राजस्व मेट्रिक्स की निगरानी करें।" },
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
    if (v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object") {
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

for (const code of LOCALES) {
  const path = join(MESSAGES_DIR, `${code}.json`);
  const json = JSON.parse(await readFile(path, "utf8"));
  deepMerge(json, buildLocaleTree(TRANSLATIONS, code));
  await writeFile(path, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`updated ${code}.json`);
}
