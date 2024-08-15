import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";
import ShopFilters from "./ShopFilters";

const MobileFiltersSheet = () => {
	return (
		<Sheet>
			<SheetTrigger className="fixed top-20 left-3 z-50" asChild>
				<Button
					variant="outline"
					className="rounded-full h-14 w-14 border-solid border-primary/70 shadow-2xl"
				>
					<FaFilter className="w-5 h-5 text-primary" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-4/6 pb-20">
				<SheetTitle className="text-2xl pb-2">Filters</SheetTitle>
				<ShopFilters className="mt-4 max-h-full" />
			</SheetContent>
		</Sheet>
	);
};

export default MobileFiltersSheet;
