import { useState } from 'react';
import useFetch from './useFetch';
const ItemList = ({items,title}) =>{
    const itemCount = items.length;

    return(
        <div className = "item-list-wrapper">
        <div className = "item-list">
            <h1 className = "item-list-title">List Of All Items.</h1>
            <p className="item-count">Number Of items: {itemCount}</p>
            <table className = "items-table">
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>

                </tr>
                {items.map((item)=>(
                    <tr key = {item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.costPrice}cedis</td>
                    <td>{item.sellingPrice}cedis</td>
                   </tr>
                )
                )
                }
            </table>
    
        </div>
        </div>
    )
}
export default ItemList;