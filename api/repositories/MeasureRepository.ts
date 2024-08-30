import { PrismaClient, Measure } from "@prisma/client";
import { Repository } from "./Repository";
import { Console } from "console";




export class MeasureRepository extends Repository<Measure> {
    protected prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient){
        super(prismaClient);
        this.prismaClient = prismaClient;
    }

    async findMeasureByCustomerCode(customerCode: string, measureType?: string): Promise<Partial<Measure>[]> {

        const measures = await this.prismaClient.measure.findMany({
            where: {
                customer_code: customerCode,
                measure_type: measureType
            },
            select:{
                measure_uuid: true,
                measure_datetime: true,
                measure_type: true,
                has_confirmed: true,
                image_url: true
            }
        });
     

        return measures
    }

    async findMeasureBetweenDates(initial: string, final: string): Promise<Measure[]> {
        const measures = await this.prismaClient.measure.findMany({
            where: {
                measure_datetime: {
                    gte: initial,
                    lte: final
                }
            }
        });

        return measures
    }

    async findMeasureBetweenDatesAndCustomerCode(initial: string, final: string, customerCode: string): Promise<Measure[]> {
        const measures = await this.prismaClient.measure.findMany({
            where: {
                measure_datetime: {
                    gte: initial,
                    lte: final
                },
                customer_code: customerCode
            }
        });

        return measures
    }

    async findByMeasureUUID(measureUuid: string){
        return await this.prismaClient.measure.findUnique({
            where:{
                measure_uuid: measureUuid
            }
        })
    }

    async insert(data: Pick<Measure, "has_confirmed" | "customer_code" | "measure_datetime" | "measure_type" | "measure_value" | "image_url">) : Promise<Measure> {
        const measure = await this.prismaClient.measure.create({data});
        return measure
    }

    async update(data: Partial<Measure>, uuid: string){
        const measure = await this.prismaClient.measure.update({
            where: {
                measure_uuid: uuid,
            },
            data: data,
        })

        return measure;
    }

    
    
}