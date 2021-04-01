module.exports = {
    mongodb: {
        local: {
            host: "localhost",
            port: "27017",
            database: "coda",
        },
        dev: [
            {
                host: "cluster0-shard-00-00.1vkbz.mongodb.net",
                port: "27017",
                database: "bank",
                username: "tech-rushil",
                password: "6sKpimurlVErE8k7",
                host_1: "cluster0-shard-00-00.1vkbz.mongodb.net",
                port_1: "27017",
                host_2: "cluster0-shard-00-01.1vkbz.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-r82uvg-shard-0",
            },
        ],
    },
    jwt: {
        secret: "HELLO",
    },
};
