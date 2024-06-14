import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import SearchBar from "./SearchBar";

describe('search bar', () => {

    let fetchMock: any = undefined;

    const assetsFetchMock = () => Promise.resolve({
		ok: true,
		status: 200,
		json: () => Promise.resolve({
			items: [
				{
					id: '1',
					volumeInfo: {
						title: 'test 1'
					}
				}, {
					id: '2',
					volumeInfo: {
						title: 'test 2'
					}
				}, {
					id: '3',
					volumeInfo: {
						title: 'should not appear'
					}
				}, 
			]
		}),
	}) as Promise<Response>;

    beforeEach(() => {
		fetchMock = jest.fn().mockImplementation(assetsFetchMock);
		global.fetch = fetchMock;
	});
	
	afterEach(() => {
		jest.restoreAllMocks();
	});


    it('should render search bar', () => {
        render(<SearchBar />);
		const searchBar = screen.getByTestId('test-searchbar');
		expect(searchBar).toBeInTheDocument();
    });
    it('should render dropdown list when input changes', async () => {
        render(<SearchBar />);
        const input = screen.getByTestId("test-input") as HTMLInputElement ;;
        expect(input).toBeInTheDocument();
        fireEvent.change(input,{ target: { value: 'test' } });
        expect(input.value).toBe('test');
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        })
        await waitFor(() => {
			const books = screen.getByTestId('test-books');
			expect(books).toBeInTheDocument();
			expect(books.children.length).toBeGreaterThan(0);
		});
    });
});