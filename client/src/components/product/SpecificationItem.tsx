interface SpecificationItemProps {
	label: string;
	children: React.ReactNode;
}

const SpecificationItem = ({ label, children }: SpecificationItemProps) => {
	return (
		<div>
			<span className="font-medium">{label}: </span>
			{children}
		</div>
	);
};

export default SpecificationItem;
