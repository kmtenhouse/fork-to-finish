// Takes in a hex string and returns an object with keys r, g, b representing the color's rgb value (in 0-255)
function hexToRGB(str) {
    // make sure this is a valid hex string first
    if(typeof str !== "string" || /^#{0,1}([0-9a-f]{3}){1,2}$/.test(str) === false) {
        throw new Error("Cannot convert hex to RGB!");
    }

    // if the hex has a # preceeding, remove it
    if (str.charAt(0) === "#") {
        str = str.slice(1);
    }

    // if the hex is a three digit version, we will double each digit
    const redStr = (str.length === 3 ? str[0]+str[0] : str.slice(0,2));
    const greenStr = (str.length === 3 ? str[1]+str[1] : str.slice(2,4));
    const blueStr = (str.length === 3 ? str[2]+str[2] : str.slice(4,6));

    return {
        r: parseInt(redStr, 16),
        g: parseInt(greenStr, 16),
        b: parseInt(blueStr, 16)
    };
}

// Based on the W3C contrast standard for determining white vs black as a default 'contrast color' for text
export default function getContrastColor(hex) {
    let currentRGB = hexToRGB(hex);
    let luminResults = [currentRGB.r, currentRGB.g, currentRGB.b].map(bit => {
        bit = bit / 255.0;
        if(bit <= 0.03928) {
            bit = bit/12.92
        } else {
            bit = Math.pow(((bit+0.055)/1.055), 2.4);
        }
        return bit;
    });
    
    let luminosity = 0.2126 *luminResults[0]+0.7152 * luminResults[1]+ 0.0722 * luminResults[2];
    return (luminosity > 0.179 ? "#000000" : "#FFFFFF");
}