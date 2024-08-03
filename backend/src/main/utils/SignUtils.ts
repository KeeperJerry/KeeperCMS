import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export default class SignUtils {
    public getRandomMD5() {
        return crypto.createHash('md5').update(crypto.randomUUID()).digest("hex");
    }
    
    public getPasswordSHA1(password: string) {
        return crypto.createHash('sha1').update(password).digest("hex").toLowerCase();
    }

    public checkPass(input: string, database: string) 
    {
        return bcrypt.compare(input, database);
    }
}