import useFetch from './useFetch';
import {useState} from 'react';
import {useEffect} from 'react';
const RecordTable = ({fItems,recTotalCost,recProfit}) =>{
  
    
    return (
        <div className = "record-list-wrapper">
        <div className = "record-list"> 
        <div className = "record-summary-wrapper">
            <p className="record-summary">Number Of items: <span className = "amount-style">{fItems && fItems.length}</span></p>
            <p className = "record-summary">Total Cost: <span className = "amount-style">{recTotalCost&&recTotalCost.toFixed(2)}cedis</span></p>
            <p className = "record-summary">Gross Profit: <span className = "amount-style">{recProfit&& recProfit.toFixed(2)}cedis</span></p>
    
        </div>         
            <table className = "items-table">
                <tr>
                    <th>Item Name</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Bought</th>
                    <th>Total Cost</th>
                    <th>Date</th>
                    
                    <th>Sales Person</th>

                </tr>

                {fItems && fItems.map((item)=>(
                    <tr key = {item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.costPrice}cedis</td>
                    <td>{item.sellingPrice}cedis</td>
                    <td>{item.bought}</td>
                    <td>{item.totalCost}cedis</td>
                    <td>{item.date}</td>
                    <td>{item.salesPerson}</td>

                   </tr>
                )
                )
                }
            </table>
           
            </div>
           
        </div>
    )
}
export default RecordTable;