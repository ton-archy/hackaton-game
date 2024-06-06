import {get} from "./index";

export const getScript = (id) => {
  return get(`script/${id}`);
}
