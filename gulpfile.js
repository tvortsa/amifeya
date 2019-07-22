const { src, dest } = require('gulp');

function defaultTask(cb) {
    // поместите код для вашей задачи по умолчанию здесь
    var node_moduls_path = __dirname + '\\node_modules'
    var mtrlz_path = node_moduls_path + '\\materialize-css'
    var mtrlz_css_path = mtrlz_path + '\\dist\\css\\materialize.min.css'
    var mtrlz_js_path = mtrlz_path + '\\dist\\js\\materialize.js'
    var mtrlz_min_js_path = mtrlz_path + '\\dist\\js\\materialize.min.js'
        //xel files
    var xel_path = node_moduls_path + '\\xel'
    var xel_themes_path = xel_path + '\\themes'
    var xel_material_theme = xel_themes_path + '\\material.css'
    var xel_js = xel_path + '\\xel.min.js'
    return src(mtrlz_css_path)
        .pipe(dest('src\\stylesheets\\'))
        .pipe(src(mtrlz_js_path))
        .pipe(dest('src\\javascripts\\'))
        .pipe(src(mtrlz_min_js_path))
        .pipe(dest('src\\javascripts\\'))
        //xel files
        .pipe(src(xel_material_theme))
        .pipe(dest('src\\stylesheets\\'))
        .pipe(src(xel_js))
        .pipe(dest('src\\javascripts\\'))


    console.log("путь к корню проекта: " + __dirname);
    console.log("путь к модулям node: " + node_moduls_path);

    cb();
}

exports.default = defaultTask