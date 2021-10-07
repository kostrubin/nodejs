import csv from 'csvtojson';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';

const csvFilePath = path.join(__dirname, './csv/data.csv');
const jsonFilePath = path.join(__dirname, './csv/result.txt');
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


