import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const [limit, setLimit] = useState(0);
  const [searchProduct, setSearchProduct] = useState("");
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);

  // Minimal loading state for the product loader
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  async function getProduct() {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}`
      );

      setProductData(response.data.products);
      setFilteredProductData(response.data.products);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [limit]);

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  function handleDecreaseQuantity(productId) {
    dispatch(decreaseQuantity(productId));
  }

  function handleProductSearch() {
    const filteredProductDataResponse = productData.filter(
      (eachProductItem) => {
        return (
          eachProductItem.title
            .toLowerCase()
            .includes(searchProduct.toLowerCase()) ||
          eachProductItem.category
            .toLowerCase()
            .includes(searchProduct.toLowerCase()) ||
          eachProductItem.tags.some((item) =>
            item.toLowerCase().includes(searchProduct.toLowerCase())
          ) ||
          (eachProductItem.brand || "").includes(
            searchProduct.toLowerCase()
          )
        );
      }
    );

    setFilteredProductData(filteredProductDataResponse);
  }

  const totalCartItems = cartItems.reduce(
    (sum, eachProductItemFromCart) => {
      console.log("hello world!");
      return sum + eachProductItemFromCart.quantity;
    },
    0
  );

  console.log("total cart item:", totalCartItems);
  console.log("search product input: ", searchProduct);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Simple Store
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Ecommerce Website
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Find something you’ll love.
            </p>
          </div>

          <Link
            to="/addToCart"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 sm:self-auto"
          >
            <span>🛒</span>
            <span>View Cart</span>
            <span className="rounded-lg bg-white/15 px-2 py-1 text-xs">
              {totalCartItems}
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Search and filters */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Explore products</h2>
              <p className="mt-1 text-sm text-gray-500">
                Search and browse the available collection.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Products found:{" "}
              <span className="font-semibold text-gray-900">
                {filteredProductData.length}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Product limit */}
            <div>
              <label
                htmlFor="product-limit"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Product limit
              </label>
              <input
                id="product-limit"
                value={limit}
                type="number"
                placeholder="Enter product limit"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
              />
            </div>

            {/* Search input */}
            <div>
              <label
                htmlFor="product-search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search products
              </label>
              <input
                id="product-search"
                onChange={(e) => {
                  setSearchProduct(e.target.value);
                }}
                value={searchProduct}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                type="text"
                placeholder="Search by name or category..."
              />
            </div>

            {/* Search button */}
            <div className="flex items-end">
              <button
                onClick={handleProductSearch}
                className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 cursor-pointer"
              >
                🔎 Search products
              </button>
            </div>
          </div>
        </section>

        {/* Product listing */}
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">
              Our collection
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProductData.length} items
            </span>
          </div>

          {/* Simple loader */}
          {isLoading ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"
                role="status"
                aria-label="Loading products"
              />
              <p className="mt-4 text-sm font-medium text-gray-600">
                Loading products...
              </p>
            </div>
          ) : filteredProductData.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
              <p className="text-lg font-semibold">No products found</p>
              <p className="mt-2 text-sm text-gray-500">
                Try another search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProductData.map((item) => {
                const cartItem = cartItems.find(
                  (eachCartItem) => eachCartItem.id === item.id
                );

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
                  >
                    {/* Product image */}
                    <div className="flex h-56 items-center justify-center bg-gray-50 p-5">
                      <img
                        className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                        src={item.images[0]}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {item.category}
                      </p>

                      <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="text-xl font-bold text-gray-900">
                          ${item.price}
                        </span>

                        <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {item.brand || "Popular pick"}
                        </span>
                      </div>

                      {/* Cart controls */}
                      <div className="mt-5">
                        {cartItem ? (
                          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-1.5">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(item.id)
                              }
                              aria-label={`Decrease quantity of ${item.title}`}
                              className="flex h-9 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl font-medium transition hover:bg-gray-200 cursor-pointer"
                            >
                              −
                            </button>

                            <span className="text-sm font-semibold">
                              {cartItem.quantity}
                            </span>

                            <button
                              onClick={() => handleAddToCart(item)}
                              aria-label={`Increase quantity of ${item.title}`}
                              className="flex h-9 w-10 items-center justify-center rounded-lg bg-gray-900 text-xl font-medium text-white transition hover:bg-gray-700 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center text-sm text-gray-500 sm:px-8">
          Simple Store · A clean and simple shopping experience
        </div>
      </footer>
    </div>
  );
};

export default Home;