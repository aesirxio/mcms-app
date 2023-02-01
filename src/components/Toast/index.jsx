import React from 'react';
import { Translation } from 'react-i18next';

import { ToastContainer, toast } from 'react-toastify';

import './index.scss';

const Toast = () => {
  return <ToastContainer autoClose={false} hideProgressBar={true} />;
};

const notify = (msg, type = 'success') => {
  switch (type) {
    case 'error':
      toast.error(
        <div>
          <Translation ns="common">{(t) => <p className="mb-1">{t('txt_error')}</p>}</Translation>
          <Translation ns="common">
            {(t) => <span className="fw-normal">{t(msg)}</span>}
          </Translation>
        </div>,
        {
          className: 'bg-red-10 fw-bold text-red-100 ps-4',
          icon: () => (
            <img alt="error" src="/assets/images/icon_error.png" width={48} height={48} />
          ),
        }
      );
      break;
    case 'warn':
      toast.warn(
        <div>
          <Translation ns="common">{(t) => <p className="mb-1">{t('txt_warning')}</p>}</Translation>
          <Translation ns="common">
            {(t) => <span className="fw-normal">{t(msg)}</span>}
          </Translation>
        </div>,
        {
          className: 'bg-yellow-10 fw-bold text-yellow-200 ps-4',
          icon: () => (
            <img alt="warn" src="/assets/images/icon_warning.png" width={48} height={48} />
          ),
        }
      );
      break;
    case 'success':
      toast.success(
        <div>
          <Translation ns="common">
            {(t) => <p className="mb-1">{t('txt_successful')}</p>}
          </Translation>
          <Translation ns="common">
            {(t) => <span className="fw-normal">{t(msg)}</span>}
          </Translation>
        </div>,
        {
          className: 'bg-primary-10 text-green fw-bold ps-4',
          icon: () => (
            <img alt="success" src="/assets/images/icon_success.png" width={48} height={48} />
          ),
        }
      );
      break;
    case 'promise':
      toast.promise(
        msg,
        {
          pending: {
            render() {
              return (
                <div className={`position-absolute top-50 start-50 translate-middle`}>
                  <div
                    className="spinner-border"
                    style={{ width: '1rem', height: '1rem' }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ps-2">Loading</span>
                </div>
              );
            },
            icon: true,
          },
          success: 'Complete. 👌',
          error: 'Error! 🤯',
        },
        {
          className: 'bg-dark',
        }
      );
      break;

    default:
      toast.info(msg, {
        className: 'bg-info',
      });
      break;
  }
};

const notifyHTML = (text, type = 'success') => {
  switch (type) {
    case 'error':
      toast.error(<div className="text-white" dangerouslySetInnerHTML={{ __html: text }} />, {
        className: 'bg-danger',
      });
      break;

    case 'success':
      toast.success(<div className="text-white" dangerouslySetInnerHTML={{ __html: text }} />, {
        className: 'bg-success',
      });
      break;

    default:
      toast.success(<div className="text-white" dangerouslySetInnerHTML={{ __html: text }} />, {
        className: 'bg-success',
      });
      break;
  }
};

export { Toast, notify, notifyHTML };
