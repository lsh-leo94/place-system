import axios from 'axios';
import { GOOGLE_AUTOCOMPLETE_BASEURL } from '../constant/api';

export const googleInstance = axios.create({
  baseURL: GOOGLE_AUTOCOMPLETE_BASEURL
})