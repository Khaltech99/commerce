import PropTypes from "prop-types";

const ConfirmOrder = ({ isVisible, onClose, cartItems, totalPrice }) => {
  if (!isVisible) return null; // Don't render modal if it's not visible
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative m-5">
        <button
          className="absolute top-4 right-4 text-redFont font-bold text-lg"
          onClick={onClose}
        >
          <img src="/icons/icon-remove-item.svg" alt="" className="w-5 h-5  " />
        </button>
        <h2 className="text-2xl font-bold text-redFont mb-4">Your Cart</h2>
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
        <div className="flex bg-[#fcf9f7] p-3 mx-3 justify-center items-center rounded-lg mt-4">
          <img src="/icons/icon-carbon-neutral.svg" alt="" />
          <p className="text-sm whitespace-nowrap">
            This is a carbon-neutral delivery
          </p>
        </div>
        <button
          className="bg-redFont text-white text-base capitalize p-4 whitespace-nowrap rounded-full font-semibold mt-5 w-[100%] mx-auto"
          onClick={onClose}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};
ConfirmOrder.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default ConfirmOrder;
