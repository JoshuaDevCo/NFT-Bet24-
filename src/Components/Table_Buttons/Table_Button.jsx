import React,{ useState } from 'react';
import './Table_Button.css'
const Table_Buttons = ({setcurrentPage,currentPage,indexOfFirstPage,indexOfLastPost,totalData,listPerpage}) => {
    // let last_value = Number(props.data.last_value);
    // let first_value = Number(props.data.first_value);
    // let [value,setvalue] = new useState(Number(props.data.current_value));
  
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
      };
      
      const goToNextPage = () => {
        // Assuming you have a totalPageCount variable representing the total number of pages
        if (currentPage < totalData) {
            setcurrentPage(currentPage + 1);
        }
      };
  
   
    return ( 
        <div className="Table_Buttons d-flex flex-row align-items-center">
            <button className="tablebtn bg-white px-6 py-2" 
            onClick={()=>{
                setcurrentPage(1)
            }}
            >First</button>
            <button className="tablebtn bg-white px-6 py-2"
            onClick={()=> goToPreviousPage()}
            // onClick={()=>{
            //     setcurrentPage(()=>{
            //         if(currentPage-1 > 1)
            //         {
            //             currentPage = currentPage - 1;
            //             return currentPage;
            //         }
            //         return 1;
            //     });
            // }}
            >Prev</button>
            <p className='px-4 py-2 h-color m-0 fs-5 bg-pp'>{currentPage}</p>
            <button className="tablebtn bg-white px-6 py-2"
            onClick={()=> goToNextPage() }
            // onClick={()=>{
            //     setcurrentPage(()=>{
            //         if(currentPage+1 < Math.ceil(totalData/listPerpage))
            //         {
            //             currentPage = currentPage+1;
            //             return currentPage;
            //         }
            //         return Math.ceil(totalData/listPerpage);
            //     });
            // }}
            >Next</button>
            <button className="tablebtn bg-white px-6 py-2"
            onClick={()=>{
                setcurrentPage(Math.ceil(totalData/listPerpage));
            }}
            >Last</button>
        </div>
     );
}
 
export default Table_Buttons;