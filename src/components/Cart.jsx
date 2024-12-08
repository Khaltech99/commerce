import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmOrder from "./ConfrmOrder";
const Cart = ({ selectedItems, productData, count }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const cartItems = selectedItems.map((id) => {
    const product = productData.find((item) => item.id === id);
    return {
      ...product,
      quantity: count[id],
    };
  });

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * parseFloat(item.price.replace("$", ""));
  }, 0);

  return (
    <>
      <div className="w-full p-4 bg-white rounded-2xl mt-8 mb-8 flex flex-col justify-between md:flex-1 md:basis-1/3 md:mt-0">
        <h2 className="text-left text-redFont whitespace-nowrap text-2xl font-bold">
          Your Cart ({cartItems.length})
        </h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-baseline pb-3 border-gray-100 border-solid border-b-2"
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold capitalize">{item.title}</h3>
              <div className="flex justify-between items-center gap-1">
                <span className="text-sm text-redFont font-semibold">
                  {item.quantity}x
                </span>
                <span className="text-xs text-rose400">@{item.price}</span>
                <span className="text-xs text-rose400 font-semibold">
                  $
                  {(
                    item.quantity * parseFloat(item.price.replace("$", ""))
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <h4 className="text-sm text-gray-400">Order Total</h4>
          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="bg-redFont text-white text-base capitalize p-4 whitespace-nowrap rounded-full font-semibold mt-5"
          onClick={() => setModalVisible(true)}
        >
          Confirm Order
        </button>
      </div>

      {/* Modal Component */}
      <ConfirmOrder
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
    </>
  );
};
Cart.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.number).isRequired, // Array of selected product IDs
  productData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired, // Array of product objects
  count: PropTypes.objectOf(PropTypes.number).isRequired, // Object mapping product IDs to counts
};

Cart.defaultProps = {
  selectedItems: [],
  productData: [],
  count: {},
};

export default Cart;
