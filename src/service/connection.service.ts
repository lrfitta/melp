import { Injectable } from "@nestjs/common";
import Knex from 'knex';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { Utils } from "../util/utils";

/**
 * Service to get a db connection
 */
@Injectable({ scope: 2 })
export class ConnectionService {
  private _knex: any = null;

  get knex(): any {
    if (!this._knex) {
      this._knex = this.setupDBConnection();
    }
    return this._knex;
  }

  private setupDBConnection() {
    const connectionOptions = PostgressConnectionStringParser.parse(process.env.DB_CONNECTION_URI);
    return Knex({
      client: 'pg',
      connection: {
        host: connectionOptions.host,
        port: Utils.toInt(connectionOptions.port),
        user: connectionOptions.user,
        password: connectionOptions.password,
        database: connectionOptions.database,
        ssl: process.env.ENVIRONMENT === 'development' ? false : { rejectUnauthorized: false },
      },
      pool: this.createPool(
        Utils.toInt(process.env.DB_POOL_MIN || '1'),
        Utils.toInt(process.env.DB_POOL_MAX || '1')
      )
    });
  }

  private createPool = (min: number, max: number) => {
    return {
      max,
      min,
      acquireTimeoutMillis: 60000, // 60 seconds
      createTimeoutMillis: 30000, // 30 seconds
      idleTimeoutMillis: 600000, // 10 minutes
    };
  }
}