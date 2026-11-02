import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../features/cart/cartSlice";

const AddToCart = () => {
  const allCartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  console.log("allcartitems: ", allCartItems);

  const totalCartItems = allCartItems.reduce((sum, eachCartItem) => {
    return sum + eachCartItem.quantity * eachCartItem.price;
  }, 0);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Simple Store
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Your Shopping Cart
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review your items before checking out.
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/");
            }}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 cursor-pointer sm:self-auto"
          >
            <span>←</span>
            Continue Shopping
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {allCartItems.length == 0 ? (
          /* Empty cart */
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
              🛒
            </div>

            <h2 className="mt-5 text-xl font-bold">Your cart is empty</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Looks like you haven't added anything yet. Explore our collection
              and find something you love.
            </p>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 cursor-pointer"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <section className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Cart Items</h2>
                <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-600 ring-1 ring-gray-200">
                  {allCartItems.length} products
                </span>
              </div>

              {allCartItems.map((eachCartItem) => {
                return (
                  <article
                    key={eachCartItem.id}
                    className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:p-5"
                  >
                    {/* Product image */}
                    <div className="flex h-40 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-4 sm:w-40">
                      <img
                        className="h-full w-full object-contain"
                        src={eachCartItem.images[0]}
                        alt={eachCartItem.title}
                        loading="lazy"
                      />
                    </div>

                    {/* Product information */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {eachCartItem.category}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900">
                        {eachCartItem.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Quantity:{" "}
                        <span className="font-semibold text-gray-800">
                          {eachCartItem.quantity}
                        </span>
                      </p>

                      <p className="mt-3 text-sm text-gray-500">
                        Price per item
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        ${eachCartItem.price.toFixed(2)}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="mt-1 text-base font-bold text-gray-900">
                            $
                            {(
                              eachCartItem.quantity * eachCartItem.price
                            ).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeFromCart(eachCartItem.id))
                          }
                          className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 cursor-pointer"
                        >
                          Remove item
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Order summary */}
            <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold">Order Summary</h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-gray-500">Products</span>
                  <span className="font-medium text-gray-900">
                    {allCartItems.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-gray-500">Total quantity</span>
                  <span className="font-medium text-gray-900">
                    {allCartItems.reduce(
                      (sum, eachCartItem) => sum + eachCartItem.quantity,
                      0,
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm font-medium text-gray-600">
                      Grand Total
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                      ${totalCartItems.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-5 rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                Your order total is calculated from the items currently in your
                cart.
              </p>

              <button
                onClick={() => {
                  navigate("/");
                }}
                className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 cursor-pointer"
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
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

export default AddToCart;
