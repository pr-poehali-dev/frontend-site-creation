import { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

const LOGO = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/bucket/bda9d1c0-809d-4fdc-a42f-edc41be5225c.png';

type Mode = 'login' | 'register';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const initialMode: Mode = location.pathname === '/register' ? 'register' : 'login';
  const [mode, setMode] = useState<Mode>(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const field = 'w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary transition-colors text-sm';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && form.name.trim().length < 2) {
      setError('Введите имя');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Некорректный email');
      return;
    }
    if (form.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);
    const result = mode === 'login'
      ? await login({ email: form.email, password: form.password })
      : await register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
    setLoading(false);

    if (!result.ok) {
      setError(result.error || 'Что-то пошло не так');
      return;
    }
    navigate('/account');
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 py-10 dots-bg">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <img src={LOGO} alt="HairMasterHub" className="h-12 w-auto object-contain rounded-full" />
          <span className="font-display font-semibold text-xl">HairMasterHub</span>
        </Link>

        <div className="glass soft-shadow rounded-[2rem] p-7 sm:p-9">
          <div className="flex gap-1 bg-secondary/60 rounded-2xl p-1 mb-7">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${mode === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              Вход
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${mode === 'register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              Регистрация
            </button>
          </div>

          <h1 className="text-2xl font-display font-semibold mb-1">
            {mode === 'login' ? 'С возвращением!' : 'Добро пожаловать'}
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === 'login' ? 'Войдите в личный кабинет мастера' : 'Создайте аккаунт и присоединяйтесь к сообществу'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <input
                className={field}
                placeholder="ФИО"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            )}
            <input
              className={field}
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {mode === 'register' && (
              <input
                className={field}
                placeholder="Телефон (необязательно)"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            )}
            <input
              className={field}
              placeholder="Пароль"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            {error && (
              <p className="text-destructive text-sm flex items-center gap-1.5">
                <Icon name="AlertCircle" size={14} /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                  <Icon name="ArrowRight" size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <Link to="/" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-6">
          <Icon name="ArrowLeft" size={15} /> На главную
        </Link>
      </div>
    </div>
  );
};

export default Login;
