Please make sure your npm/nvm/node is of the latest version.

## Upgrade your NPM/NODE to the latest version
sudo npm install -g npm
sudo npm install -g n
sudo ln -sf /usr/local/n/versions/node/9.4.0/bin/node /usr/bin/node

npm uninstall -g gulp
sudo npm install -g gulp

## local environment testing and dev
npm run start -- serve.dev

## Actually install all dependency

npm install / npm i -S -D

## Running a development build
npm run build.dev -- --config-env dev

(optional) if you are using LINZ's clone copy, you don't need these steps
npm install -S vinyl
npm install -S libphonenumber-js@0.4.52
npm install -S raf

Before enable to live watching ability of Gulp start (live mode):

## enable the live monitor for Ubuntu
edit /etc/sysctl.conf
fs.inotify.max_user_watches = 524288
sudo sysctl -p

## running it in browserSync (localhost:5555)
npm start

