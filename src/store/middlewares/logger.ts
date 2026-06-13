import type { Middleware } from '@reduxjs/toolkit'
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Logger:  Middleware =  (_stor) => (next) => (action) => {
      const result = next(action);
      return result;
}