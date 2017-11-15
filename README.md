# inline-script-webpack-plugin


inline your script when using webpack requiring html-webpack-plugin


#### Requirements
* node >= 6.0 with npm
* html-webpack-plugin


#### Installation
```shell

npm install inline-script-webpack-plugin --save-dev

#or

npm i inline-script-webpack-plugin -D

```

#### Usage:

for webpack.config.js:
```javascript

//single script
module.exports = {
  entry: {
  //...
    inline: []
  },

  //...
  plugins: [
    //...
    new HtmlWebpackPlugin(),
    new InlineScriptWebpackPlugin(), //default chunk name will be   `inline` if no name option is given
    //...
  ]
}


//multi scripts and custom entry
module.exports = {
  entry: {
    //...
    foo: [],
    bar: []
  },

  //...
  plugins: [
    //...
    new HtmlWebpackPlugin(),
    new InlineScriptWebpackPlugin({
      names:['foo', 'bar']
    }), //multi scripts require names options
    //...
  ]
}

```

for index.html or template:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Template</title>
    <!--multi and ordered-->
    <%=htmlWebpackPlugin.files.foo%>
    <%=htmlWebpackPlugin.files.bar%>
</head>
<body>
    <!--single-->
    <%=htmlWebpackPlugin.files.inline%>
</body>
</html>
```

not available yet

TODO:  
[  ] name(s) will support regex and entry name