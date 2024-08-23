import { ProductVariantAttributesType } from "../types/types";

export const formatProductVariantName = (
	name: string,
	attributes: ProductVariantAttributesType
) => {
	const formattedAttributes = Object.entries(attributes)
		.map(([key, value]) => {
			if (key === "color") {
				return typeof value === "string" ? value : value.name;
			} else if (typeof value === "string") {
				return value;
			}
		})
		.join(", ");

	return `${name} (${formattedAttributes})`;
};
