import { Client } from "pg";
import { TUser } from "../Types";

type TQuery = {
    query: string,
    values: any[],
    run: Function
}

export default class ORM {
    constructor(private db: Client) {
    }

    private sqlQuery(query: string, values: any[] = []) {
        const sqlQuery = {
            query: query,
            values: values,
            where: (conditions: object) => this.where(sqlQuery, conditions),
            run: () => this.run(sqlQuery.query, sqlQuery.values)
        }
        return sqlQuery;
    }

    async run<T>(query: string, values: any[]): Promise<T | null> {
        try {
            const result = await this.db.query(query, values);
            return (result.rows[0]) ? (result.rowCount === 1) ? result.rows[0] : result.rows : null;
        }
        catch (error) {
            return null;
        }
    }

    where(sqlQuery: TQuery, conditions: object): TQuery {
        const { values, params } = this.getValuesParams(conditions, 'AND', sqlQuery.values.length);
        sqlQuery.query += ` WHERE ${params}`;
        sqlQuery.values = sqlQuery.values.concat(values);
        return sqlQuery;
    }

    select(table: string, fields: string = '*') {
        const query = `SELECT ${fields} FROM ${table}`;
        return this.sqlQuery(query);
    }

    update(table: string, fields: object) {
        let i = 0;
        const values = Object.values(fields);
        const argums = Object.keys(fields).map(key => {
            i++;
            return `${key}=$${i}`;
        }).join(', ');
        const query = `UPDATE ${table} SET ${argums}`;
        return this.sqlQuery(query, values);
    }

    delete(table: string) {
        const query = `DELETE FROM ${table}`;
        return this.sqlQuery(query);
    }

    insert(table: string, records: object[]) {
        const { fieldsNames, values, valuesMask } = this.getValuesAndNameFields(records);
        let query: string = `INSERT INTO ${table} (${fieldsNames.join(', ')}) VALUES ${valuesMask.join(', ')} RETURNING *`;
        return { run: <T>() => this.run<T>(query, values) }
    }

    private getValuesParams(conditions: object | number, operand: string, index: number = 0) {
        let params: string;
        let values: any[];
        let i = index;
        params = Object.keys(conditions).map(key => {
            i++
            return ` ${key}=$${i} `;
        }).join(operand);
        values = Object.values(conditions);
        return { values, params };
    }

    private getValuesAndNameFields(fields: object[]) {
        const fieldsNames = Object.keys(fields[0]);
        let i = 0;
        let values: any[] = [];
        const valuesMask: string[] = [];
        fields.forEach((obj: object) => {
            const fieldsValues = `(${fieldsNames.map(() => {
                i++;
                return `$${i}`
            }).join(', ')})`
            values = [...values, ...Object.values(obj)];
            valuesMask.push(fieldsValues);
        })
        return { values, fieldsNames, valuesMask };
    }






}