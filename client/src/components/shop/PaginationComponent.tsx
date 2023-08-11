import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationEllipsis,
} from "@/components/ui/pagination";
import { useMemo } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface PaginationComponentProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const PaginationComponent = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationComponentProps) => {
	const handlePageChange = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		page: number
	) => {
		event.preventDefault();
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const pagesToShow = useMemo(() => {
		const range = 2;
		const start = Math.max(2, currentPage - range);
		const end = Math.min(totalPages - 1, currentPage + range);
		const pages = [];

		if (totalPages > 1) {
			pages.push(1);

			if (start > 2) {
				pages.push("ellipsis");
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < totalPages - 1) {
				pages.push("ellipsis");
			}

			if (totalPages > 1) {
				pages.push(totalPages);
			}
		}

		return pages;
	}, [currentPage, totalPages]);

	return (
		<Pagination>
			<PaginationContent>
				{currentPage != 1 && (
					<PaginationItem>
						<PaginationLink onClick={(e) => handlePageChange(e, 1)}>
							<MdNavigateBefore />
						</PaginationLink>
					</PaginationItem>
				)}

				{pagesToShow.map((page, index) => (
					<PaginationItem key={index}>
						{page === "ellipsis" && <PaginationEllipsis />}
						{page !== "ellipsis" && (
							<PaginationLink
								isActive={page === currentPage}
								onClick={(e) =>
									handlePageChange(e, page as number)
								}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				{currentPage != totalPages && (
					<PaginationItem>
						<PaginationLink
							onClick={(e) =>
								handlePageChange(e, currentPage + 1)
							}
						>
							<MdNavigateNext />
						</PaginationLink>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComponent;
