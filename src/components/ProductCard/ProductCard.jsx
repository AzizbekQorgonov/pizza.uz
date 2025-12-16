import React from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
    if (!product) return null;

    const cart = useCart();
    if (!cart) return null;

    const { items, add, remove } = cart;
    const qty = items?.[product.id]?.qty || 0;

    const handleChoose = () => {
        if (qty === 0) add(product, 1);
    };

    const inc = () => add(product, 1); // 1 birlik qo‘shadi
    const dec = () => remove(product.id, 1); // 1 birlik kamaytiradi

    return (
        <div className="relative w-full max-w-[280px] md:max-w-[300px] h-auto bg-white text-gray-900 rounded-2xl p-4 flex flex-col items-center justify-between shadow-md border border-gray-200 gap-3 font-sans transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-105 mx-auto overflow-hidden">

            {product.badge && (
                <span className="absolute top-3 left-3 z-30 bg-[#FF7010] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {product.badge}
                </span>
            )}

            <div className="w-full flex justify-center items-center h-[240px] md:h-[260px] overflow-hidden rounded-xl bg-white p-2 transition-transform duration-300 hover:scale-105">
                <img
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                    src={product.image}
                    alt={product.title}
                />
            </div>

            <div className="w-full flex flex-col gap-2 mt-2 text-center">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 truncate">{product.title}</h4>

                <div className="flex items-center justify-between px-2 mt-1">
                    <span className="text-lg md:text-xl font-bold text-[#FF7010]">
                        {product.basePrice} $
                    </span>

                    {qty > 0 ? (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 rounded-md px-3 py-2 border border-orange-200 shadow-sm">
                            <button
                                onClick={dec}
                                className="bg-[#FF7010] text-white rounded px-3 py-1 text-lg font-bold hover:bg-orange-600 transition-transform duration-200 hover:scale-110"
                            >
                                −
                            </button>

                            <span className="text-base font-bold text-gray-900 min-w-[24px] text-center">{qty}</span>

                            <button
                                onClick={inc}
                                className="bg-[#FF7010] text-white rounded px-3 py-1 text-lg font-bold hover:bg-orange-600 transition-transform duration-200 hover:scale-110"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleChoose}
                            className="bg-[#FF7010] text-white rounded-full px-6 py-2 text-base font-bold shadow-md hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                        >
                            выбрать
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
