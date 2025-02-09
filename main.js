import { startFileManager } from "./files";
import { hashPassword, getUserByUsername, signUp } from "./auth";

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("terminal-input");
    const terminal = document.getElementById("terminal");

    // State variables for the login process
    let awaitingPassword = false;
    let currentUserRecord = null;
    let loggedIn = false;
    let awaitingNewPassword = false;



    // Function to append output to the terminal
    function appendOutput(text, type = "") {
        let output = document.createElement("p");
        output.className = `output ${type}`;
        output.textContent = text;
        terminal.appendChild(output);
        // Set a maximum number of messages that can be shown
        const MAX_MESSAGES = 15;
        while (terminal.childElementCount > MAX_MESSAGES) {
            terminal.removeChild(terminal.firstChild);
        }
    }
    // Expose appendOutput globally so that other files can access it if needed.
    window.printToTerminal = appendOutput;

    inputField.addEventListener("keypress", async function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const input = inputField.value.trim();
            inputField.value = "";

            // If we're waiting for the password input from the user (for login):
            if (awaitingPassword) {
                // Hash the entered password using hashPassword (from hasher.js)
                const enteredPasswordHash = await hashPassword(input);
                if (
                    currentUserRecord &&
                    currentUserRecord.fields &&
                    currentUserRecord.fields.password
                ) {
                    // Debug: log both hashes for comparison
                    console.log("Entered Hash:", enteredPasswordHash);
                    console.log("Stored Hash:", currentUserRecord.fields.password);

                    // Compare the computed hash with the stored hash
                    if (currentUserRecord && currentUserRecord.fields && enteredPasswordHash === currentUserRecord.fields.password) {
                        appendOutput("Login successful!", "system");
                        if (!loggedIn) {
                            loggedIn = true;
                        } else {
                            appendOutput("You are already logged in.", "system");
                        }
                    } else {
                        appendOutput("Incorrect password. Login failed.", "error");
                        console.error("Incorrect password for user:", currentUserRecord.fields.username);
                    }
                } else {
                    appendOutput("Error: User record incomplete.", "error");
                }
                // Reset login state
                awaitingPassword = false;
                inputField.focus();
                return;
            }

            // If we're waiting for a new password input (for signup):
            if (awaitingNewPassword === true) {
                const password = input;
                // Hash the new password using your hashPassword function
                const hashedPassword = await hashPassword(password);
                // Use the username stored in the placeholder record
                const username = currentUserRecord.fields.username;
                // Call your signUp function to write the new user record to Airtable
                await signUp(username, hashedPassword);
                appendOutput("Signup successful!", "system");
                loggedIn = true;
                awaitingNewPassword = false;
                return;
            }

            // Process commands normally
            appendOutput(`$ ${input}`, "user");

            const args = input.split(" ");
            const command = args.shift().toLowerCase();

            if (command === "signup") {
                if (!args[0]) {
                    appendOutput("Usage: signup [username]", "error");
                    return;
                }
                const username = args[0];
                appendOutput(`Signing up as ${username}...`, "system");
                const userRecord = await getUserByUsername(username);
                if (userRecord) {
                    appendOutput("Error: Username already exists.", "error");
                } else {
                    // Set a placeholder user record with the new username
                    currentUserRecord = { fields: { username: username } };
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
                const userRecord = await getUserByUsername(username);
                if (userRecord) {
                    // Save the record and prompt for password
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
            } else if (command === "start") {
                startFileManager(function (gimmicks) {
                    console.log("Selected Gimmicks:", gimmicks);
                });
            } else if (command === "") {
                // Do nothing if Enter is pressed with no input
            } else if (command === "debug") {
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
        // Set a maximum number of messages that can be shown
        const MAX_MESSAGES = 15;
        while (terminal.childElementCount > MAX_MESSAGES) {
            terminal.removeChild(terminal.firstChild);
        }
    }
    // Expose appendOutput globally so that other files can access it if needed.
    window.printToTerminal = appendOutput;
});
