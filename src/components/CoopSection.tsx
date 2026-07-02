import { useState } from 'react';
import Icon from '@/components/ui/icon';

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const getDays = () => {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const docs = [
  { icon: '📄', title: 'Политика конфиденциальности', desc: 'Обработка и хранение персональных данных' },
  { icon: '📋', title: 'Договор оферты', desc: 'Условия оказания услуг и продажи продукции' },
  { icon: '🔬', title: 'Сертификаты качества', desc: 'Международные сертификаты продукции InValuable' },
  { icon: '📜', title: 'Партнёрское соглашение', desc: 'Условия партнёрства и программы чемпионов' },
];

type Step = 'calendar' | 'form' | 'done';

const CoopSection = () => {
  // Coop form
  const [coopForm, setCoopForm] = useState({ name: '', phone: '', email: '', personal: false, news: false });
  const [coopErrors, setCoopErrors] = useState<Record<string, string>>({});
  const [coopDone, setCoopDone] = useState(false);

  // Consult booking
  const [consultStep, setConsultStep] = useState<Step>('calendar');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', email: '', personal: false, news: false });
  const [consultErrors, setConsultErrors] = useState<Record<string, string>>({});
  const [consultDone, setConsultDone] = useState(false);

  const days = getDays();
  const field = 'w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary transition-colors text-sm';

  const validateCoop = () => {
    const e: Record<string, string> = {};
    if (coopForm.name.trim().length < 2) e.name = 'Введите ФИО';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(coopForm.email)) e.email = 'Некорректный email';
    if (!/^[+]?[\d\s()-]{10,}$/.test(coopForm.phone)) e.phone = 'Некорректный телефон';
    if (!coopForm.personal) e.personal = 'Необходимо согласие';
    setCoopErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateConsult = () => {
    const e: Record<string, string> = {};
    if (consultForm.name.trim().length < 2) e.name = 'Введите ФИО';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultForm.email)) e.email = 'Некорректный email';
    if (!/^[+]?[\d\s()-]{10,}$/.test(consultForm.phone)) e.phone = 'Некорректный телефон';
    if (!consultForm.personal) e.personal = 'Необходимо согласие';
    setConsultErrors(e);
    return Object.keys(e).length === 0;
  };

  const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <label className="flex items-start gap-3 cursor-pointer" onClick={onChange}>
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked ? 'bg-primary border-primary' : 'border-border'}`}>
        {checked && <Icon name="Check" size={12} className="text-primary-foreground" />}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  );

  return (
    <>
      {/* COOPERATION */}
      <section id="cooperation" className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <div className="reveal">
              <p className="text-primary font-semibold mb-3 tracking-wide">СОТРУДНИЧЕСТВО</p>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-6 leading-tight">
                Стать партнёром бренда
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Присоединяйтесь к сети партнёров InValuable. Мы ищем салоны, дистрибьюторов и профессионалов, которые хотят расти вместе с нами.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Store', title: 'Салоны красоты', desc: 'Официальные поставки продукции и поддержка команды' },
                  { icon: 'Package', title: 'Дистрибьюторы', desc: 'Выгодные условия оптовых закупок и логистика' },
                  { icon: 'Users', title: 'Амбассадоры', desc: 'Программа представителей бренда с комиссионными' },
                ].map((item, i) => (
                  <div key={item.title} className="reveal flex items-start gap-4" data-delay={`${i * 0.08}s`}>
                    <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal" data-delay="0.1s">
              <div className="glass soft-shadow rounded-[2rem] p-6 sm:p-8">
                {!coopDone ? (
                  <>
                    <h3 className="text-2xl font-display font-semibold mb-6">Оставить заявку</h3>
                    <div className="space-y-4">
                      <div>
                        <input className={field} placeholder="ФИО" value={coopForm.name} onChange={e => setCoopForm({ ...coopForm, name: e.target.value })} />
                        {coopErrors.name && <p className="text-destructive text-xs mt-1">{coopErrors.name}</p>}
                      </div>
                      <div>
                        <input className={field} placeholder="Телефон" value={coopForm.phone} onChange={e => setCoopForm({ ...coopForm, phone: e.target.value })} />
                        {coopErrors.phone && <p className="text-destructive text-xs mt-1">{coopErrors.phone}</p>}
                      </div>
                      <div>
                        <input className={field} placeholder="Email" value={coopForm.email} onChange={e => setCoopForm({ ...coopForm, email: e.target.value })} />
                        {coopErrors.email && <p className="text-destructive text-xs mt-1">{coopErrors.email}</p>}
                      </div>
                      <div className="space-y-3 pt-1">
                        <Checkbox
                          checked={coopForm.personal}
                          onChange={() => setCoopForm(f => ({ ...f, personal: !f.personal }))}
                          label="Согласен(на) на обработку персональных данных"
                        />
                        {coopErrors.personal && <p className="text-destructive text-xs">{coopErrors.personal}</p>}
                        <Checkbox
                          checked={coopForm.news}
                          onChange={() => setCoopForm(f => ({ ...f, news: !f.news }))}
                          label="Согласен(на) на получение новостей и предложений"
                        />
                      </div>
                      <button
                        onClick={() => { if (validateCoop()) setCoopDone(true); }}
                        className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity mt-2"
                      >
                        Отправить заявку
                      </button>
                      <p className="text-center text-xs text-muted-foreground">Мы свяжемся с вами в течение 24 часов</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                      <Icon name="Check" size={30} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-display font-semibold mb-2">Заявка принята!</h4>
                    <p className="text-muted-foreground text-sm">Наш менеджер свяжется с вами в ближайшее время.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTATION */}
      <section id="docs" className="py-16 relative dots-bg">
        <div className="container mx-auto px-5">
          <div className="text-center mb-10 reveal">
            <p className="text-primary font-semibold mb-3 tracking-wide">ДОКУМЕНТАЦИЯ</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold">Правовые документы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {docs.map((d, i) => (
              <div
                key={d.title}
                className="reveal glass soft-shadow rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform cursor-pointer group"
                data-delay={`${i * 0.07}s`}
              >
                <div className="text-3xl">{d.icon}</div>
                <div>
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">{d.title}</p>
                  <p className="text-muted-foreground text-xs mt-1">{d.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-medium mt-auto">
                  Читать <Icon name="ArrowRight" size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFLINE CONSULTATION */}
      <section id="consult" className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary blob rounded-full opacity-20" />
        <div className="container mx-auto px-5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div className="reveal">
              <p className="text-primary font-semibold mb-3 tracking-wide">КОНСУЛЬТАЦИЯ</p>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-6 leading-tight">
                Запись на офлайн‑консультацию
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Персональная встреча со специалистом InValuable. Разберём ваш запрос, подберём продукты и составим план ухода.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Clock', text: 'Длительность — 60 минут' },
                  { icon: 'MapPin', text: 'Москва, ул. Космонавтов, 42' },
                  { icon: 'Sparkles', text: 'Персональный разбор и подбор продуктов' },
                  { icon: 'Gift', text: 'Мини-набор InValuable в подарок' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Icon name={icon} size={17} className="text-primary" />
                    </span>
                    <span className="text-foreground/90">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking widget */}
            <div className="reveal glass soft-shadow rounded-[2rem] p-6 sm:p-8" data-delay="0.1s">
              {consultStep === 'calendar' && (
                <>
                  <h3 className="text-xl font-display font-semibold mb-5">Выберите дату и время</h3>
                  <div className="grid grid-cols-7 gap-1.5 mb-6">
                    {days.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDay(d)}
                        className={`flex flex-col items-center py-2 rounded-xl text-xs transition-all ${selectedDay?.toDateString() === d.toDateString() ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'}`}
                      >
                        <span className="opacity-60">{weekDays[d.getDay()]}</span>
                        <span className="font-bold">{d.getDate()}</span>
                        <span className="opacity-60">{months[d.getMonth()]}</span>
                      </button>
                    ))}
                  </div>
                  {selectedDay && (
                    <div className="animate-fade-up">
                      <p className="font-semibold text-sm mb-3">Время</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {TIMES.map(t => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTime === t ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    disabled={!selectedDay || !selectedTime}
                    onClick={() => setConsultStep('form')}
                    className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    {selectedDay && selectedTime ? 'Продолжить' : 'Выберите дату и время'}
                  </button>
                </>
              )}

              {consultStep === 'form' && (
                <>
                  <div className="flex items-center gap-2 mb-5">
                    <button onClick={() => setConsultStep('calendar')} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Icon name="ArrowLeft" size={16} />
                    </button>
                    <div className="bg-accent rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={14} className="text-primary" />
                      <span className="text-accent-foreground font-medium">
                        {selectedDay && `${selectedDay.getDate()} ${months[selectedDay.getMonth()]}, ${weekDays[selectedDay.getDay()]}`} · {selectedTime}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <input className={field} placeholder="ФИО" value={consultForm.name} onChange={e => setConsultForm({ ...consultForm, name: e.target.value })} />
                      {consultErrors.name && <p className="text-destructive text-xs mt-1">{consultErrors.name}</p>}
                    </div>
                    <div>
                      <input className={field} placeholder="Телефон" value={consultForm.phone} onChange={e => setConsultForm({ ...consultForm, phone: e.target.value })} />
                      {consultErrors.phone && <p className="text-destructive text-xs mt-1">{consultErrors.phone}</p>}
                    </div>
                    <div>
                      <input className={field} placeholder="Email" value={consultForm.email} onChange={e => setConsultForm({ ...consultForm, email: e.target.value })} />
                      {consultErrors.email && <p className="text-destructive text-xs mt-1">{consultErrors.email}</p>}
                    </div>
                    <div className="space-y-3">
                      <Checkbox
                        checked={consultForm.personal}
                        onChange={() => setConsultForm(f => ({ ...f, personal: !f.personal }))}
                        label="Согласен(на) на обработку персональных данных"
                      />
                      {consultErrors.personal && <p className="text-destructive text-xs">{consultErrors.personal}</p>}
                      <Checkbox
                        checked={consultForm.news}
                        onChange={() => setConsultForm(f => ({ ...f, news: !f.news }))}
                        label="Согласен(на) на получение новостей и рассылки"
                      />
                    </div>
                    <button
                      onClick={() => { if (validateConsult()) setConsultStep('done'); }}
                      className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
                    >
                      Записаться
                    </button>
                  </div>
                </>
              )}

              {consultStep === 'done' && (
                <div className="flex flex-col items-center text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-5">
                    <Icon name="CalendarCheck" size={36} className="text-primary" />
                  </div>
                  <h4 className="text-2xl font-display font-semibold mb-2">Запись подтверждена!</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    {selectedDay && `${selectedDay.getDate()} ${months[selectedDay.getMonth()]}, ${weekDays[selectedDay.getDay()]}`} в {selectedTime}
                  </p>
                  <p className="text-muted-foreground text-sm">Детали придут на ваш email. Ждём вас!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Inline checkbox helper used inside CoopSection
const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <label className="flex items-start gap-3 cursor-pointer" onClick={onChange}>
    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked ? 'bg-primary border-primary' : 'border-border'}`}>
      {checked && <Icon name="Check" size={12} className="text-primary-foreground" />}
    </div>
    <span className="text-sm text-muted-foreground">{label}</span>
  </label>
);

export default CoopSection;
