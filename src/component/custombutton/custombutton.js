import "./custombutton.element.css";

const Custombutton = ({ type, name }) => {
  return (
    <button
      className={(type === 1 ? `primary` : `secondary`) + ` btnContainer`}
    >
      {name}
    </button>
  );
};

export default Custombutton;
