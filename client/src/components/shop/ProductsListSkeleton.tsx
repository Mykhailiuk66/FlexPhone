import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsListSkeleton = () => {
	return (
		<div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: 12 }, (_, i) => {
				return <ProductCardSkeleton key={i} />;
			})}
		</div>
	);
};

export default ProductsListSkeleton;
