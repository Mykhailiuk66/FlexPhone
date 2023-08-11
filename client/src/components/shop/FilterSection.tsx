import { useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckedState } from "@radix-ui/react-checkbox";

interface FilterSectionProps {
	title: string;
	children: React.ReactNode;
}

interface CheckboxFilterProps {
	items: string[];
	title: string;
	fieldName: string;
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
	return (
		<div>
			<h3 className="text-lg font-semibold">{title}</h3>
			<div className="mt-4 space-y-2">{children}</div>
		</div>
	);
};

export const PriceRangeFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let min = parseFloat(event.target.value);
		if (min < 0) min = 0;
		setSearchParams((searchParams) => {
			const max = searchParams.get("maxPrice");
			searchParams.set("minPrice", min.toString());
			if (max && min > parseFloat(max)) searchParams.delete("maxPrice");
			return searchParams;
		});
	};

	const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let max = parseFloat(event.target.value);
		if (max < 0) max = 0;
		setSearchParams((searchParams) => {
			const min = searchParams.get("minPrice");
			searchParams.set("maxPrice", max.toString());
			if (min && max < parseFloat(min)) searchParams.set("minPrice", "0");
			return searchParams;
		});
	};

	return (
		<FilterSection title="Price Range">
			<div className="mt-4 space-y-2">
				<div className="items-center justify-between grid grid-cols-[2fr_2fr_2fr]">
					<label
						htmlFor="price-min"
						className="text-sm font-medium mr-4"
					>
						Min:
					</label>
					<Input
						name="minPrice"
						type="number"
						min="0"
						onChange={handleMinChange}
						value={searchParams.get("minPrice") || ""}
						className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
					/>
				</div>
				<div className="items-center justify-between grid grid-cols-[2fr_2fr_2fr]">
					<label htmlFor="price-max" className="text-sm font-medium">
						Max:
					</label>
					<Input
						name="maxPrice"
						type="number"
						onChange={handleMaxChange}
						value={searchParams.get("maxPrice") || ""}
						className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
					/>
				</div>
			</div>
		</FilterSection>
	);
};

export const CheckboxFilter = ({
	items,
	title,
	fieldName,
}: CheckboxFilterProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChange = (checked: CheckedState, value: string) => {
		setSearchParams((searchParams) => {
			if (checked) {
				searchParams.append(fieldName, value);
			} else {
				searchParams.delete(fieldName, value);
			}
			return searchParams;
		});
	};

	return (
		<FilterSection title={title}>
			{items.map((item, index) => (
				<Label key={index} className="flex items-center gap-2">
					<Checkbox
						name={fieldName}
						value={item}
						checked={
							searchParams.getAll(fieldName).find((value) => {
								return (
									value.toLowerCase() === item.toLowerCase()
								);
							}) !== undefined
						}
						onCheckedChange={(checked) =>
							handleChange(checked, item)
						}
					/>
					<span className="text-sm font-medium">{item}</span>
				</Label>
			))}
		</FilterSection>
	);
};
