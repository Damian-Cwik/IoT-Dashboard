import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import { Server, Socket } from "socket.io";
import { IData } from '../modules/models/data.model';
import DataService from '../modules/services/data.service';

class ReadingController implements Controller {
    public path = '/*';
    public router = Router();
    private io: Server;
    private dataService = new DataService();
 
    constructor(io: Server) {
        this.io = io;
        setInterval(async () => {
            try {
                const latestData: IData[] | null = await this.dataService.getAll();
                this.io.emit("data", JSON.stringify(latestData));
             } catch (error) {
                 console.error("Błąd podczas emisji danych:", error);
             }
            }, 1000);
    }
 
 }
 
 export default ReadingController;