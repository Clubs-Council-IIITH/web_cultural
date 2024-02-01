#!/bin/bash

IP_ADDRESS=$(hostname -I | awk '{print $1}')

# Write environment variables to .env file
cat << EOF > ./web/.env
GRAPHQL_ENDPOINT="http://${IP_ADDRESS}/graphql"
NEXT_PUBLIC_FILESERVER_URL="http://${IP_ADDRESS}"
NEXT_PUBLIC_STATIC_URL="http://${IP_ADDRESS}/static"
NEXT_PUBLIC_CLUB_ID="osdg"
EOF

FILE_PATH="web/next.config.js"

# Update the IP address in the file
sed -Ei "s|http://10\.[0-9]+\.[0-9]+\.[0-9]+|http://${IP_ADDRESS}|g" $FILE_PATH

docker compose -p cult-web up --build