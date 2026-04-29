set -e

REQUIRED_VARS="ADMIN_EMAIL ADMIN_PASSWORD API_SECRET_KEY"

for var in $REQUIRED_VARS; do
    if [ -z "$(eval echo \$$var)" ]; then
        echo "Error: Environment variable $var is NOT set."
        exit 1
    fi
done

echo "All required environment variables found. Starting PocketBase..."
exec /usr/local/bin/pocketbase "$@"