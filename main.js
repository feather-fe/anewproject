document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("terminal-input");
    const terminal = document.getElementById("terminal");

    inputField.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const input = inputField.value.trim();
            inputField.value = "";

            if (input.length > 0) {
                printToTerminal(`$ ${input}`, "user");

                const args = input.split(" ");
                const command = args.shift();

                if (command === "login") {
                    // Pass the username (first element of args) to getPasswordByUsername
                    await getPasswordByUsername(args[0]);
                } else if (command === "signup") {
                    appendOutput(`Signing up as ${args[0]}...`);
                } else if (command === "help") {
                    appendOutput("Commands: login [username], signup [username], clear");
                } else if (command === "clear") {
                    terminal.innerHTML = `<p class="output">DLI: The Lost Levels Terminal v1.0</p>
                                          <p class="output">Type 'login [username]' or 'signup [username]' to proceed.</p>`;
                } else {
                    appendOutput(`Unknown command: ${command}`, "error");
                }
            }
        }
    });

    function appendOutput(text, type = "") {
        let output = document.createElement("p");
        output.className = `output ${type}`;
        output.textContent = text;
        terminal.appendChild(output);
    }

    // Assign the function itself without calling it
    window.printToTerminal = appendOutput;
});
