import csv from 'csvtojson';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';

const __dirname = path.dirname('./src/task_1.2/csv/data.csv');
const csvFilePath = path.join(__dirname, 'data.csv');
const jsonFilePath = path.join(__dirname, 'result.txt');
const MAX_CHUNK_SIZE = 10;

pipeline(
  fs.createReadStream(csvFilePath, { highWaterMark: MAX_CHUNK_SIZE }),
  csv({ ignoreEmpty: true }),
  fs.createWriteStream(jsonFilePath, { highWaterMark: MAX_CHUNK_SIZE }),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log(`File ${jsonFilePath} was created.`);
    }
  }
);


