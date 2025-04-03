import { IData } from '../models/data.model';
import DataModel from '../schemas/data.schema';


export default class DataService {

    public async getAll(){
        try {
            const data = await DataModel.find();
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async postAdd(newData: IData){ {
        try {
            console.log('Działa');
            const data = await new DataModel(newData);
            console.log(data);
            return await data.save();
        } catch (error) {
            console.log('Nie Działa');
            throw new Error(`Query failed: ${error}`);
        }
        }
    }
    public async deleteData(id: string) {
        try {
            const data = await DataModel.findByIdAndDelete(id);
            if (!data) {
                throw new Error('Data not found');
            }
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }
}