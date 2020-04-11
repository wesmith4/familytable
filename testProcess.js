if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


console.log('SECRET IS: ', process.env.SECRET);
