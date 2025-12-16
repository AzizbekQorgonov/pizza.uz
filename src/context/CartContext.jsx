import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('kuda_cart')
            return raw ? JSON.parse(raw) : {}
        } catch (e) {
            return {}
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('kuda_cart', JSON.stringify(items))
        } catch (e) { }
    }, [items])

    const add = (product) => {
        setItems(prev => {
            const copy = { ...prev }
            if (copy[product.id]) copy[product.id].qty += 1
            else copy[product.id] = { product, qty: 1 }
            return copy
        })
    }

    const remove = (productId) => {
        setItems(prev => {
            const copy = { ...prev }
            if (!copy[productId]) return copy
            copy[productId].qty -= 1
            if (copy[productId].qty <= 0) delete copy[productId]
            return copy
        })
    }

    const setQty = (productId, qty) => {
        setItems(prev => {
            const copy = { ...prev }
            if (qty <= 0) {
                delete copy[productId]
            } else {
                if (copy[productId]) copy[productId].qty = qty
                else return prev
            }
            return copy
        })
    }

    const clear = () => setItems({})

    const totalPrice = Object.values(items).reduce((s, it) => s + (Number(it.product.basePrice) || 0) * it.qty, 0)
    const totalCount = Object.values(items).reduce((s, it) => s + it.qty, 0)

    return (
        <CartContext.Provider value={{ items, add, remove, setQty, clear, totalPrice, totalCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
