import { useState } from 'react';
import RecordTable from './recordTable.js';
import useFetch from './useFetch.js';
const Records = () =>{
    const [startDate,setStartDate] = useState('');
    const [selectValue,setSelectValue] = useState('');
    const [firstOptionEmpty,setFirstOptionEmpty] = useState('');
    const [record, setRecord] = useState(false);
    const [allTitle,setAllTitle] = useState(false);
    const [momoTitle,setMomoTitle] = useState(false);
    const [cashTitle,setCashTitle] = useState(false);
    const [recTotalCost,setRecTotalCost] = useState(0);
    const [recProfit,setRecProfit] = useState(0);
    const [emptyDate,setEmptyDate] = useState(false);
    const {data: items, isPending: isLoading, error} = useFetch('http://localhost:7600/sales');
    const [filterItems, setFilterItems] = useState([]);
    const handleSubmit =(e)=>{

        e.preventDefault();
       if(selectValue === '')
       {
        setFirstOptionEmpty(true);
        setEmptyDate(false);
       }
       else if(startDate === '')
       {
        setEmptyDate(true);
        setFirstOptionEmpty(false);

       }
      else
       {
        setFirstOptionEmpty(false);
        setEmptyDate(false);

        if(items)
        {
            let recTotalCost = 0;
            let recProfit = 0;  
            let filteredItems = [];
            let totalCostPrice = 0;

            if(selectValue && selectValue === 'Mobile Money & Cash')
            {
         filteredItems = items.filter((item)=>item.date.indexOf(startDate) !== -1);
        setFilterItems(filteredItems);
        setMomoTitle(false);
        setAllTitle(true);
        setCashTitle(false);
        filteredItems.forEach((i)=>{
            recTotalCost = recTotalCost + i.totalCost;
            totalCostPrice = totalCostPrice + i.costPrice;
        })
        recProfit = recTotalCost - totalCostPrice;
        setRecProfit(recProfit);

        setRecTotalCost(recTotalCost);

            }
            else if(selectValue && selectValue === 'Mobile Money')
            {
                filteredItems = items.filter((item)=>item.date.indexOf(startDate) !== -1 && item.momo === true);
                setFilterItems(filteredItems);
                setMomoTitle(true);
                setAllTitle(false);
                setCashTitle(false);
                filteredItems.forEach((i)=>{
                    recTotalCost = recTotalCost + i.totalCost;
                    totalCostPrice = totalCostPrice + i.costPrice;
                        })
        recProfit = recTotalCost - totalCostPrice;
        setRecProfit(recProfit);
                setRecTotalCost(recTotalCost);

            }
            else{
                filteredItems = items.filter((item)=>item.date.indexOf(startDate) !== -1 && item.momo === false);
                setFilterItems(filteredItems);
                setMomoTitle(false);
                setAllTitle(false);
                setCashTitle(true);
                filteredItems.forEach((i)=>{
                    recTotalCost = recTotalCost + i.totalCost;
                    totalCostPrice = totalCostPrice + i.costPrice;
                })
                recProfit = recTotalCost - totalCostPrice;
                setRecProfit(recProfit);
                setRecTotalCost(recTotalCost);


            }
        
        }
    
       }

    }
    return(
        <div className = "records-wrapper">
            {emptyDate && <p className = "error-message">Enter a fraction of a valid date</p>}
            {firstOptionEmpty && <p className = "error-message">Please select a different option before the first one</p>}
            <form onSubmit = {(e)=>{handleSubmit(e)}}>
            <input type = "text" onChange = {(e) => setStartDate(e.target.value)} placeholder = "Date in the form year-month-day eg 2022-09-28"/>
           
            <select onChange = {(e)=>setSelectValue(e.target.value)} className = "transaction-media">
                <option>Mobile Money</option>
                <option>Cash</option>
                <option>Mobile Money & Cash</option>


            </select>
            <button className = "search-record">Search Record</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p className = "error-message">Request is denied</p>}
            {momoTitle && <h3 className = "sales">Mobile Money Sales</h3>}
            {cashTitle && <h3 className = "sales">Cash Sales</h3>}
            {allTitle && <h3 className = "sales">All Sales</h3>}
            {filterItems && <RecordTable fItems = {filterItems} recTotalCost = {recTotalCost} recProfit = {recProfit}/>} 

        </div>
    )
}
export default Records;