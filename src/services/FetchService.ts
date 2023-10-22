import axios from "axios";
// @ts-ignore
import { API_TOKEN } from "@dotenv";

class Fetch {
  headers = {
    Authorization: `Bearer ${API_TOKEN}`,
  };

  async getData(
    url: string,
    params: {
      limit: number;
      p: number;
      q: string | void;
      world: "de";
    }
  ) {
    try {
      const data = await axios({
        params,
        method: "GET",
        baseURL: url,
        headers: this.headers,
      });
      return data.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default new Fetch();
