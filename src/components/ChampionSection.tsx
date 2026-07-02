import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CHAMPION_IMG = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/e402936b-2a2c-4d52-8cef-32d137e96759.jpg';

const steps = [
  { num: '01', title: 'Регистрация', desc: 'Зарегистрируйтесь как специалист и пройдите верификацию диплома.', icon: 'UserCheck' },
  { num: '02', title: 'Обучение', desc: 'Пройдите сертифицированные курсы InValuable по вашей специализации.', icon: 'BookOpen' },
  { num: '03', title: 'Практика', desc: 'Применяйте знания, участвуйте в мастер-классах и набирайте баллы.', icon: 'Star' },
  { num: '04', title: 'Чемпион', desc: 'Получите статус Champion InValuable и эксклюзивные привилегии.', icon: 'Trophy' },
];

const perks = [
  { icon: '🎓', title: 'Сертификат чемпиона', desc: 'Официальный документ международного образца' },
  { icon: '💎', title: 'Скидка 30%', desc: 'На всю продукцию InValuable навсегда' },
  { icon: '📢', title: 'Амбассадорство', desc: 'Участие в рекламных кампаниях бренда' },
  { icon: '🤝', title: 'Партнёрская сеть', desc: 'Доступ к закрытому сообществу чемпионов' },
  { icon: '📅', title: 'Закрытые мероприятия', desc: 'VIP-приглашения на запуски продуктов' },
  { icon: '💰', title: 'Реферальная программа', desc: 'Доход за привлечение новых специалистов' },
];

const ChampionSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', spec: '', personal: false, news: false });
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

  const field = 'w-full bg-white/80 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary transition-colors text-sm';

  return (
    <section id="champion" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dots-bg opacity-60" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary blob rounded-full opacity-30" />

      <div className="container mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4 text-sm font-semibold">
            <Icon name="Trophy" size={16} /> Программа развития
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4">
            Стать <span className="gradient-text">Чемпионом</span> InValuable
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Профессиональная программа для лучших специалистов. Развивайтесь, зарабатывайте и становитесь лицом бренда.
          </p>
        </div>

        {/* Hero block: image + steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal">
            <img
              src={CHAMPION_IMG}
              alt="Чемпион InValuable"
              className="rounded-[2.5rem] w-full object-cover aspect-[4/5] soft-shadow"
            />
          </div>
          <div className="space-y-6 reveal" data-delay="0.1s">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <span className="text-[10px] font-bold text-primary group-hover:text-white transition-colors">{s.num}</span>
                  <Icon name={s.icon} size={16} className="text-primary group-hover:text-white transition-colors mt-0.5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setFormOpen(true)}
              className="mt-4 w-full sm:w-auto bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity soft-shadow flex items-center justify-center gap-2 group"
            >
              Подать заявку
              <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Perks grid */}
        <div className="reveal mb-4">
          <h3 className="text-2xl font-display font-semibold text-center mb-8">Привилегии чемпиона</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {perks.map((p, i) => (
              <div
                key={p.title}
                className="reveal glass soft-shadow rounded-2xl p-5 hover:-translate-y-1 transition-transform"
                data-delay={`${(i % 3) * 0.07}s`}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <p className="font-semibold text-sm leading-snug">{p.title}</p>
                <p className="text-muted-foreground text-xs mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setFormOpen(false)} />
          <div className="relative bg-background w-full sm:max-w-md max-h-[92svh] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Trophy" size={18} className="text-primary" />
                  <h3 className="text-xl font-display font-semibold">Стать чемпионом</h3>
                </div>
                <p className="text-sm text-muted-foreground">Заявка на участие в программе</p>
              </div>
              <button onClick={() => setFormOpen(false)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
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
                  <select
                    className={`${field} appearance-none cursor-pointer ${!form.spec ? 'text-muted-foreground' : ''}`}
                    value={form.spec}
                    onChange={e => setForm({ ...form, spec: e.target.value })}
                  >
                    <option value="">Специализация</option>
                    {['Колорист', 'Трихолог', 'Бровист / Лешмейкер', 'Косметолог', 'Парикмахер'].map(s => (
                      <option key={s} value={s} className="text-foreground">{s}</option>
                    ))}
                  </select>
                  <div className="space-y-3 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, personal: !f.personal }))}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.personal ? 'bg-primary border-primary' : 'border-border'}`}>
                        {form.personal && <Icon name="Check" size={12} className="text-primary-foreground" />}
                      </div>
                      <span className="text-sm text-muted-foreground">Согласен(на) на обработку персональных данных</span>
                    </label>
                    {errors.personal && <p className="text-destructive text-xs">{errors.personal}</p>}
                    <label className="flex items-start gap-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, news: !f.news }))}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.news ? 'bg-primary border-primary' : 'border-border'}`}>
                        {form.news && <Icon name="Check" size={12} className="text-primary-foreground" />}
                      </div>
                      <span className="text-sm text-muted-foreground">Согласен(на) на получение новостей и рассылки</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-5">
                    <Icon name="Trophy" size={36} className="text-primary" />
                  </div>
                  <h4 className="text-2xl font-display font-semibold mb-2">Заявка принята!</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Мы свяжемся с вами в течение 24 часов и расскажем о следующих шагах. Добро пожаловать в программу!
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-border">
              {!done ? (
                <button
                  onClick={() => { if (validate()) setDone(true); }}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  Отправить заявку
                </button>
              ) : (
                <button onClick={() => { setFormOpen(false); setDone(false); }} className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full">
                  Закрыть
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChampionSection;
