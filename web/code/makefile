main: fetch reset build gulp restart chmodtransimage

fetch:
	git fetch -avp

reset:
	git reset --hard origin/master

gulp:
	gulp

build:
	npm run build

restart:
	pm2 restart process.json --env=production

chmodtransimage:
	chmod +x /home/mol/www/projects/mol/data-preparation/shell-scripts/transfer_images.sh
