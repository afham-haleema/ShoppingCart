const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const copyWebpackPlugin=require('copy-webpack-plugin');
module.exports={
  mode:'development',  
  entry:path.resolve(__dirname,'src/index.js'), 
  output:{
    path: path.resolve(__dirname,'dist'),
    filename:'bundle[contenthash].js',
    clean:true,
    assetModuleFilename:'[name][ext]',
}, 
devtool:'source-map',
devServer:{
    static:{
        directory:path.resolve(__dirname,'dist'),
    },
    port:3000,
    open:true,
    hot:true,
    compress:true,
    historyApiFallback:true,
},
module:{
    rules:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader',
                options:{
                    presets:[['@babel/preset-env',{useBuiltIns:'usage',corejs:3}]],
                    plugins:[
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
            },
        },
        {
            test:/\.scss$/,
            use:['style-loader','css-loader','sass-loader'],
        },
        {
            test:/\.css$/,
            use:['style-loader','css-loader'],
        },
        {
            test:/\.(png|jpg|jpeg|gif|svg)$/i,
            type:'asset/resource',
        },
        
    ],
},
plugins:[
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'src/template.html'),
        filename:'index.html',
        title:'Product list with cart',
    }),
    new copyWebpackPlugin({
        patterns:[
            {
                from:path.resolve(__dirname,'src/assets'),
                to:path.resolve(__dirname,'dist/assets'),
            },
        ],
    }),



],
}