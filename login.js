async function getPasswordByUsername(username) {
    const apiKey = "pat1nzJn2F4xz0rsu.467092737c986118748036d5a4414629242d4f789ac77b4e012c7a0dfa641152"; // Use the read-only API key
    const baseId = "appum0pcb1Bu3mY6L"; // Your Airtable Base ID
    const tableName = "logins"; // Table name
    
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={username}='${username}'`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });

        const data = await response.json();

        if (data.records.length > 0) {
            return data.records[0].fields.password; // Return the password
        } else {
            return null; // No matching user found
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

// Handle login command from the terminal
async function handleLoginCommand(args) {
    if (args.length !== 1) {
        printToTerminal("Usage: login <username>", "error");
        return;
    }

    const username = args[0];
    printToTerminal(`Attempting login for ${username}...`, "system");

    const password = await getPasswordByUsername(username);

    if (password) {
        printToTerminal(`Login successful! Password: ${password}`, "system"); // Replace this with authentication logic later
    } else {
        printToTerminal("Error: User not found.", "error");
        console.error("Login failed: User not found.");
    }
}
