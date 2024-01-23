import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useFetch from './useFetch';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ItemDetails = () =>{

    const history = useHistory();
const {id} = useParams();
const [itemName,setItemName] = useState('');
       const [quantity,setQuantity] = useState('');
       const [costPrice,setCostPrice] = useState('');
       const [sellingPrice,setSellingPrice] = useState('');
       const [fieldEmpty,setFieldEmpty] = useState(false);
       const [greaterCostPrice,setGreaterCostPrice] = useState(false);
       const [itemExists,setItemExists] = useState(false);
       const {data:items} = useFetch(' http://localhost:7600/items');
       const [invalidNumber,setInvalidNumber] = useState(false);
       const [success,setSuccess] = useState(false);
       const [addError, setAddError] = useState(false);
const {data:item, isPending: isLoading, error} = useFetch('http://localhost:7600/items/'+id);
 useEffect(()=>{
      if(item)
      {
     setQuantity(item.quantity);
     setCostPrice(item.costPrice);
     setSellingPrice(item.sellingPrice);
     setItemName(item.itemName);
      }
},[item]) 
const handleRemove = () =>{

    fetch('http://localhost:7600/items/'+item.id,{
        method: 'DELETE'

    }).then(()=>{
        history.push('/search');
    })

}
const handleSubmit = (e) =>{
    e.preventDefault();
    let searchCounter = 0;
    if((itemName === '')||(quantity === '')||(costPrice === '')||(sellingPrice === ''))
    {
         setFieldEmpty(true);
         setItemExists(false);
         setInvalidNumber(false);
         setGreaterCostPrice(false);
         setSuccess(false);

    }
    else
    {
   
       if((quantity < 0) || (costPrice < 0) || (sellingPrice < 0))
       {
       setInvalidNumber(true);
       setItemExists(false);
       setFieldEmpty(false);
       setGreaterCostPrice(false);
       setSuccess(false);




       }
       else if(Number(costPrice) > Number(sellingPrice))
       {
           setGreaterCostPrice(true);
           setInvalidNumber(false);
           setItemExists(false);
           setFieldEmpty(false);
           setSuccess(false);

       }
       else
       {
           const newItems = {itemName,quantity,costPrice,sellingPrice};
           fetch('http://localhost:7600/items/'+item.id,{
               method: "PUT",
               headers: {"Content-type": "Application/json"},
               body: JSON.stringify(newItems)
           }).then(()=>{
            history.push('/search');
           }).catch((err)=>{
               setAddError(true);
           })
         
           setGreaterCostPrice(false);
           setInvalidNumber(false);
           setItemExists(false);
           setFieldEmpty(false);
       }
   }
}
return(
    <div className = "add-items">

              
<h2 className = "add-item-title">Edit Item</h2>

<form onSubmit = {(e) => handleSubmit(e)} className = "item-form">
            {addError && <p className = "error-message">Failed to add new items</p>}
            {success && <p className = "add-success">New item added successfully</p>}
            {invalidNumber && <p className = "error-message">Negative number detected.</p>}
            {fieldEmpty && <p className = "error-message">All fields required</p>}
            {greaterCostPrice && <p className = "error-message">Cost price is greater than selling price.</p>}
            {itemExists && <p className = "error-message">Item already exists</p>}
            <label>Item Name</label>
            <input onChange = {(e)=>setItemName(e.target.value)} type = "text" value = {itemName}  required/>
            <label>Quantity</label>
            <input onChange = {(e)=>setQuantity(e.target.value)} type = "number" value = {quantity}  required/>
            <label>Cost Price</label>
            <input onChange = {(e)=>setCostPrice(e.target.value)} type = "number" value = {costPrice}  required/>
            <label>Selling Price</label>
            <input onChange = {(e)=>setSellingPrice(e.target.value)} type = "number" value = {sellingPrice} required/>
              
            
            <div className = "detail-buttons">  
           <button className = "edit">Edit</button>
           <button onClick = {handleRemove} className = "remove">Remove</button>
        
            </div>
            </form>
           
    </div>
)
}
export default ItemDetails;