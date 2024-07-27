
const config = {
    development: {
      apiUrl: 'http://localhost:4000',
    },
    production: {
      apiUrl: 'https://trellotaskbackend-production.up.railway.app',
    },
  };
  

  const env = process.env.NODE_ENV || 'production';
  
  export default config[env];
  