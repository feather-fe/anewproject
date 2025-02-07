// Define a global variable
window.testVariable = "Global variables work!";

// Function to check if global variable is accessible
function checkGlobalVariable() {
    if (window.testVariable) {
        alert("✅ Success:", window.testVariable);
    } else {
        alert("❌ Failed: Global variables are not accessible.");
    }
}

// Run test
checkGlobalVariable();
