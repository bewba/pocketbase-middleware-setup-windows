# Docker pocketbase setup with middleware for windows

### Setup 
Create a .env file with the variables ```ADMIN_EMAIL```, ```ADMIN_PASSWORD```, ```API_SECRET_KEY```

### env variables

```
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
API_SECRET_KEY=your-secret-key
```

### To run

```1. docker-compose up -d```

### Manual override for superadmin email

```docker exec -it pocketbase /usr/local/bin/pocketbase admin create [EMAIL_ADDRESS] [PASSWORD]```
