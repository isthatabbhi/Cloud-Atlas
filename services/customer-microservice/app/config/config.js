module.exports = {
  APP_DB_HOST: process.env.APP_DB_HOST || "database-1.cluster-cqk4example.us-east-1.rds.amazonaws.com",
  APP_DB_USER: process.env.APP_DB_USER || "admin",
  APP_DB_PASSWORD: process.env.APP_DB_PASSWORD || "lab-password",
  APP_DB_NAME: process.env.APP_DB_NAME || "COFFEE"
};
