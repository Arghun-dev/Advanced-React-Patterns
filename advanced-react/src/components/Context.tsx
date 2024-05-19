import { useContext, createContext, Dispatch, useReducer } from "react";

// This is an enhanced context defintion that I have separated the state and dispatch contexts. Because, in a real-world application, you may want to use the state context in multiple components, but the dispatch context in only a few components. This way, you can avoid unnecessary re-renders in components that don't need to dispatch actions.

type CartStateContextType = {
  count: number;
};

type Action = {
  type: "INCREMENT" | "DECREMENT";
};

type CartDispatchContextType = Dispatch<Action>;

const CartStateContext = createContext<CartStateContextType | null>(null);

const CartDispatchContext = createContext<CartDispatchContextType | null>(null);

const cartReducer = (state: CartStateContextType, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Unhandled action type");
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { count: 0 });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const value = useContext(CartStateContext);

  if (!value) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return value;
};

export const useCartDispatch = () => {
  const value = useContext(CartDispatchContext);

  if (!value) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }

  return value;
};
