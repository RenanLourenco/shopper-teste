import path from "path";
import fs from 'fs/promises';

export class FileHelper {
    async saveImageInTemp(base64: string, imageName: string): Promise<string> {
        //save file in temp;
        const buffer = Buffer.from(base64, 'base64');
        const filePath = path.join(__dirname, `./../../temp/${imageName}.jpg`)

        await fs.writeFile(filePath, buffer);

        return filePath;
    }
}