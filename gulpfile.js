// ============================ [ Plugins ] ============================ \\
const gulp = require('gulp'),
	// SCSS
			scss 			= require('gulp-sass')(require('sass')),
		
		// PostCSS (CSS4)
			postcss 		= require('gulp-postcss'),
		// Префиксы к css
			autoprefixer 	= require('gulp-autoprefixer'),
		// Source map
			sourcemaps 		= require('gulp-sourcemaps'),
		// Читабельный вид CSS
			csscomb 		= require('gulp-csscomb'),
		// Сжатие CSS
			clean_css 		= require('gulp-clean-css'),
		// SVG to fonts
			iconfont 		= require('gulp-iconfont'),

	// JS
	  	// Ecmascript
	  		auto_polyf = require('gulp-autopolyfiller'),
	  	
	  	// ES6/ES7 => ES5
	  		babel = require('gulp-babel'), 

	  	// JS Linter (плагины: fixmyjs - исправление простых ошибок после работы линтера,
	  	// 					   jshint-stylish - красивое описание ошибки)
	  		jshint = require('gulp-jshint'),
	  		fixmyjs = require('gulp-fixmyjs'),
	  		stylish = require('jshint-stylish'),

	  		map = require('map-stream')

	  	// gulp-jscpd - поиск и работа с дубликатами ☑

	  	// Проверка качества кода 
	  		complexity = require('gulp-complexity'),
	  	
	  	// Beautifier as standart JQ, Yandex, Google, AirBnb
	  		eslint = require('gulp-eslint'),
	  	
	  	// Beautifier
	  		jsbeautifier = require('gulp-jsbeautifier'),
	  	
	  	// gulp-jsfmt - Вырезка фрагментов из кода ☑

	  	// gulp-plato - Анализ кода в таблицах ☑

	  	// Compressor
	  		uglify = require('gulp-uglify-es').default,

	  	// JSON Linter
	  		json_lint = require('gulp-jsonlint'),

	  	// JSON minificating
	  		json_minify = require('gulp-jsonmin'),


	  	// gulp-concat - Конкатенация файлов JS ☑

	// HTML/PHP
	  	// Блочный HTML
	  		file_include = require('gulp-file-include'),
	  	// Минифицаия HTML 
	  		htmlmin  	 = require('gulp-htmlmin'),
	  	// Валидация HTML
	  		htmlhint 	 = require('gulp-htmlhint'),

	// IMGS
	  	// Сжатие изображений (всех, кроме PNG)	
	  		imagemin = require('gulp-imagemin'),
	  	// Сжатие png
	  		pngquant = require('imagemin-pngquant'),
	  	// Ресайзинг картинок
	  		response = require('gulp-responsive'),
	  	// Gulp-webp - конвертация img в webp
	  	// Gulp-clone - Webp только в поддерживающий браузерах, все остальное - img

	// Инструменты
		// Синхронизация браузера
	  		browserSync = require('browser-sync').create(),
		// Удаление файлов
			del 		= require('del'),
	  	// Переименование
	  		rname 		= require('gulp-rename'),
	  	// Github shell
			git 		= require('gulp-git'),
	  	// ZIP
	  		zip 		= require('gulp-zip'),
	  	// Работа с консолью
	  		readline = require('readline'),
	  	// Работа с строками в файлах
	  		replace = require('gulp-replace'),
	  	// Обработка ошибок
			notify 			= require('gulp-notify'),

		rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// ============================ [ Options ] ============================ \\
var Project_name 	= 'Boostfolia',
	pages 			= ['Landing_page'],

	// Текущая дирректория для работы
	start_page 		= pages[0],
	OpenServer_conn = 'True',
	port 			= 8282,
	proxy			= `${Project_name}`,

	source_dir 		= 'src',
	dist_dir		= 'dist',

	javascript_dir_name = 'js',
		Ajax_dir_name 	 	= 'Ajax',
		JSON_dir_name 	 	= 'JSON',
		plugins_dir_name 	= 'plugins',
			Jquery_usage 	= 'True',
		scripts_dir_name 	= 'scripts',

	php_dir_name 		= 'php',
		actions_dir_name 	= 'actions',

	styles_dir_name 	= 'styles',
		css_dir_name	 	= 'css',
		fonts_dir_name 	 	= 'fonts',
		scss_dir_name	 	= 'scss',
		styles_main_file_name = 'styles',

	images_dir_name 	= 'img',
		navigation_dir_name = 'nav',
		header_dir_name 	= 'header',
		article_dir_name 	= 'article',
		aside_dir_name 		= 'aside',
		footer_dir_name		= 'footer',

	html_dir_name 		= 'html',
		html_blocks_dir_name = 'blocks',
		index_filename 		= 'index.html',

	git_ignr_files = [
		'node_modules/*',
		'package-lock.json',
		'*.zip'
	]

