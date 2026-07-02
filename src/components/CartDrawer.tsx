import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

const CartDrawer = () => {
  const { items, open, setOpen, total, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<'cart' | 'delivery' | 'done'>('cart');
  const [address, setAddress] = useState('');

  const close = () => {
    setOpen(false);
    setTimeout(() => setStep('cart'), 300);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-2xl font-display font-semibold">
            {step === 'done' ? 'Готово' : step === 'delivery' ? 'Доставка' : 'Корзина'}
          </h3>
          <button onClick={close} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="X" size={18} />
          </button>
        </div>

        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <div className="text-5xl mb-4">🛍️</div>
                  Корзина пуста
                </div>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 bg-secondary/60 rounded-2xl p-3">
                  <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">
                    {i.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{i.name}</p>
                    <p className="text-primary font-semibold mt-1">{i.price.toLocaleString()} ₽</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2 bg-background rounded-full px-1">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="w-7 h-7 flex items-center justify-center">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-sm w-5 text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="w-7 h-7 flex items-center justify-center">
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="p-5 border-t border-border space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Итого</span>
                  <span className="font-display font-semibold text-2xl">{total.toLocaleString()} ₽</span>
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

        {step === 'delivery' && (
          <div className="flex-1 flex flex-col p-5">
            <div className="flex-1 space-y-4">
              <input
                className="w-full bg-secondary/60 border border-border rounded-2xl px-4 py-3.5 outline-none focus:border-primary"
                placeholder="Адрес доставки"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="bg-accent rounded-2xl p-4 flex justify-between">
                <span className="text-accent-foreground">К оплате</span>
                <span className="font-semibold text-accent-foreground">{total.toLocaleString()} ₽</span>
              </div>
            </div>
            <button
              disabled={!address.trim()}
              onClick={() => {
                setStep('done');
                clear();
              }}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Оплатить {total.toLocaleString()} ₽
            </button>
          </div>
        )}

        {step === 'done' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
              <Icon name="Check" size={36} className="text-primary" />
            </div>
            <h4 className="text-2xl font-display font-semibold mb-2">Спасибо за заказ!</h4>
            <p className="text-muted-foreground mb-8">Мы свяжемся с вами для подтверждения доставки.</p>
            <button onClick={close} className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full">
              Отлично
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
