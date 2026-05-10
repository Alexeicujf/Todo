import type { Middleware } from '@reduxjs/toolkit'

export const Logger:  Middleware =  (store) => (next) => (action) => {
      console.log("dispatching", action);
      let result = next(action);
      console.log("next state", store.getState());
      return result;
}