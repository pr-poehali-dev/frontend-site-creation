import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
}

const services = ['Веб-разработка', 'Брендинг', 'Маркетинг', 'Мобильное приложение'];

const OrderForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Введите имя (минимум 2 символа)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Введите корректный email';
    if (!/^[+]?[\d\s()-]{10,}$/.test(form.phone)) e.phone = 'Введите корректный телефон';
    if (!form.service) e.service = 'Выберите услугу';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSent(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }
  };

  const field =
    'w-full bg-secondary/60 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30';

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-10 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <input
            className={field}
            placeholder="Ваше имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-accent text-sm mt-1.5 pl-1">{errors.name}</p>}
        </div>
        <div>
          <input
            className={field}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-accent text-sm mt-1.5 pl-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <input
            className={field}
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <p className="text-accent text-sm mt-1.5 pl-1">{errors.phone}</p>}
        </div>
        <div>
          <select
            className={`${field} appearance-none cursor-pointer ${!form.service && 'text-muted-foreground/60'}`}
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Выберите услугу</option>
            {services.map((s) => (
              <option key={s} value={s} className="text-foreground bg-card">
                {s}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-accent text-sm mt-1.5 pl-1">{errors.service}</p>}
        </div>
      </div>

      <textarea
        className={`${field} resize-none`}
        rows={4}
        placeholder="Расскажите о вашем проекте"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button
        type="submit"
        className="group w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
      >
        {sent ? (
          <>
            <Icon name="Check" size={20} /> Заявка отправлена!
          </>
        ) : (
          <>
            Отправить заявку
            <Icon
              name="ArrowRight"
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
      </button>
      <p className="text-center text-muted-foreground text-xs">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
};

export default OrderForm;
