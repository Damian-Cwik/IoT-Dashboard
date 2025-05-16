import { date } from 'joi';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router, response } from 'express';
import { parse } from 'path';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
   public path = '/api/data';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
       this.router.get(`${this.path}/:id`, this.getDataById);
       this.router.get(`${this.path}/:id/latest`, this.getLatestDataById);
       this.router.get(`${this.path}/:id/:num`, this.getDataInRange);
       this.router.post(`${this.path}/:id`, this.addData);
       this.router.delete(`${this.path}/all`, this.deleteAllData);
       this.router.delete(`${this.path}/:id`, this.deleteData);
   }

   private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        response.status(200).json(testArr);
   }

   private getDataById = async (request: Request, response: Response) => {
       const {id} = request.params;
       const idx = parseInt(id);
       response.status(200).json(testArr[idx]);
   }

   private getDataInRange = async (request: Request, response: Response) => {
       const {id, num} = request.params;
       const idx = parseInt(num);
       const slicedArray = testArr.slice(0, idx);

       response.status(200).json(slicedArray);
   }

   private getLatestDataById = async (request: Request, response: Response) => {
       const {id} = request.params;
       const idx = parseInt(id);
       const max = Math.max(...testArr);

       response.status(200).json(max);
   }

   private addData = async (request: Request, response: Response) => {
       const {elem} = request.body;
       const { id } = request.params;
       testArr.push(elem);

       response.status(200).json(testArr);
   }

   private deleteAllData = async (request: Request, response: Response) => {
       testArr = [];
       response.status(200).json(testArr);
   }

   private deleteData = async (request: Request, response: Response) => {
       const {id} = request.params;
       const idx = parseInt(id);
       testArr.splice(idx, idx);

       response.status(200).json(testArr);
   }
}

export default DataController;

