import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, List, Briefcase, ChartBar, ChartLineUp, CheckCircle,
  CurrencyCircleDollar, DownloadSimple, EnvelopeSimple, Gauge, Globe,
  Phone, ShieldCheck, Sparkle, Table, TrendUp, X
} from "@phosphor-icons/react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const copy = {
  en: {
    brand: "Baad Data", tagline: "From data to confident decisions",
    nav: ["Overview", "Services", "Dashboard", "Case studies", "Contact"],
    heroEyebrow: "DATA ANALYTICS & FINANCIAL INTELLIGENCE",
    heroTitle: "Turn complex data into decisions that move your business forward.",
    heroText: "We build executive dashboards, financial reports and KPI systems that give leaders a clear view of performance—and the confidence to act.",
    primary: "Request a project", secondary: "Explore live dashboard",
    trust: ["Executive-ready reporting", "Arabic & English delivery", "Secure-by-design workflows"],
    demo: "DEMO DATA", demoLong: "Portfolio demonstration — all figures are fictional",
    servicesTitle: "Analytics built around the decision",
    servicesText: "Not more reports. A clearer way to see what changed, why it changed and what to do next.",
    services: [
      ["Executive dashboards", "Interactive Power BI-style experiences that surface the metrics leaders need every day."],
      ["Financial reporting", "Management P&L, cash-flow, variance and profitability reporting with a clear narrative."],
      ["KPI frameworks", "Practical metric definitions, targets, owners and alerts aligned to business goals."],
      ["Data preparation", "Clean, reconcile and structure scattered files into a dependable reporting foundation."]
    ],
    dashboardTitle: "Executive performance overview", dashboardText: "Change the period to explore a realistic interactive demo.",
    export: "Export sample report", period: "Reporting period", periods: ["Last 12 months", "Year to date", "Last 6 months"],
    kpis: ["Revenue", "Net profit", "Profit margin", "Operating cash flow"], chartTitle: "Revenue & operating expenses", insight: "Decision insight",
    insightText: "Revenue is growing faster than operating cost. Protect the margin by prioritising the two channels with the strongest contribution.",
    mixTitle: "Revenue mix", casesTitle: "Proof through practical outcomes", casesText: "Fictional case studies created to demonstrate analysis, storytelling and dashboard craft.",
    cases: [
      ["Retail performance cockpit", "Unified sales, margin and inventory views across 18 branches.", "4 data sources", "Daily refresh"],
      ["Service profitability model", "Revealed margin by service, client segment and delivery team.", "27 KPIs", "3 scenarios"],
      ["Cash-flow command centre", "Connected receivables, commitments and 13-week cash forecasting.", "13 weeks", "6 alerts"]
    ],
    processTitle: "A clear path from raw files to decisions", process: ["Discover", "Prepare", "Model", "Visualise", "Enable"],
    contactEyebrow: "START A CONVERSATION", contactTitle: "Bring one reporting challenge. We’ll map the clearest next step.",
    contactText: "Tell us what you are trying to understand, improve or report. You’ll receive a focused response with the recommended scope.",
    name: "Name", email: "Work email", company: "Company", need: "What do you need help with?", budget: "Estimated budget", message: "Project context", submit: "Send project brief",
    needs: ["Dashboard design", "Financial reporting", "Data analysis", "KPI framework", "Data cleanup"],
    sentTitle: "Brief received", sentText: "This demo form is working locally. In production it can connect to email, CRM or WhatsApp.", reset: "Send another brief",
    footer: "Fictional portfolio project by Mostafa Ibrahim — Data Analyst & Web Application Designer.", rights: "Demo project. No real client or financial data is shown.", reportNotice: "Sample CSV report downloaded."
  },
  ar: {
    brand: "بُعد للبيانات", tagline: "من البيانات إلى قرارات أوثق",
    nav: ["نظرة عامة", "الخدمات", "لوحة المؤشرات", "دراسات الحالة", "تواصل معنا"],
    heroEyebrow: "تحليل البيانات والذكاء المالي",
    heroTitle: "نحوّل البيانات المعقدة إلى قرارات تدفع أعمالك إلى الأمام.",
    heroText: "نبني لوحات تنفيذية وتقارير مالية ومنظومات مؤشرات تمنح القادة رؤية واضحة للأداء وثقة أكبر في القرار.",
    primary: "اطلب مشروعًا", secondary: "استكشف اللوحة التفاعلية",
    trust: ["تقارير جاهزة للإدارة", "تسليم بالعربية والإنجليزية", "إجراءات مصممة للأمان"],
    demo: "بيانات تجريبية", demoLong: "عرض لأغراض معرض الأعمال — جميع الأرقام افتراضية",
    servicesTitle: "تحليلات تبدأ من القرار المطلوب", servicesText: "ليست تقارير أكثر، بل طريقة أوضح لمعرفة ما تغيّر ولماذا وما الخطوة التالية.",
    services: [
      ["لوحات المؤشرات التنفيذية", "تجارب تفاعلية بأسلوب Power BI تعرض المؤشرات التي يحتاجها القادة يوميًا."],
      ["التقارير المالية", "تقارير الأرباح والخسائر والتدفقات والانحرافات والربحية مع سرد واضح."],
      ["أطر مؤشرات الأداء", "تعريفات وأهداف ومسؤوليات وتنبيهات عملية مرتبطة بأهداف العمل."],
      ["تهيئة البيانات", "تنظيف الملفات المتفرقة ومطابقتها وهيكلتها كأساس موثوق للتقارير."]
    ],
    dashboardTitle: "نظرة تنفيذية على الأداء", dashboardText: "غيّر الفترة لاستكشاف نموذج تفاعلي واقعي.",
    export: "تحميل تقرير تجريبي", period: "فترة التقرير", periods: ["آخر 12 شهرًا", "منذ بداية العام", "آخر 6 أشهر"],
    kpis: ["الإيرادات", "صافي الربح", "هامش الربح", "التدفق النقدي التشغيلي"], chartTitle: "الإيرادات والمصروفات التشغيلية", insight: "رؤية لاتخاذ القرار",
    insightText: "تنمو الإيرادات أسرع من التكلفة التشغيلية. يمكن حماية الهامش بإعطاء الأولوية للقناتين الأعلى مساهمة.",
    mixTitle: "مزيج الإيرادات", casesTitle: "نتائج عملية تثبت المنهج", casesText: "دراسات حالة افتراضية توضح مهارات التحليل والسرد وتصميم اللوحات.",
    cases: [
      ["مركز أداء التجزئة", "توحيد المبيعات والهامش والمخزون عبر 18 فرعًا.", "4 مصادر بيانات", "تحديث يومي"],
      ["نموذج ربحية الخدمات", "إظهار الهامش حسب الخدمة وشريحة العميل وفريق التنفيذ.", "27 مؤشرًا", "3 سيناريوهات"],
      ["مركز قيادة التدفقات النقدية", "ربط المستحقات والالتزامات وتوقع النقد لمدة 13 أسبوعًا.", "13 أسبوعًا", "6 تنبيهات"]
    ],
    processTitle: "مسار واضح من الملفات الخام إلى القرار", process: ["الاكتشاف", "التهيئة", "النمذجة", "التصور", "التمكين"],
    contactEyebrow: "ابدأ المحادثة", contactTitle: "شارك تحديًا واحدًا في التقارير، وسنحدد أوضح خطوة تالية.",
    contactText: "أخبرنا بما تريد فهمه أو تحسينه أو عرضه، وستتلقى ردًا مركزًا بالنطاق المقترح.",
    name: "الاسم", email: "بريد العمل", company: "الشركة", need: "ما الخدمة المطلوبة؟", budget: "الميزانية التقديرية", message: "تفاصيل المشروع", submit: "إرسال ملخص المشروع",
    needs: ["تصميم لوحة مؤشرات", "تقارير مالية", "تحليل بيانات", "إطار مؤشرات", "تنظيف البيانات"],
    sentTitle: "تم استلام الملخص", sentText: "هذا النموذج التجريبي يعمل محليًا، ويمكن ربطه بالبريد أو CRM أو واتساب في الإنتاج.", reset: "إرسال ملخص آخر",
    footer: "مشروع افتراضي لمعرض أعمال مصطفى إبراهيم — محلل بيانات ومصمم تطبيقات ويب.", rights: "مشروع تجريبي ولا يعرض بيانات عملاء أو بيانات مالية حقيقية.", reportNotice: "تم تنزيل التقرير التجريبي بصيغة CSV."
  }
};

