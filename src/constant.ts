/* export const API = "http://localhost:1337/api";
export const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";
 */

export const API =
  process.env.REACT_APP_HOST ||
  "https://strapi-production-6903.up.railway.app/api";
export const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";
