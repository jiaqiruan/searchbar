import React, {useState, useEffect} from "react";
import { useDebounce } from "../custom_hooks/debounce";
import { useThrottle } from "../custom_hooks/throttle";
interface BookInfo {
	id: string;
	title: string;
}

const SearchBar:React.FC = () => {
    const [input, setInput] = useState<string>('');
	const [books, setBooks] = useState<BookInfo[]>([]);

    const debounceValue = useDebounce<string>(input, 1000);

    const throttleValue = useThrottle<string>(input, 1000);


    const fetchBooks = async (queryName: string) => {
		try {
			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryName}&startIndex=0&maxResults=5`);
			
			if (!response) {
				throw new Error('response not ok');
			}
			const data = await response.json();
			if (!data) {
				throw new Error('no items found');
			}
			const Books = data.items.map((item: any) => {
				return {id: item.id, 
					title: 
					item.volumeInfo.title
				};
			})
			setBooks(Books);
            console.log(Books);
            
		} catch (error) {
			console.log("error fetching data", error);
		}		
	}

    useEffect(() => {
        fetchBooks(debounceValue);
      }, [debounceValue]);

    const handleInputChange = (event: any) => {
		const inputContent = event.target.value;
		setInput(inputContent);

		if (inputContent !== "") {
			fetchBooks(inputContent);
		} else {
			setBooks([]);
		}
	}

    return (
        <div className="searchbar" data-testid="test-searchbar">
            <input type="text" placeholder={input} list="books" className="search-input" onChange={handleInputChange} data-testid="test-input"/>
            
            {books.length > 0 ? 
            (<datalist id="books" data-testid="test-books">
                {books.map((bookInfo) => {
                    return <option key={bookInfo.id} value={bookInfo.title}/>
                })}
            </datalist>)
            : null}
        </div>
    );
}

export default SearchBar;