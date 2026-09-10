// TODO add tests for AddMatchModal component
// import React from 'react';
// import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import AddMatchModal from '../../../src/components/matches/AddMatchModal';

// // Mock MUI Dialog components to avoid portal issues in tests
// jest.mock('@mui/material', () => {
//   const actual = jest.requireActual('@mui/material');
//   return {
//     ...actual,
//     Dialog: (props: any) => <div>{props.children}</div>,
//     DialogTitle: (props: any) => <div>{props.children}</div>,
//     DialogContent: (props: any) => <div>{props.children}</div>,
//     DialogActions: (props: any) => <div>{props.children}</div>,
//   };
// });

// // Mock Redux hooks and API slices used inside the component
// jest.mock('../../../src/redux/store', () => ({}));

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
// }));

// jest.mock('../../../src/redux/api/seasonsApi', () => ({
//   useGetSeasonsQuery: jest.fn(),
// }));

// jest.mock('../../../src/redux/api/teamsApi', () => ({
//   useGetTeamsQuery: jest.fn(),
// }));

// jest.mock('../../../src/redux/api/matchesApi', () => ({
//   useAddMatchWithDetailsMutation: jest.fn(),
// }));

// jest.mock('../../../src/redux/api/teamMembersApi', () => ({
//   useGetTeamMembersQuery: jest.fn(),
// }));

// // Helper to reset all mocked hooks to a known default state before each test
// const resetMocks = () => {
//   const { useSelector } = require('react-redux');
//   const { useGetSeasonsQuery } = require('../../../src/redux/api/seasonsApi');
//   const { useGetTeamsQuery } = require('../../../src/redux/api/teamsApi');
//   const { useAddMatchWithDetailsMutation } = require('../../../src/redux/api/matchesApi');
//   const { useGetTeamMembersQuery } = require('../../../src/redux/api/teamMembersApi');

//   useSelector.mockReset();
//   useGetSeasonsQuery.mockReturnValue({ data: [], isLoading: false });
//   useGetTeamsQuery.mockReturnValue({ data: [], isLoading: false });
//   useAddMatchWithDetailsMutation.mockReturnValue([jest.fn(), { isLoading: false }]);
//   // By default team‑member queries return an empty array (no players)
//   useGetTeamMembersQuery.mockImplementation(() => ({ data: [] }));
// };

// describe('AddMatchModal component', () => {
//   beforeEach(() => {
//     resetMocks();
//   });

//   const renderModal = (open = true, onClose = jest.fn()) =>
//     render(<AddMatchModal open={open} onClose={onClose} />);

//   test('renders title and core form fields', () => {
//     const { useGetSeasonsQuery } = require('../../../src/redux/api/seasonsApi');
//     useGetSeasonsQuery.mockReturnValue({
//       data: [{ id: 1, name: '2025/2026' }],
//       isLoading: false,
//     });

//     const { useGetTeamsQuery } = require('../../../src/redux/api/teamsApi');
//     useGetTeamsQuery.mockReturnValue({
//       data: [
//         { id: 10, seasonId: 1, name: 'Bijeli' },
//         { id: 11, seasonId: 1, name: 'Crni' },
//       ],
//       isLoading: false,
//     });

//     const { useSelector } = require('react-redux');
//     useSelector.mockImplementation((fn: any) => fn({ season: { selectedSeasonId: 1 } }));

//     renderModal();

//     expect(screen.getByText('Dodaj utakmicu')).toBeInTheDocument();
//     expect(screen.getByLabelText('Sezona')).toBeInTheDocument();
//     expect(screen.getByLabelText('Datum')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Spremi utakmicu/i })).toBeInTheDocument();
//   });

//   test('shows validation error when season or date is missing', async () => {
//     // No seasons – component will keep selectedSeason empty string
//     const { useGetSeasonsQuery } = require('../../../src/redux/api/seasonsApi');
//     useGetSeasonsQuery.mockReturnValue({ data: [], isLoading: false });

//     const { useSelector } = require('react-redux');
//     useSelector.mockImplementation((fn: any) => fn({ season: { selectedSeasonId: 1 } }));

//     renderModal();

//     const saveBtn = screen.getByRole('button', { name: /Spremi utakmicu/i });
//     fireEvent.click(saveBtn);

//     await waitFor(() => {
//       expect(screen.getByText('Odaberi sezonu i datum.')).toBeInTheDocument();
//     });
//   });

//   test('successful submit displays success message and triggers onClose after delay', async () => {
//     jest.useFakeTimers();

//     const mockAdd = jest.fn().mockResolvedValue({ data: {} });
//     const { useAddMatchWithDetailsMutation } = require('../../../src/redux/api/matchesApi');
//     useAddMatchWithDetailsMutation.mockReturnValue([mockAdd, { isLoading: false }]);

//     const { useGetSeasonsQuery } = require('../../../src/redux/api/seasonsApi');
//     useGetSeasonsQuery.mockReturnValue({
//       data: [{ id: 1, name: '2025/2026' }],
//       isLoading: false,
//     });

//     const { useGetTeamsQuery } = require('../../../src/redux/api/teamsApi');
//     useGetTeamsQuåery.mockReturnValue({
//       data: [
//         { id: 10, seasonId: 1, name: 'Bijeli' },
//         { id: 11, seasonId: 1, name: 'Crni' },
//       ],
//       isLoading: false,
//     });

//     const { useGetTeamMembersQuery } = require('../../../src/redux/api/teamMembersApi');
//     // Supply at least one player for each team so the checkboxes render
//     useGetTeamMembersQuery.mockImplementation((teamId: number) => ({
//       data: [{ playerId: teamId * 100 + 1, playerName: `Player ${teamId}` }],
//     }));

//     const { useSelector } = require('react-redux');
//     useSelector.mockImplementation((fn: any) => fn({ season: { selectedSeasonId: 1 } }));

//     const onClose = jest.fn();
//     renderModal(true, onClose);

//     const saveBtn = screen.getByRole('button', { name: /Spremi utakmicu/i });
//     fireEvent.click(saveBtn);

//     await waitFor(() => expect(mockAdd).toHaveBeenCalledTimes(1));
//     expect(screen.getByText('Utakmica je uspješno spremljena!')).toBeInTheDocument();

//     // Advance the internal 1‑second timeout that triggers onClose
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });

//     expect(onClose).toHaveBeenCalled();
//     jest.useRealTimers();
//   });
// });
