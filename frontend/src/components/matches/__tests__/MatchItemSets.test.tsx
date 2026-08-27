import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MatchItemSets from '../MatchItemSets';

const mockSets = [
	{ id: 1, blackScore: 6, whiteScore: 2 },
	{ id: 2, blackScore: 3, whiteScore: 7 },
];

describe('MatchItemSets', () => {
	it('prikazuje rezultate svih setova', () => {
		render(<MatchItemSets matchSets={mockSets} />);
		expect(screen.getByText('6')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('3')).toBeInTheDocument();
		expect(screen.getByText('7')).toBeInTheDocument();
	});

	it('renderira praznu komponentu za praznu listu', () => {
		const { container } = render(<MatchItemSets matchSets={[]} />);
		expect(container.firstChild?.childNodes).toHaveLength(0);
	});
});
