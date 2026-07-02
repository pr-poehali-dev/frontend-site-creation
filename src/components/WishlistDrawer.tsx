import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const WishlistDrawer = () => {
  const { lists, open, setOpen, activeListId, setActiveListId, addList, removeList, toggleItem } = useWishlist();
  const { add } = useCart();
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  const activeList = lists.find((l) => l.id === activeListId) ?? lists[0];

  const handleAddList = () => {
    if (newName.trim()) {
      addList(newName.trim());
      setNewName('');
      setAdding(false);
    }
  };

  const shareList = () => {
    const text = activeList
      ? `Мой список "${activeList.name}" в InValuable:\n` + activeList.items.map((i) => `• ${i.name} — ${i.price.toLocaleString()} ₽`).join('\n')
      : '';
    if (navigator.share) {
      navigator.share({ title: 'InValuable Wishlist', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Список скопирован в буфер обмена!');
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-full max-w-sm bg-background shadow-2xl transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="Heart" size={20} className="text-primary" />
            <h3 className="text-xl font-display font-semibold">Wishlist</h3>
          </div>
          <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Lists tabs */}
        <div className="px-4 pt-4 pb-2 border-b border-border">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {lists.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveListId(l.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeListId === l.id ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'}`}
              >
                {l.name}
                <span className="ml-1.5 opacity-60 text-xs">({l.items.length})</span>
              </button>
            ))}
            <button
              onClick={() => setAdding(true)}
              className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>

          {adding && (
            <div className="flex gap-2 mt-2 animate-fade-in">
              <input
                autoFocus
                className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Название списка"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
              />
              <button onClick={handleAddList} className="bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm font-medium">
                OK
              </button>
              <button onClick={() => setAdding(false)} className="bg-secondary px-3 py-2 rounded-xl text-sm">
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!activeList || activeList.items.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-5xl mb-4">🌸</div>
              <p className="font-semibold mb-1">Список пуст</p>
              <p className="text-sm">Добавляйте товары кнопкой ♡</p>
            </div>
          ) : (
            activeList.items.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-secondary/50 rounded-2xl p-3">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl shrink-0">
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-primary font-semibold text-sm">{p.price.toLocaleString()} ₽</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => { add(p); }}
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90"
                    title="В корзину"
                  >
                    <Icon name="ShoppingBag" size={14} />
                  </button>
                  <button
                    onClick={() => toggleItem(activeList.id, p)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                    title="Удалить"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          {activeList && activeList.items.length > 0 && (
            <button
              onClick={shareList}
              className="w-full glass flex items-center justify-center gap-2 font-medium py-3 rounded-full hover:bg-accent transition-colors text-sm"
            >
              <Icon name="Share2" size={16} className="text-primary" />
              Поделиться списком
            </button>
          )}
          {activeListId !== 'default' && (
            <button
              onClick={() => removeList(activeListId)}
              className="w-full text-muted-foreground hover:text-destructive text-sm flex items-center justify-center gap-2 py-2 transition-colors"
            >
              <Icon name="Trash2" size={14} /> Удалить список
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default WishlistDrawer;
