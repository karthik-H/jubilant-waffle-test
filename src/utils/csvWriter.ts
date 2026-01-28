import fs from 'fs';
import path from 'path';
import { User } from '../domain/User';

/**
 * Flattens a nested object into a single-level object with dot/bracket notation keys.
 * Used to serialize nested fields for CSV output.
 */
function flattenObject(obj: any, prefix = ''): Record<string, any> {
  let result: Record<string, any> = {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result = { ...result, ...flattenObject(value, newKey) };
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

/**
 * Converts an array of User objects to CSV format, including all nested fields.
 * @param users Array of User objects
 * @returns CSV string
 */
export function usersToCsv(users: User[]): string {
  if (users.length === 0) return '';

  // Flatten all users and collect all unique keys for header
  const flatUsers = users.map(u => flattenObject(u));
  const headerSet = new Set<string>();
  flatUsers.forEach(u => Object.keys(u).forEach(k => headerSet.add(k)));
  const headers = Array.from(headerSet);

  // Build CSV rows
  const csvRows = [
    headers.join(','), // header row
    ...flatUsers.map(u =>
      headers.map(h => {
        const val = u[h];
        // Escape double quotes and wrap in quotes if needed
        if (val === undefined || val === null) return '';
        const s = String(val);
        if (s.includes('"') || s.includes(',') || s.includes('\n')) {
          return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
      }).join(',')
    ),
  ];
  return csvRows.join('\n');
}

/**
 * Writes user data to a CSV file, creating directories as needed.
 * @param users Array of User objects
 * @param outputPath Path to output CSV file
 */
export async function writeUsersToCsvFile(users: User[], outputPath: string): Promise<void> {
  const csv = usersToCsv(users);
  const dir = path.dirname(outputPath);
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.writeFile(outputPath, csv, 'utf8');
}