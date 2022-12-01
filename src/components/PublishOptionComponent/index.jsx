import { FORM_FIELD_TYPE } from "constants/FormFieldType";
import React from "react";
import { withTranslation } from "react-i18next";
import FormComponent from "components/Form";

const PushlishOptionComponent = ({ formPropsData, viewModel, ...props }) => {
  const { t } = props;
  const data = [
    {
      name: "",
      fields: [
        {
          label: "Status",
          key: "status",
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: "",
          className:
            "col-12 d-flex justify-content-between align-items-center mb-16",
          required: true,
          validation: "required",
          labelClassName: "fw-normal",
        },
        {
          label: "Access",
          key: "access",
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: "",
          labelClassName: "fw-normal",
          className:
            "col-12 d-flex justify-content-between align-items-center mb-16",
        },
      ],
    },
    {
      name: "Featured",
      fields: [
        {
          label: "",
          key: "featured",
          type: FORM_FIELD_TYPE.CHECKBOX,
          value: "no",
          className: "col-12 mb-16",
          option: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
        },
        // {
        //   label: "Start publish",
        //   key: "start_publish",
        //   type: FORM_FIELD_TYPE.DATE,
        //   value: "",
        //   labelClassName: "fw-normal",
        //   className: "col-12 d-flex justify-content-between align-items-center",
        // },
        {
          label: "Author",
          key: "author",
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: "",
          labelClassName: "fw-normal",
          className:
            "col-12 d-flex justify-content-between align-items-center mb-16",
        },
      ],
    },
  ];
  return (
    <div className="bg-white rounded-1 p-24 shadow-sm">
      <h3 className="fs-6 fw-bold text-uppercase pb-16 border-bottom mb-24">
        {t("txt_publish_options")}
      </h3>
      {data.map((item, index) => {
        return (
          <div className={`${index && "mt-24 pt-16 border-top"}`}>
            {item.name && (
              <h4 className="fs-6 fw-semibold mb-16">{item.name}</h4>
            )}
            <FormComponent
              key={Math.random(40, 200)}
              formPropsData={formPropsData}
              viewModel={viewModel}
              generateFormSetting={() => [{ fields: item.fields }]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default withTranslation("common")(PushlishOptionComponent);
