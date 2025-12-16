import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./page/layout/Layout"
import HomePage from "./page/home/HomePage"
import AksiyaPage from "./page/aksiya/AksiyaPage"
import PizzaPage from "./page/pizza/PizzaPage"
import SushiPage from "./page/sushi/SushiPage"
import NapitkuPage from "./page/napitka/NapitkuPage"
import ZakuskiPage from "./page/zakuska/ZakuskiPage"
import KomboPage from "./page/kombo/KomboPage"
import DesertPage from "./page/desert/DesertPage"
import SousePage from "./page/souse/SousePage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='aksiya' element={<AksiyaPage />} />
          <Route path='pizza' element={<PizzaPage />} />
          <Route path='sushi' element={<SushiPage />} />
          <Route path='napitka' element={<NapitkuPage />} />
          <Route path='zakuski' element={<ZakuskiPage />} />
          <Route path='kombo' element={<KomboPage />} />
          <Route path='desert' element={<DesertPage />} />
          <Route path='souse' element={<SousePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App  