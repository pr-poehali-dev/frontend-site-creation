import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import IconAsset, { IconAssetName } from '@/components/ui/icon-asset';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/courses';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { accountApi, UserCourse, Order, Membership } from '@/lib/accountApi';

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

const membershipLabels: Record<string, string> = {
  basic: 'Базовый',
  premium: 'Премиум',
  elite: 'Элитный',
};

const tierPrices: Record<string, number> = {
  basic: 0,
  premium: 1490,
  elite: 3990,
};

const statusColor: Record<string, string> = {
  completed: 'text-green-600 bg-green-50',
  in_progress: 'text-primary bg-accent',
};

const Account = () => {
  const [tab, setTab] = useState<TabId>('overview');
  const { lists } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const totalSaved = lists.reduce((s, l) => s + l.items.length, 0);

  const [myCourses, setMyCourses] = useState<UserCourse[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    const [coursesRes, ordersRes, membershipRes] = await Promise.all([
      accountApi.getCourses(),
      accountApi.getOrders(),
      accountApi.getMembership(),
    ]);
    setMyCourses(coursesRes?.courses || []);
    setOrders(ordersRes?.orders || []);
    setMembership(membershipRes?.membership || null);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubscribe = async (tier: 'premium' | 'elite') => {
    const res = await accountApi.subscribe(tier, tierPrices[tier]);
    if (res?.membership) setMembership(res.membership);
  };

  const handleCancelMembership = async () => {
    const res = await accountApi.cancelMembership();
    if (res?.membership) setMembership(res.membership);
  };

  const courseInfo = (courseId: string) => courses.find(c => c.id === courseId);
  const completedCount = myCourses.filter(c => c.status === 'completed').length;
  const activeTier = membership?.active ? membership.tier : 'basic';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="HairMasterHub" className="h-9 w-auto object-contain rounded-full" />
            <span className="hidden sm:block font-display font-semibold text-lg">HairMasterHub</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Icon name="ArrowLeft" size={16} /> На главную
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <Icon name="LogOut" size={16} /> Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-5 py-8 sm:py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <div className="glass soft-shadow rounded-[1.75rem] p-6 mb-5 text-center">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl font-display font-semibold text-primary mx-auto mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <p className="font-display font-semibold text-lg">{user.name}</p>
              <p className="text-muted-foreground text-sm">{user.role}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Icon name="Crown" size={13} /> {membershipLabels[activeTier] || 'Базовый'} клуб
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
            {loadingData ? (
              <div className="flex items-center justify-center py-24">
                <Icon name="Loader2" size={28} className="animate-spin text-primary" />
              </div>
            ) : (
              <>
                {tab === 'overview' && (
                  <div className="space-y-6 animate-fade-in">
                    <h1 className="text-3xl font-display font-semibold">Добро пожаловать, {user.name.split(' ')[0]}!</h1>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { icon: 'graduationCap' as const, label: 'Курсов завершено', value: completedCount },
                        { icon: 'award' as const, label: 'Сертификатов', value: myCourses.filter(c => c.certId).length },
                        { icon: 'heart' as const, label: 'В избранном', value: totalSaved },
                      ].map(s => (
                        <div key={s.label} className="bg-secondary/50 rounded-2xl p-5">
                          <IconAsset name={s.icon} size={40} className="mb-3" />
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
                      {myCourses.filter(c => c.status === 'in_progress').length === 0 ? (
                        <p className="text-muted-foreground text-sm py-4">
                          Пока нет курсов в процессе — запишитесь на курс в разделе «Обучение» на главной.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {myCourses.filter(c => c.status === 'in_progress').map(uc => {
                            const info = courseInfo(uc.courseId);
                            if (!info) return null;
                            return (
                              <div key={uc.courseId} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-xl shrink-0">🎓</div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm truncate">{info.title}</p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <Progress value={uc.progress} className="h-1.5 flex-1" />
                                    <span className="text-xs text-muted-foreground shrink-0">{uc.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {membership?.active && membership.tier !== 'basic' && (
                      <div className="bg-gradient-to-br from-primary/8 to-accent rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <Icon name="Crown" size={20} className="text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">{membershipLabels[membership.tier]}-подписка активна</p>
                            <p className="text-muted-foreground text-sm">
                              {membership.renewsAt ? `Продление ${new Date(membership.renewsAt).toLocaleDateString('ru-RU')}` : ''}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setTab('club')} className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                          Управлять
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {tab === 'courses' && (
                  <div className="animate-fade-in">
                    <h1 className="text-3xl font-display font-semibold mb-6">Мои курсы</h1>
                    {myCourses.length === 0 ? (
                      <div className="text-center py-16 text-muted-foreground bg-secondary/30 rounded-2xl">
                        <div className="text-5xl mb-4">🎓</div>
                        <p className="font-semibold mb-1">Пока нет курсов</p>
                        <p className="text-sm">Запишитесь на курс в разделе «Обучение» на главной странице</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {myCourses.map(uc => {
                          const info = courseInfo(uc.courseId);
                          if (!info) return null;
                          return (
                            <div key={uc.courseId} className="bg-secondary/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">🎓</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-semibold">{info.title}</p>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColor[uc.status]}`}>
                                    {uc.status === 'completed' ? 'Завершён' : 'В процессе'}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-xs mt-1">{info.duration} · {info.level}</p>
                                <div className="flex items-center gap-2 mt-2 max-w-xs">
                                  <Progress value={uc.progress} className="h-1.5 flex-1" />
                                  <span className="text-xs text-muted-foreground shrink-0">{uc.progress}%</span>
                                </div>
                              </div>
                              {uc.status === 'completed' ? (
                                <button title={uc.certId || undefined} className="shrink-0 flex items-center gap-2 bg-white border border-border text-sm font-medium px-4 py-2.5 rounded-full hover:bg-secondary transition-colors">
                                  <Icon name="Download" size={15} className="text-primary" /> Сертификат
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {
                                    const next = Math.min(100, uc.progress + 25);
                                    const res = await accountApi.updateProgress(uc.courseId, next);
                                    if (res?.course) {
                                      setMyCourses(prev => prev.map(c => c.courseId === uc.courseId ? res.course : c));
                                    }
                                  }}
                                  className="shrink-0 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                                >
                                  Продолжить
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {tab === 'club' && (
                  <div className="animate-fade-in space-y-6">
                    <h1 className="text-3xl font-display font-semibold">Клуб</h1>

                    <div className="bg-primary text-primary-foreground rounded-[1.75rem] p-7 relative overflow-hidden">
                      <IconAsset name="crown" size={90} className="absolute -right-3 -top-3 opacity-20" />
                      <span className="text-xs font-bold bg-gold text-gold-foreground px-3 py-1 rounded-full">
                        {membershipLabels[activeTier] || 'Базовый'}
                      </span>
                      <p className="text-2xl font-display font-semibold mt-3">
                        {activeTier === 'basic' ? 'Бесплатно' : `${tierPrices[activeTier].toLocaleString()} ₽ / месяц`}
                      </p>
                      <p className="text-primary-foreground/80 text-sm mt-1">
                        {membership?.active && membership.renewsAt
                          ? `Следующее списание: ${new Date(membership.renewsAt).toLocaleDateString('ru-RU')}`
                          : 'Присоединяйтесь к платному уровню, чтобы получить больше привилегий'}
                      </p>
                      <div className="flex gap-3 mt-5 flex-wrap">
                        {activeTier !== 'elite' && (
                          <button
                            onClick={() => handleSubscribe(activeTier === 'basic' ? 'premium' : 'elite')}
                            className="bg-white text-primary text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                          >
                            {activeTier === 'basic' ? 'Оформить Премиум' : 'Улучшить до Элитный'}
                          </button>
                        )}
                        {activeTier !== 'basic' && (
                          <button
                            onClick={handleCancelMembership}
                            className="border border-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
                          >
                            Отменить подписку
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-xl mb-4">Ваши привилегии</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {([
                          { icon: 'live', text: 'LIVE-мастер-классы 2 раза в месяц' },
                          { icon: 'percent', text: 'Скидка 15% в магазине' },
                          { icon: 'playCircle', text: 'Записи всех прошедших эфиров' },
                          { icon: 'headphones', text: 'Приоритетная поддержка' },
                        ] as { icon: IconAssetName; text: string }[]).map(p => (
                          <div key={p.text} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                            <IconAsset name={p.icon} size={28} className="shrink-0" />
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
                    {orders.length === 0 ? (
                      <div className="text-center py-16 text-muted-foreground bg-secondary/30 rounded-2xl">
                        <IconAsset name="shoppingBag" size={56} className="mx-auto mb-4" />
                        <p className="font-semibold mb-1">Пока нет покупок</p>
                        <p className="text-sm">Оформите заказ в магазине на главной странице</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {orders.map(o => (
                          <div key={o.id} className="bg-secondary/50 rounded-2xl p-5 flex items-center gap-4 flex-wrap">
                            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                              <Icon name="Package" size={19} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-[140px]">
                              <p className="font-semibold text-sm">Заказ №{o.id}</p>
                              <p className="text-muted-foreground text-xs mt-0.5">
                                {o.createdAt ? new Date(o.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : ''} · {o.itemsCount} товара
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">{o.status}</span>
                            <span className="font-display font-semibold">{o.total.toLocaleString()} ₽</span>
                          </div>
                        ))}
                      </div>
                    )}
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
                    <p className="text-muted-foreground text-sm">
                      В клубе с {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }) : '—'}
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;