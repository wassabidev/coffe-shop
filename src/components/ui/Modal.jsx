import { formatPrice } from "@/utils/price";
import { formatDate } from "@/utils/date";
const Modal = ({ setShowModal, order }) => {
  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/55 "
    >
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <img
          src="/assets/logocat.svg"
          className="absolute -top-10 left-[44%] w-14 h-14"
          alt=""
        />
        <h2 className="text-center text-xl font-bold">Orden existosa!</h2>
        <hr className="my-4 border-t border-gray-200" />
        <div className="bg-gray-100 rounded-lg grid">
          <div className="grid-cols-1 md:grid-cols-2 grid md:gap-y-4 p-4">
            <p className="font-medium">Fecha y hora: </p>
            <p className="md:text-right">{formatDate(order.createdAt)}</p>
            <p className="font-medium mt-2 md:mt-0">Id de orden:</p>
            <p className="md:text-right">{order._id}</p>
            <p className="font-medium mt-2 md:mt-0">Total:</p>
            <p className="md:text-right">{formatPrice(order.total)}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
