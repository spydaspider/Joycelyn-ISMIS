import {useState} from 'react';
import useFetch from './useFetch';
const AddToStore = () =>{
       const [itemName,setItemName] = useState('');
       const [quantity,setQuantity] = useState('');
       const [costPrice,setCostPrice] = useState('');
       const [sellingPrice,setSellingPrice] = useState('');
       const [wholesale,setWholesale] = useState('');
       const [fieldEmpty,setFieldEmpty] = useState(false);
       const [greaterCostPrice,setGreaterCostPrice] = useState(false);
       const [itemExists,setItemExists] = useState(false);
       const {data:items} = useFetch(' http://localhost:7600/items');
       const [invalidNumber,setInvalidNumber] = useState(false);
       const [success,setSuccess] = useState(false);
       const [addError, setAddError] = useState(false);
       const handleSubmit=(e)=>{
         e.preventDefault();
         let searchCounter = 0;
         if((itemName === '')||(quantity === '')||(costPrice === '')||(sellingPrice === '')||(wholesale === ''))
         {
              setFieldEmpty(true);
              setItemExists(false);
              setInvalidNumber(false);
              setGreaterCostPrice(false);
              setSuccess(false);

         }
         else
         {
         items.forEach((item)=>{
            if(itemName.toLocaleLowerCase().replaceAll(" ","") === item.itemName.toLocaleLowerCase().replaceAll(" ",""))
            {
              searchCounter = searchCounter + 1;
            }
           }
         )
         if(searchCounter !== 0)
         {
            setItemExists(true);
            setFieldEmpty(false);
            setInvalidNumber(false);
            setGreaterCostPrice(false);
            setSuccess(false);
         }
            else if((quantity < 0) || (costPrice < 0) || (sellingPrice < 0) || (wholesale < 0))
            {
            setInvalidNumber(true);
            setItemExists(false);
            setFieldEmpty(false);
            setGreaterCostPrice(false);
            setSuccess(false);




            }
            else if(costPrice > sellingPrice || costPrice > wholesale || sellingPrice < wholesale)
            {
                setGreaterCostPrice(true);
                setInvalidNumber(false);
                setItemExists(false);
                setFieldEmpty(false);
                setSuccess(false);

            }
            else
            {
                const newItems = {itemName,quantity,costPrice,sellingPrice,wholesale};
                fetch('http://localhost:7600/items',{
                    method: "POST",
                    headers: {"Content-type": "Application/json"},
                    body: JSON.stringify(newItems)
                }).then(()=>{
                    setSuccess(true);
                     setTimeout(()=>{
                       window.location.reload();
                       setSuccess(false);
                   },
                   1000
                   ) 
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
            <h2 className = "add-item-title">Add New Item</h2>
            {addError && <p className = "error-message">Failed to add new items</p>}
            {success && <p className = "add-success">New item added successfully</p>}
            {invalidNumber && <p className = "error-message">Negative number detected.</p>}
            {fieldEmpty && <p className = "error-message">All fields required</p>}
            {greaterCostPrice && <p className = "error-message">Price inbalance detected.</p>}
            {itemExists && <p className = "error-message">Item already exists</p>}
            <form onSubmit = {(e)=>handleSubmit(e)} className = "item-form">
            <input onChange = {(e)=>setItemName(e.target.value)} type = "text" value = {itemName} placeholder = "Name" required/>
            <input onChange = {(e)=>setQuantity(e.target.value)} type = "number" value = {quantity} placeholder = "Quantity" required/>
            <input onChange = {(e)=>setCostPrice(e.target.value)} type = "number" value = {costPrice} placeholder = "Cost Price" required/>
            <input onChange = {(e)=>setWholesale(e.target.value)} type = "number" value = {wholesale} placeholder = "Whole Sale Price" required/>

            <input onChange = {(e)=>setSellingPrice(e.target.value)} type = "number" value = {sellingPrice} placeholder = "Retail Price" required/>

            <button className = "add">save</button>
            </form>
        </div>
    )
}
export default AddToStore;