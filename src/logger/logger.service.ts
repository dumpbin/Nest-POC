import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-IN', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date())}\t${entry}\n`;
    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'app.log'),
        formattedEntry,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${message}\t${context}`;
    this.logToFile(entry);
    super.log(message, context);
  }
  error(message: any, trace?: string, context?: string) {
    const entry = `${message}\t${context}\n${trace}`;
    this.logToFile(entry);
    super.error(message, trace, context);
  }
}
