import { ProductInterface } from "@/types";
import ProductCard from "../shop/ProductCard";
import ProductCardSkeleton from "../shop/ProductCardSkeleton";

interface FeaturedProductsInterface {
	products?: ProductInterface[];
	isLoading: boolean;
}

const FeaturedProducts = ({
	products,
	isLoading,
}: FeaturedProductsInterface) => {
	return (
		<div className=" grid gap-6 md:gap-8 px-0 sm:px-6 pb-12">
			<div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
				<div className="grid gap-1 px-4">
					<h1 className="text-2xl font-bold tracking-tight">
						FEATURED PRODUCTS
					</h1>
					<p className="text-muted-foreground">
						Browse our selection of the latest smartphones.
					</p>
				</div>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
				{isLoading &&
					Array.from({ length: 4 }, (_, i) => (
						<ProductCardSkeleton key={i} />
					))}

				{!isLoading &&
					products &&
					products.slice(0, 4).map((product) => {
						return (
							<ProductCard
								key={product.variants[0]._id}
								product={product}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default FeaturedProducts;
