export interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: 'hair' | 'scalp' | 'universal';
  tags: string[];
  emoji: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Восстанавливающая сыворотка',
    desc: 'Интенсивный уход для повреждённых и ломких волос',
    price: 2490,
    category: 'hair',
    tags: ['выпадение', 'ломкость', 'восстановление'],
    emoji: '💧',
  },
  {
    id: 'p2',
    name: 'Шампунь для жирной кожи головы',
    desc: 'Глубокое очищение и баланс себума',
    price: 1690,
    category: 'scalp',
    tags: ['жирная', 'очищение', 'уход'],
    emoji: '🧴',
  },
  {
    id: 'p3',
    name: 'Питательная маска',
    desc: 'Увлажнение и блеск для тусклых волос',
    price: 2190,
    category: 'hair',
    tags: ['тусклость', 'сухая', 'увлажнение', 'уход'],
    emoji: '✨',
  },
  {
    id: 'p4',
    name: 'Тоник для кожи головы',
    desc: 'Стимулирует рост и укрепляет корни',
    price: 2890,
    category: 'scalp',
    tags: ['выпадение', 'рост', 'восстановление'],
    emoji: '🌿',
  },
  {
    id: 'p5',
    name: 'Успокаивающий крем-гель',
    desc: 'Восстановление микробиома чувствительной кожи',
    price: 2390,
    category: 'scalp',
    tags: ['чувствительная', 'сухая', 'восстановление'],
    emoji: '🌸',
  },
  {
    id: 'p6',
    name: 'Спрей для объёма',
    desc: 'Лёгкий уход и объём без утяжеления',
    price: 1890,
    category: 'hair',
    tags: ['объём', 'уход', 'тусклость'],
    emoji: '🪶',
  },
];
