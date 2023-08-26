import { baseURL } from "@/api/http";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProductImgCarouselInterface {
	images: string[];
}

const ProductImgCarousel = ({ images }: ProductImgCarouselInterface) => {
	const [selectedImage, setSelectedImage] = useState(
		images.length > 0 ? images[0] : ""
	);

	useEffect(() => {
		setSelectedImage(images.length > 0 ? images[0] : "");
	}, [images]);

	return (
		<div className="grid gap-4 justify-items-center">
			<img
				src={`${baseURL}/${selectedImage}`}
				alt="Product Image"
				width={500}
				height={500}
				className="w-fill rounded-lg object-contain p-4 h-[600px]"
			/>
			<Separator />
			<div className="w-5/6 select-none">
				<Carousel opts={{ loop: true, align: "start" }}>
					<CarouselContent className="-ml-2 md:-ml-4">
						{images.map((url, i) => (
							<CarouselItem
								key={i}
								className="pl-2 md:pl-4 basis-1/4"
							>
								<img
									src={`${baseURL}/${url}`}
									onClick={() => {
										setSelectedImage(url);
									}}
									alt="Product Thumbnail"
									width={100}
									height={100}
									className={cn(
										selectedImage === url &&
											"border border-primary/30 shadow-2xl",
										"cursor-pointer aspect-square w-full rounded-lg object-contain p-4"
									)}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="ml-8 text-primary shadow-2xl" />
					<CarouselNext className="mr-8 text-primary shadow-2xl" />
				</Carousel>
			</div>
		</div>
	);
};

export default ProductImgCarousel;
