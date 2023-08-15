import { ProductVariantAttributesType } from "../types/types";

export const formatProductVariantName = (
	name: string,
	attributes: ProductVariantAttributesType
) => {
	const formattedAttributes = Object.entries(attributes)
		.map(([key, value]) => {
			if (key === "color" && typeof value === "object") {
				return value.name;
			}
			return value;
		})
		.join(", ");

	return `${name} (${formattedAttributes})`;
};
