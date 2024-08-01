import { PrismaClient, $Enums } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const password = await hashPassword('password');

    const user = await prisma.user.create({
        data: {
            email: 'weber@gmail.com',
            password: password,
            name: 'Weber',
        }
    });

    const site = await prisma.site.create({
        data: {
            domain: 'Site 1',
            userId: user.id,
        }
    });

    const widget = await prisma.widget.create({
        data: {
            type: 'BUTTON',
            siteId: site.id,
            value: 'Click me',
            position: 1,
        }
    })
}

function hashPassword(plainPassword: string) {
    return bcrypt.hash(plainPassword, 10);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
