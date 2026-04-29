// pb_hooks/main.pb.js

routerUse((e) => {
    // 1. Get the path safely
    const path = (e.request && e.request.url) ? e.request.url.path : "";

    // 2. EXEMPTIONS: Let the Admin UI and login process through
    if (
        path.startsWith("/_/") ||
        path.includes("/admins") ||
        path.includes("/_superusers") ||
        path.includes("/settings")
    ) {
        return e.next();
    }

    // 3. INTERNAL SESSION CHECK: If you're logged into the browser, let it through
    // We check for the 'admin' key in the store
    const admin = e.get("admin");
    if (admin !== null && admin !== undefined) {
        return e.next();
    }

    // 4. API KEY CHECK: For your Node.js script
    const serverSecret = $os.getenv("API_SECRET_KEY");
    const clientKey = e.request.header.get("X-API-KEY");

    if (serverSecret && clientKey === serverSecret) {
        return e.next();
    }

    // 5. BLOCK: Only if it's an API call and fails the above checks
    if (path.startsWith("/api/")) {
        return e.json(401, { "message": "Unauthorized" });
    }

    return e.next();
});