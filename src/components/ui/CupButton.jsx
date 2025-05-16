const CupButton = ({ imagen, setActiveCup }) => {
  const imageClass = {
    small: "bg-[url('/assets/small.svg')]",
    medium: "bg-[url('/assets/medium.svg')]",
    large: "bg-[url('/assets/large.svg')]",
  }[imagen];

  return (
    <div
      onClick={() => setActiveCup(imagen)}
      className={`mb-4 ${imageClass} bg-no-repeat bg-auto bg-bottom cursor-pointer h-10 w-14 p-2 `}
    ></div>
  );
};

export default CupButton;
