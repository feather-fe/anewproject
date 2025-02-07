document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("terminal-input");
    const terminal = document.getElementById("terminal");

    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            processCommand();
        }
    });

    function processCommand() {
        let command = inputField.value.trim();

        if (command.startsWith("login ")) {
            let username = command.split(" ")[1];
            appendOutput(`Logging in as ${username}...`);
        } else if (command.startsWith("signup ")) {
            let username = command.split(" ")[1];
            appendOutput(`Signing up as ${username}...`);
        } else if (command === "help") {
            appendOutput("Commands: login [username], signup [username], clear");
        } else if (command === "clear") {
            terminal.innerHTML = `<p class="output">DLI: The Lost Levels Terminal v1.0</p>
                                  <p class="output">Type 'login [username]' or 'signup [username]' to proceed.</p>`;
        } else {
            appendOutput(`Unknown command: ${command}`, "error");
        }

        inputField.value = "";
        terminal.scrollTop = terminal.scrollHeight;
    }

    function appendOutput(text, type = "") {
        let output = document.createElement("p");
        output.className = `output ${type}`;
        output.textContent = text;
        terminal.appendChild(output);
    }
});
document.getElementById("terminal-input").addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        const input = this.value.trim();
        this.value = "";

        if (input.length > 0) {
            printToTerminal(`$ ${input}`, "user");

            const args = input.split(" ");
            const command = args.shift();

            if (command === "login") {
                await handleLoginCommand(args); // Call the login function
            } else {
                printToTerminal("Command not recognized.", "error");
            }
        }
    }
});
