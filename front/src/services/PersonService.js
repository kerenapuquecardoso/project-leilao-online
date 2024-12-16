import BaseService from "./BaseService";

class PersonService extends BaseService{

    constructor(){
        super('person');
    }

    async login(credentials){
        const response = await this.api.post(`${this.endPoint}/login`, credentials);
        return response.data;
    }

    async submit(data){
        const response = await this.api.post(`${this.endPoint}/save`, data);
        return response.data;
    }

    async changePassword(email){
        const response = await this.api.post(`${this.endPoint}/change-password`, email);
        return response.data;

    }

    async validRegister(email){
        const response = await this.api.get(`${this.endPoint}/validate-user?email=${email}`);
        console.log(response.data);
        return response.data
    }

    async updateAnewPassword(data){
        const response = await this.api.patch(`${this.endPoint}/update`, data);
        return response.data;
    }
}

export default PersonService;