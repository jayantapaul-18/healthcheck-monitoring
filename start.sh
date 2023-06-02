#!/bin/bash
file=".env"
echo "Creating .env file"
touch .env
echo "Adding STATUS_SERVER_URL=http://localhost:3838 to .env file"
echo "STATUS_SERVER_URL=http://localhost:3838" > $file