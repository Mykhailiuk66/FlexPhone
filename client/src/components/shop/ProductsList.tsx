import { formatAttributes } from "@/utils/utils";
import ProductCard from "./ProductCard";
import { baseURL } from "@/api/axios";
import { ProductInterface } from "@/types";

interface ProductListProps {
	products: ProductInterface[];
}

const ProductsList = ({ products }: ProductListProps) => {
	return (
		<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
			{products.length > 0 &&
				products.map((product) => {
					const prodImg =
						product.variants[0].images.length > 0
							? product.variants[0].images[0]
							: product.defaultImages.length > 0
							? product.defaultImages[0]
							: "";

					return (
						<ProductCard
							key={product.variants[0]._id}
							productId={product._id}
							variantId={product.variants[0]._id}
							children={product.name}
							attributesDesc={formatAttributes(
								product.variants[0].attributes
							)}
							img={`${baseURL}/${prodImg}`}
							price={product.variants[0].price}
						/>
					);
				})}
		</div>
	);
};

export default ProductsList;
