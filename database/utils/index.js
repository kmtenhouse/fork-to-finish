const hexToRGB = require("./contrastColor").hexToRGB;
const testColor = "ffffff";
const contrastColor = hexToRGB(testColor);
console.log(contrastColor);