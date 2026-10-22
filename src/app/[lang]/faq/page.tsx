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
  History,
  User,
  Star,
  Laptop,
  PhoneCall,
  X,
  Clock
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
      subtitle: isAr ? 'كل ما تحتاج معرفته حول BBA' : 'Everything You Need to Know About BBA',
      intro: isAr 
        ? 'اختيار البرنامج التعليمي المناسب لطفلك هو قرار مهم، ونحن نتفهم أن العائلات غالباً ما يكون لديها أسئلة قبل البدء. هنا ستجد إجابات مفيدة حول أكاديمية بنين وبنات، وفلسفتنا، وبرامجنا، والتسجيل.' 
        : 'Choosing the right educational program for your child is an important decision, and we understand that families often have questions before getting started. Here you\'ll find helpful answers about BBA, our philosophy, programs, and enrollment.',
    },
    searchPlaceholder: isAr ? 'ابحث عن سؤال...' : 'Search questions...',
    categories: [
      { id: 'about', label: isAr ? 'حول الأكاديمية' : 'About BBA', icon: Info },
      { id: 'programs', label: isAr ? 'البرامج والخيارات' : 'Programs & Options', icon: GraduationCap },
      { id: 'enrollment', label: isAr ? 'القبول والتسجيل' : 'Enrollment & Registration', icon: FileSignature },
      { id: 'tuition', label: isAr ? 'الرسوم والدفع' : 'Tuition & Payments', icon: CreditCard },
      { id: 'online-learning', label: isAr ? 'التعلم عن بعد' : 'Online Learning', icon: Laptop },
      { id: 'planning', label: isAr ? 'التخطيط والموارد' : 'Planning & Resources', icon: Target },
      { id: 'contact', label: isAr ? 'التواصل' : 'Contact Us', icon: PhoneCall },
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
            ? 'أكاديمية بنين وبنات (BBA) هي أكاديمية تعليمية عبر الإنترنت مكرسة لدعم الطلاب والعائلات من خلال فرص تعلم مرنة، وتوجيه أكاديمي، والتزام قوي بالشخصية والقيم.'
            : 'BBA is an online educational academy dedicated to supporting students and families through flexible learning opportunities, academic guidance, and a strong commitment to character and values.',
        },
        {
          id: 2,
          q: isAr ? 'متى تأسست الأكاديمية؟' : 'When was BBA founded?',
          a: isAr 
            ? 'تأسست الأكاديمية في عام 2019 برؤية لتزويد العائلات بخيار تعليمي يجمع بين التميز الأكاديمي والقيم القوية.'
            : 'BBA was founded in 2019 with a vision to provide families with an educational option that combines excellence with strong values.',
        },
        {
          id: 3,
          q: isAr ? 'من هو مؤسس الأكاديمية؟' : 'Who founded BBA?',
          a: isAr 
            ? 'تأسست الأكاديمية من قبل الدكتور مصطفى علي. تؤكد رؤيته التربوية على التميز الأكاديمي، وتنمية الشخصية، والمشاركة العائلية.'
            : 'BBA was founded by Dr. Mustafa Ali. His vision emphasizes academic excellence, character development, and family involvement.',
          link: `/${lang}/founder`,
          linkLabel: isAr ? 'تعرف على مؤسسنا' : 'Meet Our Founder'
        },
        {
          id: 4,
          q: isAr ? 'ما هي قصة BBA؟' : 'What is the story behind BBA?',
          a: isAr 
            ? 'بدأت BBA برؤية بسيطة لخلق بيئة تعليمية ينمو فيها الإنجاز الأكاديمي وتنمية الشخصية معاً كشركاء مع العائلات.'
            : 'BBA started with a simple vision to create an environment where academic achievement and character development grow together in partnership with families.',
        }
      ]
    },
    {
      category: 'programs',
      questions: [
        {
          id: 10,
          q: isAr ? 'ما هي البرامج التعليمية المتاحة؟' : 'What programs does BBA offer?',
          a: isAr 
            ? 'نقدم حالياً ثلاث مجموعات رئيسية: برنامج الصفوف 3-5 (تأسيس ابتدائي)، برنامج الصفوف 6-12 (متوسط وثانوي)، وبرنامج عطلة نهاية الأسبوع.'
            : 'We offer three main groups: Grades 3–5 Remote, Grades 6–12 Remote, and the Weekend Program.',
          link: `/${lang}/programs`,
          linkLabel: isAr ? 'استكشف البرامج' : 'Explore Programs'
        },
        {
          id: 12,
          q: isAr ? 'هل التعليم بالإنجليزية فقط أم بالإنجليزية والعربية؟' : 'Is it English only or English + Arabic?',
          a: isAr 
            ? 'نوفر خيارات لغوية متعددة تشمل الإنجليزية فقط، الإنجليزية + العربية، أو الإنجليزية + دعم ESL.'
            : 'We provide multiple options including English Only, English + Arabic, or English + ESL Support.',
        }
      ]
    },
    {
      category: 'enrollment',
      questions: [
        {
          id: 20,
          q: isAr ? 'كيف أسجل طفلي؟' : 'How do I enroll my child?',
          a: isAr 
            ? 'يمكنك البدء من خلال نموذج التسجيل عبر الإنترنت المكون من 4 مراحل: بيانات ولي الأمر، بيانات الطالب، اختيار البرنامج، والمراجعة.'
            : 'You can start via our online form in 4 stages: Parent Info, Student Info, Program Selection, and Review.',
          link: `/${lang}/enroll`,
          linkLabel: isAr ? 'ابدأ التسجيل' : 'Start Enrollment'
        },
        {
          id: 23,
          q: isAr ? 'هل يمكنني حفظ الطلب وإكماله لاحقاً؟' : 'Can I save my application and finish later?',
          a: isAr 
            ? 'نعم، يتضمن النموذج ميزة "الحفظ والاستئناف لاحقاً" لتتمكن من العودة لبياناتك في أي وقت.'
            : 'Yes, the form includes a "Save and Resume Later" feature to allow you to return at any time.',
        }
      ]
    },
    {
      category: 'tuition',
      questions: [
        {
          id: 27,
          q: isAr ? 'كم تبلغ تكلفة الرسوم الدراسية؟' : 'How much does tuition cost?',
          a: isAr 
            ? 'تعتمد الرسوم على البرنامج المختار وخيارات الدعم. يرجى مراجعة صفحات البرامج للحصول على أدق التفاصيل.'
            : 'Tuition depends on the selected program and options. Please review the program pages for details.',
        }
      ]
    },
    {
      category: 'online-learning',
      questions: [
        {
          id: 31,
          q: isAr ? 'كيف يعمل التعلم عبر الإنترنت؟' : 'How does online learning work?',
          a: isAr 
            ? 'يستخدم الطلاب منصة Edgenuity لإكمال دروسهم ومهامهم بتوجيه من خطة طالب مخصصة ودعم من المرشدين.'
            : 'Students use Edgenuity to complete lessons and assignments guided by a Student Plan and mentor support.',
        },
        {
          id: 36,
          q: isAr ? 'هل توفر الأكاديمية دليلاً للطالب؟' : 'Does BBA provide a Student Guide?',
          a: isAr 
            ? 'نعم، نوفر دليلاً شاملاً يشرح كيفية البدء واستخدام المنصة والتوقعات الأكاديمية.'
            : 'Yes, we provide a comprehensive guide explaining how to start, use the platform, and academic expectations.',
          link: `/${lang}/guide`,
          linkLabel: isAr ? 'اقرأ الدليل' : 'Read the Guide'
        }
      ]
    },
    {
      category: 'planning',
      questions: [
        {
          id: 37,
          q: isAr ? 'هل تساعد الأكاديمية في التخطيط التعليمي؟' : 'Does BBA help with planning?',
          a: isAr 
            ? 'نعم، نوفر توجيهاً يتعلق بالدورات، السجلات الأكاديمية، والتحضير للتخرج والكلية.'
            : 'Yes, we provide guidance regarding courses, records, and graduation/college preparation.',
        },
        {
          id: 40,
          q: isAr ? 'هل تدعمون عائلات نيويورك بشكل خاص؟' : 'Do you support NY families specifically?',
          a: isAr 
            ? 'نعم، لدينا مركز موارد مخصص لعائلات نيويورك لمساعدتهم في متطلبات الولاية مثل LOI و IHIP.'
            : 'Yes, we have a resource center for NY families to help with state requirements like LOI and IHIP.',
          link: `/${lang}/ny-resources`,
          linkLabel: isAr ? 'مركز موارد نيويورك' : 'NY Resource Center'
        }
      ]
    },
    {
      category: 'contact',
      questions: [
        {
          id: 41,
          q: isAr ? 'كيف يمكنني التواصل مع BBA؟' : 'How can I contact BBA?',
          a: isAr 
            ? 'يمكنك مراسلتنا عبر البريد: banaatacademy@gmail.com أو الاتصال بالرقم: 0322-455 (313).'
            : 'Email us at: banaatacademy@gmail.com or call: (313) 455-0322.',
          link: `/${lang}/contact`,
          linkLabel: isAr ? 'تواصل معنا' : 'Contact Us'
        }
      ]
    }
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
                          {faq.q}
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
