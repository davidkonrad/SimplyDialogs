module.exports = {
		"env": {
        "browser": true,
				"node": true,
        "es2020": true
    },
		"root": true,
    "extends": "eslint:recommended",
    "globals": {
				"SimplyDialogs": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": "2020",
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": "error"
    }
};
