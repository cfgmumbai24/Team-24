import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const CategoryView = () => {
    const param = useParams()
    const [ teracottaOrnamentItems, setteracottaOrnamentItems ] = useState()
    const [ moonjHandicraftItems, setmoonjHandicraftItems ] = useState()
    const [ macrameAnticraftItem, setmacrameAnticraftItem ] = useState()
    const [bananaFiberItems, setBananaFiberItems] = useState()
    const [juteProductsItems, setJuteProductsItems] = useState()
    const [ loading , setLoading ] = useState(true) 

    useEffect(() => {
        axios.get("https://shema-backend.vercel.app/api/items")
            .then(res => {
                setteracottaOrnamentItems(res.data.filter((item) => item.category === "men")) // category === // category === teracotta_ornaments
                setmacrameAnticraftItem(res.data.filter((item) => item.category === "kids" )) // category === macrame_handicraft
                setmoonjHandicraftItems(res.data.filter((item) => item.category === "women")) // category === moonj_handicraft

                setBananaFiberItems(res.data.filter((item) => item.category === "women")) // category === banana_fiber
                setJuteProductsItems(res.data.filter((item) => item.category === "women")) // category === jute_products
                setLoading(false)
            })
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [param.id])
    
    return ( 
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
            { teracottaOrnamentItems && param.id === 'teracotta_ornaments' && <Category name="Teracotta Ornaments & Home Decore" items={teracottaOrnamentItems} category="men"/>}
            { moonjHandicraftItems && param.id === 'moonj_handicraft' && <Category name="Moonj Based Handicrafts" items={moonjHandicraftItems} category="kids"/>}
            { macrameAnticraftItem && param.id === 'macrame_handicraft' && <Category name="Macrame Based Handicrafts" items={macrameAnticraftItem} category="women"/>}

            { bananaFiberItems && param.id === 'banana_fiber' && <Category name="Banana Fiber based ornaments & Home Decore" items={bananaFiberItems} category="women"/>}
            { juteProductsItems && param.id === 'jute_products' && <Category name="Jute Bags & Allied Products" items={juteProductsItems} category="women"/>}
        </div>
     );
}
 
export default CategoryView;