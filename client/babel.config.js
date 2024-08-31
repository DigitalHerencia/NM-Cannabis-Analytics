module.exports = {
    presets: [
        "@babel/preset-env", // Transpile modern JavaScript
        "@babel/preset-react", // Transpile JSX
        "@babel/preset-typescript", // Transpile TypeScript
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties", // Enable class properties
        "@babel/plugin-proposal-object-rest-spread", // Enable object rest/spread syntax
        "@babel/plugin-transform-runtime", // Optimize for reusing Babel's helper code
        "@babel/plugin-transform-react-inline-elements", // Optimizes React elements for production
        "@babel/plugin-transform-react-constant-elements", // Optimizes React constant elements for production
    ],
    env: {
        production: {
            plugins: [
                "transform-remove-console", // Remove console.* calls in production
            ],
        },
    },
}
