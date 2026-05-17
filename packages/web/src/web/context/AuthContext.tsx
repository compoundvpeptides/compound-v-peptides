import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  dob: string; // ISO date string
  passwordHash: string; // stored as plain for localStorage-only demo
};

export type SavedAddress = {
  id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  instructions: string;
};

export type StoredOrder = {
  id: string;
  date: string;
  items: { name: string; variant: string; qty: number; price: number }[];
  total: number;
  status: string;
  paymentId: string;
};

type AuthContextType = {
  user: UserProfile | null;
  addresses: SavedAddress[];
  orders: StoredOrder[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => string | null; // returns error or null
  signup: (profile: Omit<UserProfile, "passwordHash"> & { password: string }) => string | null;
  logout: () => void;
  updateProfile: (updates: Partial<Omit<UserProfile, "passwordHash">>) => void;
  changePassword: (oldPass: string, newPass: string) => string | null;
  saveAddress: (addr: Omit<SavedAddress, "id">) => void;
  deleteAddress: (id: string) => void;
  updateAddress: (id: string, updates: Partial<Omit<SavedAddress, "id">>) => void;
  saveOrder: (order: Omit<StoredOrder, "id" | "date">) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "cv_user";
const ADDR_KEY = "cv_addresses";
const ORDERS_KEY = "cv_orders";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => load<UserProfile | null>(STORAGE_KEY, null));
  const [addresses, setAddresses] = useState<SavedAddress[]>(() => load<SavedAddress[]>(ADDR_KEY, []));
  const [orders, setOrders] = useState<StoredOrder[]>(() => load<StoredOrder[]>(ORDERS_KEY, []));

  // Persist on every change
  useEffect(() => { save(STORAGE_KEY, user); }, [user]);
  useEffect(() => { save(ADDR_KEY, addresses); }, [addresses]);
  useEffect(() => { save(ORDERS_KEY, orders); }, [orders]);

  const login = (email: string, password: string): string | null => {
    // Load all registered users (we store a registry separate from the active session)
    const registry = load<UserProfile[]>("cv_registry", []);
    const found = registry.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return "No account found with that email.";
    if (found.passwordHash !== password) return "Incorrect password.";
    setUser(found);
    // Load that user's addresses and orders
    const allAddresses = load<Record<string, SavedAddress[]>>("cv_addr_registry", {});
    const allOrders = load<Record<string, StoredOrder[]>>("cv_order_registry", {});
    setAddresses(allAddresses[found.email] ?? []);
    setOrders(allOrders[found.email] ?? []);
    return null;
  };

  const signup = (profile: Omit<UserProfile, "passwordHash"> & { password: string }): string | null => {
    const registry = load<UserProfile[]>("cv_registry", []);
    const exists = registry.find((u) => u.email.toLowerCase() === profile.email.toLowerCase());
    if (exists) return "An account with this email already exists.";
    const newUser: UserProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      dob: profile.dob,
      passwordHash: profile.password,
    };
    const updated = [...registry, newUser];
    localStorage.setItem("cv_registry", JSON.stringify(updated));
    setUser(newUser);
    setAddresses([]);
    setOrders([]);
    return null;
  };

  const logout = () => {
    // Persist before logout
    if (user) {
      const allAddresses = load<Record<string, SavedAddress[]>>("cv_addr_registry", {});
      allAddresses[user.email] = addresses;
      localStorage.setItem("cv_addr_registry", JSON.stringify(allAddresses));
      const allOrders = load<Record<string, StoredOrder[]>>("cv_order_registry", {});
      allOrders[user.email] = orders;
      localStorage.setItem("cv_order_registry", JSON.stringify(allOrders));
    }
    setUser(null);
    setAddresses([]);
    setOrders([]);
  };

  const updateProfile = (updates: Partial<Omit<UserProfile, "passwordHash">>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    // Update registry
    const registry = load<UserProfile[]>("cv_registry", []);
    const newReg = registry.map((u) => u.email === user.email ? { ...u, ...updates } : u);
    localStorage.setItem("cv_registry", JSON.stringify(newReg));
  };

  const changePassword = (oldPass: string, newPass: string): string | null => {
    if (!user) return "Not logged in.";
    if (user.passwordHash !== oldPass) return "Current password is incorrect.";
    const updated = { ...user, passwordHash: newPass };
    setUser(updated);
    const registry = load<UserProfile[]>("cv_registry", []);
    const newReg = registry.map((u) => u.email === user.email ? updated : u);
    localStorage.setItem("cv_registry", JSON.stringify(newReg));
    return null;
  };

  const saveAddress = (addr: Omit<SavedAddress, "id">) => {
    const newAddr = { ...addr, id: Date.now().toString() };
    setAddresses((prev) => [...prev, newAddr]);
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAddress = (id: string, updates: Partial<Omit<SavedAddress, "id">>) => {
    setAddresses((prev) => prev.map((a) => a.id === id ? { ...a, ...updates } : a));
  };

  const saveOrder = (order: Omit<StoredOrder, "id" | "date">) => {
    const newOrder: StoredOrder = {
      ...order,
      id: `CV-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    // Persist to registry
    if (user) {
      const allOrders = load<Record<string, StoredOrder[]>>("cv_order_registry", {});
      allOrders[user.email] = [newOrder, ...(allOrders[user.email] ?? [])];
      localStorage.setItem("cv_order_registry", JSON.stringify(allOrders));
    }
  };

  return (
    <AuthContext.Provider value={{
      user, addresses, orders,
      isLoggedIn: !!user,
      login, signup, logout,
      updateProfile, changePassword,
      saveAddress, deleteAddress, updateAddress,
      saveOrder,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
