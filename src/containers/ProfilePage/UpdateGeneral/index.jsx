import React, { observer } from 'mobx-react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Storage from 'aesirx-dma-lib/src/Utils/Storage';
import 'react-datepicker/dist/react-datepicker.css';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import FormComponent from '../../../components/Form';
// import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
// import Spinner from '../../../components/Spinner';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import '../index.scss';
import SubmitButton from '../Layout/SubmitButton';
import { witheProfileViewModel } from '../ProfileViewModel/ProfileViewModelContextProvider';
import AvatarDAM from '../Layout/AvatarDAM';
// import ComponentImage from 'components/ComponentImage';
// import Button from 'components/Button';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import Spinner from 'components/Spinner';
import FormImage from 'components/Form/FormImage';
// import ComponentImage from 'components/ComponentImage';

const UpdateGeneral = observer(
  class UpdateGeneral extends Component {
    updateGeneralViewModel = null;
    formPropsData = {
      [UPDATE_GENERAL_FIELD_KEY.ID]: Storage.getItem('member_id'),
      [UPDATE_GENERAL_FIELD_KEY.USERNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]: '',
      [UPDATE_GENERAL_FIELD_KEY.FULLNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.EMAIL]: '',
      [UPDATE_GENERAL_FIELD_KEY.BIRTHDAY]: '',
      [UPDATE_GENERAL_FIELD_KEY.PHONE]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]: '',
      [UPDATE_GENERAL_FIELD_KEY.ZIPCODE]: '',
      [UPDATE_GENERAL_FIELD_KEY.CITY]: '',
      [UPDATE_GENERAL_FIELD_KEY.STATE]: '',
      [UPDATE_GENERAL_FIELD_KEY.COUNTRY]: '',
      [UPDATE_GENERAL_FIELD_KEY.TIMEZONE]: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        getUrlImage: '',
      };
      this.validator = new SimpleReactValidator();
      const { viewModel } = props;
      this.updateGeneralViewModel = viewModel ? viewModel.getUpdateGeneralViewModel() : null;
      this.updateGeneralViewModel.setAllValue(this);
      this.validateInfoBeforeSending = this.validateInfoBeforeSending.bind(this);
      this.handleDamAssets = this.handleDamAssets.bind(this);
      this.updateGeneralViewModel.setForm(this);
    }

    componentDidMount() {
      this.updateGeneralViewModel.initializeData();
    }

    handleDamAssets(data) {
      if (data[0].extension !== 'mp4') {
        this.setState({
          getUrlImage: data,
        });
        this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = data[0].url;
      }
    }

    saveGeneralHandler = () => {
      this.updateGeneralViewModel.saveGeneralInformationOnPage();
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('password');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        this.setState({ loading: true });
        this.saveGeneralHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
    };

    clearImage = (defaultImage) => {
      this.setState({
        getUrlImage: '',
      });
      this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = defaultImage;
    };

    generateFormSetting = () => {
      return [
        {
          fields: [
            {
              label: 'txt_Username',
              key: UPDATE_GENERAL_FIELD_KEY.USERNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME],
              className: 'col-6',
              readOnly: true,
            },
            {
              label: 'txt_Email',
              key: UPDATE_GENERAL_FIELD_KEY.EMAIL,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.EMAIL],
              className: 'col-6',
              readOnly: true,
            },

            {
              label: 'txt_Fullname',
              key: UPDATE_GENERAL_FIELD_KEY.FULLNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] = event.target.value;
              },
            },
            {
              label: 'txt_Phone',
              key: UPDATE_GENERAL_FIELD_KEY.PHONE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE] = event.target.value;
              },
            },
            {
              label: 'txt_Address_1',
              key: UPDATE_GENERAL_FIELD_KEY.ADDRESS,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS] = event.target.value;
              },
            },
            {
              label: 'txt_Address_2',
              key: UPDATE_GENERAL_FIELD_KEY.ADDRESS_2,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2] = event.target.value;
              },
            },
            {
              label: 'txt_City',
              key: UPDATE_GENERAL_FIELD_KEY.CITY,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY] = event.target.value;
              },
            },
            {
              label: 'txt_State',
              key: UPDATE_GENERAL_FIELD_KEY.STATE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE] = event.target.value;
              },
            },
            {
              label: 'txt_Country',
              key: UPDATE_GENERAL_FIELD_KEY.COUNTRY,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY] = event.target.value;
              },
            },
            {
              label: 'txt_Zipcode',
              key: UPDATE_GENERAL_FIELD_KEY.ZIPCODE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE] = event.target.value;
              },
            },
          ],
        },
      ];
    };
    render() {
      let { getUrlImage } = this.state;
      const { memberInfo } = this.updateGeneralViewModel;
      return (
        <>
          {!memberInfo ? (
            <Spinner />
          ) : (
            <div className="bg-white p-16 rounded-3">
              <div className="row">
                <FormComponent
                  formClassName={'col-9 row'}
                  generateFormSetting={() => this.generateFormSetting()}
                  formPropsData={this.formPropsData}
                  viewModel={this.updateGeneralViewModel}
                  key={Math.random(40, 200)}
                />

                <AvatarDAM>
                  <div
                    className={`position-relative  cursor-pointer wr_upload_images ${
                      getUrlImage.length > 0 ? 'active_img' : ''
                    }`}
                  >
                    {!getUrlImage && (
                      <FormImage
                        field={{
                          value: {
                            download_url: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM],
                            name: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME],
                          },
                          changed: (data) => this.handleDamAssets(data),
                        }}
                        hiddenDelete={true}
                      />
                    )}
                    {getUrlImage ? (
                      <>
                        <FormImage
                          field={{
                            value: {
                              download_url: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM],
                              name: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME],
                            },
                            changed: (data) => this.handleDamAssets(data),
                          }}
                          hiddenDelete={true}
                        />
                        <div
                          onClick={() => this.clearImage(memberInfo.avatar_dam)}
                          className={'clear_image_button'}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} className="text-white" />
                        </div>
                      </>
                    ) : null}
                  </div>
                </AvatarDAM>
                <SubmitButton validateInfoBeforeSending={this.validateInfoBeforeSending} />
              </div>
            </div>
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(witheProfileViewModel(UpdateGeneral));
