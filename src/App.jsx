import React from 'react';

import './scss/app.scss';

import RouterLayout from './layouts/RouterLayout';
import ErrorBoundary from './layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import { ThemesContext, ThemesContextProvider } from 'themes/ThemeContextProvider';
import '@kakahuy113/test-dam-app/dist/index.css';
import '@kakahuy113/test-dam-app/dist/app.css';
import { configure } from 'mobx';
configure({
  enforceActions: 'never',
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemesContextProvider>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <RouterLayout />
          </I18nextProvider>
        </ErrorBoundary>
      </ThemesContextProvider>
    );
  }
}
App.contextType = ThemesContext;
export default App;
