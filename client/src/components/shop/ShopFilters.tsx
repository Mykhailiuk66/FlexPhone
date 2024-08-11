import {
	PriceRangeFilter,
	CheckboxFilter,
} from "@/components/shop/FilterSection";
import { cn } from "@/lib/utils";

const ramOptions = ["4GB", "8GB", "12GB", "16GB"];
const brandOptions = ["Samsung", "Apple", "Xiaomi", "OnePlus"];
const storageOptions = ["64GB", "128GB", "256GB", "512GB"];
const colorOptions = ["Black", "White", "Blue", "Red"];

interface ShopFiltersProps {
	className?: string;
	onChange: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ShopFilters = ({ className, onChange }: ShopFiltersProps) => {
	const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(event);
	};

	return (
		<form
			onChange={handleChange}
			className={cn("space-y-8 pb-4 overflow-y-scroll", className)}
		>
			<PriceRangeFilter />

			<CheckboxFilter items={ramOptions} title="RAM" fieldName="ram" />
			<CheckboxFilter
				items={brandOptions}
				title="Brand"
				fieldName="brand"
			/>
			<CheckboxFilter
				items={storageOptions}
				title="Storage"
				fieldName="storage"
			/>
			<CheckboxFilter
				items={colorOptions}
				title="Color"
				fieldName="color"
			/>
		</form>
	);
};

export default ShopFilters;
