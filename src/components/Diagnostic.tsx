import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface Step {
  key: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const steps: Step[] = [
  {
    key: 'concern',
    question: 'Что вас беспокоит?',
    options: [
      { label: 'Волосы', value: 'hair', emoji: '💇‍♀️' },
      { label: 'Кожа головы', value: 'scalp', emoji: '🧖‍♀️' },
    ],
  },
  {
    key: 'skin',
    question: 'Какой у вас тип кожи головы?',
    options: [
      { label: 'Жирная', value: 'жирная', emoji: '💦' },
      { label: 'Сухая', value: 'сухая', emoji: '🍂' },
      { label: 'Чувствительная', value: 'чувствительная', emoji: '🌸' },
      { label: 'Нормальная', value: 'нормальная', emoji: '✨' },
    ],
  },
  {
    key: 'hair',
    question: 'Что происходит с волосами?',
    options: [
      { label: 'Выпадение', value: 'выпадение', emoji: '🍃' },
      { label: 'Ломкость', value: 'ломкость', emoji: '⚡' },
      { label: 'Тусклость', value: 'тусклость', emoji: '🌫️' },
      { label: 'Всё хорошо', value: 'объём', emoji: '💛' },
    ],
  },
  {
    key: 'goal',
    question: 'Какая у вас цель?',
    options: [
      { label: 'Восстановление', value: 'восстановление', emoji: '🌿' },
      { label: 'Ежедневный уход', value: 'уход', emoji: '🫧' },
      { label: 'Увлажнение', value: 'увлажнение', emoji: '💧' },
      { label: 'Объём', value: 'объём', emoji: '🪶' },
    ],
  },
];

const advice: Record<string, string> = {
  жирная: 'Вашей коже головы важен баланс — избегайте пересушивания и используйте мягкое очищение.',
  сухая: 'Коже нужно бережное увлажнение и питание без агрессивных сульфатов.',
  чувствительная: 'Сделайте акцент на восстановлении микробиома и успокаивающем уходе.',
  нормальная: 'Поддерживайте здоровье кожи мягким регулярным уходом.',
  выпадение: 'Укрепляйте корни тониками, стимулирующими рост волос.',
  ломкость: 'Волосам нужны восстанавливающие сыворотки и питание кератином.',
  тусклость: 'Вернуть блеск помогут увлажняющие маски и лёгкие спреи.',
};

const pickProducts = (answers: Record<string, string>): Product[] => {
  const chosen = Object.values(answers);
  const scored = products
    .map((p) => ({ p, score: p.tags.filter((t) => chosen.includes(t)).length }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.p);
  const result = scored.length ? scored : products.slice(0, 3);
  return result.slice(0, 4);
};

const Diagnostic = () => {
  const { add } = useCart();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const choose = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (i < steps.length - 1) setI(i + 1);
    else setDone(true);
  };

  const restart = () => {
    setAnswers({});
    setI(0);
    setDone(false);
  };

  const results = done ? pickProducts(answers) : [];
  const mainAdvice = advice[answers.skin] || advice[answers.hair] || 'Мы подобрали идеальный уход именно для вас.';

  return (
    <section id="diagnostic" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -top-10 right-0 w-72 h-72 bg-primary blob rounded-full" />
      <div className="container mx-auto px-5 relative z-10 max-w-3xl">
        <div className="text-center mb-10 reveal">
          <p className="text-primary font-semibold mb-3 tracking-wide">ДИАГНОСТИКА</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold">Персональный подбор ухода</h2>
          <p className="text-muted-foreground mt-4 text-lg">4 вопроса — и AI подберёт средства для вас</p>
        </div>

        <div className="glass soft-shadow rounded-[2rem] p-6 sm:p-10">
          {!done ? (
            <>
              <div className="flex items-center gap-2 mb-8">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${idx <= i ? 'bg-primary' : 'bg-secondary'}`}
                  />
                ))}
              </div>
              <div key={i} className="animate-fade-up">
                <p className="text-sm text-muted-foreground mb-2">Шаг {i + 1} из {steps.length}</p>
                <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-8">{steps[i].question}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {steps[i].options.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => choose(steps[i].key, o.value)}
                      className="group bg-background border-2 border-border hover:border-primary rounded-2xl p-6 text-left transition-all hover:-translate-y-1 soft-shadow"
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{o.emoji}</div>
                      <div className="font-semibold">{o.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="animate-fade-up">
              <div className="flex items-start gap-4 bg-accent rounded-2xl p-5 mb-8">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Icon name="Sparkles" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-accent-foreground mb-1">Рекомендация AI-помощника</p>
                  <p className="text-accent-foreground/80 text-sm leading-relaxed">{mainAdvice}</p>
                </div>
              </div>

              <h3 className="text-xl font-display font-semibold mb-5">Подобрано специально для вас</h3>
              <div className="space-y-4">
                {results.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 bg-background border border-border rounded-2xl p-4">
                    <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="text-muted-foreground text-xs truncate">{p.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-primary mb-1">{p.price.toLocaleString()} ₽</p>
                      <button
                        onClick={() => add(p)}
                        className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:opacity-90"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={restart}
                className="mt-8 w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                <Icon name="RotateCcw" size={16} /> Пройти заново
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Diagnostic;
