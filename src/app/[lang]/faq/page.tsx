'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Search, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft,
  Info,
  FileSignature,
  CreditCard,
  Target,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Clock,
  History,
  User,
  Star,
  Laptop,
  PhoneCall,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const getFaqContent = (lang: Locale) => {
  const isAr = lang === 'ar';
  return {
    hero: {
      title: isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
      subtitle: isAr ? 'كل ما تحتاج معرفته حول الأكاديمية' : 'Everything You Need to Know About BBA',
      intro: isAr 
        ? 'اختيار البرنامج التعليمي المناسب لطفلك هو قرار مهم، ونحن نتفهم أن العائلات غالباً ما يكون لديها أسئلة قبل البدء. هنا ستجد إجابات مفيدة حول أكاديمية بنين وبنات، فلسفتنا التعليمية، برامجنا، القبول، ودعم الطلاب.' 
        : 'Choosing the right educational program for your child is an important decision, and we understand that families often have questions before getting started. Here you\'ll find helpful answers about BBA, our philosophy, programs, enrollment, and support.',
    },
    searchPlaceholder: isAr ? 'ابحث عن سؤال...' : 'Search questions...',
    categories: [
      { id: 'about', label: isAr ? 'حول الأكاديمية' : 'About BBA', icon: Info },
      { id: 'programs', label: isAr ? 'البرامج وخيارات اللغة' : 'Programs & Language Options', icon: GraduationCap },
      { id: 'enrollment', label: isAr ? 'القبول والتسجيل' : 'Enrollment & Registration', icon: FileSignature },
      { id: 'tuition', label: isAr ? 'الرسوم وطرق الدفع' : 'Tuition & Payments', icon: CreditCard },
      { id: 'online-learning', label: isAr ? 'التعلم والدعم' : 'Online Learning & Support', icon: Laptop },
      { id: 'planning', label: isAr ? 'التخطيط والموارد' : 'Planning & Resources', icon: Target },
      { id: 'contact', label: isAr ? 'التواصل' : 'Contact & Information', icon: PhoneCall },
    ],
    cta: {
      title: isAr ? 'ما زال لديك أسئلة؟ نحن هنا للمساعدة.' : 'Still Have Questions? We\'re Here to Help.',
      text: isAr 
        ? 'سواء كنت تستكشف BBA لأول مرة أو تستعد للتسجيل، فريقنا جاهز للإجابة على استفساراتك.' 
        : 'Whether you\'re exploring BBA for the first time or preparing to enroll, our team is ready to help.',
      enroll: isAr ? 'ابدأ التسجيل' : 'Start Your Enrollment',
      contact: isAr ? 'اتصل بالأكاديمية' : 'Contact BBA'
    }
  };
};

