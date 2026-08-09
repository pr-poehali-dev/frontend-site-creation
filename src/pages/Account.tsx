import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/courses';
import { useWishlist } from '@/context/WishlistContext';

const LOGO = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/bucket/bda9d1c0-809d-4fdc-a42f-edc41be5225c.png';

type TabId = 'overview' | 'courses' | 'club' | 'orders' | 'saved' | 'settings';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
  { id: 'courses', label: 'Мои курсы', icon: 'GraduationCap' },
  { id: 'club', label: 'Клуб', icon: 'Users' },
  { id: 'orders', label: 'Покупки', icon: 'ShoppingBag' },
  { id: 'saved', label: 'Сохранённое', icon: 'Heart' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

const user = {
  name: 'Екатерина Морозова',
  email: 'ekaterina.morozova@mail.ru',
  role: 'Стилист-колорист',
  memberSince: 'март 2024',
  avatar: '👩‍🦰',
};

const myCourses = [
  { course: courses[1], progress: 100, status: 'completed' as const, certId: 'HMH-2024-0231' },
  { course: courses[5], progress: 62, status: 'in_progress' as const },
  { course: courses[0], progress: 100, status: 'completed' as const, certId: 'HMH-2024-0198' },
  { course: courses[3], progress: 15, status: 'in_progress' as const },
];

const orders = [
  { id: '48213', date: '28 июля 2026', items: 3, total: 6970, status: 'Доставлен' },
  { id: '47950', date: '12 июля 2026', items: 1, total: 2890, status: 'Доставлен' },
  { id: '46810', date: '02 июня 2026', items: 5, total: 12400, status: 'Доставлен' },
];

const statusColor: Record<string, string> = {
  completed: 'text-green-600 bg-green-50',
  in_progress: 'text-primary bg-accent',
};

const Account = () => {
  const [tab, setTab] = useState<TabId>('overview');
  const { lists } = useWishlist();
  const totalSaved = lists.reduce((s, l) => s + l.items.length, 0);
  const completedCount = myCourses.filter(c => c.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="HairMasterHub" className="h-9 w-auto object-contain rounded-full" />
            <span className="hidden sm:block font-display font-semibold text-lg">HairMasterHub</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Icon name="ArrowLeft" size={16} /> На главную
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-5 py-8 sm:py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <div className="glass soft-shadow rounded-[1.75rem] p-6 mb-5 text-center">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-4xl mx-auto mb-4">
                {user.avatar}
              </div>
              <p className="font-display font-semibold text-lg">{user.name}</p>
              <p className="text-muted-foreground text-sm">{user.role}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Icon name="Crown" size={13} /> Премиум клуб
              </div>
            </div>

            <nav className="glass soft-shadow rounded-[1.75rem] p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors shrink-0 lg:w-full text-left ${
                    tab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon name={t.icon} size={17} />
                  {t.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main>
            {tab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-3xl font-display font-semibold">Добро пожаловать, {user.name.split(' ')[0]}!</h1>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: 'GraduationCap', label: 'Курсов завершено', value: completedCount, color: 'bg-primary' },
                    { icon: 'Award', label: 'Сертификатов', value: myCourses.filter(c => c.certId).length, color: 'bg-gold' },
                    { icon: 'Heart', label: 'В избранном', value: totalSaved, color: 'bg-primary' },
                  ].map(s => (
                    <div key={s.label} className="bg-secondary/50 rounded-2xl p-5">
                      <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                        <Icon name={s.icon} size={18} className="text-white" />
                      </div>
                      <p className="text-2xl font-display font-semibold">{s.value}</p>
                      <p className="text-muted-foreground text-sm">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-xl">Продолжить обучение</h3>
                    <button onClick={() => setTab('courses')} className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Все курсы <Icon name="ChevronRight" size={15} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {myCourses.filter(c => c.status === 'in_progress').map(({ course, progress }) => (
                      <div key={course.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-xl shrink-0">🎓</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{course.title}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Progress value={progress} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0">{progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/8 to-accent rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <Icon name="Crown" size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Премиум-подписка активна</p>
                      <p className="text-muted-foreground text-sm">Продление 14 сентября 2026</p>
                    </div>
                  </div>
                  <button onClick={() => setTab('club')} className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                    Управлять
                  </button>
                </div>
              </div>
            )}

            {tab === 'courses' && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-display font-semibold mb-6">Мои курсы</h1>
                <div className="space-y-4">
                  {myCourses.map(({ course, progress, status, certId }) => (
                    <div key={course.id} className="bg-secondary/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">🎓</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{course.title}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColor[status]}`}>
                            {status === 'completed' ? 'Завершён' : 'В процессе'}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-1">{course.duration} · {course.level}</p>
                        <div className="flex items-center gap-2 mt-2 max-w-xs">
                          <Progress value={progress} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground shrink-0">{progress}%</span>
                        </div>
                      </div>
                      {status === 'completed' ? (
                        <button title={certId} className="shrink-0 flex items-center gap-2 bg-white border border-border text-sm font-medium px-4 py-2.5 rounded-full hover:bg-secondary transition-colors">
                          <Icon name="Download" size={15} className="text-primary" /> Сертификат
                        </button>
                      ) : (
                        <button className="shrink-0 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                          Продолжить
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'club' && (
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-display font-semibold">Клуб</h1>

                <div className="bg-primary text-primary-foreground rounded-[1.75rem] p-7 relative overflow-hidden">
                  <Icon name="Crown" size={80} className="absolute -right-4 -top-4 opacity-10" />
                  <span className="text-xs font-bold bg-gold text-gold-foreground px-3 py-1 rounded-full">Премиум</span>
                  <p className="text-2xl font-display font-semibold mt-3">1 490 ₽ / месяц</p>
                  <p className="text-primary-foreground/80 text-sm mt-1">Следующее списание: 14 сентября 2026</p>
                  <div className="flex gap-3 mt-5">
                    <button className="bg-white text-primary text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                      Улучшить до Элитный
                    </button>
                    <button className="border border-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                      Отменить подписку
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-xl mb-4">Ваши привилегии</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: 'Video', text: 'LIVE-мастер-классы 2 раза в месяц' },
                      { icon: 'Percent', text: 'Скидка 15% в магазине' },
                      { icon: 'PlayCircle', text: 'Записи всех прошедших эфиров' },
                      { icon: 'Headphones', text: 'Приоритетная поддержка' },
                    ].map(p => (
                      <div key={p.text} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                        <Icon name={p.icon} size={18} className="text-primary shrink-0" />
                        <span className="text-sm">{p.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-display font-semibold mb-6">История покупок</h1>
                <div className="space-y-3">
                  {orders.map(o => (
                    <div key={o.id} className="bg-secondary/50 rounded-2xl p-5 flex items-center gap-4 flex-wrap">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                        <Icon name="Package" size={19} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-[140px]">
                        <p className="font-semibold text-sm">Заказ №{o.id}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{o.date} · {o.items} товара</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">{o.status}</span>
                      <span className="font-display font-semibold">{o.total.toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'saved' && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-display font-semibold mb-6">Сохранённое</h1>
                {totalSaved === 0 ? (
                  <div className="text-center py-16 text-muted-foreground bg-secondary/30 rounded-2xl">
                    <div className="text-5xl mb-4">🌸</div>
                    <p className="font-semibold mb-1">Пока пусто</p>
                    <p className="text-sm">Добавляйте товары в вишлист кнопкой ♡ в магазине</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {lists.filter(l => l.items.length > 0).map(l => (
                      <div key={l.id}>
                        <p className="font-semibold mb-3">{l.name} · {l.items.length}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {l.items.map(p => (
                            <div key={p.id} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3">
                              <span className="text-2xl">{p.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{p.name}</p>
                                <p className="text-primary text-sm font-semibold">{p.price.toLocaleString()} ₽</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'settings' && (
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-display font-semibold">Настройки профиля</h1>
                <div className="bg-secondary/50 rounded-2xl p-6 space-y-4 max-w-lg">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Имя</label>
                    <input defaultValue={user.name} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input defaultValue={user.email} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Специализация</label>
                    <input defaultValue={user.role} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                    Сохранить изменения
                  </button>
                </div>
                <p className="text-muted-foreground text-sm">В клубе с {user.memberSince}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;