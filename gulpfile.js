
const { src, dest, watch, series, parallel} = require('gulp');

//DEPENDENCIAS DE SASS
const sass = require ('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//DEPENDENCIAS DE IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
 
function css( done ) {
    //compilar sass
    //1identificararchivo 2compilar 3guardar el css
    src('src/scss/app.scss')
        .pipe( sourcemaps.init()) 
        .pipe( sass(  ))
        .pipe( postcss ( [ autoprefixer (), cssnano() ] ) )
        .pipe( sourcemaps.write('.')) 
        .pipe( dest('build/css') )
    done();
}
//ALIGERAR IMAGENES CON GULP
function imagenes ( ) {
    return src('src/img/**/*')
        .pipe( imagemin ( { optimizationLevel: 3} ) )
        .pipe(dest('build/img'));
}

//IMAGENES WEBP 
function versionWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png, jpg}')
        .pipe( webp())
        .pipe( dest('build/img'))
}
//IMAGENES AVIF
function versionAvif (){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png, jpg}')
        .pipe(avif(opciones) )
        .pipe( dest('build/img'))
}


//WATCH
function dev(){
    watch ( 'src/scss/**/*.scss', css);
    watch ('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );

//series se inicia una tarea hasta que finaliza comienza otra
//parallel todas las tareas inician al mismo tiempo

