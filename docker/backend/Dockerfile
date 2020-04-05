FROM python:3.6

# Create directory
RUN mkdir -p /data/backend
WORKDIR /data/backend

# Install dependencies
COPY ./backend/Pipfile ./backend/Pipfile.lock /data/backend/
RUN pip install pipenv && pipenv install --system

# Copy code
COPY ./backend /data/backend

RUN python manage.py collectstatic --noinput

EXPOSE 8000
