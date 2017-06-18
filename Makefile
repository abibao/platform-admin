.PHONY: default up down test start

default: up

up:
	docker-compose pull;
	docker-compose up -d;

down:
	docker-compose down;

test:
	rm -rf coverage;
	npm run test:standard;

start:
	docker-compose exec admin npm start
