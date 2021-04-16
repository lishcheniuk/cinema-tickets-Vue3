import { OrderType, UserType } from "../store/types";

function request(path: string, method = "GET", body?: any) {
  const options: any = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // const url = new URL("https://cinema-tickets.vercel.app");
  // url.pathname = path;

  return fetch(path, options).then((res: any) => {
    if (!res.ok) throw { status: res.status };
    return res.json();
  });
}

export default {
  fetchMovies() {
    return request("/api/films");
  },
  buyTickets(payload: OrderType) {
    return request("/api/films/time-table", "POST", payload);
  },
  login(user: UserType) {
    return request("/api/auth/login", "POST", user);
  },
  register(user: UserType) {
    return request("/api/auth/register", "POST", user);
  },
  fetchOrders(userId: string) {
    return request(`/api/auth/orders/${userId}`);
  },
};
