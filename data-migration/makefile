main: build restart chmodtransimage start

build:
	npm run build

restart:
	pm2 restart process.json --env=production

chmodtransimage:
	chmod +x /home/mol/www/projects/mol/data-preparation/shell-scripts/transfer_images.sh

start:
	npm start
