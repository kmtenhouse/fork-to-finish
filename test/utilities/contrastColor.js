const expect = require("chai").expect;
const hexToRGB = require("../../database/services/utils/contrastColor").hexToRGB
const getContrastColor = require("../../database/services/utils/contrastColor").getContrastColor;

describe("calculate rgb color", function () {
    it("should calculate the correct rgb values from a six digit hex string (with #)", function () {
        const testColor = "#ffffff";
        const contrastColor = hexToRGB(testColor);
        expect(contrastColor).to.eql({ r: 255, g: 255, b: 255 });
    });

    it("should calculate the correct rgb values from a six digit hex string (no #)", function () {
        const testColor = "ffffff";
        const contrastColor = hexToRGB(testColor);
        expect(contrastColor).to.eql({ r: 255, g: 255, b: 255 });
    });

    it("should calculate the correct rgb values from a three digit hex string (with #)", function () {
        const testColor = "#fff";
        const contrastColor = hexToRGB(testColor);
        expect(contrastColor).to.eql({ r: 255, g: 255, b: 255 });
    });

    it("should calculate the correct rgb values from a three digit hex string (no #)", function () {
        const testColor = "fff";
        const contrastColor = hexToRGB(testColor);
        expect(contrastColor).to.eql({ r: 255, g: 255, b: 255 });
    });

    it("should throw an error when given an invalid type", function () {
        const badFn = () => {
            const contrastColor = hexToRGB(["#fff"]);
        }
        expect(badFn).to.throw();
    });

});

describe("get contrast color from a hex", function () {

    it("should calculate the correct contrast color from a six digit hex string (with #)", function () {
        const testColor = "#ffffff";
        const contrastColor = getContrastColor(testColor);
        expect(contrastColor).to.equal("#000000");
    });

    it("should calculate the correct contrast color from a six digit hex string (no #)", function () {
        const testColor = "ffffff";
        const contrastColor = getContrastColor(testColor);
        expect(contrastColor).to.equal("#000000");
    });

    it("should calculate the correct contrast color from a three digit hex string (with #)", function () {
        const testColor = "#fff";
        const contrastColor = getContrastColor(testColor);
        expect(contrastColor).to.equal("#000000");
    });

    it("should calculate the correct contrast color from a three digit hex string (no #)", function () {
        const testColor = "fff";
        const contrastColor = getContrastColor(testColor);
        expect(contrastColor).to.equal("#000000");
    });

    it("should throw an error when given an invalid type", function () {
        const badFn = () => {
            const contrastColor = getContrastColor(["#fff"]);
        }
        expect(badFn).to.throw();
    });

});