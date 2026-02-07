const os = require("os");
const fs = require("fs");

// Function to collect system info
function logSystemInfo() {
    const time = new Date();
    const cpuInfo = os.cpus()[0].model;
    const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2); // GB
    const platform = os.platform();
    const logData = `
Time:${time}
Platform: ${platform}
CPU: ${cpuInfo}
Total Memory: ${totalMemory} GB
`;

    console.log(logData);
}

// Log every 5 seconds
setInterval(logSystemInfo, 5000);

console.log("System information logging started...");