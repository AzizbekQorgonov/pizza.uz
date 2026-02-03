import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MapPinned, User, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function Header() {
  const { totalPrice } = useCart() || { totalPrice: 0 }

  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      if (current > 25 && current > lastScrollY) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      setLastScrollY(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  const links = [
    { to: 'aksiya', label: 'Акции' },
    { to: 'pizza', label: 'Пицца' },
    { to: 'sushi', label: 'Суши' },
    { to: 'napitka', label: 'Напитки' },
    { to: 'zakuski', label: 'Закуски' },
    { to: 'desert', label: 'Десерты' },
    { to: 'souse', label: 'Соусы' },
    { to: 'kombo', label: 'Комбо' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">

      {/* TOP BAR */}
      <div
        className={`transition-all duration-300 overflow-hidden
          ${isScrolled ? 'max-h-0 opacity-0 -translate-y-full' : 'max-h-16 opacity-100'}
        `}
      >
        <div className="container mx-auto px-5 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <MapPinned className="w-4 h-4 text-[#FF7010]" />
            <span>Москва</span>
            <span className="hidden md:flex">Среднее время доставки: 00:24</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <User className="w-4 h-4 text-[#FF7010]" />
            <span>Войти</span>
          </div>
        </div>
        <hr />
      </div>

      {/* MAIN HEADER */}
      <div className="container mx-auto px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10" src="/imgs/logo.png" alt="logo" />
          <span className="text-2xl font-bold text-[#FF7010]">Куда Пицца</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-6">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="font-bold text-[#FF7010] hover:opacity-80"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="bg-[#FF7010] flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
          >
            <img className="w-5 h-5" src="/imgs/savacha.png" alt="cart" />
            {totalPrice.toFixed(2)} So'm
          </Link>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-8"
          >
            <img src="/imgs/menu.png" alt="menu" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300
          ${menuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <span className="text-xl font-bold text-[#FF7010]">Меню</span>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-5 px-6 py-6">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-bold text-[#FF7010]"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