const baseData = [
  {m:"Oct",revenue:1.72,expense:1.17},{m:"Nov",revenue:1.89,expense:1.22},{m:"Dec",revenue:1.96,expense:1.31},
  {m:"Jan",revenue:2.08,expense:1.35},{m:"Feb",revenue:2.21,expense:1.42},{m:"Mar",revenue:2.35,expense:1.46},
  {m:"Apr",revenue:2.42,expense:1.51},{m:"May",revenue:2.56,expense:1.58},{m:"Jun",revenue:2.67,expense:1.64},
  {m:"Jul",revenue:2.83,expense:1.69},{m:"Aug",revenue:2.94,expense:1.76},{m:"Sep",revenue:3.08,expense:1.81}
];
const serviceIcons=[ChartBar,CurrencyCircleDollar,Gauge,Table], caseIcons=[Briefcase,ChartLineUp,ShieldCheck];

function Logo({t}){return <a className="logo" href="#overview"><span className="logo-mark"><i/><i/><i/></span><span><strong>{t.brand}</strong><small>{t.tagline}</small></span></a>}
function Metric({icon:Icon,label,value,change}){return <article className="metric"><div className="metric-icon"><Icon size={21} weight="duotone"/></div><div><span>{label}</span><strong>{value}</strong><small><TrendUp size={14} weight="bold"/>{change}</small></div></article>}

