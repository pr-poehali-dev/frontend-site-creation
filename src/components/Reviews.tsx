import IconAsset from '@/components/ui/icon-asset';

interface Review {
  name: string;
  role: string;
  emoji: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    name: 'Оксана Петрова',
    role: 'Стилист-колорист, Москва',
    emoji: '👩‍🦰',
    rating: 5,
    text: 'Курс по колористике полностью изменил мой подход к работе с клиентами. Сертификат HairMasterHub помог поднять чек на 30%.',
  },
  {
    name: 'Дмитрий Кузнецов',
    role: 'Барбер, Санкт-Петербург',
    emoji: '👨‍🦱',
    rating: 5,
    text: 'Клуб — это не просто подписка, а живое сообщество. LIVE-эфиры разбирают реальные сложные случаи из практики.',
  },
  {
    name: 'Ирина Волкова',
    role: 'Трихолог, Казань',
    emoji: '👩‍⚕️',
    rating: 5,
    text: 'Продукция сертифицирована и реально работает. Клиенты видят результат уже после первого курса процедур.',
  },
];

const Reviews = () => (
  <section id="reviews" className="py-20 sm:py-28 relative dots-bg">
    <div className="container mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto mb-14 reveal">
        <p className="text-primary font-semibold mb-3 tracking-wide">ОТЗЫВЫ</p>
        <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4">Нам доверяют мастера</h2>
        <p className="text-muted-foreground text-lg">Реальные истории специалистов, которые уже растут вместе с HairMasterHub</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div
            key={r.name}
            className="reveal glass soft-shadow rounded-[1.75rem] p-7 flex flex-col hover:-translate-y-1 transition-transform"
            data-delay={`${i * 0.1}s`}
          >
            <IconAsset name="quote" size={36} className="mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: r.rating }).map((_, idx) => (
                <IconAsset key={idx} name="star" size={16} />
              ))}
            </div>
            <p className="text-foreground/90 leading-relaxed mb-6 flex-1">{r.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl shrink-0">
                {r.emoji}
              </div>
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-muted-foreground text-xs">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
