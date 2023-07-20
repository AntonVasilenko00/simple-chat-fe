import axios from 'axios'
import envConfig from '@/shared/config/env'

const axiosInstance = axios.create({
	baseURL: envConfig.VITE_API_BASE_URL,
})

export default axiosInstance
