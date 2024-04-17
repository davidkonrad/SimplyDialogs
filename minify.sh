#!/bin/bash 
# usage ./minify.sh
uglifyjs src/SimplyDialogs.js --compress --mangle -o dist/SimplyDialogs.min.js
uglifycss src/SimplyDialogs.css --output dist/SimplyDialogs.min.css

uglifyjs src/themes/bootstrap@5.3.0.js --compress --mangle -o dist/themes/bootstrap@5.3.0.min.js
