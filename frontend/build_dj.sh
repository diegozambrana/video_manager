#!/bin/bash
yarn build

rm -r ../server/static/*
cp -r build/static/ ../server/static/.
cp build/index.html ../server/templates/.

git add ../server/static/
git add ../server/templates/