import React, { useRef, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import './index.scss';

const ComponentTooltip = ({ children, title }) => {
  const textInput = useRef(null);

  useEffect(() => {
    new Tooltip(textInput.current);
  }, []);

  return (
    <div data-bs-toggle="tooltip" title={title} ref={textInput}>
      {children}
    </div>
  );
};

export default ComponentTooltip;
