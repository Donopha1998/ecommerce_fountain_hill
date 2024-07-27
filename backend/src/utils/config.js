
const config = {
    development: {
      apiUrl: 'http://localhost:5173',
    },
 
  };
  

  const env = process.env.NODE_ENV || 'production';
  
  export default config[env];
  