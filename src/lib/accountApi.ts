const ACCOUNT_URL = 'https://functions.poehali.dev/29fb0f93-9262-488d-ad69-4d63c793868b';
const STORAGE_KEY = 'hmh_token';

export interface UserCourse {
  courseId: string;
  progress: number;
  status: 'in_progress' | 'completed';
  certId: string | null;
  enrolledAt: string | null;
  completedAt: string | null;
}

export interface Order {
  id: number;
  itemsCount: number;
  total: number;
  status: string;
  createdAt: string | null;
}

export interface Membership {
  tier: string;
  active: boolean;
  price: number;
  startedAt?: string | null;
  renewsAt: string | null;
}

const authHeaders = (): Record<string, string> => {
  const token = localStorage.getItem(STORAGE_KEY);
  return token ? { 'X-Authorization': `Bearer ${token}` } : {};
};

async function call<T>(action: string, method: 'GET' | 'POST', body?: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${ACCOUNT_URL}?action=${action}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const accountApi = {
  getCourses: () => call<{ courses: UserCourse[] }>('courses', 'GET'),
  enroll: (courseId: string) => call<{ course: UserCourse }>('enroll', 'POST', { courseId }),
  updateProgress: (courseId: string, progress: number) =>
    call<{ course: UserCourse }>('update_progress', 'POST', { courseId, progress }),

  getOrders: () => call<{ orders: Order[] }>('orders', 'GET'),
  createOrder: (itemsCount: number, total: number) =>
    call<{ order: Order }>('create_order', 'POST', { itemsCount, total }),

  getMembership: () => call<{ membership: Membership }>('membership', 'GET'),
  subscribe: (tier: string, price: number) =>
    call<{ membership: Membership }>('subscribe', 'POST', { tier, price }),
  cancelMembership: () => call<{ membership: Membership }>('cancel_membership', 'POST'),
};
