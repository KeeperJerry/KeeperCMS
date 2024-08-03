import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

import LoggerUtils from '../utils/LoggerUtils';
import FilesConfig from '../configs/FilesConfig';

export default class SertificateService {
    private static keysDir = FilesConfig.Keys.dir;
    private static privateKeyPath = path.join(this.keysDir, FilesConfig.Keys.privateKey);
    private static publicKeyPath = path.join(this.keysDir, FilesConfig.Keys.publicKey);

    private static privateKeyCode: Buffer;
    private static publicKeyCode: Buffer;

    public static generateKeys() {
        if (fs.existsSync(this.privateKeyPath)) {
            LoggerUtils.DEBUG("[CERT] Keys exists, skip generate");
            this.privateKeyCode = fs.readFileSync(this.privateKeyPath);
            this.publicKeyCode = fs.readFileSync(this.publicKeyPath);
            return;
        }

        if (!fs.existsSync(this.keysDir)) fs.mkdirSync(this.keysDir);

        const keys = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        });

        fs.writeFileSync(this.privateKeyPath, keys.privateKey);
        this.privateKeyCode = fs.readFileSync(this.privateKeyPath);
        LoggerUtils.DEBUG("[CERT] Private key saved");

        fs.writeFileSync(this.publicKeyPath, keys.publicKey);
        this.publicKeyCode = fs.readFileSync(this.publicKeyPath);
        LoggerUtils.DEBUG("[CERT] Public key saved");
    }

    public static getPublicKey() {
        return SertificateService.publicKeyCode.toString();
    }

    public static getSignature(data: string)
    {
        const sign = crypto.createSign("RSA-SHA1");
        sign.update(data);
        sign.end();
        return sign.sign(SertificateService.privateKeyCode, "base64");
    }
}