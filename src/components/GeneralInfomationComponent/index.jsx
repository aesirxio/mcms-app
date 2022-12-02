import FormComponent from "components/Form";
import { FORM_FIELD_TYPE } from "constants/FormFieldType";
import React from "react";

function GeneralInformation({ store, viewModel }) {
  const generateFormSetting = () => {
    return [
      {
        fields: [
          {
            label: "Name",
            key: "name",
            type: FORM_FIELD_TYPE.INPUT,
            value: store?.formPropsData ? store?.formPropsData.name : "",
            className: "col-12",
            required: true,
            validation: "required",
            changed: (data) => {
              store.formPropsData["name"] = data.target.value;
            },
          },
          {
            label: "Alias",
            key: "alias",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
          },

          {
            label: "Organisation",
            key: "organisation",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Select Organisation",
          },
          {
            label: "Content Type",
            key: "content_type",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Select Content Type",
          },
          {
            label: "Parent Category",
            key: "parent_category",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Top Level",
          },
          {
            label: "Default Template",
            key: "default_template",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Inherit",
          },
          {
            label: "Category",
            key: "category",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
          },
          {
            label: "Tags",
            key: "tags",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
          },
          {
            label: "Version Note",
            key: "version_note",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12 mb-0",
          },
        ],
      },
    ];
  };
  return (
    <div className="rounded-1 bg-white p-24 shadow-sm">
      <FormComponent
        key={Math.random(40, 200)}
        formPropsData={store?.formPropsData}
        viewModel={viewModel}
        generateFormSetting={() => generateFormSetting()}
      />
    </div>
  );
}

export default GeneralInformation;
