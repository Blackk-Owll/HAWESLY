#!/bin/bash

# Check which directory triggered the deployment
if [[ $CHANGED_FILES =~ "frontend/" ]]; then
    # If changes were made in the frontend directory, build and deploy the frontend
    cd frontend
    npm install
    npm run build
    # Deploy the built frontend to your desired location (e.g., a public directory)

elif [[ $CHANGED_FILES =~ "backend/" ]]; then
    # If changes were made in the backend directory, deploy the backend
    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py collectstatic --noinput
    # Deploy the Django app using your Django-specific deployment process

else
    # Handle other cases or additional directories as needed
    echo "No relevant changes detected."
fi
