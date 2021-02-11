import { createConnection } from 'typeorm'
import path from 'path'

export default createConnection({
    type: "sqlite",
    database: path.resolve(__dirname, "database.sqlite"),
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "\\..\\models\\*{.ts,.js}"
    ],
})
    .then(() => console.log('[database] => create done'))