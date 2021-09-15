const plugins = [];
// Cannot load "react-refresh/babel" in production
if (process.env.NODE_ENV !== 'production') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: [
    '@babel/preset-env',
    // Runtime automatic with React 17+ allows not importing React // 근데 왜 안됨 ;
    // in files only using JSX ts가 안되는건가 ?..(no state or React methods)
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: plugins,
};
