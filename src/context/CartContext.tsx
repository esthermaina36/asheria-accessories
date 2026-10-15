"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
  stock: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
const [cartLoaded, setCartLoaded] = useState(false);

 

useEffect(() => {
  const savedCart = localStorage.getItem("asheria-cart");

  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart)) {
        const updatedCart: CartItem[] = parsedCart
          .filter(
            (item) =>
              item &&
              typeof item.id === "string" &&
              typeof item.name === "string" &&
              Number.isFinite(Number(item.price)) &&
              Number.isFinite(Number(item.quantity)),
          )
          .map((item) => ({
            ...item,
            price: Number(item.price),
            quantity: Math.max(1, Math.floor(Number(item.quantity))),
            stock: Number.isFinite(Number(item.stock))
              ? Math.max(0, Math.floor(Number(item.stock)))
              : 0,
          }))
          .filter((item) => item.stock > 0)
          .map((item) => ({
            ...item,
            quantity: Math.min(item.quantity, item.stock),
          }));

        setCart(updatedCart);
      } else {
        localStorage.removeItem("asheria-cart");
      }
    } catch {
      localStorage.removeItem("asheria-cart");
    }
  }

  setCartLoaded(true);
}, []);



  useEffect(() => {
  if (!cartLoaded) {
    return;
  }

  localStorage.setItem("asheria-cart", JSON.stringify(cart));
}, [cart, cartLoaded]);

  
function addToCart(item: Omit<CartItem, "quantity">) {
  if (item.stock <= 0) {
    return;
  }

  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItem) {
      return currentCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: Math.min(
                cartItem.quantity + 1,
                item.stock,
              ),
            }
          : cartItem,
      );
    }

    return [
      ...currentCart,
      {
        ...item,
        quantity: 1,
      },
    ];
  });
}


  function removeFromCart(id: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id),
    );
  }


function increaseQuantity(id: string) {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock),
          }
        : item,
    ),
  );
}

  function decreaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}