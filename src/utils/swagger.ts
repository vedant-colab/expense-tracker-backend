import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerPath = path.join(process.cwd(), 'src', 'docs', 'swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath)

export const swaggerSetup = (app : express.Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}