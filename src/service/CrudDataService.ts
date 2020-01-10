import axios from 'axios';
class CrudDataService{
	getAll(url:any){
		return CrudDataService.get(url);
	}
	getById(url:any,id:String){
		return CrudDataService.get(url+id)
	}
	create(url:any,data:any){
		return CrudDataService.post(url,data);
	}
	update(url:any,data:any){
		return CrudDataService.post(url,data);
	}
	getConfigUrl(url:any){
		return CrudDataService.get(url);
	}
	static delete(url:any,data:any){
		return axios.delete(url,data);
	}
	static post(url:any,data:any){
		return axios.post(url,data);
	}
	static get(url:any){
		return axios.get(url);
	}
}

export default new CrudDataService();