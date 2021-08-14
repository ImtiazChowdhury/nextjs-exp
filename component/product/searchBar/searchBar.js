import { useEffect, useState } from "react";
import { searchProduct } from "../../../api/product/product";
import styles from "./searchBar.module.css";

export function SearchBar(props) {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [userInput, setUserInput] = useState("");

    function handleSearch(e) {
        setUserInput(e.target.value || "")
    }

    useEffect(() => {
        setSearch(userInput)
        setSelectedIndex(-1) //reset selection by key on new value
    }, [userInput])

    async function getSearchData() {
        //using the same api as the main page as the main search as we don't have search suggestion api yet
        const productList = await searchProduct(userInput);
        setSearchResult(productList.data);
    }

    useEffect(() => {
        if (userInput && userInput.trim()) {
            getSearchData();
            return function () {
                setSearchResult([])
            }
        }
    }, [userInput])


    // listen to keypress event
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)

        return function () {
            window.removeEventListener("keydown", handleKeyPress);
        }
    }, [searchResult])

    function handleKeyPress(e) {
        setSelectedIndex(prevIndex => {
            const listLength = searchResult.length;

            if (e.keyCode == 38) { //up arrow

                if (prevIndex == -1) {
                    return listLength - 1 //if already at the top take to bottom
                }
                else {
                    return prevIndex - 1
                }
            }

            if (e.keyCode == 40) { //down arrow

                if (prevIndex >= listLength - 1) {
                    return -1 //if already at  bottom take to top
                } else {
                    return prevIndex + 1
                }
            }

            return prevIndex
        })
    }

    //handle selection
    useEffect(() => {
        if (selectedIndex == -1) {
            setSearch(userInput); //revert back to original input, user is at top 
        } else {
            handleIndexChange();
        }
    }, [selectedIndex])

    //! pay attention here
    function handleIndexChange() {
        const selectedProduct = searchResult[selectedIndex]
        setSearch(selectedProduct?.title);
    }


    //handle submit
    function handleSubmit(e) {
        e.preventDefault();
        setSearchResult([]);
        if (props.handleSubmit) props.handleSubmit(search);
    }

    //handle X button click
    function cancelSearch() {
        setSearchResult([]);
        setSearch("");
        setUserInput("");
        if (props.handleSubmit) props.handleSubmit("");

    }

    // click on suggestions
    function handleClick(index) {
        const value = searchResult[index]?.title || ""
        if (props.handleSubmit) props.handleSubmit(value);
        setSearch(value);
        setSearchResult([]);
    }

    return (
        <div className={`row m-2 p-2 `}>

            <form onSubmit={handleSubmit} className="col-12 p-0">
                <div className="input-group">

                    <input type="text" name="search" id="" className="form-control p-2" placeholder="&#128269; ..."
                        value={search} onChange={handleSearch} autoComplete="off"
                    />
                    <div className="input-group-append">
                        <button type="button" className="button btn text-danger bg-light border" onClick={cancelSearch}>X</button>
                    </div>
                </div>

            </form>
            
            {searchResult && searchResult.length > 0 &&
                <div className="relativeContainer col-12 p-0">
                    <div className={`border col-12 p-0 ${styles.suggestionContainer}`}>

                        <div className={`p-3 border-bottom p-1 ${-1 == selectedIndex && "bg-light"}`}
                        >
                            &#128269; {userInput}
                        </div>
                        {searchResult.map((product, index) => (

                            <div key={product._id} onClick={() => handleClick(index)}
                                className={`${styles.suggestion} p-3 border-bottom p-1 ${index == selectedIndex && "bg-light"} suggestion`}
                            >
                                {product.title}
                            </div>

                        ))}

                    </div>
                </div>
            }

        </div>
    )
}