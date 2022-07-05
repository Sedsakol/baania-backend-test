import { Sequelize } from 'sequelize';

export class PostgresDB {

    private user: string = process.env.POSTGRES_USER || 'user';
    private password: string = process.env.POSTGRES_PASSWORD || 'pass';
    private database: string = process.env.POSTGRES_DB || 'baania';
    private host: string = process.env.POSTGRES_HOST || 'localhost';
    private port: string = process.env.POSTGRES_PORT || '5432';
    public DB: Sequelize;

    constructor() {
      this.connectDB();
    }

    public async connectDB(): Promise<void> {
      this.DB = new Sequelize(`postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`);
      await this.testConnectionDB();
    }

    public async testConnectionDB(): Promise<void> {
      try {
        await this.DB.authenticate();
        console.log(`Connection to ${this.database} has been established successfully.`);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
}