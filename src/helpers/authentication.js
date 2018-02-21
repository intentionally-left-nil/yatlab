import jwt from 'jsonwebtoken';

// This does NOT validate the token and should only be used client-side
const getUser = (cookies) => {
  const auth = cookies.get('Authorization');
  let user = null;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.slice('Bearer '.length);
    user = jwt.decode(token);
  }
  return user;
};

// eslint-disable-next-line import/prefer-default-export
export { getUser };