// ============================ [ Paths ] ============================ \\
var folders = {
	
	src: {
		// Продакшн
		self_dir: `./${source_dir}`
	},

	dist: {
		// Постпродакшн
		self_dir: `./${dist_dir}`
	},

	watch: {
		// Выборка файлов для наблюдения
		html: {

		},
		styles: {
			self_dir: ``,
			css: {

			}
		}
	},

	git: {
		// Здесь будут объявлены все файлы для работы с github
		ignore: git_ignr_files
	}
};

// Обработка Параметров и создание корректной архитектуры проэкта
for ( i=0; i < pages.length; i++ ) {
	// current iteration <<Page Name>>
	let p_n = pages[i],
		pagedir_s = `./${source_dir}/${p_n}`,
		pagedir_d = `./${dist_dir}/${p_n}`;

	folders[source_dir][p_n] = {
		self_dir: pagedir_s,
		html: {
			self_dir: `${pagedir_s}/${html_dir_name}`,

			blocks: {
				self_dir: `${pagedir_s}/${html_dir_name}/${html_blocks_dir_name}`
			}
		},
		img: {
			self_dir: `${pagedir_s}/${images_dir_name}`,
			nav: {
				self_dir: `${pagedir_s}/${images_dir_name}/${navigation_dir_name}`
			},
			header: {
				self_dir: `${pagedir_s}/${images_dir_name}/${header_dir_name}`
			},
			article: {
				self_dir: `${pagedir_s}/${images_dir_name}/${article_dir_name}`
			},
			aside: {
				self_dir: `${pagedir_s}/${images_dir_name}/${aside_dir_name}`
			},
			footer: {
				self_dir: `${pagedir_s}/${images_dir_name}/${footer_dir_name}`
			}
		},
		js: {
			self_dir: `${pagedir_s}/${javascript_dir_name}`,
			Ajax: {
				self_dir: `${pagedir_s}/${javascript_dir_name}/${Ajax_dir_name}`,
			},
			JSON: {
				self_dir: `${pagedir_s}/${javascript_dir_name}/${JSON_dir_name}`,
			},
			plugins: {
				self_dir: `${pagedir_s}/${javascript_dir_name}/${plugins_dir_name}`,
				JQ: {
					usage: Jquery_usage
				}
			},
			scripts: {
				self_dir: `${pagedir_s}/${javascript_dir_name}/${scripts_dir_name}`
			}
		},
		php: {
			self_dir: `${pagedir_s}/${php_dir_name}`,
			actions: {
				self_dir: `${pagedir_s}/${php_dir_name}/${actions_dir_name}`,
			}
		},
		styles: {
			self_dir: `${pagedir_s}/${styles_dir_name}`,
			css: {
				self_dir: `${pagedir_s}/${styles_dir_name}/${css_dir_name}`,
			},
			scss: {
				self_dir: `${pagedir_s}/${styles_dir_name}/${scss_dir_name}`,
			},
			fonts: {
				self_dir: `${pagedir_s}/${styles_dir_name}/${fonts_dir_name}`,
			}
		}
	};

	folders[dist_dir][p_n] = {
		self_dir: pagedir_d,
		img: {
			self_dir: `${pagedir_d}/${images_dir_name}`,
			nav: {
				self_dir: `${pagedir_d}/${images_dir_name}/${navigation_dir_name}`
			},
			header: {
				self_dir: `${pagedir_d}/${images_dir_name}/${header_dir_name}`
			},
			article: {
				self_dir: `${pagedir_d}/${images_dir_name}/${article_dir_name}`
			},
			aside: {
				self_dir: `${pagedir_d}/${images_dir_name}/${aside_dir_name}`
			},
			footer: {
				self_dir: `${pagedir_d}/${images_dir_name}/${footer_dir_name}`
			}
		},
		js: {
			self_dir: `${pagedir_d}/${javascript_dir_name}`,
			Ajax: {
				self_dir: `${pagedir_d}/${javascript_dir_name}/${Ajax_dir_name}`,
			},
			JSON: {
				self_dir: `${pagedir_d}/${javascript_dir_name}/${JSON_dir_name}`,
			},
			plugins: {
				self_dir: `${pagedir_d}/${javascript_dir_name}/${plugins_dir_name}`
			},
			scripts: {
				self_dir: `${pagedir_d}/${javascript_dir_name}/${scripts_dir_name}`
			}
		},
		php: {
			self_dir: `${pagedir_d}/${php_dir_name}`,
			actions: {
				self_dir: `${pagedir_d}/${php_dir_name}/${actions_dir_name}`,
			}
		},
		styles: {
			self_dir: `${pagedir_d}/${styles_dir_name}`,
			css: {
				self_dir: `${pagedir_d}/${styles_dir_name}/${css_dir_name}`,
			},
			fonts: {
				self_dir: `${pagedir_d}/${styles_dir_name}/${fonts_dir_name}`,
			}
		}
	}
};

// ============================ [ Functions ] ============================ \\

