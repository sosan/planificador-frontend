import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// -----------
// const EVENTS_TO_MODIFY = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel'];

// const originalAddEventListener = document.addEventListener.bind(this);
// document.addEventListener = (type: any, listener: any, options: any, wantsUntrusted: any) => {
//   let modOptions = options;
//   if (EVENTS_TO_MODIFY.includes(type)) {
//     if (typeof options === 'boolean') {
//       modOptions = {
//         capture: options,
//         passive: false,
//       };
//     } else if (typeof options === 'object') {
//       modOptions = {
//         passive: false,
//         ...options,
//       };
//     }
//   }

//   return originalAddEventListener(type, listener, modOptions);
// };

// const originalRemoveEventListener = document.removeEventListener.bind(this);
// document.removeEventListener = (type: any, listener: any, options: any) => {
//   let modOptions = options;
//   if (EVENTS_TO_MODIFY.includes(type)) {
//     if (typeof options === 'boolean') {
//       modOptions = {
//         capture: options,
//         passive: false,
//       };
//     } else if (typeof options === 'object') {
//       modOptions = {
//         passive: false,
//         ...options,
//       };
//     }
//   }
//   return originalRemoveEventListener(type, listener, modOptions);
// };

// -------------
ReactDOM.render(
  <React.StrictMode>
    <App showLoading={true} setShowLoading={true}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