const getFaqData = (lang: Locale) => {
  const isAr = lang === 'ar';
  return [
    {
      category: 'about',
      questions: [
        {
          id: 1,
          q: isAr ? 'ما هي أكاديمية بنين وبنات (BBA)؟' : 'What is Baneen and Banaat Academy (BBA)?',
          a: isAr 
            ? 'أكاديمية بنين وبنات (BBA) هي أكاديمية تعليمية عبر الإنترنت مكرسة لدعم الطلاب والعائلات من خلال فرص تعلم مرنة، وتوجيه أكاديمي، والتزام قوي بالشخصية والقيم. يجمع نهجنا بين التميز التعليمي، والدعم الطلابي الشخصي، والشراكات العائلية الهادفة.'
            : 'BBA is an online educational academy dedicated to supporting students and families through flexible learning opportunities, academic guidance, and a strong commitment to character and values.',
        },
        {
          id: 2,
          q: isAr ? 'متى تأسست الأكاديمية؟' : 'When was BBA founded?',
          a: isAr 
            ? 'تأسست أكاديمية بنين وبنات في عام 2019 برؤية لتزويد العائلات بفرص تعليمية تجمع بين التطور الأكاديمي والقيم القوية والدعم الشخصي.'
            : 'Baneen and Banaat Academy was founded in 2019 with a vision to provide families with educational opportunities that combine academic development, strong values, and personalized support.',
        },
        {
          id: 3,
          q: isAr ? 'من هو مؤسس الأكاديمية؟' : 'Who founded BBA?',
          a: isAr 
            ? 'تأسست الأكاديمية من قبل الدكتور مصطفى علي. تؤكد رؤيته التربوية على التميز الأكاديمي، وتنمية الشخصية، والمشاركة العائلية، والتعلم مدى الحياة.'
            : 'Baneen and Banaat Academy was founded by Dr. Mustafa Ali. His educational vision emphasizes academic excellence, character development, family involvement, and lifelong learning.',
          link: `/${lang}/founder`,
          linkLabel: isAr ? 'تعرف على مؤسسنا' : 'Meet Our Founder'
        },
        {
          id: 4,
          q: isAr ? 'ما هي القصة وراء BBA؟' : 'What is the story behind BBA?',
          a: isAr 
            ? 'بدأت BBA في عام 2019 برؤية بسيطة ولكن هادفة: إنشاء بيئة تعليمية يسير فيها الإنجاز الأكاديمي والقيم القوية جنباً إلى جنب. بُنيت الأكاديمية على الاعتقاد بأن التعليم أكثر من مجرد إكمال المهام، بل هو بناء المسؤولية والثقة.'
            : 'BBA began in 2019 with a vision to create an environment where academic achievement and strong values go hand in hand. The academy was built on the belief that education is more than completing assignments.',
        },
        {
          id: 5,
          q: isAr ? 'لماذا تختار العائلات BBA؟' : 'Why should families choose BBA?',
          a: isAr 
            ? 'تختار العائلات BBA لأننا نؤمن أن رحلة كل طالب تستحق التشجيع. نركز على أربع أولويات: التميز الأكاديمي، الدعم الشخصي، التعلم المرن عبر الإنترنت، والشراكة العائلية.'
            : 'Families choose BBA because we believe every student’s journey deserves encouragement. We focus on Academic Excellence, Personalized Support, Flexible Online Learning, and Family Partnership.',
        },
        {
          id: 6,
          q: isAr ? 'ما الذي يميز BBA عن البرامج الأخرى؟' : 'What makes BBA different from other educational programs?',
          a: isAr 
            ? 'تجمع BBA بين فرص التعلم عبر الإنترنت والتركيز على التخطيط التعليمي، ومسؤولية الطالب، وتنمية الشخصية. نحن نعمل لدعم الرحلة التعليمية الأوسع من خلال التوجيه والتواصل المستمر.'
            : 'BBA combines online learning with an emphasis on educational planning, student responsibility, character development, and family involvement.',
        },
        {
          id: 7,
          q: isAr ? 'هل BBA أكاديمية تعمل بالكامل عبر الإنترنت؟' : 'Is BBA a fully online academy?',
          a: isAr 
            ? 'نعم. جميع برامج BBA التعليمية الحالية تقدم عبر الإنترنت بنسبة 100%. يشارك الطلاب عن بُعد، مما يسمح للعائلات بالوصول للفرص التعليمية دون الحاجة للحضور الفعلي للحرم الجامعي.'
            : 'Yes. All current BBA educational programs are 100% online. Students participate remotely, allowing families to access educational opportunities without attending a physical campus.',
        },
        {
          id: 8,
          q: isAr ? 'أين تقع الأكاديمية؟' : 'Where is BBA located?',
          a: isAr 
            ? 'تعمل BBA كأكاديمية تعليمية عبر الإنترنت، لذا لا يحتاج الطلاب للسفر. يتم تقديم خدماتنا التعليمية عن بعد. للحصول على معلومات الاتصال الإدارية، يرجى زيارة صفحة التواصل.'
            : 'BBA operates as an online educational academy, so students do not need to travel to a physical campus. Our services are delivered remotely.',
        },
        {
          id: 9,
          q: isAr ? 'هل تخدم BBA العائلات خارج نيويورك؟' : 'Does BBA serve families outside New York?',
          a: isAr 
            ? 'نعم، تم تصميم نموذج BBA لدعم العائلات في مواقع مختلفة عبر الولايات المتحدة. قد تختلف متطلبات التخطيط التعليمي حسب موقع العائلة.'
            : 'BBA’s online model is designed to support families across the United States. State-specific requirements may vary depending on location.',
        },
      ]
    },
    {
      category: 'programs',
      questions: [
        {
          id: 10,
          q: isAr ? 'ما هي البرامج التعليمية التي تقدمها BBA؟' : 'What educational programs does BBA offer?',
          a: isAr 
            ? 'نقدم حالياً ثلاث مجموعات رئيسية: برنامج الصفوف 3-5 (تأسيس ابتدائي)، برنامج الصفوف 6-12 (مسارات المتوسطة والثانوية)، وبرنامج عطلة نهاية الأسبوع (لتعزيز اللغة والهوية).'
            : 'We currently offer three main groups: Grades 3–5 Remote Program, Grades 6–12 Remote Program, and Weekend Program (Remote).',
          link: `/${lang}/programs`,
          linkLabel: isAr ? 'استكشف برامجنا' : 'Explore Our Programs'
        },
        {
          id: 11,
          q: isAr ? 'ما هي الصفوف الدراسية التي تخدمها BBA؟' : 'What grade levels does BBA serve?',
          a: isAr 
            ? 'نخدم الطلاب من الصف الثالث وحتى الصف الثاني عشر، بالإضافة إلى برنامج عطلة نهاية الأسبوع المستقل.'
            : 'BBA offers programs for students in Grades 3 through 12, as well as a separate remote Weekend Program.',
        },
        {
          id: 12,
          q: isAr ? 'هل التعليم باللغة الإنجليزية فقط أم بالإنجليزية والعربية؟' : 'Does BBA teach in English only, or in both English and Arabic?',
          a: isAr 
            ? 'نقدم خيارات لغوية مختلفة حسب البرنامج. لصفوف 6-12 تشمل الخيارات: الإنجليزية فقط، الإنجليزية + العربية، أو الإنجليزية + دعم ESL.'
            : 'BBA offers different language options depending on the program. Options include English Only, English + Arabic, and English + ESL Support.',
        },
        {
          id: 13,
          q: isAr ? 'ما الفرق بين خيار "الإنجليزية فقط" و"الإنجليزية + العربية"؟' : 'What is the difference between English Only and English + Arabic?',
          a: isAr 
            ? 'خيار "الإنجليزية فقط" هو للطلاب الذين يسعون لمسار تعليمي باللغة الإنجليزية. أما "الإنجليزية + العربية" فهو للعائلات التي ترغب في برنامج يتضمن اللغة العربية بجانب الإنجليزية.'
            : 'English Only is for an English-language pathway. English + Arabic is for families who want Arabic included alongside the English curriculum.',
        },
        {
          id: 14,
          q: isAr ? 'ما هو خيار "الإنجليزية + دعم ESL"؟' : 'What is English + ESL Support?',
          a: isAr 
            ? 'هو خيار ضمن برنامج صفوف 6-12 مصمم للطلاب الذين قد يستفيدون من دعم إضافي لتعلم اللغة الإنجليزية (اللغة الإنجليزية كلغة ثانية).'
            : 'English + ESL Support is an option for students who may benefit from additional English as a Second Language support.',
        },
        {
          id: 15,
          q: isAr ? 'هل تقدم BBA برنامجاً للطلاب الصغار؟' : 'Does BBA offer a program for younger students?',
          a: isAr 
            ? 'نعم، لدينا برنامج الصفوف 3-5 (عن بعد) المصمم خصيصاً لطلاب المرحلة الابتدائية.'
            : 'Yes. BBA offers a Grades 3–5 Remote Program designed for students at the elementary level.',
        },
        {
          id: 16,
          q: isAr ? 'هل توجد برامج للمرحلة المتوسطة والثانوية؟' : 'Does BBA offer programs for middle and high school students?',
          a: isAr 
            ? 'نعم، برنامج الصفوف 6-12 يخدم كلاً من طلاب المرحلة المتوسطة والثانوية مع توفير خيارات لغوية ودعم أكاديمي.'
            : 'Yes. The Grades 6–12 Remote Program serves both middle and high school students.',
        },
        {
          id: 17,
          q: isAr ? 'هل تقدم الأكاديمية دروساً في عطلة نهاية الأسبوع؟' : 'Does BBA offer weekend classes?',
          a: isAr 
            ? 'نعم، نوفر برنامج عطلة نهاية الأسبوع (عن بعد) الذي يقدم فرصاً تعليمية وإثرائية إضافية بتنسيق مرن.'
            : 'Yes. BBA offers a Weekend Program (Remote) that provides additional educational and enrichment opportunities.',
        },
        {
          id: 18,
          q: isAr ? 'هل جميع برامج BBA ذاتية الوتيرة؟' : 'Are all BBA programs self-paced?',
          a: isAr 
            ? 'ليس بالضرورة. بعض البرامج تتبع مساراً ذاتياً مدعوماً بخطة طالب ومرشدين، بينما برامج أخرى (كعطلة نهاية الأسبوع) قد تتبع جداول زمنية محددة.'
            : 'Not necessarily. Some programs follow a self-paced pathway with mentor support, while others (like the Weekend Program) have fixed schedules.',
        },
        {
          id: 19,
          q: isAr ? 'كيف أختار البرنامج المناسب لطفلي؟' : 'How can I choose the right program for my child?',
          a: isAr 
            ? 'ابدأ بالنظر في الصف الدراسي لطفلك، أهدافه، خيار اللغة المفضل، واحتياجات التعلم. يمكنك التواصل معنا للحصول على توجيه خاص.'
            : 'Consider your child’s grade level, goals, language preference, and learning needs. You can contact us for guidance.',
        },
      ]
    },
    {
      category: 'enrollment',
      questions: [
        {
          id: 20,
          q: isAr ? 'كيف أسجل طفلي في الأكاديمية؟' : 'How do I enroll my child at BBA?',
          a: isAr 
            ? 'يمكنك البدء من خلال نموذج التسجيل عبر الإنترنت، والذي يتكون من 4 خطوات: بيانات ولي الأمر، بيانات الطالب، اختيار البرنامج، ثم المراجعة والارسال.'
            : 'You can begin enrollment through our online registration form in four stages: Parent Info, Student Info, Program Selection, and Review.',
          link: `/${lang}/enroll`,
          linkLabel: isAr ? 'ابدأ التسجيل' : 'Start Enrollment'
        },
        {
          id: 21,
          q: isAr ? 'ما هي المعلومات المطلوبة قبل البدء؟' : 'What information do I need before starting enrollment?',
          a: isAr 
            ? 'ستحتاج لبيانات ولي الأمر، اسم وتاريخ ميلاد الطالب، الصف الدراسي، واختيار البرنامج، بالإضافة لأي وثائق يطلبها النموذج.'
            : 'You will need parent/guardian details, student’s full name, DOB, intended grade level, and program selection.',
        },
        {
          id: 22,
          q: isAr ? 'هل يمكنني تسجيل أكثر من طفل؟' : 'Can I enroll more than one child?',
          a: isAr 
            ? 'نعم، يدعم نموذجنا تسجيل حتى 3 طلاب في طلب واحد. للعائلات التي لديها أكثر من ذلك، يرجى التواصل معنا.'
            : 'Yes. Our online form supports registering up to three students in one application.',
        },
        {
          id: 23,
          q: isAr ? 'هل يمكنني حفظ الطلب وإكماله لاحقاً؟' : 'Can I save my enrollment application and finish it later?',
          a: isAr 
            ? 'نعم، يتضمن التسجيل ميزة الحفظ والاستئناف لتتمكن من العودة لبياناتك في وقت لاحق.'
            : 'Yes. The process includes a save-and-resume feature, allowing you to return to your application later.',
        },
        {
          id: 24,
          q: isAr ? 'ما هي الوثائق المطلوبة للتسجيل؟' : 'What documents are required for registration?',
          a: isAr 
            ? 'تعتمد المتطلبات على البرنامج، وسيوضح لك النموذج الإلكتروني الوثائق المطلوبة بالضبط أثناء عملية التسجيل.'
            : 'Document requirements depend on the program. The online form will identify specific documents needed.',
        },
        {
          id: 25,
          q: isAr ? 'هل يكتمل القبول فور إرسال النموذج؟' : 'Is enrollment completed immediately after submitting the form?',
          a: isAr 
            ? 'إرسال النموذج خطوة مهمة، ولكن سيقوم الفريق بمراجعة البيانات والتواصل معك لإتمام الخطوات النهائية.'
            : 'Submitting the form is a key step, but BBA will review the info and contact you regarding next steps.',
        },
        {
          id: 26,
          q: isAr ? 'هل يمكن التسجيل خلال العام الدراسي؟' : 'Can I enroll my child during the school year?',
          a: isAr 
            ? 'يعتمد ذلك على توفر الأماكن في البرنامج المختار. ننصح بالتواصل معنا لمناقشة الخيارات المتاحة في منتصف العام.'
            : 'Enrollment timing depends on availability. Families interested in joining mid-year should contact BBA.',
        },
      ]
    },
    {
      category: 'tuition',
      questions: [
        {
          id: 27,
          q: isAr ? 'كم تبلغ تكلفة الرسوم الدراسية؟' : 'How much does tuition cost?',
          a: isAr 
            ? 'تعتمد الرسوم على البرنامج المختار وخيارات الدعم. يرجى مراجعة صفحات البرامج أو تفاصيل الأسعار المعروضة أثناء التسجيل.'
            : 'Tuition depends on the selected program and support options. Review the program pages for pricing details.',
          link: `/${lang}/programs`,
          linkLabel: isAr ? 'عرض البرامج' : 'View Our Programs'
        },
        {
          id: 28,
          q: isAr ? 'هل توجد رسوم تسجيل؟' : 'Is there a registration fee?',
          a: isAr 
            ? 'قد تنطبق رسوم تسجيل حسب البرنامج، ويتم توضيحها بوضوح في تفاصيل الأسعار المنشورة.'
            : 'Registration fees may apply depending on the program. These are identified in the pricing information.',
        },
        {
          id: 29,
          q: isAr ? 'هل توفر الأكاديمية خطط دفع؟' : 'Does BBA offer payment plans?',
          a: isAr 
            ? 'تعتمد جداول الدفع على نوع البرنامج المختار. يرجى مراجعة معلومات الرسوم لكل برنامج لفهم خيارات الجدولة المتاحة.'
            : 'Payment schedules depend on the program. Review the tuition info for your program.',
        },
        {
          id: 30,
          q: isAr ? 'هل تتوفر خصومات للأشقاء؟' : 'Are sibling discounts available?',
          a: isAr 
            ? 'بعض برامجنا توفر أسعاراً عائلية أو خصومات أشقاء. يرجى التأكد من الأهلية للخصم مع إدارة الأكاديمية.'
            : 'Some programs offer sibling discounts. Families should confirm eligibility with BBA.',
        },
      ]
    },
    {
      category: 'online-learning',
      questions: [
        {
          id: 31,
          q: isAr ? 'كيف يعمل التعلم عبر الإنترنت في BBA؟' : 'How does online learning work at BBA?',
          a: isAr 
            ? 'نوفر برامج تسمح بالمشاركة عن بُعد. لطلاب المسار الذاتي، يتم إكمال الدورات عبر Edgenuity بتوجيه من خطة طالب ومرشدين أكاديميين.'
            : 'BBA provides online programs for remote participation. Self-paced students use Edgenuity with mentor support.',
        },
        {
          id: 32,
          q: isAr ? 'هل يحتاج طفلي لحضور حصص مباشرة يومياً؟' : 'Does my child need to attend live classes every day?',
          a: isAr 
            ? 'ليس في جميع البرامج. في مسار Edgenuity، يعمل الطلاب بشكل مستقل دون جدول حصص ثابت، بينما برامج أخرى قد تتطلب حضوراً مباشراً.'
            : 'Not all programs require daily live classes. In self-paced pathways, students work without a fixed live schedule.',
        },
        {
          id: 33,
          q: isAr ? 'هل تقدم الأكاديمية دعماً أكاديمياً؟' : 'Does BBA provide academic support?',
          a: isAr 
            ? 'نعم، نركز على التوجيه المستمر. يشمل ذلك التخطيط، تواصل المرشدين، مراقبة التقدم، والمساعدة في فهم المتطلبات الدراسية.'
            : 'Yes. BBA emphasizes student guidance. Support includes planning, mentor communication, and progress monitoring.',
        },
        {
          id: 34,
          q: isAr ? 'كيف يراقب أولياء الأمور تقدم أبنائهم؟' : 'How can parents monitor their child\'s academic progress?',
          a: isAr 
            ? 'نشجع المشاركة العائلية. لمستخدمي Edgenuity، يمكن للأهالي طلب تلقي تقارير تقدم يومية عبر البريد الإلكتروني.'
            : 'Parents are encouraged to stay involved. Edgenuity users may request daily progress updates by email.',
        },
        {
          id: 35,
          q: isAr ? 'ماذا يحدث إذا احتاج طفلي لمساعدة في الدروس؟' : 'What happens if my child needs help with coursework?',
          a: isAr 
            ? 'المرشد الأكاديمي هو نقطة الاتصال الأولى لأي استفسارات أو تحديات، ويمكن للأهالي أيضاً التواصل مع الإدارة عند الحاجة.'
            : 'The assigned mentor is generally the first point of contact for academic questions or challenges.',
        },
        {
          id: 36,
          q: isAr ? 'هل توفر الأكاديمية دليلاً للطالب؟' : 'Does BBA provide a Student Guide?',
          a: isAr 
            ? 'نعم، نوفر دليلاً مخصصاً يشرح كيفية البدء، استخدام المنصة، وتوقعات الأداء الأكاديمي.'
            : 'Yes. BBA provides a dedicated Student Guide with detailed information for students and parents.',
          link: `/${lang}/guide`,
          linkLabel: isAr ? 'اقرأ دليل الطالب' : 'Read the Student Guide'
        },
      ]
    },
    {
      category: 'planning',
      questions: [
        {
          id: 37,
          q: isAr ? 'هل تساعد BBA في التخطيط التعليمي؟' : 'Does BBA help with educational planning?',
          a: isAr 
            ? 'نعم، نوفر توجيهاً يتعلق بتخطيط الدورات، السجلات الأكاديمية، والتحضير للتخرج بما يتناسب مع أهداف الطالب.'
            : 'Yes. BBA provides guidance related to course planning, academic records, and graduation preparation.',
        },
        {
          id: 38,
          q: isAr ? 'هل تساعد الأكاديمية في التحضير للتخرج والجامعة؟' : 'Does BBA help students prepare for graduation and college?',
          a: isAr 
            ? 'نعم، نساعد في تنظيم السجلات وفهم مسارات التخرج المتاحة. تذكر أن متطلبات القبول تختلف حسب المؤسسة والولاية.'
            : 'BBA helps families organize records and prepare for future opportunities. Admission requirements vary.',
          link: `/${lang}/planning`,
          linkLabel: isAr ? 'التخطيط والمسارات المستقبلية' : 'Educational Planning & Future Pathways'
        },
        {
          id: 39,
          q: isAr ? 'هل تدعم الأكاديمية عائلات التعليم المنزلي؟' : 'Does BBA support homeschool families?',
          a: isAr 
            ? 'نعم، نعمل مع عائلات التعليم المنزلي بتوفير فرص تعليمية وتوجيه أكاديمي. يظل أولياء الأمور مسؤولين عن تلبية متطلبات ولايتهم.'
            : 'Yes. BBA works with homeschool families by providing online educational opportunities and guidance.',
        },
        {
          id: 40,
          q: isAr ? 'هل تساعد BBA عائلات التعليم المنزلي في نيويورك؟' : 'Does BBA help New York homeschool families?',
          a: isAr 
            ? 'نعم، نوفر موارد مخصصة لعملية نيويورك (LOI, IHIP، التقارير الفصلية). ننصح بمراجعة مركز الموارد الخاص بنا.'
            : 'Yes. BBA provides guidance to NY families regarding Notice of Intent, IHIP, Quarterly Reports, and more.',
          link: `/${lang}/ny-resources`,
          linkLabel: isAr ? 'مركز موارد نيويورك' : 'New York Homeschool Resource Center'
        },
      ]
    },
    {
      category: 'contact',
      questions: [
        {
          id: 41,
          q: isAr ? 'كيف يمكنني التواصل مع BBA؟' : 'How can I contact BBA?',
          a: isAr 
            ? 'يمكنك مراسلتنا عبر البريد: banaatacademy@gmail.com أو الاتصال بالرقم: 0322-455 (313) أو عبر صفحة التواصل.'
            : 'Contact BBA via email: banaatacademy@gmail.com, or use our Contact page.',
          link: `/${lang}/contact`,
          linkLabel: isAr ? 'تواصل مع الأكاديمية' : 'Contact BBA'
        },
        {
          id: 42,
          q: isAr ? 'هل يمكنني التحدث مع شخص ما قبل التسجيل؟' : 'Can I speak with someone before enrolling?',
          a: isAr 
            ? 'بالتأكيد، نرحب باستفسارات العائلات قبل التقديم لمساعدتهم في فهم البرامج واختيار المسار الأنسب.'
            : 'Yes. Families are welcome to contact BBA before submitting an application.',
        },
        {
          id: 43,
          q: isAr ? 'أين أجد معلومات حول المؤسس وفلسفة الأكاديمية؟' : 'Where can I learn more about BBA\'s founder and educational philosophy?',
          a: isAr 
            ? 'يرجى زيارة صفحة المؤسس للتعرف على الدكتور مصطفى علي والقيم التعليمية التي توجه الأكاديمية.'
            : 'Visit our Founder page to learn about Dr. Mustafa Ali and the values that guide BBA.',
          link: `/${lang}/founder`,
          linkLabel: isAr ? 'تعرف على مؤسسنا' : 'Meet Our Founder'
        },
      ]
    },
  ];
};

