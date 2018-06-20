
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${HERE}/vendor/reveal.js-3.6.0

npm start -- --port=8001 --root=../..
