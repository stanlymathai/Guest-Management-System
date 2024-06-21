import axios from "axios";

export const HTTP = axios.create({
    timeout: 10000
  });

export default HTTP
