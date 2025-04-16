import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';


class ItemController implements Controller {
    public path = '/items';
    public router = Router();
    private items: any = [];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllItems);
        this.router.get(`${this.path}/:id`, this.getItemById);
        this.router.post(this.path, this.createItem);
        this.router.put(`${this.path}/:id`, this.updateItem);
        this.router.delete(`${this.path}/:id`, this.deleteItem);
    }

    private getAllItems = (request: Request, response: Response) => {
        response.json(this.items);
    }

    private getItemById = (request: Request, response: Response) => {
        var id: string = request.params.id;
        response.json(this.items[id]);
    }
    private createItem = (request: Request, response: Response) => {
        const newItem = request.body;

        if (!newItem){
            return response.status(400).json({ message: 'Invalid item data' });
        }

        this.items.push(newItem);
        response.status(201).json({ message: 'Item created successfully', item: newItem });
    };
    
    private updateItem = (request: Request, response: Response) => {
        const itemId = parseInt(request.params.id);
        const updatedItem = request.body;
        const itemExists = this.items.length - 1 >= itemId ? itemId : -1;

        if (itemExists!== -1) {
            this.items[itemId] = updatedItem;
            response.status(200).json({ message: 'Item updated successfully', item: this.items[itemId] });
        } else {
            response.status(404).json({ message: 'Item not found' });
        }
    }
    private deleteItem = (request: Request, response: Response) => {
        const itemId = parseInt(request.params.id);
        const itemExists = this.items.length - 1 >= itemId ? itemId : -1;
        if (itemExists !== -1) {
            this.items.splice(itemId, 1);
            response.status(200).json({ message: 'Item deleted successfully' });
        } else {
            response.status(404).json({ message: 'Item not found' });
        }
    }
}

export default ItemController;