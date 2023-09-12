b: build
d: dev

dev:
	@echo "Starting app"
	@docker compose -f ./docker-compose.yml up --build


build:
	@echo "Starting app"
	@yarn build
	@docker compose -f ./docker-compose.yml up --build --force-recreate --remove-orphans

