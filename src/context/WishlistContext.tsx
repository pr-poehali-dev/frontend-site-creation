import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface WishList {
  id: string;
  name: string;
  items: Product[];
}

interface WishCtx {
  lists: WishList[];
  activeListId: string;
  setActiveListId: (id: string) => void;
  addList: (name: string) => void;
  removeList: (id: string) => void;
  toggleItem: (listId: string, product: Product) => void;
  isWished: (productId: string) => boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<WishCtx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 9);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<WishList[]>([
    { id: 'default', name: 'Мои желания', items: [] },
  ]);
  const [activeListId, setActiveListId] = useState('default');
  const [open, setOpen] = useState(false);

  const addList = (name: string) => {
    const id = uid();
    setLists((prev) => [...prev, { id, name, items: [] }]);
    setActiveListId(id);
  };

  const removeList = (id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
    setActiveListId('default');
  };

  const toggleItem = (listId: string, product: Product) => {
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        const exists = l.items.some((i) => i.id === product.id);
        return {
          ...l,
          items: exists ? l.items.filter((i) => i.id !== product.id) : [...l.items, product],
        };
      })
    );
  };

  const isWished = (productId: string) =>
    lists.some((l) => l.items.some((i) => i.id === productId));

  return (
    <Ctx.Provider value={{ lists, activeListId, setActiveListId, addList, removeList, toggleItem, isWished, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
};

export const useWishlist = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useWishlist must be used within WishlistProvider');
  return c;
};
