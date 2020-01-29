module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      networkid: "5777"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
