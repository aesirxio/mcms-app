import FormComponent from "components/Form";
import React from "react";

function GeneralInformation({ store, viewModel, generateFormSetting }) {
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
