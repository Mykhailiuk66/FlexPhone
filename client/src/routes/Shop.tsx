import ProductCard from "@/components/shop/ProductCard";
import PaginationComponent from "@/components/shop/PaginationComponent";
import { useSearchParams } from "react-router-dom";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import ShopFilters from "@/components/shop/ShopFilters";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";

const Shop = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handlePageChange = (newPage: number) => {
		setSearchParams((searchParams) => {
			searchParams.set("page", newPage.toString());
			return searchParams;
		});
	};

	const handleFilterChange = (event: React.FormEvent<HTMLFormElement>) => {
		const field = event.target as HTMLInputElement;
	};

	const currentPage = Number(searchParams.get("page")) || 1;

	return (
		<div className="md:grid md:grid-cols-[270px_1fr] min-h-screen">
			<span className="block md:hidden">
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
						<SheetTitle className="text-2xl pb-2">
							Filters
						</SheetTitle>
						<ShopFilters
							onChange={handleFilterChange}
							className="mt-4 max-h-full"
						/>
					</SheetContent>
				</Sheet>
			</span>

			<div className="hidden md:block bg-background border-r pr-6 pl-10 py-4 shadow-2xl ">
				<ShopFilters
					onChange={handleFilterChange}
					className="sticky top-20 max-h-[85vh] lg:max-h-[90vh]"
				/>
			</div>

			<div className="bg-muted/40 p-6">
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: 19 }, (_, i) => (
						<ProductCard
							key={i}
							id={i.toString()}
							children="iPhone 14 Pro"
							attr_desc="128GB, 6GB RAM"
							img="https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg"
							price={999}
						/>
					))}

					<ProductCard
						id="20"
						children="iPhone 14 Pro Max Ultra Wide Mega Plus"
						attr_desc="128GB, 6GB RAM"
						img="https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp"
						price={999}
					/>
				</div>

				<div className="mt-6">
					<PaginationComponent
						currentPage={currentPage}
						totalPages={8}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default Shop;
