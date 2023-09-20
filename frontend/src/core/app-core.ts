import { defaultGateway } from './axios/instances'

export const axiosDefaultInstance = defaultGateway

export class AppCore{
    public static async isTokenValid(){
        try {
            await axiosDefaultInstance.get('/managements/whoami')
            return true
        } catch (error) {
            return false
        }
        
    }
}