import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Msg {
  from: 'al' | 'user';
  text: string;
}

const LOGO = 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/bucket/8958dc5f-4146-4058-86b9-541320d2168d.jpeg';

const QUICK = [
  'Как подобрать уход?',
  'Расскажи о доставке',
  'Как записаться на курс?',
  'Что такое программа чемпионов?',
  'Как стать партнёром?',
];

const ANSWERS: Record<string, string> = {
  'Как подобрать уход?': 'Пройдите нашу диагностику — всего 4 вопроса, и AL подберёт идеальные средства лично для вас. Нажмите «Начать диагностику» на главной странице 🌸',
  'Расскажи о доставке': 'Доставляем по всей России: курьером, СДЭК, Почтой России и самовывозом. Бесплатная доставка от 3000 ₽ по Москве. Подробности в разделе «Доставка» 🚚',
  'Как записаться на курс?': 'В разделе «Обучение» выберите курс по вашей специализации, нажмите «Подробнее» и выберите удобную дату в календаре. Всё быстро и просто! 📅',
  'Что такое программа чемпионов?': 'Программа «Стать чемпионом» — это профессиональный рост, скидка 30% на продукцию, амбассадорство и доступ к закрытым мероприятиям бренда. Подробности в разделе «Чемпион» 🏆',
  'Как стать партнёром?': 'Оставьте заявку в разделе «Сотрудничество» — укажите ФИО, телефон и email. Наш менеджер свяжется с вами в течение 24 часов 🤝',
};

const think = (q: string): string => {
  for (const key of Object.keys(ANSWERS)) {
    if (q.toLowerCase().includes(key.toLowerCase().split(' ')[1] ?? '')) return ANSWERS[key];
  }
  return 'Отличный вопрос! Я передам его нашему специалисту. Или вы можете позвонить нам: +7 (999) 123-45-67, либо записаться на консультацию прямо на сайте 💌';
};

const ALChat = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'al', text: 'Привет! Я AL — помощник InValuable 🌸 Помогу подобрать уход, расскажу о курсах и доставке. Чем могу помочь?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = ANSWERS[text] ?? think(text);
      setMsgs(m => [...m, { from: 'al', text: reply }]);
      if (!open) setUnread(n => n + 1);
    }, 900);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {/* Chat window */}
      <div className={`transition-all duration-300 origin-bottom-right ${open ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="w-[min(360px,90vw)] bg-background rounded-[1.75rem] shadow-2xl border border-border flex flex-col overflow-hidden" style={{ height: '480px' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-primary">
            <img src={LOGO} alt="AL" className="w-9 h-9 rounded-full object-contain bg-white p-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-primary-foreground text-sm">AL — помощник InValuable</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <span className="text-primary-foreground/70 text-xs">Онлайн</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Icon name="X" size={16} className="text-primary-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'al' && (
                  <img src={LOGO} alt="AL" className="w-7 h-7 rounded-full object-contain bg-secondary p-0.5 shrink-0 mt-auto" />
                )}
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === 'al'
                    ? 'bg-secondary/80 text-foreground rounded-bl-sm'
                    : 'bg-primary text-primary-foreground rounded-br-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-end">
                <img src={LOGO} alt="AL" className="w-7 h-7 rounded-full object-contain bg-secondary p-0.5 shrink-0" />
                <div className="bg-secondary/80 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-none border-t border-border">
            {QUICK.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="shrink-0 text-xs bg-accent text-accent-foreground px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-border">
            <input
              className="flex-1 bg-secondary/60 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Напишите вопрос..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl hover:opacity-90 transition-all hover:scale-105"
      >
        <img src={LOGO} alt="AL" className={`w-8 h-8 rounded-full object-contain transition-all ${open ? 'opacity-0 scale-50 absolute' : 'opacity-100 scale-100'}`} />
        <Icon name="X" size={22} className={`transition-all absolute ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} text-primary-foreground`} />
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-foreground text-accent text-[10px] font-bold flex items-center justify-center animate-bounce">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
};

export default ALChat;
