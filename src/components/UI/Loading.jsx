import React from 'react'

export default function Loading({ text = 'Yuklanmoqda...' }) {
    return (
        <div className="text-center py-10">
            <p className="text-gray-600">{text}</p>
        </div>
    )
}
