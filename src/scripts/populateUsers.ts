import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const USERS_API_URL = process.env.USERS_API_URL || 'https://jsonplaceholder.typicode.com/users';
const USERS_STORAGE_PATH = process.env.USERS_STORAGE_PATH || path.join(__dirname, '../../data/users.json');

async function fetchAndStoreUsers() {
  try {
    console.log(`Fetching users from ${USERS_API_URL}...`);
    const response = await axios.get(USERS_API_URL);
    const users = response.data;

    if (!Array.isArray(users)) {
      throw new Error('Fetched data is not an array');
    }

    fs.writeFileSync(USERS_STORAGE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    console.log(`Successfully wrote ${users.length} users to ${USERS_STORAGE_PATH}`);
  } catch (error) {
    console.error('Error populating users:', error);
    process.exit(1);
  }
}

fetchAndStoreUsers();