import prisma from '../../prisma/client';

export async function createProduct(product) {
    const { id, title, photo, description, price } = product;
    try {
        await prisma.product.create({
            data: { 
                id: Number(id),
                title,
                photo,
                description,
                price: Number(price),
            },
        });
    } catch (error) {
        console.error('Resultado da query', error);
    }
}

export async function updateProduct(id, data) {
    try {
        await prisma.product.update({
            where: {
                id: id
            },
            data
        })
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function deleteProduct(id) {
    try {
        await prisma.product.delete({
            where: {
                id
            }
        })

        return true;
    } catch (error) {
        console.error(error);
    }  
}
export async function getProduct() {
    try {
        const result = await prisma.product.findMany();
        console.log(result);
        if (result.length > 0) {
            return result;
        }
        console.log("Product not found");
    } catch (error) {
        console.error(error);
    }
}

export async function getProductById(id) {
    try {
        const result = await prisma.product.findUnique({
            where: {
                id
            }
        })
        if (result) {
            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
}