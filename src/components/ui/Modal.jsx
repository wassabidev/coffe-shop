import { formatPrice } from "@/utils/price";
import { formatDate } from "@/utils/date";
const Modal = ({ setShowModal, order }) => {
  console.log(order);

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
          <div className="grid-cols-2  grid gap-4 p-4">
            <p>Fecha y hora</p>
            <p className="text-right">{formatDate(order.createdAt)}</p>
            <p>id de orden</p>
            <p className="text-right">{order._id}</p>
            <p>total</p>
            <p className="text-right">{formatPrice(order.total)}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
