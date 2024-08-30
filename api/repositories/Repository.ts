import { PrismaClient } from "@prisma/client";

export class Repository<T> {
    protected prismaClient: PrismaClient

    constructor(pC: PrismaClient){
        this.prismaClient = pC;
    }

   
}