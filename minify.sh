#!/bin/bash 
# usage ./minify.sh
uglifyjs src/dialogs.js --compress --mangle -o dist/dialogs.min.js
uglifycss src/dialogs.css --output dist/dialogs.min.css
