import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { courses, categoryLabels, categoryIcons, Course } from '@/data/courses';
import CourseModal from '@/components/CourseModal';
import SpecialistRegModal from '@/components/SpecialistRegModal';

type Category = 'all' | 'hair' | 'trichology' | 'brows' | 'cosmetology';

const levelColors: Record<string, string> = {
  'Вводный': 'bg-green-50 text-green-700',
  'Базовый': 'bg-blue-50 text-blue-700',
  'Продвинутый': 'bg-primary/10 text-primary',
};

const Education = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [regOpen, setRegOpen] = useState(false);
  const [regCategory, setRegCategory] = useState('');

  const filtered = activeCategory === 'all' ? courses : courses.filter(c => c.category === activeCategory);

  const openReg = (label: string) => {
    setRegCategory(label);
    setRegOpen(true);
  };

  return (
    <section id="education" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <p className="text-primary font-semibold mb-3 tracking-wide">ОБУЧЕНИЕ</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold mb-4">
            Профессиональная библиотека
          </h2>
          <p className="text-muted-foreground text-lg">
            Курсы для специалистов: колористы, трихологи, бровисты и косметологи
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 reveal">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'}`}
          >
            Все курсы
          </button>
          {(Object.entries(categoryLabels) as [Category, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === key ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'}`}
            >
              <span>{categoryIcons[key]}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Access banners for each category when selected */}
        {activeCategory !== 'all' && (
          <div className="glass soft-shadow rounded-2xl p-5 mb-8 flex items-center justify-between gap-4 reveal">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{categoryIcons[activeCategory]}</span>
              <div>
                <p className="font-semibold">Раздел для специалистов</p>
                <p className="text-sm text-muted-foreground">Зарегистрируйтесь для полного доступа к материалам</p>
              </div>
            </div>
            <button
              onClick={() => openReg(categoryLabels[activeCategory])}
              className="shrink-0 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Войти / Регистрация
            </button>
          </div>
        )}

        {/* Course grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course, i) => (
            <div
              key={course.id}
              className="reveal bg-background border border-border rounded-[1.75rem] overflow-hidden hover:-translate-y-1 transition-transform soft-shadow group cursor-pointer"
              data-delay={`${(i % 3) * 0.07}s`}
              onClick={() => setActiveCourse(course)}
            >
              <div className="h-2 bg-gradient-to-r from-primary/60 to-primary" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">{categoryLabels[course.category]}</p>
                  </div>
                  <span className="text-3xl">{categoryIcons[course.category]}</span>
                </div>
                <h3 className="font-display font-semibold text-xl leading-snug mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{course.desc}</p>

                <div className="flex items-center gap-3 mb-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Icon name="Clock" size={14} />{course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-xl">{course.price.toLocaleString()} ₽</span>
                  <button className="bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for specialists */}
        <div className="mt-16 bg-gradient-to-br from-primary/8 to-accent rounded-[2rem] p-8 sm:p-12 text-center reveal">
          <p className="text-4xl mb-4">🎓</p>
          <h3 className="text-3xl font-display font-semibold mb-3">Стать сертифицированным партнёром</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Зарегистрируйтесь как специалист — получите доступ к закрытым материалам и программе чемпионов InValuable
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {(Object.entries(categoryLabels) as [string, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => openReg(label)}
                className="flex items-center gap-2 glass hover:bg-white transition-colors font-medium px-5 py-2.5 rounded-full text-sm"
              >
                <span>{categoryIcons[key]}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CourseModal course={activeCourse} onClose={() => setActiveCourse(null)} />
      <SpecialistRegModal open={regOpen} onClose={() => setRegOpen(false)} categoryLabel={regCategory} />
    </section>
  );
};

export default Education;
