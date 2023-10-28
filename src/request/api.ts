import { get, post } from "./https";

export const search = (param: object) => get("/cloudsearch", param);