# Docker pocketbase setup with middleware for windows

### Prerequisites
Install mod-header to inject headers to your request

### Setup 
1. Create a .env file with the variables ```ADMIN_EMAIL```, ```ADMIN_PASSWORD```, ```API_SECRET_KEY```

### env variables

```
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
API_SECRET_KEY=your-secret-key
```

### To run

1. run ```docker-compose up -d``` on your IDE/terminal
2. Inject a header to the client with the key value pair: ```X-API-KEY```: ```API secret key```
3. Open ```http://localhost:8090/_/#/login``` to start creating your database

### Manual override for superadmin email

```docker exec -it pocketbase /usr/local/bin/pocketbase admin create [EMAIL_ADDRESS] [PASSWORD]```

### Testing
For middleware testing, you can run 
```
const API_URL = 'http://localhost:8090/api/collections/[YOUR_TABLE]/records';
const SECRET_KEY = YOUR_ENV_VARIABLE;

async function testMiddleware() {
    console.log("--- Starting Middleware Tests ---");

    // 1. Test Success (Valid Key)
    try {
        const res = await fetch(API_URL, {
            headers: { 'X-API-KEY': SECRET_KEY }
        });
        console.log(`✅ Valid Key Test: ${res.status} ${res.statusText}`);
        const data = await res.json();
        console.log(`Data received: ${data.items?.length || 0} items found.`);
    } catch (e) {
        console.error("❌ Valid Key Test Failed:", e.message);
    }

    // 2. Test Failure (Wrong Key)
    const resWrong = await fetch(API_URL, {
        headers: { 'X-API-KEY': 'WRONG_KEY' }
    });
    console.log(`🔒 Wrong Key Test: ${resWrong.status} (Expected 401)`);

    // 3. Test Failure (Missing Key)
    const resMissing = await fetch(API_URL);
    console.log(`🚫 Missing Key Test: ${resMissing.status} (Expected 401)`);
}

testMiddleware();
```
