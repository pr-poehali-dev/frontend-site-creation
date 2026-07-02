import Icon from '@/components/ui/icon';

const zones = [
  { city: 'Москва и МО', courier: '1–2 дня', post: '2–3 дня', cdek: '1–2 дня', courier_price: 390, free_from: 3000 },
  { city: 'Санкт-Петербург', courier: '2–3 дня', post: '3–5 дней', cdek: '2–3 дня', courier_price: 490, free_from: 4000 },
  { city: 'Города-миллионники', courier: '3–5 дней', post: '5–7 дней', cdek: '2–4 дня', courier_price: 590, free_from: 5000 },
  { city: 'Остальные города', courier: '5–7 дней', post: '7–14 дней', cdek: '3–6 дней', courier_price: 690, free_from: 6000 },
];

const features = [
  { icon: 'PackageCheck', title: 'Безопасная упаковка', desc: 'Продукты упакованы в фирменные коробки с защитной прослойкой' },
  { icon: 'MapPin', title: 'Отслеживание', desc: 'Трек-номер приходит на email сразу после отправки заказа' },
  { icon: 'RotateCcw', title: 'Возврат 30 дней', desc: 'Вернём деньги, если товар не подошёл — без лишних вопросов' },
  { icon: 'Gift', title: 'Подарочная упаковка', desc: 'Добавьте открытку и фирменную ленту — бесплатно при заказе от 2000 ₽' },
];

const DeliverySection = () => (
  <section id="delivery" className="py-20 sm:py-28 relative">
    <div className="container mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto mb-14 reveal">
        <p className="text-primary font-semibold mb-3 tracking-wide">ДОСТАВКА</p>
        <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4">Быстро и надёжно</h2>
        <p className="text-muted-foreground text-lg">Доставляем по всей России. Бесплатная доставка от определённой суммы.</p>
      </div>

      {/* Delivery methods */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {[
          { icon: '🚚', title: 'Курьер', desc: 'Доставка до двери в удобное время', badge: 'Быстро' },
          { icon: '📦', title: 'СДЭК', desc: 'Более 3000 пунктов выдачи по России', badge: 'Популярно' },
          { icon: '📮', title: 'Почта России', desc: 'Доставка в любую точку страны', badge: 'Везде' },
          { icon: '🏪', title: 'Самовывоз', desc: 'Москва, ул. Космонавтов, 42', badge: 'Бесплатно' },
        ].map((m, i) => (
          <div key={m.title} className="reveal glass soft-shadow rounded-2xl p-5 hover:-translate-y-1 transition-transform" data-delay={`${i * 0.07}s`}>
            <div className="text-3xl mb-3">{m.icon}</div>
            <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">{m.badge}</span>
            <h3 className="font-display font-semibold text-lg mt-3 mb-1">{m.title}</h3>
            <p className="text-muted-foreground text-sm">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Zones table */}
      <div className="reveal mb-14">
        <h3 className="text-2xl font-display font-semibold mb-6">Сроки и стоимость</h3>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60">
                <th className="text-left p-4 font-semibold">Регион</th>
                <th className="text-left p-4 font-semibold">Курьер</th>
                <th className="text-left p-4 font-semibold">СДЭК</th>
                <th className="text-left p-4 font-semibold">Почта</th>
                <th className="text-left p-4 font-semibold text-primary">Бесплатно от</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={z.city} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-secondary/20'}`}>
                  <td className="p-4 font-medium">{z.city}</td>
                  <td className="p-4 text-muted-foreground">
                    {z.courier} <span className="text-foreground font-medium">· {z.courier_price} ₽</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{z.cdek} · 320 ₽</td>
                  <td className="p-4 text-muted-foreground">{z.post} · 250 ₽</td>
                  <td className="p-4 font-semibold text-primary">{z.free_from.toLocaleString()} ₽</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">* Сроки указаны без учёта праздничных дней. Самовывоз всегда бесплатный.</p>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div key={f.title} className="reveal flex items-start gap-4 p-5 bg-secondary/40 rounded-2xl" data-delay={`${i * 0.07}s`}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Icon name={f.icon} size={18} className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DeliverySection;
