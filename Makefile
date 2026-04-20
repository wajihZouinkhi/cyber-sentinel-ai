.PHONY: run test lint ingest build frontend

run:
	cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000

test:
	cd backend && pytest -q

lint:
	cd backend && ruff check .

ingest:
	cd backend && python -m rag.ingest

build:
	docker-compose build

frontend:
	cd frontend && npm run dev
