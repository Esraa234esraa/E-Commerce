<<<<<<< HEAD
=======

>>>>>>> f59b8ba1e8dbc67cad54cf62b841ded8c7a272c7
import React, { useEffect, useState } from 'react'
import { getProducts } from '../APIS/getProducts'
import Loading from './Loading'
import Item from './Item';
export default function DisCat({ arr }) {
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState(null);
    let [productArr, setProductArr] = useState([]);


    async function getProductsApi() {
        setLoading(true);
        let data = await getProducts();
        if (data?.data) {
            setProductArr(data.data);
            setMsg('');
            setLoading(false);
        }
        else {
            setMsg(data);
            setLoading(false);

        }

    }
    useEffect(() => {
        getProductsApi();
    }, []);

    useEffect(() => {
        console.log(productArr);

    }, [productArr]);

    if (loading) {
        return <Loading></Loading>
    }
    if (msg) {
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>
    }
    return (<>


        <div className='row'>

            {arr?.length ? arr.map(prod => <Item key={prod?._id} prod={prod}></Item>) : productArr.map(prod => <Item key={prod?._id} prod={prod}></Item>)
            }

        </div>
    </>
    )
<<<<<<< HEAD
}
=======
}
>>>>>>> f59b8ba1e8dbc67cad54cf62b841ded8c7a272c7