export default function FAQPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const t = getFaqContent(lang);
  const faqs = getFaqData(lang);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.map(cat => ({
      ...cat,
      questions: cat.questions.filter(q => {
        const matchesSearch = q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              q.a.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || cat.category === activeCategory;
        return matchesSearch && matchesCategory;
      })
    })).filter(cat => cat.questions.length > 0);
  }, [faqs, searchTerm, activeCategory]);

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
       <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="faq-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#faq-pattern)" />
          </svg>
        </div>
        
        <div className="container-tight relative z-10 text-center space-y-8 px-4">
           <div className="space-y-4">
             <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
               {t.hero.title}
             </h1>
             <p className="text-sm sm:text-xl text-secondary font-black tracking-[0.2em] uppercase">
               {t.hero.subtitle}
             </p>
           </div>
           <p className="text-white/70 max-w-3xl mx-auto font-medium text-sm sm:text-lg leading-relaxed">
             {t.hero.intro}
           </p>

           {/* Search Bar */}
           <div className="max-w-2xl mx-auto relative group mt-12">
              <Search className={cn(
                "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-secondary",
                isAr ? "right-5" : "left-5"
              )} />
              <Input 
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "h-14 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/40 font-bold focus:bg-white focus:text-primary focus:ring-secondary/20 transition-all text-lg",
                  isAr ? "pr-14 pl-14" : "pl-14 pr-14"
                )}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className={cn("absolute top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors", isAr ? "left-5" : "right-5")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
           </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-tight py-12 lg:py-20 px-4">
        {/* Category Navigation */}
        <div className="flex overflow-x-auto pb-8 gap-3 no-scrollbar scroll-smooth">
           <Button 
             variant={activeCategory === 'all' ? 'default' : 'outline'}
             onClick={() => setActiveCategory('all')}
             className={cn(
               "rounded-full font-black text-xs uppercase tracking-widest shrink-0 px-6 h-12 transition-all",
               activeCategory === 'all' ? "bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20" : "border-slate-200 text-slate-500 hover:border-secondary"
             )}
           >
             {isAr ? 'الكل' : 'All'}
           </Button>
           {t.categories.map((cat) => (
             <Button 
               key={cat.id}
               variant={activeCategory === cat.id ? 'default' : 'outline'}
               onClick={() => setActiveCategory(cat.id)}
               className={cn(
                 "rounded-full font-black text-xs uppercase tracking-widest shrink-0 px-6 h-12 flex items-center gap-2 transition-all",
                 activeCategory === cat.id ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" : "border-slate-200 text-slate-500 hover:border-primary"
               )}
             >
               <cat.icon className="h-4 w-4 opacity-50" />
               {cat.label}
             </Button>
           ))}
        </div>

        {/* FAQ Lists */}
        <div className="space-y-16">
          {filteredFaqs.map((catSection) => {
            const catInfo = t.categories.find(c => c.id === catSection.category);
            return (
              <div key={catSection.category} className="space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    {catInfo && <catInfo.icon className="h-5 w-5" />}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">
                    {catInfo?.label}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {catSection.questions.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={`item-${faq.id}`}
                      className="bg-slate-50/50 border border-slate-100 rounded-2xl px-6 sm:px-8 shadow-sm transition-all duration-300 data-[state=open]:bg-white data-[state=open]:shadow-xl data-[state=open]:border-secondary/20 group"
                    >
                      <AccordionTrigger className="hover:no-underline py-6 sm:py-8 text-start group">
                        <span className="text-sm sm:text-lg font-black text-primary leading-tight group-hover:text-secondary transition-colors pr-4">
                          {faq.id}. {faq.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-8 pt-2">
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed border-l-4 border-secondary/20 pl-6 py-1">
                             {faq.a}
                           </p>
                           {faq.link && (
                             <Link 
                               href={faq.link} 
                               className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-all"
                             >
                               {faq.linkLabel}
                               {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                             </Link>
                           )}
                           {faq.id === 20 && (
                             <div className="pt-4">
                               <Button asChild className="bg-secondary rounded-xl font-black px-8">
                                 <Link href={`/${lang}/enroll`}>{isAr ? 'ابدأ التسجيل الآن' : 'Start Enrollment'}</Link>
                               </Button>
                             </div>
                           )}
                           {faq.id === 41 && (
                             <div className="pt-4">
                               <Button asChild variant="outline" className="border-primary text-primary rounded-xl font-black px-8">
                                 <Link href={`/${lang}/contact`}>{isAr ? 'تواصل معنا' : 'Contact BBA'}</Link>
                               </Button>
                             </div>
                           )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
             <div className="py-20 text-center space-y-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <HelpCircle className="h-16 w-16 text-slate-300 mx-auto" />
                <h3 className="text-xl font-black text-slate-400">
                  {isAr ? 'لم نجد أي نتائج تطابق بحثك' : 'No results found for your search'}
                </h3>
                <Button onClick={() => {setSearchTerm(''); setActiveCategory('all');}} variant="ghost" className="text-secondary font-bold">
                  {isAr ? 'إعادة تعيين البحث' : 'Clear search and filters'}
                </Button>
             </div>
          )}
        </div>
      </div>

      {/* Final Call to Action */}
      <section className="bg-primary py-20 lg:py-32 relative overflow-hidden mx-4 mb-20 rounded-[3rem] shadow-2xl border-b-8 border-secondary">
         <div className="container-tight relative z-10 text-center text-white space-y-12">
            <div className="space-y-4">
               <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight drop-shadow-lg">{t.cta.title}</h2>
               <p className="text-white/70 max-w-2xl mx-auto font-bold text-sm sm:text-xl italic">{t.cta.text}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button asChild size="lg" className="h-16 px-12 bg-secondary hover:bg-white hover:text-secondary text-white font-black text-lg rounded-2xl shadow-xl transition-all scale-100 active:scale-95 group">
                  <Link href={`/${lang}/enroll`} className="flex items-center gap-3">
                     {t.cta.enroll}
                     {isAr ? <ArrowLeft className="h-6 w-6 group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />}
                  </Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="h-16 px-12 border-2 border-white/20 bg-white/5 hover:bg-white hover:text-primary text-white font-black text-lg rounded-2xl transition-all">
                  <Link href={`/${lang}/contact`}>{t.cta.contact}</Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
