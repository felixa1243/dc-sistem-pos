import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: 'Member',
    tableName: 'members',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        discordId: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
    },
});
