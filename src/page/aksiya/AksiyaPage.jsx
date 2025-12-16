import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/UI/Loading';

function AksiyaPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://693d1ae6f55f1be79301e90f.mockapi.io/products"
      );

      // Filter only products marked with special badge for aksiya
      const aksiyaProducts = res.data.filter(
        (p) => p.badge === "NEW" || p.badge === "HOT"
      );
      setProducts(aksiyaProducts);
    } catch (err) {
      console.log(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-[28px] md:text-[32px] font-bold mb-8 text-gray-800">
          Акции
        </h2>

        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Hech qanday aksiya topilmadi</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AksiyaPage;
