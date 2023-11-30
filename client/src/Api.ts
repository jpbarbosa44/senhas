import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-gaapo-i2ddno6wla-uw.a.run.app'
}) 

export default class Rotas {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAll(url: string, data: any) {
        return api.get(url, data)
    }

    get(url: string, id: string) {
        const getUrl = `${url}/${id}` 
        return api.get(getUrl)
    }

    post(url: string, data: unknown) {
        console.log(data)
        return api.post(url, data)
    }



    delete(url: string, id: string) {
        const DeleteUrl = `${url}/${id}` 
        return api.delete(DeleteUrl)
    }
}