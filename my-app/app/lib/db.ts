import mysql from 'mysql2/promise';
import type {
    UsersChatProps, UsersProps, UsersToJoin
} from './definitions';

type GenericProps = UsersChatProps | UsersProps | UsersToJoin | [];

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
const queryUsers = async (query: string, data: GenericProps): Promise<UsersProps[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query, data);
        return result as UsersProps[];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// to send message & data for chatroom
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

// to send message & data for chatroom
const queryToJoin = async (query: string, data: GenericProps): Promise<UsersToJoin[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query, data);
        return result as UsersToJoin[];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// sending message with server action
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

// sending invitation with server action
const queryInvitation = async (query: string, data: FormDataEntryValue[]): Promise<UsersProps[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query, data);
        return result as UsersProps[];
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
    queryUsers,
    queryChatRoom,
    queryToJoin,
    queryMessage,
    queryInvitation
};