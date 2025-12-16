import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/UI/Loading';

function HomePage() {
  const [categoris, setCategoris] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  async function getCategoris() {
    try {
      const res = await axios.get("https://693d1ae6f55f1be79301e90f.mockapi.io/categories");
      setCategoris(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategoris();
  }, []);

  async function getProducts() {
    try {
      const res = await axios.get("https://693d1ae6f55f1be79301e90f.mockapi.io/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    getProducts().finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 md:px-10 py-6">

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 justify-center">
        {categoris.map((el) => (
          <div
            key={el.id}
            onClick={() => {
              setSelectCategoryId(String(el.id));
              document.getElementById(`cat-${el.id}`)?.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
              });
            }}
            id={`cat-${el.id}`}
            className={`
        flex-shrink-0 w-32 md:w-36 h-36 p-5 rounded-2xl flex flex-col items-center justify-center
        cursor-pointer transition-all duration-300 transform
        ${selectCategoryId === String(el.id)
                ? 'bg-orange-800 text-white shadow-2xl scale-110'
                : 'bg-amber-50 text-gray-800 shadow-md hover:scale-110 hover:shadow-2xl hover:translate-y-[-4px] hover:bg-orange-100'
              }
      `}
          >
            <img
              className={`
          w-12 h-12 md:w-16 md:h-16 mb-2 object-contain transition-transform duration-300
          ${selectCategoryId === String(el.id) ? 'scale-110' : 'hover:scale-125'}
        `}
              src={el.icon}
              alt={el.title}
            />
            <h4 className="text-center text-[16px] md:text-[18px] font-semibold mt-2 transition-colors duration-300">
              {el.title}
            </h4>
          </div>
        ))}
      </div>


      {/* Search */}
      <div className="max-w-2xl mx-auto flex mt-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="flex-1 rounded-l-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-r-xl transition-colors duration-300">
          Search
        </button>
      </div>

      {/* Featured / Selected Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
        {loading ? (
          <Loading />
        ) : (
          (() => {
            const q = searchTerm.trim().toLowerCase();
            let list = products;
            if (selectCategoryId) list = list.filter((p) => String(p.categoryId) === String(selectCategoryId));
            else list = list.filter((p) => p.badge === 'NEW');
            if (q) list = list.filter((p) => String(p.title).toLowerCase().includes(q));
            return list.map((prod) => <ProductCard key={prod.id} product={prod} />);
          })()
        )}
      </div>

      {/* Categories with Products */}
      {categoris.map((el) => {
        const filteredProducts = products.filter((p) => String(p.categoryId) === String(el.id) && (!searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase())));
        if (!filteredProducts.length) return null;

        return (
          <div key={el.id} className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">{el.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default HomePage;
