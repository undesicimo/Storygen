type P = {
	onClick: void;
	open: boolean;
	title: string;
	description?: string;
	num: number;
};

export default function TestComponent(props: P) {
	return (
		<div>
			test
			<h1>title</h1>
		</div>
	);
}
