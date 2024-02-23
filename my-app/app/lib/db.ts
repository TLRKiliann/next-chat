import mysql from 'mysql2/promise';
import type {
    UsersChatProps,
} from './definitions';

type GenericProps = UsersChatProps | [];

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// retrieve all data about users
const queryChatRoom = async (query: string, data: GenericProps): Promise<UsersChatProps[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query, data);
        return result as UsersChatProps[];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// sending message
const queryMessage = async (query: string, data: FormDataEntryValue[]): Promise<UsersChatProps[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query, data);
        return result as UsersChatProps[];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// sending message
const queryInvitation = async (query: string, data: FormDataEntryValue[]): Promise<UsersChatProps[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query, data);
        return result as UsersChatProps[];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

export {
    queryChatRoom,
    queryMessage,
    queryInvitation
};