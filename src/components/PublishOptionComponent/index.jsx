import React from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';

const PushlishOptionComponent = ({ validator, formPublish, ...props }) => {
  const { t } = props;

  return (
    <div className="bg-white rounded-1 p-24 shadow-sm">
      <h3 className="fs-6 fw-bold text-uppercase pb-16 border-bottom mb-24">
        {t('txt_publish_options')}
      </h3>
      {Object.keys(formPublish)
        .map((groupIndex) => {
          return [...Array(formPublish[groupIndex])].map((group) => {
            return renderingGroupFieldHandler(group, validator);
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, [])}
    </div>
  );
};

export default withTranslation('common')(PushlishOptionComponent);
