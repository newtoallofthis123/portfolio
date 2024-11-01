//? Connects to MongoDB
//! DO NOT TOUCH THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING
//* This file is a key component of the project and is used to connect to the database
//* If you are trying to connect to the database, use the connectToDatabase function
// TODO: Add Ability to connect to multiple databases
//! HONESTLY: I HAVE NO IDEA HOW I WAS ABLE TO WRITE THIS FILE

import { MongoClient, type MongoClientOptions, Db, Collection } from 'mongodb';

// Ensure that MONGODB_URL is defined
const MONGODB_URL: string = import.meta.env.MONGODB_URL!;
if (!MONGODB_URL) {
    throw new Error(
        'Please define the MONGODB_URL environment variable inside .env'
    );
}

// Define reusable interfaces and types
interface DatabaseConnection {
    client: MongoClient;
    db: ReturnType<MongoClient['db']>;
}

interface CachedConnection {
    conn: DatabaseConnection | null;
    promise: Promise<void> | null;
}

declare const global: typeof globalThis & {
    mongo: CachedConnection;
};

// Initialize the global cache
let cached: CachedConnection = global.mongo || { conn: null, promise: null };

export async function connectToDatabase(): Promise<{ db: Db }> {
    // Return the cached connection if it exists
    if (cached.conn) return cached.conn;

    // Initialize a new connection and store it in the cache
    if (!cached.promise) {
        const conn: DatabaseConnection = {
            client: null!,
            db: null!,
        };
        cached.promise = MongoClient.connect(MONGODB_URL, {})
            .then((client) => {
                conn.client = client;
                return client.db('updates');
            })
            .then((db) => {
                conn.db = db;
                cached.conn = conn;
            });
    }

    // Wait for the connection to be established and return it
    await cached.promise;
    return cached.conn!;
}

// Define the database interface
export interface Database {
    collection(name: string): Collection;
}