// Очистка проэкта от всех файлов
function clear_project(event) {
	del([`*`,
		`.*`,

		`!.gitignore`,
		`!node_modules`,
		`!*.json`,
		`!*.js`,
		`!*.md`,
		`!.git`
		]);
	event();
}

// Создание простой структуры проэкта
function createProjectFiles(event) {
	// Создание src и dist папки
	for (let key in pages) {

		let pg_s = folders[source_dir][pages[key]]
			pg_d = folders[dist_dir][pages[key]];

		// Creating Pages folder
		gulp.src('*.*', {read: false})
			.pipe(gulp.dest(`${pg_s['self_dir']}`))
			.pipe(gulp.dest(`${pg_d['self_dir']}`));

		// SRC
		// HTML, CSS, IMG, JS, Php dirs
		for (let dir in pg_s) {
			if (dir != pg_s['self_dir'] &&
				pg_s[dir]['self_dir'] != undefined
			) {
				gulp.src('*.*', {read: false})
					.pipe(gulp.dest(`${pg_s[dir]['self_dir']}`));

				// Subdirs
				for (let subdir in pg_s[dir]) {
					if (subdir != undefined &&
						pg_s[dir][subdir]['self_dir'] != undefined
					) {
						gulp.src('*.*', {read: false})
							.pipe(gulp.dest(`${pg_s[dir][subdir]['self_dir']}`));
					}
				};
			};
		};

		var rg1 = /(\n|.|\r|\u2028|\u2029)*/,
			ffu = '.gitignore';

		// Files and content
		// Styles
		gulp.src(ffu)
			// _zer0.scss
			.pipe( rname({extname: '_zer0.scss', basename: ''}))
			.pipe( replace( rg1, ''))
			.pipe( replace( rg1, '* {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n	-ms-box-sizing: border-box;\n	box-sizing: border-box;\n	padding: 0;\n	margin: 0;\n	border: none;\n	outline: none;\n	background-color: rgba(0, 0, 0, 0);\n	background-size: cover;\n	background-position: center;\n	background-repeat: no-repeat;\n	-webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    list-style-type: none;\n    @include adaptive-value(\'font-size\', 20, 10, 1);\n    @include adaptive-value(\'font-size\', 30, 20, 2);\n	font-weight: 100;\n	line-height: 100%;\n}\na, button, input, textarea, form {\n	color: #000;\n	text-decoration: none;\n	border: 1px solid #000;\n	&:hover {\n		cursor: pointer;\n	}\n}\nspan {\n	font-size: 100%;\n}\nimg {\n	// Не поддерживаеться Internet Explorer\n	max-width: 100%;\n	object-fit: cover;\n	object-position: center;\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))

			// _mixins.scss
			.pipe( rname({extname: '_mixins.scss', basename: ''}))
			.pipe( replace( rg1, '@mixin adaptive-value ($property, $startSize, $minSize, $type) {\n	$addSize: $startSize - $minSize;\n	// Меньше контейнера\n	@if $type == 1 {\n		#{$property}: $startSize + px;\n		@media (max-width: #{$ContentMaxWidth + px}) {\n			#{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - #{$ContentMinWidth+px}) / #{$ContentMaxWidth - $ContentMinWidth}));\n		}\n	// Если больше контейнера\n	} @else if $type == 2 {\n		#{$property}: $startSize + px;\n		@media (min-width: #{$ContentMaxWidth + px}) {\n			#{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - #{$ContentMinWidth}px) / #{$SiteMaxWidth - $ContentMinWidth}));\n		}\n	// Всегда\n	} @else if $type == 3 {\n		#{$property}: calc(#{$SiteMaxWidth + px} + #{$addSize} * ((100vw - #{$ContentMinWidth}px) / #{$SiteMaxWidth - #{$ContentMinWidth}} ) );\n	}\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))

			// _media.scss
			.pipe( rname({extname: '_media.scss', basename: ''}) )
			.pipe( replace( rg1, '/* Настольные компьютеры и ноутбуки ----------- */\n@media only screen  and (min-width: 1224px) {\n/* стили */\n}\n/* Большие экраны ----------- */\n@media only screen  and (min-width: 1824px) {\n/* стили */\n}\n/* Smartphones (вертикальная и горизонтальная ориентация) ----------- */\n@media only screen and (min-width: 320px) and (max-width: 480px) {\n/* стили */\n}\n/* Smartphones (горизонтальная) ----------- */\n@media only screen and (min-width: 321px) {\n/* стили */\n}\n/* Smartphones (вертикальная) ----------- */\n@media only screen and (max-width: 320px) {\n/* стили */\n}\n/* iPads (вертикальная и горизонтальная) ----------- */\n@media only screen and (min-width: 768px) and (max-width: 1024px) {\n/* стили */\n}\n/* iPads (горизонтальная) ----------- */\n@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {\n/* стили */\n}\n/* iPads (вертикальная) ----------- */\n@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {\n/* стили */\n}\n/* iPad 3 -----------*/\n@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {\n/* стили */\n}\n@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {\n/* стили */\n}\n/* iPhone 4 ----------- */\n@media only screen and (min-width: 320px) and (max-width: 480px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {\n/* стили */\n}\n@media only screen and (min-width: 320px) and (max-width: 480px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {\n/* стили */\n}\n/* iPhone 5 ----------- */\n@media only screen and (min-width: 320px) and (max-height: 568px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2){\n/* стили */\n}\n@media only screen and (min-width: 320px) and (max-height: 568px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2){\n/* стили */\n}\n/* iPhone 6 ----------- */\n@media only screen and (min-width: 375px) and (max-height: 667px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2){\n/* стили */\n}\n@media only screen and (min-width: 375px) and (max-height: 667px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2){\n/* стили */\n}\n/* iPhone 6+ ----------- */\n@media only screen and (min-width: 414px) and (max-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2){\n/* стили */\n}\n@media only screen and (min-width: 414px) and (max-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2){\n/* стили */\n}\n/* Samsung Galaxy S4, Samsung Galaxy S3 ----------- */\n@media only screen and (min-width: 320px) and (max-height: 640px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3 or (-webkit-device-pixel-ratio: 2)){\n/* стили */\n}\n@media only screen and (min-width: 320px) and (max-height: 640px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3 or (-webkit-device-pixel-ratio: 2)){\n/* стили */\n}\n/* Samsung Galaxy S5 ----------- */\n@media only screen and (min-width: 360px) and (max-height: 640px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3){\n/* стили */\n}\n@media only screen and (min-width: 360px) and (max-height: 640px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3){\n/* стили */\n}'))
			.pipe( gulp.dest(`${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))

			// style.scss
			.pipe( rname({extname: 'styles.scss', basename: ''}))
			.pipe( replace( rg1, '// Размер макета\n$MaketWidth: 1600;\n// Максимальный поддерживаемый размер сайта\n$SiteMaxWidth: 1920;\n// Ширина контентного блока\n$ContentMaxWidth: 941;\n// Минимальная поддерживаемая ширина\n$ContentMinWidth: 320;\n@import \"_mixins.scss\";\n@import \"_zer0.scss\";\n@import \"_preloader.scss\";\n@import \"_fonts.scss\";\n// Стартовые стили\nh1:first-child:after {\n	content: \" Стили работают!\";\n	color: red;\n}\nh1 {\n	// font-family: \'Yesteryear\', cursive;\n}\na, p, h3, h6, h5, h4, h2 {\n	// font-family: \'Vollkorn\', serif;\n}\n*,\n*:after,\n*:before {\n	transition: all .3s linear 0s;\n}\n#wrapper {\n	width: 100%;\n	height: 100%;\n	display: flex;\n	flex-direction: column;\n}\n#content {\n	display: block;\n	margin: 0 auto;\n	max-width: $ContentMaxWidth+px;\n	@include adaptive-value(\'padding\', 20, 0, 1);\n}\nbody {\n	&.lock {\n		overflow: hidden;\n	}\n}\n@import \"_nav.scss\";\n@import \"_header.scss\";\n@import \"_article.scss\";\n@import \"_aside.scss\";\n@import \"_footer.scss\";\n@import \"_media.scss\";'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))

			// _preloader.scss
			.pipe( rname({extname: '_preloader.scss', basename: ''}))
			.pipe( replace( rg1, '// Preloader \n.preloader {\n	\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))
			// _nav.scss
			.pipe( rname({extname: '_nav.scss', basename: ''}))
			.pipe( replace( rg1, 'nav {\n\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))
			// _header.scss
			.pipe( rname({extname: '_header.scss', basename: ''}))
			.pipe( replace( rg1, 'header {\n\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))
			// _article.scss
			.pipe( rname({extname: '_article.scss', basename: ''}))
			.pipe( replace( rg1, 'article {\n\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))
			// _aside.scss
			.pipe( rname({extname: '_aside.scss', basename: ''}))
			.pipe( replace( rg1, 'aside {\n\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))
			// _footer.scss
			.pipe( rname({extname: '_footer.scss', basename: ''}))
			.pipe( replace( rg1, 'footer {\n\n}'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))
			// _fonts.scss
			.pipe( rname({extname: '_fonts.scss', basename: ''}))
			.pipe( replace( rg1, '// Fonts'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''))

			// postcss.config.js
			.pipe( rname({extname: 'postcss.config.js', basename: ''}))
			.pipe( replace( rg1, '{\n	\n}'))
			.pipe(gulp.dest(`./${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''))

			// Python file to connect fonts
			.pipe( rname({extname: 'file_for_uploading_fonts_to_scss.py', basename: ''}))
			.pipe( replace( rg1, 'import os\nfrom copy import *\nlist_of_fonts = []\ni = 0\nfile_scss = \'_fonts.scss\'\npath = os.getcwd()\nwith open(file_scss, \'w\') as w_f:\n    for dirs, folder, files in os.walk(path):\n        print(\'Файлы: \', files)\n        for el in files:\n            file_split = os.path.splitext(el)\n            if file_split[1] == \'.otf\':\n                print(\'Выделение расширения шрифта закончено!\')\n                w_f.write(\'@font-face {\')\n                text_for_print = (\'   font-family: \\\' {0}\\\';\').format(file_split[0])\n                w_f.write(text_for_print)\n                w_f.write(str(\'   font-style: normal;\'))\n                w_f.write(str(\'   font-weight: normal;\'))\n                text_for_print = (\'   src: url({0}.otf) format(\\\'opentype\\\');\').format(file_split[0])\n                w_f.write(text_for_print)\n                w_f.write(\'}\')\n                print(\'Сохранение .otf шрифта завершено\')\n            elif file_split[1] == \'.ttf\':\n                print(\'Выделение расширения шрифта закончено!\')\n                w_f.write(\'@font-face {\')\n                text_for_print = (\'   font-family: \\\' {0}\\\';\').format(file_split[0])\n                w_f.write(text_for_print)\n                w_f.write(str(\'   font-style: normal;\'))\n                w_f.write(str(\'   font-weight: normal;\'))\n                text_for_print = (\'   src: url({0}.ttf) format(\\\'truetype\\\');\').format(file_split[0])\n                w_f.write(text_for_print)\n                w_f.write(\'}\')\n                print(\'Сохранение .ttf шрифта завершено\')\n            else:\n                continue\nwith open(file_scss, \'r\') as w_f:\n    print(\'___\', file_scss,\'___\')\n    print(\'FINISHED\')\n    print(\'_______________________________\')\nprint("Скрипт завершился удачно")\ninput()\n""" \nИспользование скрипта:\n - Поместите скрипт в папку scss или css\n - Запустите\n - Подключите к проэкту _fonts.scss\n - Готово!\n"""'))
			.pipe( gulp.dest( `${pg_s[styles_dir_name][scss_dir_name]['self_dir']}/`) )
			.pipe( replace( rg1, ''));

		// HTML
		gulp.src(ffu)
			// Main Files
			.pipe( rname({extname: 'index.html', basename: ''}))
			.pipe( replace( rg1, ''))
			.pipe( gulp.dest(`${pg_s[html_dir_name]['self_dir']}/` ))
			
			.pipe( rname({extname: 'index.src.html', basename: ''}))
			.pipe( replace( rg1, '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\n    <link rel=\"shortcut icon\" href=\"ico.png\" type=\"image/png\">\n\n    <title>Document</title>\n\n    <link rel=\"stylesheet\" href=\"../styles/css/styles.min.css\">\n    <link rel=\"stylesheet\" href=\"../styles/css/styles.css.map\">\n\n    <script src=\"https://code.jquery.com/jquery-3.6.0.min.js\" integrity=\"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=\" crossorigin=\"anonymous\"></script>\n\n</head>\n<body>\n    <div id=\"wrapper\">\n\n        @@include(\'blocks/nav.html\')\n\n        @@include(\'blocks/header.html\')\n\n        @@include(\'blocks/article.html\')\n\n        @@include(\'blocks/aside.html\')\n\n        @@include(\'blocks/footer.html\')\n\n    </div>\n\n    <script src=\"../js/scripts/script.min.js\" type=\"text/javascript\"></script>\n</body>\n</html>'))
			.pipe( gulp.dest(`${pg_s[html_dir_name]['self_dir']}/` ))

			.pipe( rname({extname: 'index.min.html', basename: ''}))
			.pipe( replace( rg1, ''))
			.pipe( gulp.dest(`${pg_s[html_dir_name]['self_dir']}/` ))

			// Blocks
			// Header
			.pipe( replace( rg1, ''))
			.pipe( rname({extname: 'header.html', basename: ''}))
			.pipe( replace( rg1, '<header>\n    <h1>Header</h1>\n</header>'))
			.pipe( gulp.dest(`${pg_s[html_dir_name][html_blocks_dir_name]['self_dir']}/` ))
			.pipe( replace( rg1, ''))

			// Nav
			.pipe( rname({extname: 'nav.html', basename: ''}))
			.pipe( replace( rg1, '<nav>\n    <h1>Navigation</h1>\n</nav>'))
			.pipe( gulp.dest(`${pg_s[html_dir_name][html_blocks_dir_name]['self_dir']}/` ))
			.pipe( replace( rg1, ''))

			// Article
			.pipe( rname({extname: 'article.html', basename: ''}))
			.pipe( replace( rg1, '<article>\n    <h1>Article</h1>\n</article>'))
			.pipe( gulp.dest(`${pg_s[html_dir_name][html_blocks_dir_name]['self_dir']}/` ))
			.pipe( replace( rg1, ''))

			// Aside
			.pipe( rname({extname: 'aside.html', basename: ''}))
			.pipe( replace( rg1, '<aside>\n    <h1>Aside</h1>\n</aside>'))
			.pipe( gulp.dest(`${pg_s[html_dir_name][html_blocks_dir_name]['self_dir']}/` ))
			.pipe( replace( rg1, ''))

			// Footer
			.pipe( rname({extname: 'footer.html', basename: ''}))
			.pipe( replace( rg1, '<footer>\n    <h1>Footer</h1>\n</footer>'))
			.pipe( gulp.dest(`${pg_s[html_dir_name][html_blocks_dir_name]['self_dir']}/` ));

		// PHP
		gulp.src(ffu)
			// Server main file
			.pipe( replace( rg1, ''))
			.pipe( rname({extname: 'server.php', basename: ''}))
			.pipe( replace( rg1, '<?php\n\n?>'))
			.pipe(gulp.dest(`${pg_s[php_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''))

			// Ajax_precessing
			.pipe( rname({extname: 'ajax.php', basename: ''}))
			.pipe( replace( rg1, '<?php\n\n?>'))
			.pipe(gulp.dest(`${pg_s[php_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''));

		// Scripts JS, JSON, Ajax
		gulp.src(ffu)
			// Main script
			.pipe( replace( rg1, ''))
			.pipe( rname({extname: 'script.js', basename: ''}))
			.pipe( replace( rg1, 'jQuery(document).ready(function($) {\n	\n});'))
			.pipe( gulp.dest(`${pg_s[javascript_dir_name][scripts_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''))

			// .eslintrc
			.pipe( replace( rg1, '{\n\n}'))
			.pipe( rname({extname: '.eslintrc', basename: ''}))
			.pipe( replace( rg1, ''))
			.pipe( gulp.dest(`./${pg_s[javascript_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''))

			// Ajax
			.pipe( rname({extname: 'Ajax.js', basename: ''}))
			.pipe( replace( rg1, 'jQuery(document).ready(function($) {\n	\n});'))
			.pipe( gulp.dest(`${pg_s[javascript_dir_name][Ajax_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''))

			// JSON
			.pipe( rname({extname: 'data.json', basename: ''}))
			.pipe( replace( rg1, '{\n	\n}'))
			.pipe( gulp.dest(`${pg_s[javascript_dir_name][JSON_dir_name]['self_dir']}/`))
			.pipe( replace( rg1, ''));

			/* Для корректной работы желательно при соединение двух проэктов (этот и FullStackPack) 
				   добавить соотвецтвующие функции-обработки (HTML, JS, PHP ... обработчики)*/
			;

		console.log('Pages dirs was created!!!');
	};
	// Удаление ненужных файлов


	event();
};

function addPage(event) {
};

// Создание локального сервера
function browser(event) {
	// <<Open Server>> Enabling or Disabling
	if (OpenServer_conn == 'True') {
		browserSync.init({
			https: true,
    		proxy: proxy,
  			port: port,
  			injectChanges: true,
  			// Синхронизация всех устройств и их действий
			ghostMode: {
			    clicks: true,
			    forms: true,
			    scroll: false
			}
    	});
	} else {
		browserSync.init({
			server: {
	    		baseDir: `./${source_dir}/${start_page}/`,
	    		// https: true
	    	},
	    	injectChanges: true,
	    	rewriteRules: [
			  	{
			      	match: /Content-Security-Policy/,
			      	fn: function (match) {
			        	return "DISABLED-Content-Security-Policy";
			      	}
			  	}
			],
			// Синхронизация всех устройств и их действий
			ghostMode: {
			    clicks: true,
			    forms: true,
			    scroll: false
			}
    	});
	}
  	event();
};

// Работа с php, html файлами
function index(event) {
	return gulp.src([
			`!./${source_dir}/${start_page}/${html_dir_name}/*.{min.html, dist.min.html, min.dist.html, html, dist.html}`,
			`./${source_dir}/${start_page}/${html_dir_name}/*.src.html`
		])
		.pipe( file_include() )
		
		.pipe( htmlhint() )
		.pipe( htmlhint.reporter() )
		
		.pipe( rname({ extname: 'index.html', basename: '' }))
		.pipe( gulp.dest(`./${source_dir}/${start_page}/${html_dir_name}/`) )
		
		.pipe( htmlmin({
			collapseWhitespace: true,
		    html5: true,
		    removeComments: true,
		    useShortDoctype: true
		}) )
		.pipe( rname({ extname: 'index.min.html', basename: '' }))

		.pipe( gulp.dest(`./${source_dir}/${start_page}/${html_dir_name}/`) )
		.pipe( browserSync.reload({ stream:true }) );
	
	event();
};

// Работа со стилями
function styles(event) {
	return gulp.src(`./${source_dir}/${start_page}/${styles_dir_name}/${scss_dir_name}/${styles_main_file_name}.scss`)

		.pipe( sourcemaps.init() )

		.pipe( scss ({
			includePaths: require('node-bourbon').includePaths,
			errorLogToConsole: true,
      		// outputStyle: 'compressed'
		}).on( 'error', notify.onError({
        	message: "<%= error.message %>",
        	title  : "Sass Error!"
      	} ) ))
		// .pipe( autoprefixer({
		// 	supports: true,
  // 		   	overrideBrowserslist: ['last 2 versions'],
  // 		    cascade: false
		// })) 
		// Запихнем в PostCSS
		.pipe( postcss() )

		// Выгрузка sourcemap
		.pipe( sourcemaps.write(`./`) )

		// Очистка кеша путей (удаление доп. авто-путей gulp)
		.pipe( rname({dirname: ""}) )

		// Выгрузка красивого css
		.pipe( gulp.dest(`./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/`))
		
		// Минификация
		// .pipe( clean_css() )
		// PostCSs(nano)
		.postcss()
		.pipe( rname({suffix: '.min'}) )

		// Выгрузка минимизированного файла
		.pipe( gulp.dest(`./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/`) )
		.pipe( browserSync.stream() );

	// del(`./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.css.min.map`);
};

var exitOnJshintError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed');
  }
});

// Javascript обработка
async function scripts(event) {

	let js_dirs = [scripts_dir_name, Ajax_dir_name]

	js_dirs.forEach( function(item1, index1, arr1) {
			gulp.src([`./${source_dir}/${start_page}/${javascript_dir_name}/${item1}/*.js`,
					  `!./${source_dir}/${start_page}/${javascript_dir_name}/${item1}/*.min.js`] )

				// Info about code
				.pipe(jshint())
				.pipe(jshint.reporter(stylish))
				.pipe(exitOnJshintError)

				// Linting
				.pipe( eslint({fix: true}) )
				// .pipe( eslint.format() )

				
// fixmyjs
// complexity
// jsbeautifier

				// Compressing
				.pipe( uglify() )
				.pipe( rname({ suffix: '.min'}) )

				// Export min file
				.pipe( gulp.dest(`./${source_dir}/${start_page}/${javascript_dir_name}/${item1}/`) )
				.pipe( browserSync.reload({ stream:true }) );
	});
	event();
}

// Работа с картинками
async function img(event) {
	let img_dirs = [navigation_dir_name, header_dir_name, article_dir_name, aside_dir_name, footer_dir_name];

	img_dirs.forEach( function(item1, index1, arr1) {
		return gulp.src([
				`./${source_dir}/${start_page}/${images_dir_name}/${item1}/*.*`,
				`./${source_dir}/${start_page}/${images_dir_name}/${item1}/**/*.*`,
				`!./${source_dir}/${start_page}/${images_dir_name}/${item1}/**/*.min.*`,
				`!./${source_dir}/${start_page}/${images_dir_name}/${item1}/*.min.*`
			])
			.pipe( imagemin([
		      	pngquant()
			], {
				optimizationLevel: 3,
		      	quality: 100,
		      	progressive: true,
			}) )
			.pipe( rname({suffix: '.min'}))
			.pipe( gulp.dest(`./${source_dir}/${start_page}/${images_dir_name}/${item1}/`) );
	});

	event();
};

// Watching files
function fileWatcher() {
	// Styles
	gulp.watch(`./${source_dir}/${start_page}/${styles_dir_name}/${scss_dir_name}/*.scss`, styles);

	// HTML
	gulp.watch([
			`!./${source_dir}/${start_page}/${html_dir_name}/*.{min.html, dist.html, html, dist.min.html, min.dist.html}`,
			`./${source_dir}/${start_page}/${html_dir_name}/*.src.html`,
			`./${source_dir}/${start_page}/${html_dir_name}/${html_blocks_dir_name}/*.html`,
			`./${source_dir}/${start_page}/${php_dir_name}/**/*.{php, src.html}`
		], index);

	// Fonts
	gulp.watch(`./${source_dir}/${start_page}/${styles_dir_name}/${fonts_dir_name}/**/*`, fonts);

	// Javascript
	gulp.watch([`./${source_dir}/${start_page}/${javascript_dir_name}/**/*.js`,
				`./${source_dir}/${start_page}/${javascript_dir_name}/*.js`,

				`!./${source_dir}/${start_page}/${javascript_dir_name}/**/*.min.js`,
				`!./${source_dir}/${start_page}/${javascript_dir_name}/*.min.js`], scripts);
	
	// Разделение js и json из за багов node js (watcher не видит в одном watch js и json)

	// JSON
	gulp.watch([`./${source_dir}/${start_page}/${javascript_dir_name}/**/*.json`,
				`./${source_dir}/${start_page}/${javascript_dir_name}/*.json`,

				`!./${source_dir}/${start_page}/${javascript_dir_name}/**/*.min.json`,
				`!./${source_dir}/${start_page}/${javascript_dir_name}/*.min.json`], scripts);
	
	// Images
	gulp.watch([`./${source_dir}/${start_page}/${images_dir_name}/**/*.*`,
				`!./${source_dir}/${start_page}/${images_dir_name}/**/*.min.*`], img);
};

// Сборка проэкта
function build(event) {
	/*
		Так как я меняю структуру проэкта при сборке,
		то соотвецтвенно надо изменить и сами файлы,
		а точнее будет сказать - их зависимости

	
		dist - [
			
			index.html,
			styles - [
				css,
				fonts
			],
			js - [
				Ajax - [],
				JSON - [...],
				plugins - [JQ, ...],
				scripts
			],
			php - [actions, ...]

			
		]
	*/


	// HTML
	gulp.src([`./${source_dir}/${start_page}/${html_dir_name}/index.html`,
			  `./${source_dir}/${start_page}/${html_dir_name}/index.min.html`
			])

		// Изменение путей к css, js, php

		.pipe( gulp.dest(`./${dist_dir}/${start_page}/`) );

	// Styles
	gulp.src([`./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.css`,
			  `./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.min.css`,
			  `./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.css.map`
			])
		.pipe( gulp.dest(`./${dist_dir}/${start_page}/${styles_dir_name}/${css_dir_name}`) );

	// Fonts
	// gulp

	// JS
	gulp.src([`./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.css`,
			  `./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.min.css`,
			  `./${source_dir}/${start_page}/${styles_dir_name}/${css_dir_name}/styles.css.map`
			])
		.pipe( gulp.dest(`./${dist_dir}/${start_page}/${css_dir_name}`) );

	// Php

	// Img
	gulp.src(`./${source_dir}/${start_page}/${images_dir_name}`)
		.pipe( gulp.dest(`./${dist_dir}/${start_page}/`) );

	event();
};

// Изменение картинок под определенные размеры
async function resz_img(event) {
	
	await rl.question('Which partition of img?\n', (event, itm1) => {
		
		if (itm1 in [navigation_dir_name,
					 header_dir_name,
					 article_dir_name,
					 aside_dir_name,
					 footer_dir_name]) {
			rl.question('Which name of img?\n', (event, itm2) => {
				
				let file = `./${source_dir}/${start_page}/${images_dir_name}/${itm1}/${itm2}`;

				rl.question('HEIHGT: ', (event, h) => {
					rl.question('WIDTH: ', (event, w) => {
						return gulp.src(file)
							.pipe(response({
								itm2: {
									height: h,
									width: w
								}
							}))
							.pipe( gulp.dest(`./${source_dir}/${start_page}/${images_dir_name}/${itm1}/`) )
							.pipe( img(event) );

						event();
					});
					event();
				});
				event();
			});
			event();
			
		} else {
			console.log('ERROR: underfined partition!');
			setTimeout( function (event) {
							console.log("\u001b[2J\u001b[0;0H");
							
						}, 1000);
			resz_img(event);

			event();
		}

		rl.close();
	});

	event();
};

// Обработка шрифтов
function fonts(event) {
	gulp.src(`${source_dir}/${start_page}/${styles_dir_name}/${fonts_dir_name}/**/*.svg`)
		/*
		.pipe( iconfont({
			fontName: 'myfont', // required
			prependUnicode: true,
		    formats: ['ttf', 'eot', 'woff'],
		    timestamp: runTimestamp
		}) )
		*/
		.pipe( gulp.dest(`${source_dir}/${start_page}/${styles_dir_name}/${fonts_dir_name}/svg->font/`));

	event();
};

// Работа с Git
function github(event) {
	// ...
	event();
};

// Test info
function defaultTask(cb) {
	console.log('Created by Teslyuk Vladislav!!! :-)')
	console.log('Architecrute:');
	console.log(folders);
  	cb();
};


// ============================ [ Tasks ] ============================ \\

gulp.task('MakeArchitecture', gulp.series(defaultTask, createProjectFiles));
gulp.task('Resize', resz_img);
gulp.task('default', gulp.series(index, styles, scripts, img, gulp.parallel( browser, fileWatcher )));
gulp.task('build', build);
gulp.task('clear', clear_project);












// Говнокоменты, которые я вряд ли когда-то прочитаю, поэтому просто вынес в конец всего кода


/*

 · => Наладить структуру путей

	
*/

// gulp-changed и gulp-newer — запускают таски только для изменившихся файлов.
// tmi
// grunt-phantomas
// grunt-gitbook
// gulp-duration
// grunt-conventional-changelog
// grunt-usebanner

// JSON
	// gulp.src([`./${source_dir}/${start_page}/${javascript_dir_name}/${JSON_dir_name}/*.json`,
	// 			  `!./${source_dir}/${start_page}/${javascript_dir_name}/${JSON_dir_name}/*.min.json`])
		
	// 	.pipe( json_lint() )
	// 	.pipe( json_lint.reporter() )

	// 	// Compressing
	// 	.pipe( json_minify() )
	// 	.pipe( rname({ suffix: '.min'}) )

	// 	.pipe( gulp.dest(`./${source_dir}/${start_page}/${javascript_dir_name}/${JSON_dir_name}/`));