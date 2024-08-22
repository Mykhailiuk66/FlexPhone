import ProductCard from "./ProductCard";
import { ProductInterface } from "@/types";

interface ProductListProps {
	products: ProductInterface[];
}

const ProductsList = ({ products }: ProductListProps) => {
	return (
		<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
			{products.length > 0 &&
				products.map((product) => {
					return (
						<ProductCard
							key={product.variants[0]._id}
							product={product}
						/>
					);
				})}
		</div>
	);
};

export default ProductsList;
