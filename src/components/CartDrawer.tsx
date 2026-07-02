import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

type Step = 'cart' | 'delivery' | 'payment' | 'done';

const DELIVERY_OPTIONS = [
  { id: 'courier', label: 'Курьер до двери', desc: '1–2 дня', price: 390, icon: '🚚' },
  { id: 'pickup', label: 'Самовывоз', desc: 'Москва, Космонавтов 42', price: 0, icon: '🏪' },
  { id: 'post', label: 'Почта России', desc: '3–7 дней', price: 250, icon: '📮' },
  { id: 'cdek', label: 'СДЭК', desc: '2–4 дня', price: 320, icon: '📦' },
];

const PROMO_CODES: Record<string, number> = {
  INVALUABLE10: 10,
  BEAUTY20: 20,
  WELCOME15: 15,
};

const CartDrawer = () => {
  const { items, open, setOpen, total, setQty, remove, clear } = useCart();

  const [step, setStep] = useState<Step>('cart');
  const [deliveryId, setDeliveryId] = useState('courier');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState<number | null>(null);
  const [promoError, setPromoError] = useState('');
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const delivery = DELIVERY_OPTIONS.find(d => d.id === deliveryId)!;
  const discount = promoApplied ? Math.round(total * promoApplied / 100) : 0;
  const grandTotal = total + delivery.price - discount;

  const applyPromo = () => {
    const val = PROMO_CODES[promo.toUpperCase()];
    if (val) {
      setPromoApplied(val);
      setPromoError('');
    } else {
      setPromoError('Промокод не найден');
      setPromoApplied(null);
    }
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setStep('cart');
      setPromo('');
      setPromoApplied(null);
      setPromoError('');
    }, 300);
  };

  const field = 'w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors';

  const stepLabel: Record<Step, string> = {
    cart: 'Корзина',
    delivery: 'Доставка',
    payment: 'Оплата',
    done: 'Заказ оформлен',
  };

  const stepNum: Record<Step, number> = { cart: 1, delivery: 2, payment: 3, done: 4 };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
      />

      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-xl font-display font-semibold">{stepLabel[step]}</h3>
            {step !== 'done' && (
              <div className="flex items-center gap-1 mt-1.5">
                {(['cart', 'delivery', 'payment'] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-1">
                    <div className={`h-1.5 w-8 rounded-full transition-colors ${stepNum[step] > i ? 'bg-primary' : 'bg-border'}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={close} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* ── STEP 1: CART ── */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <div className="text-5xl mb-4">🛍️</div>
                  <p className="font-semibold mb-1">Корзина пуста</p>
                  <p className="text-sm">Добавьте товары из каталога</p>
                </div>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex gap-3 bg-secondary/50 rounded-2xl p-3">
                    <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">
                      {i.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-snug">{i.name}</p>
                      <p className="text-primary font-semibold text-sm mt-0.5">{i.price.toLocaleString()} ₽</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5 bg-background rounded-full px-1.5 py-0.5">
                          <button onClick={() => setQty(i.id, i.qty - 1)} className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground">
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="text-sm w-5 text-center font-medium">{i.qty}</span>
                          <button onClick={() => setQty(i.id, i.qty + 1)} className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground">
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                        <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm font-semibold shrink-0 pt-1">
                      {(i.price * i.qty).toLocaleString()} ₽
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-border space-y-3">
                {/* Promo */}
                <div className="flex gap-2">
                  <input
                    className={`${field} flex-1`}
                    placeholder="Промокод"
                    value={promo}
                    onChange={e => { setPromo(e.target.value); setPromoError(''); }}
                  />
                  <button onClick={applyPromo} className="bg-secondary hover:bg-accent px-4 rounded-xl text-sm font-medium transition-colors">
                    Применить
                  </button>
                </div>
                {promoError && <p className="text-destructive text-xs">{promoError}</p>}
                {promoApplied && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 rounded-xl px-3 py-2">
                    <Icon name="Check" size={14} /> Промокод применён: скидка {promoApplied}%
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-1.5 text-sm pt-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Товары ({items.reduce((s, i) => s + i.qty, 0)} шт.)</span>
                    <span>{total.toLocaleString()} ₽</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка {promoApplied}%</span>
                      <span>−{discount.toLocaleString()} ₽</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-muted-foreground">Итого</span>
                  <span className="font-display font-semibold text-2xl">{(total - discount).toLocaleString()} ₽</span>
                </div>
                <button
                  onClick={() => setStep('delivery')}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP 2: DELIVERY ── */}
        {step === 'delivery' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <p className="text-sm font-semibold text-muted-foreground">Способ доставки</p>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setDeliveryId(opt.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${deliveryId === opt.id ? 'border-primary bg-accent' : 'border-border bg-secondary/40 hover:border-primary/40'}`}
                  >
                    <span className="text-2xl shrink-0">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-muted-foreground text-xs">{opt.desc}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      {opt.price === 0
                        ? <span className="text-green-600 font-semibold text-sm">Бесплатно</span>
                        : <span className="font-semibold text-sm">{opt.price} ₽</span>
                      }
                    </div>
                  </button>
                ))}
              </div>

              {deliveryId !== 'pickup' && (
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-semibold text-muted-foreground">Адрес доставки</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input className={field} placeholder="Город" value={city} onChange={e => setCity(e.target.value)} />
                    <input className={field} placeholder="Индекс" value={zip} onChange={e => setZip(e.target.value)} />
                  </div>
                  <input className={field} placeholder="Улица, дом, квартира" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              )}

              {deliveryId === 'pickup' && (
                <div className="bg-accent rounded-2xl p-4 flex items-start gap-3">
                  <Icon name="MapPin" size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Пункт самовывоза</p>
                    <p className="text-muted-foreground text-sm mt-0.5">Москва, ул. Космонавтов, 42</p>
                    <p className="text-muted-foreground text-xs mt-1">Пн–Пт: 10:00–20:00, Сб: 11:00–18:00</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-border space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Товары</span><span>{(total - discount).toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Доставка</span>
                <span className={delivery.price === 0 ? 'text-green-600 font-medium' : ''}>{delivery.price === 0 ? 'Бесплатно' : `${delivery.price} ₽`}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted-foreground">Итого</span>
                <span className="font-display font-semibold text-2xl">{grandTotal.toLocaleString()} ₽</span>
              </div>
              <button
                disabled={deliveryId !== 'pickup' && !address.trim()}
                onClick={() => setStep('payment')}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Перейти к оплате
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: PAYMENT ── */}
        {step === 'payment' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Order summary */}
              <div className="bg-secondary/50 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Товары</span><span>{(total - discount).toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Доставка ({delivery.label})</span>
                  <span className={delivery.price === 0 ? 'text-green-600' : ''}>{delivery.price === 0 ? 'Бесплатно' : `${delivery.price} ₽`}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-1 border-t border-border">
                  <span>К оплате</span>
                  <span className="text-primary font-display text-xl">{grandTotal.toLocaleString()} ₽</span>
                </div>
              </div>

              <p className="text-sm font-semibold text-muted-foreground">Способ оплаты</p>
              <div className="space-y-2">
                {[
                  { id: 'card', label: 'Банковская карта', sub: 'Visa, Mastercard, Мир', icon: '💳' },
                  { id: 'sbp', label: 'СБП', sub: 'Система быстрых платежей', icon: '⚡' },
                  { id: 'cash', label: 'Наличными', sub: 'При получении заказа', icon: '💵' },
                ].map(opt => (
                  <div key={opt.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-secondary/30">
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-muted-foreground text-xs">{opt.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-accent rounded-2xl p-4 flex items-start gap-3 text-sm">
                <Icon name="ShieldCheck" size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-accent-foreground">Платёж защищён. Ваши данные не передаются третьим лицам.</p>
              </div>
            </div>

            <div className="p-5 border-t border-border">
              <button
                onClick={() => { setStep('done'); clear(); }}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Оплатить {grandTotal.toLocaleString()} ₽
              </button>
            </div>
          </>
        )}

        {/* ── STEP 4: DONE ── */}
        {step === 'done' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
                <Icon name="PackageCheck" size={42} className="text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="Check" size={16} className="text-green-600" />
              </div>
            </div>
            <h4 className="text-2xl font-display font-semibold mb-1">Заказ оформлен!</h4>
            <p className="text-muted-foreground text-sm mb-5">№ {orderNum}</p>
            <div className="glass rounded-2xl p-4 w-full text-left space-y-2 mb-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Truck" size={15} className="text-primary" />
                <span>{delivery.label} · {delivery.desc}</span>
              </div>
              {deliveryId !== 'pickup' && address && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={15} className="text-primary mt-0.5" />
                  <span>{city && `${city}, `}{address}</span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-8">Детали заказа отправлены на ваш email. Спасибо!</p>
            <button onClick={close} className="bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity">
              Отлично
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
