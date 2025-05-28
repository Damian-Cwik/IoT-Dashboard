import { date } from 'joi';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router, response } from 'express';
import { parse } from 'path';
import { checkIdParam } from '../middlewares/deviceIdParam.middleware';
import DataService from '../modules/services/data.service';
import { config } from '../config';
import { IData } from '../modules/models/data.model';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getDataById);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getLatestDataById);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.getDataInRange);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.delete(`${this.path}/all`, this.deleteAllData);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.deleteData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        const latestData = await this.dataService.getAllNewest();
        response.status(200).json(latestData);
    }

    private getDataById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    };

    private getDataInRange = async (request: Request, response: Response) => {
        const { id, num } = request.params;
        const idx = parseInt(num);
        const data = await this.dataService.query(id);
        const latestData = data.slice(0, idx);

        response.status(200).json(latestData);
    }

    private getLatestDataById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const latestData = await this.dataService.query(id);
        const lastIdx = latestData.length;

        response.status(200).json(latestData[lastIdx]);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;

        const data: { temperature: number, pressure: number, humidity: number, deviceId: number, readingDate: any } = {
            temperature: air[0].value,
            pressure: air[1].value,
            humidity: air[2].value,
            deviceId: parseInt(id),
            readingDate: new Date()
        }

        try {
            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private deleteAllData = async (request: Request, response: Response) => {
        for(let i = 0; i < config.supportedDevicesNum; i++){
            await this.dataService.deleteData(i);
        }
        response.status(200).json("Data deleted");
    }

    private deleteData = async (request: Request, response: Response) => {
        const { id } = request.params;
        await this.dataService.deleteData(parseInt(id));

        response.status(200).json("Data deleted");
    }
}

export default DataController;

