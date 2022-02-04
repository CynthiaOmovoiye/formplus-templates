import React, { useState, useEffect } from "react";

const Header = ({
    allTemplates,
    setCategoriesTemplates,
    setFilteredCategory,
    setTemplates,
    // setSearchValue,
    categoriesTemplates
}) => {
    const [selectedName, setSelectedName] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [searchValue, setSearchValue] = useState("")
    const healthTemplates = allTemplates.filter((_data) => _data?.category?.includes('Health'))
    const educationTemplates = allTemplates.filter((_data) => _data?.category?.includes('Education'))
    const eccomerceTemplates = allTemplates.filter((_data) => _data?.category?.includes('E-commerce'))
    useEffect(() => {
        handleSearch(searchValue)
    }, [searchValue])
    const FilterByCategory = (value) => {
        setFilteredCategory(value)
        setSelectedName("");
        setSelectedDate("")
        setSearchValue("")
        switch (value) {
            case "E-commerce":
                setCategoriesTemplates(eccomerceTemplates)
                break;
            case "Health":
                setCategoriesTemplates(healthTemplates)
                break;
            case "Education":
                setCategoriesTemplates(educationTemplates)
                break;
            default:
                setCategoriesTemplates(allTemplates)
        }
    };

    const handleSearch = (value) => {
        if (value != "") {
            categoriesTemplates = categoriesTemplates.filter((_data) => _data?.name?.toLowerCase().includes(value?.toLowerCase()));
        }
        setTemplates(categoriesTemplates);
    };

    const FilterByDate = (value) => {
        setSelectedDate(value)
        setSelectedName("");
        if (value == "Ascending") {
            categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.created.localeCompare(dateB.created))
        }
        else if (value == "Descending") {
            categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.created.localeCompare(dateB.created)).reverse()
        }
        return setTemplates(categoriesTemplates);

    }
    const FilterByAlphabetically = (value) => {
        setSelectedName(value)
        setSelectedDate("")
        if (value == "Ascending") {
            categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.name.localeCompare(dateB.name))
        }
        else if (value == "Descending") {
            categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.name.localeCompare(dateB.name)).reverse()
        }
        return setTemplates(categoriesTemplates);
    };
    return <div className='flex mb-5 justify-between flex-wrap items-center mb-3'>
        <div className='w-full md:w-1/4 flex justify-center md:justify-start'>
            <input
                type="text"
                name="first-name"
                id="first-name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Search Templates'
                className="shadow-sm w-full sm:text-sm border border-gray-100 rounded-md p-2"
            />
        </div>

        <div className='flex sm:flex-row flex-col justify-around items-center w-full md:w-3/5'>
            <span>Sort by:</span>
            <div className='w-full sm:w-1/4 '>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    onChange={(e) => FilterByCategory(e.target.value)}
                    className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  sm:text-sm"
                >
                    <option value="All">All</option>
                    <option value="Health">Health</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Education">Education</option>
                </select>
            </div>
            <div className='w-full sm:w-1/4 '>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                    Order
                </label>
                <select
                    id="order"
                    name="order"
                    value={selectedName}
                    onChange={(e) => FilterByAlphabetically(e.target.value)}
                    className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                >
                    <option value=''>Default</option>
                    <option value='Ascending'>Ascending</option>
                    <option value='Descending'>Descending</option>
                </select>
            </div>

            <div className='w-full sm:w-1/4 '>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <select
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={(e) => FilterByDate(e.target.value)}
                    className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                >
                    <option value=''>Default</option>
                    <option value='Ascending'>Ascending</option>
                    <option value='Descending'>Descending</option>
                </select>
            </div>


        </div>
    </div>;
};

export default Header;
