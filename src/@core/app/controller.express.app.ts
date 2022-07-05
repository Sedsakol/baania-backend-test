import * as express from 'express';

export class ExpressController {

  public router = express.Router();
  public path: string;

  constructor() {
    this.initialConfigs();
    this.initializeService();
    this.intializeRoutes();
  }

  private initialConfigs(): void {

  }

  private initializeService(): void {
      
  }

  private intializeRoutes(): void {
      
  }

}

export default ExpressController;