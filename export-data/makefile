main: restart chmodtransimage

restart:
	pm2 restart process.json --env=production

chmodtransimage:
	chmod +x /home/mol/www/projects/mol/data-preparation/shell-scripts/transfer_images.sh
