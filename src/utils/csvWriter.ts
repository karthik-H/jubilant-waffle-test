import fs from 'fs';
import path from 'path';

/**
 * Flattens a nested object for CSV output.
 * Nested objects are stringified as JSON.
 * @param obj The object to flatten.
 * @returns A flat object with all keys at the top level.
 */
function flattenObject(obj: Record<string, any>): Record<string, any> {
  const flat: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flat[key] = JSON.stringify(value);
    } else {
      flat[key] = value;
    }
  }
  return flat;
}

/**
 * Writes an array of objects to a CSV file.
 * @param data Array of objects to write.
 * @param filePath Output file path.
 */
export async function writeObjectsToCsv(
  data: Record<string, any>[],
  filePath: string
): Promise<void> {
  if (!data.length) {
    throw new Error('No data to write to CSV.');
  }

  // Flatten all objects and collect all unique keys
  const flatData = data.map(flattenObject);
  const allKeys = Array.from(
    new Set(flatData.flatMap((obj) => Object.keys(obj)))
  );

  // CSV header
  const header = allKeys.join(',');

  // CSV rows
  const rows = flatData.map((obj) =>
    allKeys
      .map((key) => {
        const val = obj[key];
        if (val === undefined || val === null) return '';
        // Escape double quotes by doubling them, wrap in quotes if needed
        const str = String(val).replace(/"/g, '""');
        return /[",\n]/.test(str) ? `"${str}"` : str;
      })
      .join(',')
  );

  const csvContent = [header, ...rows].join('\n');

  // Ensure directory exists
  const dir = path.dirname(filePath);
  await fs.promises.mkdir(dir, { recursive: true });

  // Write file
  await fs.promises.writeFile(filePath, csvContent, 'utf8');
}