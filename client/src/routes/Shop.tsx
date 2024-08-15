import PaginationComponent from "@/components/shop/PaginationComponent";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ShopFilters from "@/components/shop/ShopFilters";
import ProductsList from "@/components/shop/ProductsList";
import MobileFiltersSheet from "@/components/shop/MobileFiltersSheet";
import ProductListSkeleton from "@/components/shop/ProductListSkeleton";
import { fetchProducts } from "@/api/productsApi";

const Shop = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", searchParams.toString()],
		queryFn: () => fetchProducts(searchParams),
		staleTime: 1000 * 60,
	});

	const handlePageChange = (newPage: number) => {
		setSearchParams((searchParams) => {
			searchParams.set("page", newPage.toString());
			return searchParams;
		});
	};

	return (
		<div className="md:grid md:grid-cols-[270px_1fr] min-h-screen">
			<span className="block md:hidden">
				<MobileFiltersSheet />
			</span>
			<div className="hidden md:block bg-background border-r pr-6 pl-10 py-4 shadow-2xl ">
				<ShopFilters className="sticky top-20 max-h-[85vh] lg:max-h-[90vh]" />
			</div>

			<div className="bg-muted/40 p-6">
				{isLoading && <ProductListSkeleton />}
				{isError && <div>Something went wrong</div>}

				{data && <ProductsList products={data.products} />}

				{data && data.totalPages > 0 && (
					<PaginationComponent
						currentPage={data.currentPage}
						totalPages={data.totalPages}
						onPageChange={handlePageChange}
						className="mt-6"
					/>
				)}
			</div>
		</div>
	);
};

export default Shop;
