import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class Jwt {
    static async createHash(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }
    static async compareHash(password: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hash)

        return result
    }
    static async createToken(data: {id: string, email: string}): Promise<string> {
        const token = jwt.sign({
            id: data.id,
            email: data.email
        },process.env.JWT_SECRET as string, {expiresIn: "1h"})

        return token
    }
}