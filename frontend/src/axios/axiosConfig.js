import axios from 'axios'

const axiosConfig=axios.create(
    {
        baseURL:'http://localhost:3001'
    }

)

export default axiosConfig;