import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { accountApi } from '@/lib/accountApi';

const CLUB_IMG = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/eea211a9-e9dc-46e4-b5bc-973199fa5bb8.jpg';

type TierId = 'basic' | 'premium' | 'elite';

const tiers: {
  id: TierId;
  name: string;
  price: number;
  period: string;
  desc: string;
  features: string[];
  highlight?: boolean;
}[] = [
  {
    id: 'basic',
    name: 'Базовый',
    price: 0,
    period: 'бесплатно',
    desc: 'Первый шаг в сообщество мастеров',
    features: [
      'Доступ к форуму и чатам',
      'Анонсы событий и вебинаров',
      'Вводные модули курсов',
      'Новости индустрии',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: 1490,
    period: 'в месяц',
    desc: 'Для активных практикующих мастеров',
    features: [
      'Всё из Базового',
      'LIVE-мастер-классы 2 раза в месяц',
      'Скидка 15% в магазине',
      'Записи всех прошедших эфиров',
      'Приоритетная поддержка',
    ],
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Элитный',
    price: 3990,
    period: 'в месяц',
    desc: 'Максимум для владельцев салонов',
    features: [
      'Всё из Премиум',
      'Безлимитные LIVE-сессии',
      'Скидка 30% в магазине',
      'Личный куратор развития',
      'Доступ к закрытым мероприятиям',
      'Сертификация без очереди',
    ],
  },
];

const liveEvents = [
  { date: '14 авг', time: '19:00', title: 'Техники балаяжа на тёмных волосах', host: 'Анна Светлова', tag: 'Колористика' },
  { date: '19 авг', time: '18:30', title: 'Разбор сложных случаев выпадения', host: 'Мария Ковалёва', tag: 'Трихология' },
  { date: '26 авг', time: '19:00', title: 'Продажи услуг: как повысить средний чек', host: 'HairMasterHub', tag: 'Бизнес' },
];

const forumTopics = [
  { icon: '💬', title: 'Как убрать желтизну после осветления?', replies: 34, author: 'Оксана П.' },
  { icon: '🔥', title: 'Обзор новой линейки для ботокса волос', replies: 21, author: 'Дмитрий К.' },
  { icon: '💡', title: 'Лайфхак: ускоряем запись клиентов через бота', replies: 47, author: 'Ирина В.' },
  { icon: '❓', title: 'Ищу тренера по наращиванию в СПб', replies: 12, author: 'Мастер_Света' },
];

const ClubSection = () => {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<TierId | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', personal: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Введите ФИО';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email';
    if (!/^[+]?[\d\s()-]{10,}$/.test(form.phone)) e.phone = 'Некорректный телефон';
    if (!form.personal) e.personal = 'Необходимо согласие';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const closeModal = () => {
    setSelectedTier(null);
    setTimeout(() => {
      setDone(false);
      setForm({ name: '', phone: '', email: '', personal: false });
      setErrors({});
    }, 300);
  };

  const field = 'w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary transition-colors text-sm';
  const activeTier = tiers.find(t => t.id === selectedTier);

  return (
    <section id="club" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary blob rounded-full" />
      <div className="container mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-primary font-semibold mb-3 tracking-wide">КЛУБ</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4">
            Закрытое сообщество экспертов
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Эксклюзивные мастер-классы, живые трансляции, доступ к форуму и скидки на продукты
          </p>
        </div>

        {/* Community photo strip */}
        <div className="reveal mb-16 rounded-[2rem] overflow-hidden soft-shadow relative">
          <img src={CLUB_IMG} alt="Сообщество HairMasterHub" className="w-full h-64 sm:h-80 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Уже в клубе</p>
              <p className="text-white text-3xl sm:text-4xl font-display font-semibold">2 400+ мастеров</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-white text-2xl font-display font-semibold">180+</p>
                <p className="text-white/70 text-xs">LIVE-эфиров проведено</p>
              </div>
              <div>
                <p className="text-white text-2xl font-display font-semibold">4.9</p>
                <p className="text-white/70 text-xs">средняя оценка клуба</p>
              </div>
            </div>
          </div>
        </div>

        {/* Membership tiers */}
        <div className="mb-20">
          <h3 className="text-2xl font-display font-semibold text-center mb-8 reveal">Уровни членства</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className={`reveal rounded-[2rem] p-7 flex flex-col relative ${
                  tier.highlight
                    ? 'bg-primary text-primary-foreground soft-shadow scale-[1.03] z-10'
                    : 'bg-secondary/50 border border-border'
                }`}
                data-delay={`${i * 0.1}s`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-gold-foreground text-xs font-bold px-4 py-1.5 rounded-full">
                    Популярный
                  </span>
                )}
                <h4 className="text-2xl font-display font-semibold mb-1">{tier.name}</h4>
                <p className={`text-sm mb-5 ${tier.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {tier.desc}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-display font-bold">
                    {tier.price === 0 ? 'Бесплатно' : `${tier.price.toLocaleString()} ₽`}
                  </span>
                  {tier.price > 0 && (
                    <span className={`text-sm ml-1 ${tier.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      /{tier.period.replace('в ', '')}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-7 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icon
                        name="Check"
                        size={16}
                        className={`shrink-0 mt-0.5 ${tier.highlight ? 'text-gold' : 'text-primary'}`}
                      />
                      <span className={tier.highlight ? 'text-primary-foreground/90' : 'text-foreground/90'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full py-3.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 ${
                    tier.highlight
                      ? 'bg-white text-primary'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {tier.price === 0 ? 'Присоединиться' : 'Оформить подписку'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE events + Forum */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LIVE events */}
          <div className="reveal">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-2xl font-display font-semibold">LIVE-события</h3>
            </div>
            <div className="space-y-3">
              {liveEvents.map((ev) => (
                <div key={ev.title} className="flex items-center gap-4 bg-secondary/50 rounded-2xl p-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{ev.date.split(' ')[0]}</span>
                    <span className="text-[10px] text-primary/70 uppercase">{ev.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium">{ev.tag}</span>
                    <p className="font-semibold text-sm mt-1.5 leading-snug">{ev.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{ev.host} · {ev.time}</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Forum preview */}
          <div className="reveal" data-delay="0.1s">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="MessagesSquare" size={20} className="text-primary" />
              <h3 className="text-2xl font-display font-semibold">Форум клуба</h3>
            </div>
            <div className="space-y-3">
              {forumTopics.map((t) => (
                <div key={t.title} className="flex items-center gap-4 bg-secondary/50 rounded-2xl p-4">
                  <span className="text-2xl shrink-0">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-snug truncate">{t.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{t.author} · {t.replies} ответов</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join modal */}
      {selectedTier && activeTier && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-background w-full sm:max-w-md max-h-[92svh] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-display font-semibold">Тариф «{activeTier.name}»</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {activeTier.price === 0 ? 'Бесплатное вступление' : `${activeTier.price.toLocaleString()} ₽ ${activeTier.period}`}
                </p>
              </div>
              <button onClick={closeModal} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!done ? (
                <div className="space-y-4">
                  <div>
                    <input className={field} placeholder="ФИО" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input className={field} placeholder="Телефон" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input className={field} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, personal: !f.personal }))}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.personal ? 'bg-primary border-primary' : 'border-border'}`}>
                      {form.personal && <Icon name="Check" size={12} className="text-primary-foreground" />}
                    </div>
                    <span className="text-sm text-muted-foreground">Согласен(на) на обработку персональных данных</span>
                  </label>
                  {errors.personal && <p className="text-destructive text-xs">{errors.personal}</p>}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-5">
                    <Icon name="PartyPopper" size={36} className="text-primary" />
                  </div>
                  <h4 className="text-2xl font-display font-semibold mb-2">Добро пожаловать в клуб!</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Доступ к материалам уровня «{activeTier.name}» откроется сразу после подтверждения на {form.email}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-border">
              {!done ? (
                <button
                  onClick={() => {
                    if (validate()) {
                      setDone(true);
                      if (user) accountApi.subscribe(activeTier.id, activeTier.price);
                    }
                  }}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  {activeTier.price === 0 ? 'Присоединиться' : `Оплатить ${activeTier.price.toLocaleString()} ₽`}
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={closeModal} className="flex-1 bg-secondary text-foreground font-semibold py-4 rounded-full hover:bg-accent transition-colors">
                    Закрыть
                  </button>
                  <Link
                    to="/account"
                    onClick={closeModal}
                    className="flex-1 bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    В личный кабинет
                    <Icon name="ArrowRight" size={18} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClubSection;