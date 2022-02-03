import Pagination from './constants/Pagination';
import './App.css';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Template from "./components/Template"
import Label from "./components/Label"


let PageSize = 12;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [templates, setTemplates] = useState([]);
  let   [categoriesTemplates, setCategoriesTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [selectedName, setSelectedName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchValue, setSearchValue] = useState("")


  useEffect(() => {
    setIsLoading(true);
    fetchtemplates();
  }, []);

  useEffect(() => {
    handleSearch(searchValue)
}, [searchValue])

  const fetchtemplates = async () => {
    const response = await axios(
      `https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`
    );
    setTemplates(response.data)
    setCategoriesTemplates(response.data)
    setIsLoading(false);
  };
 
  const FilterByCategory = (value) => {
    setFilteredCategory(value)
    setSelectedName("");
    setSelectedDate("")
    setSearchValue("")
    if (value !== "All") {
      categoriesTemplates = categoriesTemplates.filter((_data) => _data?.category?.includes(value));
    }
    return setTemplates(categoriesTemplates);
  };

  const handleSearch = (value) => {
    if(value != ""){
     categoriesTemplates = categoriesTemplates.filter((_data) => _data?.name?.toLowerCase().includes(value?.toLowerCase()));
    }
    return setTemplates(categoriesTemplates); 
};

  const FilterByDate = (value) => {
    setSelectedDate(value)
    setSelectedName("");
    if(value == "Ascending"){
      categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.created.localeCompare(dateB.created))
     }
     else if(value == "Descending"){
      categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.created.localeCompare(dateB.created)).reverse()
     }
     return setTemplates(categoriesTemplates);
   
  }
  const FilterByAlphabetically = (value) => {
    setSelectedName(value)
    setSelectedDate("")
    if(value == "Ascending"){
      categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.name.localeCompare(dateB.name))
     }
     else if(value == "Descending"){
      categoriesTemplates = [...categoriesTemplates].sort((dateA, dateB) => dateA.name.localeCompare(dateB.name)).reverse()
     }
     return setTemplates(categoriesTemplates);
  };

  const currentTemplateData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return templates.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, templates]);

  return (

    <div className="container mx-auto p-10">
      <div className='flex mb-5 justify-between flex-wrap items-center mb-3'>
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
      </div>
      <Label/>
     
      {isLoading ? (
        <p className="loading">Loading Templates...</p>
      ) : (
        
        <>
        <p className="mb-3">{filteredCategory} Templates</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {currentTemplateData.length ? (currentTemplateData.map((template, index) => (
            <Template key = {index} template={template}/>
          ))):(<>
          <div className="font-bold text-xl mb-2 text-neutral-100 flex items-center justify-center">No Result</div>
          </>)}
        </div>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={templates.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  )
}

export default App;
