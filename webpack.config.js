const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "module", // Set the library target to UMD
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/, // Match .css files
                use: ["style-loader", "css-loader"], // Use style-loader and css-loader
            },
        ],
    },
    experiments: {
        outputModule: true, // Enable ESM output
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: "./index.html",
    //     }),
    // ],
    resolve: {
        extensions: [".js", ".jsx"], // Add '.jsx' to the list of extensions
    },
};
