# Docker pocketbase setup with middleware for windows

## To run

```1. docker-compose up -d```

### env variables

```
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
API_SECRET_KEY=your-secret-key
```

### Manual override for superadmin email

```docker exec -it pocketbase /usr/local/bin/pocketbase admin create [EMAIL_ADDRESS] [PASSWORD]```
