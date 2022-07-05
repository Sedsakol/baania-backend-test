import * as express from 'express';
import { HouseModel } from '../../../@core/database/models/house.model';
import { IResQueryData } from '../../../@core/interfaces/house.interface';
import { HomeService } from '../service/home.service';

export class HomeController {
  public router: express.Router = express.Router();
  public path: string;
  private homeService: HomeService;

  constructor() {
    this.initializeConfigs();
    this.initializeServices();
    this.initializeRoutes();
  }

  private initializeConfigs(): void {
    this.path = 'home';
  }

  private initializeServices(): void {
    this.homeService = new HomeService();
  }

  private initializeRoutes(): void {
    this.router.delete('/:id', (req, res, next) => this.deleteHouse(req, res, next));
    this.router.patch('/:id', (req, res, next) => this.updateHouse(req, res, next));
    this.router.post('', (req, res, next) => this.insertHouse(req, res, next));
    this.router.get('', (req, res, next) => this.getHouseList(req, res, next));
  }

  public async insertHouse(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
    try {
      const { name, desc, price, post_code } = request.body;
      const newHouse: HouseModel = {
        name: name,
        desc: desc,
        price: price,
        post_code: post_code
      } as HouseModel;
      await this.homeService.insertHouse(newHouse);
      response.status(201).send('house created');
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  }

  public async getHouseList(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
    try {
      const skip: number = +request.params.skip || 0;
      const take: number = +request.params.take || 5;
      const data: IResQueryData = await this.homeService.getHouse(skip, take);
      response.status(200).send(data);
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  }

  public async deleteHouse(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
    try {
      const houseId: number = +request.params.id;
      await this.homeService.deleteHouseById(houseId);
      response.status(200).send('house deleted');
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  }

  public async updateHouse(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
    try {
      await this.homeService.updateHouse(request.body);
      response.status(200).send('house updated');
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  }
}

