export const config = {
    HOST: 'localhost',
    USER: "Vans_d",
    PASSWORD: "Ml83b4WY",
    DB: "self_taught",
    CONNECTION: "jdbc:mysql://localhost:3306/",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export const dialect = "mysql";