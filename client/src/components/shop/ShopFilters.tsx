import {
	PriceRangeFilter,
	CheckboxFilter,
} from "@/components/shop/FilterSection";
import { cn } from "@/lib/utils";

const ramOptions = ["4 GB", "6 GB", "8 GB", "12 GB", "16 GB"];
const brandOptions = ["Samsung", "Apple", "Xiaomi", "OnePlus"];
const storageOptions = ["64 GB", "128 GB", "256 GB", "512 GB", "1024 GB"];

interface ShopFiltersProps {
	className?: string;
}

const ShopFilters = ({ className }: ShopFiltersProps) => {
	return (
		<div className={cn("space-y-8 pb-4 pt-4 overflow-y-auto", className)}>
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
		</div>
	);
};

export default ShopFilters;
