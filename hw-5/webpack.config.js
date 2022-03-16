const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin")
const ReactRefreshWebpackPlugin=require("@pmmmwh/react-refresh-webpack-plugin")
const buildPath=path.resolve(__dirname,"dist")
const srcPath=path.resolve(__dirname,"src")
const publicPath=path.resolve(__dirname,"public")

const isProd =  process.env.NODE_ENV === "production";

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const TsCheckerPlugin=require("fork-ts-checker-webpack-plugin")

const getSettingsForStyles=(withModules=false)=>{
    return [
        MiniCssExtractPlugin.loader, !withModules ? "css-loader" : {
            loader: "css-loader",
            options:{
                modules: {
                    localIdentName: !isProd ? "[path][name]__[local]" : "[hash:base64]"
                }
            }
        },
        // {
        //     loader: 'css-loader',
        //     options: {
        //         sourceMap: true,
        //         modules: withModules
        //             ? {
        //                 localIdentName: !isProd ? "[path][name]__[local]" : "[hash:base64]"
        //             }
        //             : undefined,
        //     },
        // },
        {
            loader: "postcss-loader",
            options: {
                postcssOptions:{
                    plugins: ["autoprefixer"]
                }
            }
        }, "sass-loader"]
}
module.exports={
    entry: path.join(srcPath,'index.tsx'),
    target: !isProd ? "web" : "browserslist",
    devtool: isProd ? "hidden-source-map" : "eval-source-map",
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(publicPath,'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: "[name]-[hash].css"
            }
        ),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test:/\.module\.s?css/,
                use:getSettingsForStyles(true)
            },
            {
                test:/\.s?css/,
                exclude:/\.module\.s?css/ ,
                use:getSettingsForStyles()
            },
            {
                test:/\.[tj]sx?$/,
                use:"babel-loader"
            },
            {
                test:/\.(png|svg|jpg)$/,
                type: "asset",
                parser:{
                    dataUrlCondition:{
                        maxSize: 10 * 1024
                    }
                }

            }
        ]
    },
    resolve: {
        extensions: [".ts",".tsx",".js",".jsx"],
        alias: {
            App: path.join(srcPath,"App"),
            components: path.join(srcPath, "components"),
            config: path.join(srcPath,"config"),
            styles: path.join(srcPath, "styles"),
            utils: path.join(srcPath,"utils"),
            store:path.join(srcPath,"store"),
            shared:path.join(srcPath,"shared"),
            pages:path.join(srcPath,"./pages")
        }
    },
    devServer:{
        host:"127.0.0.1",
        port: 9001,
        hot: true,

    }
}