import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './colors.css';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorScreen } from "./components/ErrorScreen/ErrorScreen";
import {StateMachine} from "./states/StateMachine";

const handleError = (error, errorInfo) => {
  console.error(error, errorInfo);
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <ErrorBoundary
      fallback={<ErrorScreen />}
      onError={handleError}
    >
      <StateMachine />
    </ErrorBoundary>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
