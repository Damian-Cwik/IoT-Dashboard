import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { IData } from '../modules/models/data.model';


class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();


    constructor() {
        this.initializeRoutes();
    }


    private initializeRoutes() {
        this.router.get(`${this.path}/get`, this.getAll);
        this.router.post(`${this.path}/add`, this.postAdd);
        this.router.delete(`${this.path}/delete/:id`, this.deleteData);
    }

    private getAll = async (request: Request, response: Response) => { 
        try {
            const data: IData[] = await this.dataService.getAll();
            response.json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
    
    private postAdd = async (request: Request, response: Response) => {
        try {
            const data: IData = request.body;
            const result = await this.dataService.postAdd(data);
            response.status(201).json({ message: 'Data added successfully', data: result });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    };
    private deleteData = async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
            await this.dataService.deleteData(id);
            response.status(200).json({ message: 'Data deleted successfully' });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }   
}


export default DataController;