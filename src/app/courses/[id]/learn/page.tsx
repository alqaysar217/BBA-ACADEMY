"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { PlayCircle, CheckCircle, FileText, MessageSquare, HelpCircle, ArrowLeft, ArrowRight, BrainCircuit, Sparkles, Send } from 'lucide-react';
import { aiStudyAssistant } from '@/ai/flows/ai-study-assistant-flow';

export default function LearnPage({ params }: { params: { id: string } }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const lessons = [
    { title: 'مقدمة في المسار والبيئة البرمجية', duration: '12:05', id: 1 },
    { title: 'أساسيات المتغيرات وأنواع البيانات', duration: '18:30', id: 2 },
    { title: 'الجمل الشرطية والتحكم في التدفق', duration: '15:10', id: 3 },
    { title: 'الدوال والبرمجة الوظيفية', duration: '22:45', id: 4 },
  ];

  const handleAiAsk = async () => {
    if (!aiQuery.trim()) return;
    setIsLoadingAi(true);
    try {
      const result = await aiStudyAssistant({
        lessonContent: "This lesson covers fundamental programming concepts including variables, loops, and conditional statements. Variables are storage locations with an associated name. Loops allow code to repeat, and conditionals allow decision making in code.",
        userQuery: aiQuery
      });
      setAiResponse(result.response);
    } catch (error) {
      setAiResponse("عذراً، حدث خطأ أثناء الاتصال بالمساعد الذكي.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Right Side: Navigation (Arabic RTL: Sidebar on right) */}
        <aside className="w-full lg:w-80 border-r bg-muted/10 order-2 lg:order-2 flex flex-col">
          <div className="p-6 border-b bg-background">
            <h3 className="font-headline font-bold mb-4">محتوى الكورس</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span>تم إكمال 25%</span>
                <span>1 من 4 دروس</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Accordion type="single" collapsible defaultValue="module-1">
              <AccordionItem value="module-1" className="border-none">
                <AccordionTrigger className="px-6 hover:no-underline bg-muted/30">المرحلة الأولى: الأساسيات</AccordionTrigger>
                <AccordionContent className="p-0">
                  {lessons.map((lesson, idx) => (
                    <button 
                      key={lesson.id}
                      onClick={() => setActiveLesson(idx)}
                      className={`w-full p-4 flex items-center gap-3 text-right hover:bg-muted transition-colors ${activeLesson === idx ? 'bg-primary/10 border-r-4 border-primary' : ''}`}
                    >
                      {idx < 1 ? <CheckCircle className="size-5 text-green-500" /> : <PlayCircle className="size-5 text-muted-foreground" />}
                      <div className="flex-1">
                        <div className="text-sm font-medium line-clamp-1">{lesson.title}</div>
                        <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                      </div>
                    </button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        {/* Left Side: Video & Content */}
        <main className="flex-1 order-1 lg:order-1 flex flex-col">
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black relative flex items-center justify-center group">
            <div className="text-white text-center">
              <PlayCircle className="size-20 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer mx-auto" />
              <p className="mt-4 font-headline text-lg">{lessons[activeLesson].title}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
               <div className="h-full bg-primary w-1/3" />
            </div>
          </div>

          {/* Controls & Info */}
          <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-6 flex-row-reverse">
              <h2 className="font-headline text-2xl font-bold">{lessons[activeLesson].title}</h2>
              <div className="flex gap-2 flex-row-reverse">
                <Button variant="outline" size="sm" className="gap-2">الدرس التالي <ArrowLeft className="size-4" /></Button>
                <Button variant="outline" size="sm" className="gap-2" disabled><ArrowRight className="size-4" /> الدرس السابق</Button>
              </div>
            </div>

            <Tabs dir="rtl" defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-8">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4">الملخص</TabsTrigger>
                <TabsTrigger value="ai" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 flex gap-2">
                  <Sparkles className="size-4" /> مساعد الذكاء الاصطناعي
                </TabsTrigger>
                <TabsTrigger value="comments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4">التعليقات</TabsTrigger>
                <TabsTrigger value="files" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4">الملفات</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 text-right space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  في هذا الدرس سنتعرف على كيفية إعداد البيئة البرمجية والبدء في كتابة أول برنامج لنا. سنشرح المفاهيم الأساسية التي سنبني عليها في الدروس القادمة.
                </p>
                <div className="bg-muted/50 p-6 rounded-xl space-y-2">
                  <h4 className="font-bold flex items-center gap-2 mb-4"><FileText className="size-4 text-primary" /> ملاحظات الدرس</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>تثبيت Node.js و VS Code</li>
                    <li>فتح المحطة البرمجية Terminal</li>
                    <li>تشغيل ملف JavaScript الأول</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="mt-6">
                <div className="flex flex-col gap-4">
                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <div className="flex items-center gap-3 mb-4 flex-row-reverse text-primary font-bold">
                       <BrainCircuit className="size-6" />
                       <span>اسأل المساعد الذكي حول هذا الدرس</span>
                    </div>
                    
                    <div className="relative">
                      <Textarea 
                        placeholder="مثلاً: اشرح لي مفهوم المتغيرات ببساطة، أو اقترح عليّ تمارين.."
                        className="bg-background border-primary/20 focus-visible:ring-primary min-h-[100px] text-right"
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                      />
                      <Button 
                        onClick={handleAiAsk}
                        disabled={isLoadingAi}
                        className="absolute bottom-3 left-3 bg-primary hover:bg-primary/90 size-10 p-0 rounded-xl"
                      >
                        <Send className={`size-5 ${isLoadingAi ? 'animate-pulse' : ''}`} />
                      </Button>
                    </div>

                    {aiResponse && (
                      <div className="mt-6 p-4 bg-background rounded-xl border border-primary/10 text-right animate-in fade-in slide-in-from-top-2">
                        <div className="font-bold text-sm mb-2 text-primary">إجابة المساعد:</div>
                        <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{aiResponse}</div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <div className="space-y-6">
                  <div className="flex gap-4 flex-row-reverse">
                    <div className="size-10 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Textarea placeholder="أضف تعليقاً أو سؤالاً..." className="text-right" />
                      <div className="flex justify-end">
                        <Button className="bg-accent">نشر التعليق</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                 <div className="grid gap-4">
                    <div className="p-4 border rounded-xl flex items-center justify-between flex-row-reverse hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary"><FileText className="size-6" /></div>
                        <div className="text-right">
                          <div className="font-bold">ملخص الدرس بصيغة PDF</div>
                          <div className="text-xs text-muted-foreground">2.4 MB</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">تحميل</Button>
                    </div>
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
