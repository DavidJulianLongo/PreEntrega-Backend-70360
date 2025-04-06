import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Documentation of API adoptions",
            version: "1.0.0",
            description: "API adoptions"
        },
    },
    apis: ["./src/docs/**/*.yaml"]
}

export const specs = swaggerJSDoc(swaggerOptions);