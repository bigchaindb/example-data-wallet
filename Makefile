all: build init start

build:
	docker-compose build mdb
	docker-compose build bdb
	docker-compose build client

init: reinit_db

start:
	docker-compose up -d bdb
	docker-compose up -d client

restart: init start

drop_db:
	docker-compose stop mdb
	docker-compose stop bdb
	docker-compose rm -f mdb

start_db:
	docker-compose up -d mdb
	docker-compose up -d bdb

run: init start

reinit_db: drop_db start_db
	sleep 1

stop:
	docker-compose down