const CupButton = ({ imagen, setActiveCup }) => {
  return (
    <div
      onClick={() => setActiveCup(imagen)}
      className={`mb-4 bg-[url('/assets/${imagen}.svg')] bg-no-repeat bg-auto bg-bottom cursor-pointer h-10 w-14 p-2 `}
    ></div>
  );
};

export default CupButton;
