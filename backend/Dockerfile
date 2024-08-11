FROM python:3.8-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_DEBUG=1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD ["sh", "-c", "\
    if [ ! -d 'migrations' ]; then \
    flask db init; \
    fi && \
    flask db stamp head && \
    flask db migrate && \
    flask db upgrade && \
    flask run --host=0.0.0.0 --port=5000 \
    "]
