import { createConnection } from 'typeorm'
import path from 'path'

export default createConnection({
    name: "sqlite",
    type: "sqlite",
    database: path.resolve(__dirname, "database.sqlite"),
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "\\..\\models\\**\\*.ts"
    ],
    cli: {
        entitiesDir:  __dirname + "\\..\\models\\**\\*.ts"
    }
})
    .then(() => console.log('[database] => create done'))