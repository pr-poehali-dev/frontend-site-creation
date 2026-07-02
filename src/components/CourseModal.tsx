import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Course } from '@/data/courses';

interface Props {
  course: Course | null;
  onClose: () => void;
}

const TIMES = ['10:00', '12:00', '14:00', '16:00', '18:00'];

const getDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

type BookStep = 'info' | 'calendar' | 'form' | 'done';

const CourseModal = ({ course, onClose }: Props) => {
  const [tab, setTab] = useState<'desc' | 'program' | 'trainer'>('desc');
  const [bookStep, setBookStep] = useState<BookStep>('info');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', news: false, personal: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const days = getDays();

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Введите имя';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email';
    if (!/^[+]?[\d\s()-]{10,}$/.test(form.phone)) e.phone = 'Некорректный телефон';
    if (!form.personal) e.personal = 'Необходимо согласие';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setTab('desc');
      setBookStep('info');
      setSelectedDay(null);
      setSelectedTime(null);
      setForm({ name: '', phone: '', email: '', news: false, personal: false });
      setErrors({});
    }, 300);
  };

  if (!course) return null;

  const field = 'w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary transition-colors text-sm';

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-background w-full sm:max-w-2xl max-h-[92svh] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col animate-scale-in shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="pr-4">
            <span className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full font-medium">
              {course.level}
            </span>
            <h3 className="text-2xl font-display font-semibold mt-2 leading-snug">{course.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Icon name="Clock" size={14} />{course.duration}</span>
              <span className="font-semibold text-primary text-base">{course.price.toLocaleString()} ₽</span>
            </div>
          </div>
          <button onClick={handleClose} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {bookStep === 'info' && (
            <div>
              {/* Tabs */}
              <div className="flex gap-1 p-4 border-b border-border">
                {(['desc', 'program', 'trainer'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 text-sm rounded-xl font-medium transition-colors ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {t === 'desc' ? 'Описание' : t === 'program' ? 'Программа' : 'Тренер'}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {tab === 'desc' && (
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{course.desc}</p>
                )}
                {tab === 'program' && (
                  <ul className="space-y-3">
                    {course.program.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-[15px] text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === 'trainer' && (
                  <div className="flex gap-5 items-start">
                    <img src={course.trainer.photo} alt={course.trainer.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                    <div>
                      <p className="font-semibold text-lg font-display">{course.trainer.name}</p>
                      <p className="text-primary text-sm mb-2">{course.trainer.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{course.trainer.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {bookStep === 'calendar' && (
            <div className="p-6 space-y-6">
              <div>
                <p className="font-semibold mb-3">Выберите дату</p>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(d)}
                      className={`flex flex-col items-center py-2.5 rounded-2xl text-xs transition-all ${
                        selectedDay?.toDateString() === d.toDateString()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">{weekDays[d.getDay()]}</span>
                      <span className="font-semibold">{d.getDate()}</span>
                      <span className="text-[10px] opacity-70">{months[d.getMonth()]}</span>
                    </button>
                  ))}
                </div>
              </div>
              {selectedDay && (
                <div>
                  <p className="font-semibold mb-3">Выберите время</p>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                          selectedTime === t ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {bookStep === 'form' && (
            <div className="p-6 space-y-4">
              <div className="bg-accent rounded-2xl p-4 text-sm flex items-center gap-3">
                <Icon name="Calendar" size={18} className="text-primary shrink-0" />
                <span className="text-accent-foreground">
                  {selectedDay && `${selectedDay.getDate()} ${months[selectedDay.getMonth()]}, ${weekDays[selectedDay.getDay()]}`}
                  {selectedTime && ` · ${selectedTime}`}
                </span>
              </div>
              <input className={field} placeholder="ФИО" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-destructive text-xs -mt-2">{errors.name}</p>}
              <input className={field} placeholder="Телефон" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              {errors.phone && <p className="text-destructive text-xs -mt-2">{errors.phone}</p>}
              <input className={field} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-destructive text-xs -mt-2">{errors.email}</p>}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, personal: !form.personal })}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.personal ? 'bg-primary border-primary' : 'border-border'}`}
                >
                  {form.personal && <Icon name="Check" size={12} className="text-primary-foreground" />}
                </div>
                <span className="text-sm text-muted-foreground">Согласен(на) на обработку персональных данных</span>
              </label>
              {errors.personal && <p className="text-destructive text-xs">{errors.personal}</p>}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, news: !form.news })}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.news ? 'bg-primary border-primary' : 'border-border'}`}
                >
                  {form.news && <Icon name="Check" size={12} className="text-primary-foreground" />}
                </div>
                <span className="text-sm text-muted-foreground">Согласен(на) на получение новостей и рассылки</span>
              </label>
            </div>
          )}

          {bookStep === 'done' && (
            <div className="p-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-5">
                <Icon name="Check" size={36} className="text-primary" />
              </div>
              <h4 className="text-2xl font-display font-semibold mb-2">Запись подтверждена!</h4>
              <p className="text-muted-foreground mb-2">
                Курс: <strong>{course.title}</strong>
              </p>
              {selectedDay && selectedTime && (
                <p className="text-muted-foreground mb-6">
                  {selectedDay.getDate()} {months[selectedDay.getMonth()]} · {selectedTime}
                </p>
              )}
              <p className="text-sm text-muted-foreground mb-8">Детали будут отправлены на ваш email. До встречи!</p>
              <button onClick={handleClose} className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full">
                Отлично
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {bookStep !== 'done' && (
          <div className="p-5 border-t border-border">
            {bookStep === 'info' && (
              <button
                onClick={() => setBookStep('calendar')}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Записаться на курс — {course.price.toLocaleString()} ₽
              </button>
            )}
            {bookStep === 'calendar' && (
              <button
                disabled={!selectedDay || !selectedTime}
                onClick={() => setBookStep('form')}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {selectedDay && selectedTime ? `Продолжить` : 'Выберите дату и время'}
              </button>
            )}
            {bookStep === 'form' && (
              <button
                onClick={() => { if (validate()) setBookStep('done'); }}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Оплатить и записаться
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseModal;
