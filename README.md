# BrewPie

Backend stuff for the Raspeberry PI

## install on raspberry

sudo apt-get update  
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -  
sudo apt-get install -y nodejs  
sudo npm install -g npm@latest  
npm init  
npm install firebase-admin --save  
npm install onoff --save

autostart using /etc/rc.local
npm install
update ssh pi@192.168.1.230; cd projects/midas/brewpie; git pull

## hardware

https://www.electrokit.com/produkt/modul-med-optisk-lasgaffel/
