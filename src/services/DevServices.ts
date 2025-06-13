import { Developer } from "@prisma/client";
import { prisma } from "../prisma/client";


class DevServices {
    public async register({name, bio, techs, github_url, avatar_url} : createDeveloper) {
        const developer : Developer = {
            id: crypto.randomUUID(),
            name,
            bio,
            techs,
            github_url,
            avatar_url,
            isActive: true,
            created_at: new Date(),
            updated_at: new Date()
        }

        await prisma.$transaction([
            prisma.developer.create({data: developer})
        ])
    }

    public async getAll() {
        const allDevelopers = await prisma.developer.findMany({
            orderBy: {created_at: "desc"},
            where: {isActive: true}
        })

        return allDevelopers.map((dev) => ({
            name: dev.name,
            bio: dev.bio,
            techs: dev.techs
        }))
    }

    public async getById(id: string){
        const developerAlreadyExist = await prisma.developer.findUnique({
            where: {id: id}
        })

        if(!developerAlreadyExist){
            throw new Error("ERRO: ERRO AO BUSCAR PELO ID.")
        }

        return developerAlreadyExist
    }


    public async updateTechs(id: string, techs : string[]){
        const developerAlreadyExist = await prisma.developer.update({
            where: {id: id, isActive: true},
            data: {
                techs: techs,
                updated_at: new Date()
            }
        })


        if(!developerAlreadyExist){
            throw new Error("ERRO: NÃO ENCONTRAMOS NENHUM REGISTRO, POR FAVOR, VERIFIQUE SE ESTÁ PASSANDO UM ID VÁLIDO OU SE O DEV ESTÁ ATIVO EM NOSSO SISTEMA.")
        }

        return developerAlreadyExist
    }

    public async deleteById(id: string){
        const developerAlreadyExist = await prisma.developer.update({
            where: {id: id},
            data: {isActive: false}
        })

        if(!developerAlreadyExist){
            throw new Error("ERRO: ERRO AO BUSCAR PELO ID.")
        }

        return `O desenvolvedor com o ID: ${developerAlreadyExist.id} foi deletado.`
    }
}

export const devServices = new DevServices();