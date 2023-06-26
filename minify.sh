#!/bin/bash 
# usage ./minify.sh
uglifyjs src/dialogs.js --compress --mangle -o dist/dialogs.min.js
uglifycss src/dialogs.css --output dist/dialogs.min.css

uglifyjs src/themes/bootstrap@5.3.0.js --compress --mangle -o dist/themes/bootstrap@5.3.0.min.js
