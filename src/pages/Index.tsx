import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Diagnostic from '@/components/Diagnostic';
import Education from '@/components/Education';
import { useReveal } from '@/components/useReveal';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

const nav = [
  { label: 'Диагностика', href: '#diagnostic' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Обучение', href: '#education' },
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

const HERO_IMG = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/4160b5e2-f878-4afe-b68f-9b5f3ae83b39.jpg';
const HERO_IMG2 = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/a8250006-d05d-4b91-b225-bb95d0dd543c.jpg';

const Index = () => {
  useReveal();
  const { add, count, setOpen } = useCart();
  const { isWished, toggleItem, activeListId, setOpen: setWishOpen, lists } = useWishlist();
  const activeList = lists.find((l) => l.id === activeListId) ?? lists[0];
  const totalWished = lists.reduce((s, l) => s + l.items.length, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'hair' | 'scalp' | 'universal'>('all');
  const [giftTag, setGiftTag] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-50 glass soft-shadow rounded-full">
        <div className="px-5 sm:px-7 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/bucket/8958dc5f-4146-4058-86b9-541320d2168d.jpeg"
              alt="InValuable"
              className="h-10 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setWishOpen(true)} className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
              <Icon name="Heart" size={18} className={totalWished > 0 ? 'text-primary' : ''} />
              {totalWished > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalWished}
                </span>
              )}
            </button>
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
          <div className="relative reveal" data-delay="0.15s">
            {/* Main photo */}
            <div className="relative">
              <img
                src={HERO_IMG}
                alt="InValuable"
                className="rounded-[2.5rem] w-full object-cover object-top aspect-[3/4] soft-shadow"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-white/60 via-transparent to-transparent" />
            </div>

            {/* Second photo — floating card top-right */}
            <div className="absolute -top-5 -right-4 sm:right-0 w-36 sm:w-44 animate-float" style={{ animationDelay: '1s' }}>
              <img
                src={HERO_IMG2}
                alt="InValuable products"
                className="rounded-[1.5rem] w-full object-cover aspect-square soft-shadow border-4 border-white"
              />
            </div>

            {/* Stats badge */}
            <div className="absolute top-8 -left-4 sm:-left-8 glass soft-shadow rounded-2xl px-4 py-3 animate-float" style={{ animationDelay: '0.5s' }}>
              <p className="text-2xl font-display font-bold text-primary">98%</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">довольных клиентов</p>
            </div>

            {/* AL badge */}
            <div className="absolute -bottom-5 left-4 sm:left-8 glass soft-shadow rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 reveal">
            <div>
              <p className="text-primary font-semibold mb-3 tracking-wide">КАТАЛОГ</p>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold">Все продукты</h2>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 reveal">
            {[
              { key: 'all', label: 'Все', emoji: '✨' },
              { key: 'hair', label: 'Для волос', emoji: '💇‍♀️' },
              { key: 'scalp', label: 'Кожа головы', emoji: '🧖‍♀️' },
              { key: 'universal', label: 'Универсальные', emoji: '🌸' },
            ].map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => setCatalogFilter(key as 'all' | 'hair' | 'scalp' | 'universal')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${catalogFilter === key ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'}`}
              >
                <span>{emoji}</span>{label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            {products.filter(p => catalogFilter === 'all' || p.category === catalogFilter).map((p, i) => (
              <div key={p.id} className="reveal bg-secondary/50 rounded-[1.75rem] p-5 group hover:-translate-y-1 transition-transform soft-shadow relative" data-delay={`${(i % 3) * 0.08}s`}>
                <button
                  onClick={() => activeList && toggleItem(activeList.id, p)}
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isWished(p.id) ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:text-primary'}`}
                >
                  <Icon name="Heart" size={15} />
                </button>
                <div className="aspect-square rounded-2xl bg-background flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform">
                  {p.emoji}
                </div>
                <h3 className="font-semibold leading-snug pr-8">{p.name}</h3>
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

          {/* Gift finder */}
          <div id="gift" className="reveal bg-gradient-to-br from-primary/8 via-accent to-secondary rounded-[2rem] p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="text-5xl">🎁</div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold mb-1">Подбор подарка</h3>
                <p className="text-muted-foreground mb-4">Ответьте на 2 вопроса — и AL подберёт идеальный подарок</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Для мамы', 'Для подруги', 'Для себя', 'Универсально'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setGiftTag(giftTag === tag ? '' : tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${giftTag === tag ? 'bg-primary text-primary-foreground' : 'glass hover:bg-white/80'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {giftTag && (
                  <div className="animate-fade-up space-y-3">
                    <p className="text-sm font-semibold text-primary">Рекомендации AL для «{giftTag}»:</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {products.slice(0, 3).map((p) => (
                        <div key={p.id} className="flex items-center gap-3 bg-background rounded-2xl p-3 flex-1">
                          <span className="text-2xl">{p.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{p.name}</p>
                            <p className="text-primary text-sm font-semibold">{p.price.toLocaleString()} ₽</p>
                          </div>
                          <button onClick={() => add(p)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90">
                            <Icon name="Plus" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <Education />

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 relative dots-bg">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <p className="text-primary font-semibold mb-3 tracking-wide">О НАС</p>
            <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4">Команда InValuable</h2>
            <p className="text-muted-foreground text-lg">Эксперты, которым доверяют тысячи профессионалов</p>
          </div>

          {/* Values */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: 'ShieldCheck', title: 'Безопасность', desc: 'Составы без агрессивных компонентов, проверенные дерматологами.' },
              { icon: 'Sparkles', title: 'AL-технологии', desc: 'Умный подбор ухода на основе персональной диагностики.' },
              { icon: 'HeartHandshake', title: 'Доверие', desc: 'Спокойный и заботливый подход к каждому клиенту и партнёру.' },
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

          {/* Trainers */}
          <div className="mb-14">
            <h3 className="text-2xl font-display font-semibold text-center mb-8 reveal">Наши тренеры</h3>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { name: 'Анна Светлова', role: 'Эксперт-колорист', exp: '14 лет', emoji: '💇‍♀️', bio: 'Тренер по колористике, ботоксу и химии волос. Победитель профессиональных конкурсов.' },
                { name: 'Мария Ковалёва', role: 'Трихолог, к.м.н.', exp: '10 лет', emoji: '🔬', bio: 'Кандидат медицинских наук. Автор курсов по трихологии и уходу за кожей головы.' },
              ].map((t, i) => (
                <div key={t.name} className="reveal glass soft-shadow rounded-3xl p-6 flex gap-5" data-delay={`${i * 0.1}s`}>
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl shrink-0">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-xl">{t.name}</p>
                    <p className="text-primary text-sm font-medium">{t.role} · {t.exp}</p>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{t.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="reveal">
            <h3 className="text-2xl font-display font-semibold text-center mb-8">Ближайшие события</h3>
            <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {[
                { date: '15 июля', title: 'Мастер-класс по балаяжу', place: 'Москва', emoji: '✂️' },
                { date: '22 июля', title: 'Вебинар по трихологии', place: 'Онлайн', emoji: '💻' },
                { date: '5 августа', title: 'День открытых дверей', place: 'Санкт-Петербург', emoji: '🌸' },
              ].map((ev, i) => (
                <div key={ev.title} className="reveal bg-background border border-border rounded-2xl p-5 hover:-translate-y-1 transition-transform" data-delay={`${i * 0.08}s`}>
                  <div className="text-3xl mb-3">{ev.emoji}</div>
                  <p className="text-primary font-semibold text-sm mb-1">{ev.date}</p>
                  <p className="font-semibold leading-snug mb-2">{ev.title}</p>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Icon name="MapPin" size={13} />{ev.place}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
          <img
            src="https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/bucket/8958dc5f-4146-4058-86b9-541320d2168d.jpeg"
            alt="InValuable"
            className="h-12 w-auto object-contain"
          />
          <p className="text-muted-foreground text-sm">© 2026 InValuable. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;