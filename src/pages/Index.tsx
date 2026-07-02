import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Diagnostic from '@/components/Diagnostic';
import { useReveal } from '@/components/useReveal';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const nav = [
  { label: 'Диагностика', href: '#diagnostic' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
];

const feed = [
  { emoji: '🌸', title: 'Новинка сезона', sub: 'Успокаивающий крем-гель' },
  { emoji: '💧', title: 'Хит продаж', sub: 'Восстанавливающая сыворотка' },
  { emoji: '✨', title: 'Совет дня', sub: 'Как вернуть блеск волосам' },
  { emoji: '🌿', title: 'AL рекомендует', sub: 'Уход для чувствительной кожи' },
  { emoji: '🪶', title: 'Тренд', sub: 'Лёгкий объём без утяжеления' },
];

const HERO_IMG = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/e1f7a3b2-1bc9-432b-aba3-b428ec087fb7.jpg';

const Index = () => {
  useReveal();
  const { add, count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-50 glass soft-shadow rounded-full">
        <div className="px-5 sm:px-7 h-14 flex items-center justify-between">
          <a href="#" className="font-display font-semibold text-xl tracking-tight">
            InValuable
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
              <Icon name="ShoppingBag" size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={18} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden px-6 pb-4 flex flex-col gap-1 animate-fade-in">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2.5 text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center dots-bg pt-24 overflow-hidden">
        <div className="absolute top-10 -right-20 w-96 h-96 bg-primary blob rounded-full" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-primary blob rounded-full" />
        <div className="container mx-auto px-5 relative z-10 grid lg:grid-cols-2 gap-12 items-center py-10">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 reveal">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Косметический бренд премиум-класса</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-display font-semibold leading-[1.02] mb-6 reveal" data-delay="0.1s">
              Уход, подобранный <span className="gradient-text">лично для вас</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 reveal" data-delay="0.2s">
              Пройдите умную диагностику кожи и волос — и получите персональные рекомендации от AL-помощника за одну минуту.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 reveal" data-delay="0.3s">
              <a href="#diagnostic" className="group bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity soft-shadow">
                Начать диагностику
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#catalog" className="glass hover:bg-accent transition-colors font-semibold px-8 py-4 rounded-full flex items-center justify-center">
                Каталог
              </a>
            </div>
          </div>
          <div className="relative reveal" data-delay="0.2s">
            <img src={HERO_IMG} alt="InValuable" className="rounded-[2.5rem] w-full object-cover aspect-[4/5] soft-shadow" />
            <div className="absolute -bottom-5 -left-3 sm:left-6 glass soft-shadow rounded-2xl px-5 py-4 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AL-помощник</p>
                <p className="text-sm font-semibold">Подбор за 1 минуту</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEED */}
      <section className="py-8 border-y border-border overflow-hidden">
        <div className="flex gap-4 animate-marquee w-max">
          {[...feed, ...feed].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-secondary/70 rounded-2xl px-5 py-3 shrink-0">
              <span className="text-2xl">{f.emoji}</span>
              <div>
                <p className="text-sm font-semibold whitespace-nowrap">{f.title}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <Diagnostic />

      {/* CATALOG */}
      <section id="catalog" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 reveal">
            <div>
              <p className="text-primary font-semibold mb-3 tracking-wide">КАТАЛОГ</p>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold">Популярные продукты</h2>
            </div>
            <p className="text-muted-foreground">Можно добавить любой продукт вручную</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((p, i) => (
              <div key={p.id} className="reveal bg-secondary/50 rounded-[1.75rem] p-5 group hover:-translate-y-1 transition-transform soft-shadow" data-delay={`${(i % 3) * 0.08}s`}>
                <div className="aspect-square rounded-2xl bg-background flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform">
                  {p.emoji}
                </div>
                <h3 className="font-semibold leading-snug">{p.name}</h3>
                <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-display font-semibold text-xl">{p.price.toLocaleString()} ₽</span>
                  <button
                    onClick={() => add(p)}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Icon name="Plus" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 relative dots-bg">
        <div className="container mx-auto px-5 grid lg:grid-cols-3 gap-6">
          {[
            { icon: 'ShieldCheck', title: 'Безопасность', desc: 'Составы без агрессивных компонентов, проверенные экспертами.' },
            { icon: 'Sparkles', title: 'AL-технологии', desc: 'Умный подбор ухода на основе вашей диагностики.' },
            { icon: 'HeartHandshake', title: 'Доверие', desc: 'Спокойный и заботливый подход к каждому клиенту.' },
          ].map((c, i) => (
            <div key={c.title} className="reveal glass soft-shadow rounded-3xl p-8" data-delay={`${i * 0.1}s`}>
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5">
                <Icon name={c.icon} size={26} className="text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-2">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary blob rounded-full" />
        <div className="container mx-auto px-5 relative z-10 text-center max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4 reveal">Остались вопросы?</h2>
          <p className="text-muted-foreground text-lg mb-8 reveal" data-delay="0.1s">Запишитесь на консультацию офлайн или напишите нам в соцсетях.</p>
          <div className="flex flex-wrap justify-center gap-3 reveal" data-delay="0.2s">
            <a href="#diagnostic" className="bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity soft-shadow">
              Записаться на консультацию
            </a>
            {['Send', 'Instagram'].map((s) => (
              <a key={s} href="#" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-accent transition-colors">
                <Icon name={s} size={20} className="text-primary" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-semibold text-xl">InValuable</span>
          <p className="text-muted-foreground text-sm">© 2026 InValuable. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
