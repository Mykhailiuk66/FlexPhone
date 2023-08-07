export const formatProductVariantName = (
	name: string,
	attributes: Record<string, string | Record<string, string>>
) => {
	return (
		`${name} ` +
		`(${`${Object.entries(attributes)
			.map(([k, v]) => {
				if (k === "color" && typeof v === "object") {
					return `${v.name}`;
				}
				return v;
			})
			.join(", ")}`})`
	);
};
