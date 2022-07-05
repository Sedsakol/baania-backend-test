import { Sequelize } from "sequelize";
import { HouseModel } from "../../../@core/database/models/house.model";
import { IResQueryData, IResQueyStat } from "../../../@core/interfaces/house.interface";

export class PostCodeService {

  constructor() {
  }

  public async getPostCode(): Promise<IResQueryData> {
    const data: { rows: HouseModel[], count: number } = await HouseModel.findAndCountAll({ attributes: ['post_code'] });
    return { payload: data.rows, count: data.count };
  }

  public async getPriceStatByPostCode(postCode: string): Promise<IResQueyStat> {
    const data: HouseModel[] = await HouseModel.findAll({ 
      where: { post_code: postCode }, 
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('price')), 'average'],
        [Sequelize.literal('PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "price")'), 'median']
        
      ],
      group: 'post_code'
    });
    
    const average: string = String(data[0]?.get().average);
    const median: string = String(data[0]?.get().median);
    
    return {
      payload: {
        average: average,
        median:  median
      }
    };
  }
}