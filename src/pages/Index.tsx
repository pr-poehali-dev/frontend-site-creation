import { useState } from 'react';
import Icon from '@/components/ui/icon';
import OrderForm from '@/components/OrderForm';
import { useReveal } from '@/components/useReveal';

const nav = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Блог', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const services = [
  { icon: 'Code2', title: 'Веб-разработка', desc: 'Сайты и веб-приложения, которые работают быстро и продают.' },
  { icon: 'Palette', title: 'Брендинг', desc: 'Айдентика, которая выделяет вас среди конкурентов.' },
  { icon: 'TrendingUp', title: 'Маркетинг', desc: 'Привлекаем клиентов через digital-каналы и стратегию.' },
  { icon: 'Smartphone', title: 'Мобильные приложения', desc: 'iOS и Android продукты с безупречным UX.' },
  { icon: 'Search', title: 'SEO-оптимизация', desc: 'Выводим ваш сайт в топ поисковой выдачи.' },
  { icon: 'Sparkles', title: 'AI-решения', desc: 'Внедряем искусственный интеллект в ваши процессы.' },
];

const stats = [
  { value: '250+', label: 'Проектов' },
  { value: '12', label: 'Лет опыта' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '40', label: 'Специалистов' },
];

const portfolio = [
  { img: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/4a4726bb-e205-4342-b005-d201c8343c9f.jpg', title: 'Fintech Platform', tag: 'Веб-разработка' },
  { img: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/90dd751e-1d19-4f10-97e9-9c9708efa6eb.jpg', title: 'NEON Identity', tag: 'Брендинг' },
  { img: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/097e6a0f-cb9f-47ea-aade-2b6991a50312.jpg', title: 'Flow Marketing', tag: 'Маркетинг' },
];

const pricing = [
  { name: 'Старт', price: '90 000 ₽', desc: 'Для небольших проектов', features: ['Лендинг до 5 экранов', 'Адаптивный дизайн', 'Форма заявок', 'Запуск за 10 дней'], featured: false },
  { name: 'Бизнес', price: '240 000 ₽', desc: 'Оптимальный выбор', features: ['Многостраничный сайт', 'Уникальный дизайн', 'CMS и интеграции', 'SEO-настройка', 'Поддержка 3 месяца'], featured: true },
  { name: 'Премиум', price: 'от 500 000 ₽', desc: 'Под ключ', features: ['Веб-приложение', 'Брендинг с нуля', 'Маркетинговая стратегия', 'Выделенная команда', 'Поддержка 12 месяцев'], featured: false },
];

const blog = [
  { tag: 'Дизайн', title: 'Тренды веб-дизайна 2026: что будет актуально', date: '2 июля 2026' },
  { tag: 'Разработка', title: 'Почему скорость сайта решает всё для бизнеса', date: '28 июня 2026' },
  { tag: 'Маркетинг', title: 'AI в маркетинге: как автоматизировать привлечение', date: '20 июня 2026' },
];

const faq = [
  { q: 'Сколько времени занимает разработка сайта?', a: 'В среднем от 10 дней для лендинга до 2 месяцев для сложного веб-приложения. Точные сроки обсуждаем на старте проекта.' },
  { q: 'Работаете ли вы по договору?', a: 'Да, мы заключаем официальный договор с фиксацией всех сроков, стоимости и результатов работы.' },
  { q: 'Что входит в поддержку после запуска?', a: 'Исправление ошибок, обновления, консультации и доработки. Срок поддержки зависит от выбранного тарифа.' },
  { q: 'Можно ли внести правки в процессе?', a: 'Конечно. Мы работаем итерациями и согласовываем каждый этап, чтобы результат полностью соответствовал ожиданиям.' },
];

const Index = () => {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="font-display font-extrabold text-xl tracking-tight">
            NOVA<span className="text-accent">.</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contacts" className="hidden lg:inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary/40">
            Обсудить проект
          </a>
          <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="lg:hidden glass border-t border-border px-5 py-4 flex flex-col gap-1 animate-fade-in">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2.5 text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="mt-2 bg-primary text-primary-foreground text-center font-semibold px-5 py-3 rounded-full">
              Обсудить проект
            </a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center grid-bg pt-16 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
        <div className="container mx-auto px-5 relative z-10 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">Принимаем проекты на 2026 год</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Создаём цифровые<br /><span className="gradient-text">продукты будущего</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Digital-агентство полного цикла. Превращаем смелые идеи в сайты, бренды и приложения, которые приносят результат.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <a href="#contacts" className="group bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                Заказать проект
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#portfolio" className="glass hover:bg-white/10 transition-colors font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2">
                <Icon name="Play" size={18} /> Наши работы
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="about" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className="reveal glass rounded-3xl p-6 sm:p-8 text-center" data-delay={`${i * 0.1}s`}>
                <div className="text-4xl sm:text-5xl font-extrabold gradient-text font-display">{s.value}</div>
                <div className="text-muted-foreground mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <p className="text-accent font-semibold mb-3">О НАС</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Команда, которая двигает бизнес вперёд</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Мы — NOVA, digital-агентство с 12-летним опытом. Наша миссия — помогать компаниям расти через технологии и дизайн. Мы не просто выполняем задачи, мы становимся вашим партнёром роста.
              </p>
              <div className="space-y-3">
                {['Индивидуальный подход к каждому проекту', 'Прозрачные процессы и отчётность', 'Гарантия результата в договоре'].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </span>
                    <span className="text-foreground/90">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal relative" data-delay="0.15s">
              <img src="https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/097e6a0f-cb9f-47ea-aade-2b6991a50312.jpg" alt="NOVA" className="rounded-3xl w-full object-cover aspect-square animate-float" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <p className="text-accent font-semibold mb-3">УСЛУГИ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Всё для роста вашего бизнеса</h2>
            <p className="text-muted-foreground text-lg">Полный спектр digital-услуг под одной крышей</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="reveal glass glow-border rounded-3xl p-8 group hover:-translate-y-2 transition-transform duration-300" data-delay={`${(i % 3) * 0.1}s`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={s.icon} size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 reveal">
            <div>
              <p className="text-accent font-semibold mb-3">ПОРТФОЛИО</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Проекты, которыми гордимся</h2>
            </div>
            <a href="#contacts" className="text-primary hover:text-accent transition-colors font-semibold inline-flex items-center gap-2">
              Все проекты <Icon name="ArrowUpRight" size={18} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div key={p.title} className="reveal group relative rounded-3xl overflow-hidden cursor-pointer" data-delay={`${i * 0.1}s`}>
                <img src={p.img} alt={p.title} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <span className="text-xs glass px-3 py-1 rounded-full text-accent">{p.tag}</span>
                  <h3 className="text-xl font-bold mt-3">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <p className="text-accent font-semibold mb-3">ТАРИФЫ И ЦЕНЫ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Прозрачные цены без сюрпризов</h2>
            <p className="text-muted-foreground text-lg">Выберите пакет под ваши задачи</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((p, i) => (
              <div key={p.name} className={`reveal rounded-3xl p-8 relative ${p.featured ? 'bg-gradient-to-b from-primary/20 to-accent/10 glow-border scale-100 lg:scale-105' : 'glass'}`} data-delay={`${i * 0.1}s`}>
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Популярный
                  </span>
                )}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
                <div className="text-4xl font-extrabold font-display my-6">{p.price}</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-foreground/90">
                      <Icon name="Check" size={18} className="text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className={`block text-center font-semibold py-3.5 rounded-full transition-all ${p.featured ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30' : 'glass hover:bg-white/10'}`}>
                  Выбрать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <p className="text-accent font-semibold mb-3">БЛОГ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Полезные материалы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blog.map((b, i) => (
              <article key={b.title} className="reveal glass rounded-3xl p-7 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group" data-delay={`${i * 0.1}s`}>
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">{b.tag}</span>
                <h3 className="text-lg font-bold mt-5 mb-3 group-hover:text-accent transition-colors leading-snug">{b.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
                  <span>{b.date}</span>
                  <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5 max-w-3xl">
          <div className="text-center mb-16 reveal">
            <p className="text-accent font-semibold mb-3">ВОПРОСЫ И ОТВЕТЫ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Частые вопросы</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={f.q} className="reveal glass rounded-2xl overflow-hidden" data-delay={`${i * 0.08}s`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className="font-semibold text-lg">{f.q}</span>
                  <Icon name="ChevronDown" size={22} className={`shrink-0 text-primary transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 sm:py-28 relative grid-bg overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[130px]" />
        <div className="container mx-auto px-5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="reveal">
              <p className="text-accent font-semibold mb-3">КОНТАКТЫ</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Давайте создадим что-то великое вместе</h2>
              <p className="text-muted-foreground text-lg mb-10">Оставьте заявку — ответим в течение часа и предложим решение под вашу задачу.</p>
              <div className="space-y-5">
                {[
                  { icon: 'Phone', label: '+7 (999) 123-45-67' },
                  { icon: 'Mail', label: 'hello@nova.digital' },
                  { icon: 'MapPin', label: 'Москва, ул. Космонавтов, 42' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                      <Icon name={c.icon} size={20} className="text-primary" />
                    </span>
                    <span className="text-lg">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" data-delay="0.15s">
              <OrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="#" className="font-display font-extrabold text-xl">NOVA<span className="text-accent">.</span></a>
          <p className="text-muted-foreground text-sm">© 2026 NOVA. Все права защищены.</p>
          <div className="flex gap-4">
            {['Send', 'Instagram', 'Youtube'].map((s) => (
              <a key={s} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Icon name={s} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
