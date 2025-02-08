document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("terminal-input");
    const terminal = document.getElementById("terminal");

    // State variables for the login process
    let awaitingPassword = false;
    let currentUserRecord = null;
    let loggedIn = false;
    let awaitingNewPassword = false;

    inputField.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const input = inputField.value.trim();
            inputField.value = "";

            // If we're waiting for the password input from the user:
            if (awaitingPassword) {
                // Treat this input as the password attempt
                const enteredPassword = input;
                if (
                    currentUserRecord &&
                    currentUserRecord.fields &&
                    currentUserRecord.fields.password
                ) {
                    if (enteredPassword === currentUserRecord.fields.password) {
                        appendOutput("Login successful!", "system");
                        loggedIn = true;
                    } else {
                        appendOutput("Incorrect password. Login failed.", "error");
                        console.error("Incorrect password for user:", currentUserRecord.fields.username);
                    }
                } else {
                    appendOutput("Error: User record incomplete.", "error");
                }
                // Reset login state
                awaitingPassword = false;
                return;
            }
            // If we're waiting for a new password input from the user:
            if (awaitingNewPassword === true) {
                const password = input;
                const hashedPassword = await hashPassword(password);
                const username = currentUserRecord.fields.username;
                await signUp(username, hashedPassword);
                appendOutput("Signup successful!", "system");
                loggedIn = true;
                awaitingNewPassword = false;
                return;
            }
            // If we're not waiting for a password, process the command normally.
            // Otherwise, process the command normally.
            printToTerminal(`$ ${input}`, "user");

            const args = input.split(" ");
            const command = args.shift().toLowerCase();
            if (command === "signup") {
                if (!args[0]) {
                    appendOutput("Usage: signup [username]", "error");
                    return
                }
                const username = args[0];
                appendOutput(`Signing up as ${username}...`, "system");
                const userRecord = await getUserByUsername(username);
                if (userRecord) {
                    appendOutput("Error: Username already exists.", "error");
                } else {
                    awaitingNewPassword = true;
                    appendOutput("Please enter a new password:", "system");
                }
            } else if (command === "login") {
                if (!args[0]) {
                    appendOutput("Usage: login [username]", "error");
                    return;
                }
                const username = args[0];
                appendOutput(`Attempting login for ${username}...`, "system");
                if (loggedIn === true) {
                    appendOutput("You are already logged in.", "system");
                    return;
                }
                // Call the Airtable function (from login.js) to fetch the user record.
                const userRecord = await getUserByUsername(username);
                if (userRecord) {
                    // Save the record and switch to password prompt mode.
                    currentUserRecord = userRecord;
                    awaitingPassword = true;
                    appendOutput("Please enter your password:", "system");
                } else {
                    appendOutput("Error: User not found.", "error");
                    console.error("Login failed: User not found.");
                }
            } else if (command === "help") {
                appendOutput("Commands: login [username], signup [username], clear", "system");
            } else if (command === "clear") {
                terminal.innerHTML = `<p class="output">DLI: The Lost Levels Terminal v1.0</p>
                                      <p class="output">Type 'login [username]' or 'signup [username]' to proceed.</p>`;
            } else if (command === "logout") {
                appendOutput("Logging out...", "system");
                loggedIn = false;
                currentUserRecord = null;
            } else if (command === "") {
                // Do nothing if the user presses Enter without typing anything.
            } else if (command === "debug") {
                // Debugging command to display the current user record.
                if (currentUserRecord) {
                    console.log("Current user record:", currentUserRecord);
                    appendOutput("Check the console for the current user record.", "system");
                } else {
                    appendOutput("No user is currently logged in.", "system");
                }
            } else {
                appendOutput(`Unknown command: ${command}`, "error");
            }
        }
    });

    // Function to append output to the terminal
    function appendOutput(text, type = "") {
        let output = document.createElement("p");
        output.className = `output ${type}`;
        output.textContent = text;
        terminal.appendChild(output);
    }

    // Expose appendOutput globally so that other files can access it if needed.
    window.printToTerminal = appendOutput;
});
