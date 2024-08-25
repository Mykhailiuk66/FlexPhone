"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProductVariantName = void 0;
const formatProductVariantName = (name, attributes) => {
    const formattedAttributes = Object.entries(attributes)
        .map(([key, value]) => {
        if (key === "color") {
            return typeof value === "string" ? value : value.name;
        }
        else if (typeof value === "string") {
            return value;
        }
    })
        .join(", ");
    return `${name} (${formattedAttributes})`;
};
exports.formatProductVariantName = formatProductVariantName;
