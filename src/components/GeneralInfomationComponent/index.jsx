import React from 'react';
import { renderingGroupFieldHandler } from 'utils/form';

function GeneralInformation({ validator, generateFormSetting }) {
  return (
    <div className="rounded-1 bg-white p-24 shadow-sm">
      {Object.keys(generateFormSetting)
        .map((groupIndex) => {
          return [...Array(generateFormSetting[groupIndex])].map((group) => {
            return renderingGroupFieldHandler(group, validator);
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, [])}
    </div>
  );
}

export default GeneralInformation;
