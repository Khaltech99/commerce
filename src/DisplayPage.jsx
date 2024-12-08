import { useState } from "react";
import { data } from "../data";
import Cart from "./components/Cart";

const DisplayPage = () => {
  const [isSelected, setIsSelected] = useState([]);
  const [count, setCount] = useState({});
  const [show, setShow] = useState(false);
  const showCartNumber = (id) => {
    setShow(true);
    setIsSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cardId) => cardId !== id);
      } else {
        setCount((prevCounts) => ({
          ...prevCounts,
          [id]: 1, // Start count from 1 when added to cart
        }));
        return [...prevSelected, id];
      }
    });
  };

  const increment = (id) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setCount((prevCounts) => {
      const currentCount = prevCounts[id] || 0;
      if (currentCount > 1) {
        return { ...prevCounts, [id]: currentCount - 1 }; // Decrease count
      } else {
        // Remove product from count and isSelected states if count goes to 0
        const { [id]: _, ...remainingCounts } = prevCounts;
        setIsSelected((prevSelected) =>
          prevSelected.filter((cardId) => cardId !== id)
        );
        return remainingCounts;
      }
    });
  };

  return (
    <>
      <div className="p-5 pb-0  font-redHat container md:m-auto md:pd-0">
        <h1 className="text-4xl font-bold md:text-4xl"> Dessert</h1>
        <div className="flex flex-col justify-center items-start gap-1 md:flex-row md:gap-2 ">
          <div className="mt-10 flex flex-col justify-center items-center md:flex-1 md:flex-row md:basis-2/3 md:flex-wrap gap-3 md:justify-between md:justify- ">
            {data.map((product) => (
              <div className="flex flex-col   gap-1 relative" key={product.id}>
                <div
                  className={
                    isSelected.includes(product.id)
                      ? "flex justify-center items-center border-2 border-solid border-redFont rounded-md"
                      : "flex justify-center items-center  "
                  }
                >
                  <img
                    src={product.img}
                    alt=""
                    className="rounded-xl w-screen mt-0 md:w-64   "
                  />

                  <>
                    {isSelected.includes(product.id) ? (
                      <div className="cursor-pointer bg-redFont absolute bottom-10 w-30 flex justify-between items-center gap-2 p-2 border-2 border-solid border-rose300 rounded-full mb-12 ">
                        <img
                          src="/icons/icon-decrement-quantity.svg "
                          alt=""
                          className="p-1 border-1 border-solid border-white rounded-full"
                          onClick={() => decrement(product.id)}
                        />
                        <p className="font-bold text-base whitespace-nowrap text-white">
                          {count[product.id] || 0}
                        </p>
                        <img
                          src="/icons/icon-increment-quantity.svg"
                          alt=""
                          onClick={() => increment(product.id)}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => showCartNumber(product.id)}
                        className="cursor-pointer absolute bottom-10 w-30 flex justify-between items-center gap-2 p-2 border-2 border-solid border-rose300 rounded-full mb-12 bg-white"
                      >
                        <img src="/icons/icon-add-to-cart.svg" alt="" />
                        <p className="font-bold text-base whitespace-nowrap">
                          Add to cart
                        </p>
                      </div>
                    )}
                  </>
                </div>
                <div className="mt-7">
                  <p className="text-base text-rose300 capitalize font-semibold">
                    {product.title}
                  </p>
                  <p className="text-base font-bold text-balance capitalize">
                    {product.desc}
                  </p>
                  <p className="text-base text-redFont font-semibold capitalize">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!show ? (
            <div className=" w-full p-3 px-3 bg-white rounded-2xl mt-8 mb-8 flex flex-col justify-between items-center md:flex-1 md:basis-1/3 md:mt-0 md:">
              <h2 className=" text-left text-redFont whitespace-nowrap text-3xl font-bold">
                Your Cart {"(0)"}
              </h2>
              <img
                src="/icons/illustration-empty-cart.svg"
                alt=""
                className="w-52 h-52 "
              />

              <span className="text-base text-rose300 whitespace-nowrap">
                Your added items will appear here
              </span>
            </div>
          ) : (
            <Cart selectedItems={isSelected} productData={data} count={count} />
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayPage;
