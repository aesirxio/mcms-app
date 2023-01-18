import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "./index.scss";

class Spinner extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`${this.props.className} d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle zindex-1 w-100 h-100`}
      >
        <MoonLoader color={`#1ab394`} size={`${this.props.size ?? "60px"}`} />
      </div>
    );
  }
}

export default Spinner;
