import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existing = state.find(item => item.id === action.payload.id);
            if (existing) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, qty: 1 }];
        case 'UPDATE_QTY':
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, qty: action.payload.qty }
                    : item
            ).filter(item => item.qty > 0);
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload.id);
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    const addItem = useCallback((product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }, []);

    const updateQty = useCallback((id, qty) => {
        dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
    }, []);

    const removeItem = useCallback((id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            updateQty,
            removeItem,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

