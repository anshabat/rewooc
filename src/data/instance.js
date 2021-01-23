import axios from 'axios'
import {Config} from '../config';

export const instance = axios.create({
  baseURL: Config.apiUrl
})