import Pagination from './constants/Pagination';
import './App.css';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Template from "./components/Template"
import Label from "./components/Label"
import Header from "./components/Header"
import Loader from './components/Loader';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allTemplates, setAllTemplates] = useState([]);
  const [templates, setTemplates] = useState(allTemplates);
  let [categoriesTemplates, setCategoriesTemplates] = useState(allTemplates);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("All");
  let PageSize = 12;

  useEffect(() => {
    setIsLoading(true);
    fetchtemplates();
  }, []);

  useEffect(() => {
    setTemplates(categoriesTemplates)
  }, [categoriesTemplates])

  const fetchtemplates = async () => {
    const response = await axios(
      `https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`
    );
    setAllTemplates(response.data)
    setTemplates(response.data)
    setCategoriesTemplates(response.data)
    setIsLoading(false);
  };

  const currentTemplateData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return templates.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, templates]);

  return (

    <div className="container mx-auto p-10">
      <Header
        allTemplates={allTemplates}
        setCategoriesTemplates={setCategoriesTemplates}
        setFilteredCategory={setFilteredCategory}
        setTemplates={setTemplates}
        categoriesTemplates={categoriesTemplates}
      />
      <Label />
      {isLoading ? (
       <Loader/>
      ) : (
        <>
        <div className='flex justify-between'>
        <p className="mb-3">{filteredCategory} Templates</p>
        <p className="mb-3">{templates.length} Templates Found</p>
        </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
            {currentTemplateData.length ? (currentTemplateData.map((template, index) => (
              <Template key={index} template={template} />
            ))) : (<>
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
