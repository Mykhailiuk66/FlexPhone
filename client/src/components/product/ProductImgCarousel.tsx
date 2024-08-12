import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

const imgUrls = [
	"https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
	"https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp",
	"https://www.abanista.com/wp-content/uploads/2022/08/15.jpg",
	"https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp",
	"https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
	"https://www.abanista.com/wp-content/uploads/2022/08/15.jpg",
];

const ProductImgCarousel = () => {
	const [selectedImage, setSelectedImage] = useState(
		"https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg"
	);

	return (
		<div className="grid gap-4 justify-items-center">
			<img
				src={selectedImage}
				alt="Product Image"
				width={500}
				height={500}
				className="aspect-square w-full rounded-lg object-cover p-4"
			/>
			<Separator />
			<div className="w-5/6">
				<Carousel opts={{ loop: true, align: "start" }}>
					<CarouselContent className="-ml-2 md:-ml-4">
						{imgUrls.map((url, i) => (
							<CarouselItem
								key={i}
								className="pl-2 md:pl-4 basis-1/4"
							>
								<img
									src={url}
									onClick={() => setSelectedImage(url)}
									alt="Product Thumbnail"
									width={100}
									height={100}
									className={cn(
										selectedImage === url &&
											"border border-primary/30 shadow-2xl",
										"cursor-pointer aspect-square w-full rounded-lg object-cover p-4"
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
