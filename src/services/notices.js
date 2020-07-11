import { request } from "../utils";

export default {
  name: "notice",
  request: request(),
  add: function (data) {
    return this.request.post(this.name, data);
  },
  list: function () {
    return this.request.get(this.name);
  },
  get: function (id) {
    return this.request.get(`${this.name}/${id}`);
  },
  update: function (data, id) {
    return this.request.put(`${this.name}/${id}`, data);
  },
};
