FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend
 

COPY . .

RUN pip install django django-cors-headers

EXPOSE 8000