export function App(){
  const [lang,setLang]=useState("en"),[period,setPeriod]=useState(0),[menu,setMenu]=useState(false),[submitted,setSubmitted]=useState(false),[toast,setToast]=useState(false);
  const t=copy[lang],rtl=lang==="ar",data=useMemo(()=>period===1?baseData.slice(3):period===2?baseData.slice(6):baseData,[period]);
  const metrics=period===2?[["SAR 16.50M","+14.1%"],["SAR 6.29M","+12.7%"],["38.1%","+1.8 pts"],["SAR 5.10M","+9.4%"]]:[["SAR 28.71M","+12.4%"],["SAR 10.79M","+11.9%"],["37.6%","+2.6 pts"],["SAR 8.42M","+14.2%"]];
  const ids=["overview","services","dashboard","cases","contact"];
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=rtl?"rtl":"ltr";document.title=rtl?"بُعد للبيانات | تحليلات وتقارير مالية":"Baad Data | Analytics & Financial Reporting"},[lang,rtl]);
  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenu(false)};
  const download=()=>{const rows=["Month,Revenue SAR M,Expenses SAR M",...data.map(d=>`${d.m},${d.revenue},${d.expense}`)];const url=URL.createObjectURL(new Blob([rows.join("\n")],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="baad-data-sample-report.csv";a.click();URL.revokeObjectURL(url);setToast(true);setTimeout(()=>setToast(false),2600)};

  return <div className="app" dir={rtl?"rtl":"ltr"} lang={lang}>
    <header className="site-header"><div className="shell header-inner"><Logo t={t}/><nav className="desktop-nav">{t.nav.map((n,i)=><button key={n} onClick={()=>go(ids[i])}>{n}</button>)}</nav><div className="header-actions"><button className="lang" onClick={()=>setLang(rtl?"en":"ar")}><Globe size={18}/>{rtl?"EN":"العربية"}</button><button className="header-cta" onClick={()=>go("contact")}>{t.primary}<ArrowRight size={17} className="directional"/></button><button className="mobile-menu" aria-label="Menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<List/>}</button></div></div>{menu&&<nav className="mobile-nav">{t.nav.map((n,i)=><button key={n} onClick={()=>go(ids[i])}>{n}</button>)}</nav>}</header>
    <main>
      <section className="hero" id="overview"><img src="/assets/riyadh-data-skyline.webp" alt="Riyadh skyline with subtle analytical data grid"/><div className="hero-shade"/><div className="shell hero-content"><div className="eyebrow"><span/>{t.heroEyebrow}</div><h1>{t.heroTitle}</h1><p>{t.heroText}</p><div className="hero-actions"><button className="button primary" onClick={()=>go("contact")}>{t.primary}<ArrowRight size={19} className="directional"/></button><button className="button secondary" onClick={()=>go("dashboard")}><ChartLineUp size={19}/>{t.secondary}</button></div><div className="trust-row">{t.trust.map(x=><span key={x}><CheckCircle size={17} weight="fill"/>{x}</span>)}</div></div></section>

      <section className="section services" id="services"><div className="shell"><div className="section-heading"><div><span className="kicker">CAPABILITIES</span><h2>{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div><div className="service-grid">{t.services.map(([title,text],i)=>{const Icon=serviceIcons[i];return <article className="service" key={title}><span className="service-num">0{i+1}</span><Icon size={30} weight="duotone"/><h3>{title}</h3><p>{text}</p><button onClick={()=>go("contact")}>{rtl?"ناقش مشروعك":"Discuss your project"}<ArrowRight size={16} className="directional"/></button></article>})}</div></div></section>

      <section className="section dashboard-section" id="dashboard"><div className="shell"><div className="dashboard-head"><div><span className="demo-tag">{t.demo}</span><h2>{t.dashboardTitle}</h2><p>{t.dashboardText}</p></div><div className="dashboard-actions"><label>{t.period}<select value={period} onChange={e=>setPeriod(Number(e.target.value))}>{t.periods.map((p,i)=><option value={i} key={p}>{p}</option>)}</select></label><button className="button export" onClick={download}><DownloadSimple size={18}/>{t.export}</button></div></div><div className="dashboard-frame"><div className="demo-note"><ShieldCheck size={17}/>{t.demoLong}</div><div className="metric-grid"><Metric icon={CurrencyCircleDollar} label={t.kpis[0]} value={metrics[0][0]} change={metrics[0][1]}/><Metric icon={ChartBar} label={t.kpis[1]} value={metrics[1][0]} change={metrics[1][1]}/><Metric icon={Gauge} label={t.kpis[2]} value={metrics[2][0]} change={metrics[2][1]}/><Metric icon={TrendUp} label={t.kpis[3]} value={metrics[3][0]} change={metrics[3][1]}/></div>
        <div className="chart-layout"><div className="chart-card"><div className="chart-title"><div><h3>{t.chartTitle}</h3><span>SAR millions</span></div><div className="legend"><span><i className="navy"/>{rtl?"الإيرادات":"Revenue"}</span><span><i className="gray"/>{rtl?"المصروفات":"Expenses"}</span></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} barGap={5}><CartesianGrid vertical={false} stroke="#e6ebef"/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:"#6a7988",fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"#6a7988",fontSize:12}}/><Tooltip contentStyle={{borderRadius:10,border:"1px solid #dbe3e8"}}/><Bar dataKey="revenue" fill="#102a43" radius={[5,5,0,0]}/><Bar dataKey="expense" fill="#cbd5dc" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></div><aside className="insight-card"><span className="insight-icon"><Sparkle size={22} weight="fill"/></span><p className="mini">{t.insight}</p><h3>12.4% {rtl?"نمو في الإيرادات":"revenue growth"}</h3><p>{t.insightText}</p><div className="insight-stat"><TrendUp size={21}/><span><small>{rtl?"فارق الإيرادات":"Revenue variance"}</small><strong>+ SAR 2.18M</strong></span></div></aside></div>
        <div className="lower-grid"><div className="mix"><div><span className="mini">{t.mixTitle}</span><strong>SAR 28.71M</strong><small>{t.demo}</small></div><div className="pie"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{v:46},{v:31},{v:23}]} dataKey="v" innerRadius={38} outerRadius={55} paddingAngle={3}>{["#0d6b56","#183b56","#9eb3c1"].map(c=><Cell key={c} fill={c}/>)}</Pie></PieChart></ResponsiveContainer></div></div><div className="search-preview"><ChartLineUp size={22}/><span><small>{rtl?"تحليل ذكي":"SMART ANALYSIS"}</small><strong>{rtl?"تكشف اللوحة اتجاهات النمو والانحرافات تلقائيًا.":"The dashboard surfaces growth trends and variances automatically."}</strong></span></div></div>
      </div></div></section>

      <section className="section cases" id="cases"><div className="shell"><div className="section-heading"><div><span className="kicker">CASE STUDIES</span><h2>{t.casesTitle}</h2></div><p>{t.casesText}</p></div><div className="case-grid">{t.cases.map(([title,text,a,b],i)=>{const Icon=caseIcons[i];return <article className="case" key={title}><div className="case-top"><Icon size={28} weight="duotone"/><span>{t.demo}</span></div><h3>{title}</h3><p>{text}</p><div className="case-stats"><span>{a}</span><span>{b}</span></div></article>})}</div><div className="process"><h3>{t.processTitle}</h3><div>{t.process.map((p,i)=><span key={p}><b>{i+1}</b>{p}{i<4&&<i/>}</span>)}</div></div></div></section>

      <section className="contact" id="contact"><div className="shell contact-grid"><div className="contact-copy"><span className="kicker light">{t.contactEyebrow}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-detail"><EnvelopeSimple size={22}/><span><small>Email</small><strong>hello@baaddata.example</strong></span></div><div className="contact-detail"><Phone size={22}/><span><small>{rtl?"الموقع":"Location"}</small><strong>{rtl?"مكة المكرمة، السعودية":"Makkah, Saudi Arabia"}</strong></span></div></div><div className="form-card">{submitted?<div className="success"><CheckCircle size={50} weight="fill"/><h3>{t.sentTitle}</h3><p>{t.sentText}</p><button className="button primary" onClick={()=>setSubmitted(false)}>{t.reset}</button></div>:<form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><div className="form-row"><label>{t.name}<input required placeholder={rtl?"الاسم الكامل":"Full name"}/></label><label>{t.email}<input required type="email" placeholder="name@company.com"/></label></div><div className="form-row"><label>{t.company}<input required placeholder={rtl?"اسم الشركة":"Company name"}/></label><label>{t.budget}<select required defaultValue=""><option value="" disabled>{rtl?"اختر النطاق":"Select range"}</option><option>SAR 2,000–5,000</option><option>SAR 5,000–10,000</option><option>SAR 10,000+</option></select></label></div><label>{t.need}<select required defaultValue=""><option value="" disabled>{rtl?"اختر الخدمة":"Select a service"}</option>{t.needs.map(n=><option key={n}>{n}</option>)}</select></label><label>{t.message}<textarea required rows="4" placeholder={rtl?"صف البيانات المتوفرة والنتيجة التي تحتاجها...":"Describe the data you have and the outcome you need..."}/></label><button className="button primary form-submit" type="submit">{t.submit}<ArrowRight size={19} className="directional"/></button></form>}</div></div></section>
    </main>
    <footer><div className="shell footer-inner"><Logo t={t}/><p>{t.footer}</p><small>{t.rights}</small></div></footer>{toast&&<div className="toast" role="status"><CheckCircle size={20} weight="fill"/>{t.reportNotice}</div>}
  </div>
}
