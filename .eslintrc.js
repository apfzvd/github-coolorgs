module.exports = {
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 8,
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
      }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 2],
        "quotes": [ "warn", "single" ],
        "semi": [ "warn", "never" ],
        "no-undef": "warn",
        "react/jsx-no-undef": "error",
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "warn"
    }
};
