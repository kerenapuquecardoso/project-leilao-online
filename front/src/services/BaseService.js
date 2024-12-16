import api from  '../config/axiosConfig';

class BaseService{

    constructor(endPoint){
        this.api = api;
        this.endPoint = endPoint;
    }

    async insert(data) {
        const response = await this.api.post(this.endPoint, data);
        return  response.data;
    }
    
    async update(data){
        const response = await this.api.put(this.endPoint, data);
        return  response.data;
    }

    async delete(id){
        const response = await this.api.delete(`${this.endPoint}/${id}`);
    }

    async list(){
        const response = await this.api.get(this.endPoint);
        return response.data;
    }

}

export default BaseService;