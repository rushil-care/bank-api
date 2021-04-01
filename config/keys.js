module.exports = {
    mongodb: {
        local: {
            host: "localhost",
            port: "27017",
            database: "DB",
        },
        dev: [
            {
                host: "HOST_NAME",
                port: "27017",
                database: "DB",
                username: "USER_NAME",
                password: "PASS",
                host_1: "HOST1",
                port_1: "27017",
                host_2: "HOST2",
                port_2: "27017",
                replicaSet: "REPLICA SET",
            },
        ],
    },
    jwt: {
        secret: "HELLO",
    },
};
