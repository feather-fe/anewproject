// Define a global variable
window.testVariable = "Global variables work!";

// Function to check if global variable is accessible
function checkGlobalVariable() {
    if (window.testVariable) {
        console.log("✅ Success:", window.testVariable);
    } else {
        console.log("❌ Failed: Global variables are not accessible.");
    }
}

// Run test
checkGlobalVariable();
