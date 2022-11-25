import axios from "axios";
import {  BaseUrl} from "./Base";
const instance = axios.create({
    baseURL: BaseUrl
    
  });



  export default instance;