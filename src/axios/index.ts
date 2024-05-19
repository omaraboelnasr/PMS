import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://upskilling-egypt.com:3003/api/v1',
})

export default axiosInstance