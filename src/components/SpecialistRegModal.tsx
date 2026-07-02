import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  open: boolean;
  onClose: () => void;
  categoryLabel?: string;
}

const SpecialistRegModal = ({ open, onClose, categoryLabel = 'специалиста' }: Props) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', diplomaName: '', personal: false, news: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Введите ФИО';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email';
    if (!/^[+]?[\d\s()-]{10,}$/.test(form.phone)) e.phone = 'Некорректный телефон';
    if (!form.diplomaName.trim()) e.diplomaName = 'Укажите номер или название документа';
    if (!form.personal) e.personal = 'Необходимо ваше согласие';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setDone(false);
      setForm({ name: '', phone: '', email: '', diplomaName: '', personal: false, news: false });
      setErrors({});
    }, 300);
  };

  const field = 'w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary transition-colors text-sm';

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-background w-full sm:max-w-md max-h-[92svh] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col animate-scale-in shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-2xl font-display font-semibold">Регистрация</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Вход для специалистов: {categoryLabel}</p>
          </div>
          <button onClick={handleClose} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
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
              <div>
                <div className={`${field} flex items-center gap-3 cursor-pointer`}>
                  <Icon name="FileText" size={18} className="text-muted-foreground shrink-0" />
                  <input
                    className="flex-1 bg-transparent outline-none text-sm"
                    placeholder="Диплом / номер документа"
                    value={form.diplomaName}
                    onChange={e => setForm({ ...form, diplomaName: e.target.value })}
                  />
                </div>
                {errors.diplomaName && <p className="text-destructive text-xs mt-1">{errors.diplomaName}</p>}
              </div>

              <div className="space-y-3 pt-2">
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
                  <span className="text-sm text-muted-foreground">Согласен(на) на получение новостей и предложений</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-5">
                <Icon name="UserCheck" size={36} className="text-primary" />
              </div>
              <h4 className="text-2xl font-display font-semibold mb-2">Заявка отправлена!</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Мы проверим ваши данные и откроем доступ к материалам для специалистов. Ответим на {form.email}
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
              Зарегистрироваться
            </button>
          ) : (
            <button onClick={handleClose} className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full">
              Готово
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialistRegModal;
