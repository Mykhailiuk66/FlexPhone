import { ProductVariantAttributesType } from "@/types";

export const formatAttributes = (attributes: ProductVariantAttributesType) => {
	const formattedAttributes = Object.entries(attributes)
		.map(([key, value]) => {
			if (key === "color" && typeof value === "object") {
				return value.name;
			}
			return value;
		})
		.join(", ");

	return formattedAttributes;
};

export const formatProductVariantName = (
	name: string,
	attributes: ProductVariantAttributesType
) => {
	const formattedAttributes = formatAttributes(attributes);

	return `${name} (${formattedAttributes})`;
};
