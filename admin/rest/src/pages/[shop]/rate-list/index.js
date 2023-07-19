import {useEffect, useState} from "react";
import {useRateListQuery} from '@data/rate-list/rateList.query';
import Loader from "@components/ui/loader/loader";
import Card from "@components/common/card";
import Select from "@components/ui/select/select";
import {useRouter} from "next/router";
import Button from "@components/ui/button";
import {Table} from "@components/ui/table";
// import Layout from "@components/common/layout";
import ShopLayout from "@components/layouts/shop";
import { useUpdateRateListMutation } from "@data/rate-list/use-rateList-update.mutation";
import { useCreateCategoryMutation } from "@data/category/use-category-create.mutation";


const initial = {
    categories: [],
    selectedCategory: [],
    products:[],
    loading: true,
    errors: {}
}
let timeOut = 0;
export  default  function rateList(){
    const router = useRouter();
    const { data,  isLoading, error } = useRateListQuery();
    const [state, setState] = useState(initial);
    const {
        mutate: updateRateList
    } = useUpdateRateListMutation();
    useEffect(() => {
         if(!isLoading && data) {
            const tempCategories = getCategories();
            if(tempCategories.length) {
                setState({
                    ...state,
                    categories: tempCategories,
                    selectedCategory: tempCategories[0],
                    products: data[tempCategories[0].value].products,
                    loading: false
                })
            }
        }

        return () => {
            setState(initial);
        };
    }, [data,isLoading]);

    const getCategories = () => {
        return Object.keys(data).map(key =>{
            return {label: data[key].name, value: key}
        })
    }
    if(state.loading){
        return <Loader/>
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 60,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            align: "center",
        }
    ];
    const getData = () => {
        return state.products.map((product,index) => ({id: product.id, name: product.name,
            price: (
                <>
                     <input
                         id={product.id}
                         name={product.price}
                         value={product.price}
                         type='number'
                         onChange={(e) => handlePriceChange(e.target.value ,product.id, index)}
                     />
                    {state.errors && state.errors[product.id] && (
                        <span style={{color:'red'}}> {state.errors[product.id]}</span>
                    )}
                </>
            )
        }))
    }
    const handlePriceChange = (value ,id, index) => {
        const updatedProducts = state.products;
        updatedProducts[index].price = value? value : null;
        setState({
            ...state,
            products: updatedProducts
        });
    }

    const handleCategoryChange = category => {
        setState(prevState => ({
            ...state,
            selectedCategory: category,
            products: data[category.value].products
        }))
    }
    const priceValidation = () => {
        return new Promise((resolve, reject) =>{
            const errors = {};
            state.products.map(product => {
                if(!product.price){
                    errors[product.id] = 'Invalid Input';
                    console.log(product);
                }
                else if( product.price < product.sale_price){
                    errors[product.id] = 'Price  less then sale price';
                }
            })
            if(Object.keys(errors).length) reject(errors);
            resolve();

        });
    }
    const updatePrice = () => {
        priceValidation().then(() => {
            updateRateList({
                variables: {
                    input: state.products
                }
            })
        }).catch(err =>{
            setState({
                ...state,
                errors: err
            })
        })
    }
    if(error){
        return <div> {error.message}</div>
    }
    if(!state.categories.length){
        return (
            <Card className="p-4 text-center">
                <div className="p-16">
                    <h1 className='mb-4'>Looks Like there is no Category Available</h1>
                    <div>
                        <Button onClick={() => router.push('/categories/create')}> Create Category</Button>

                    </div>
                </div>
            </Card>
        )
    }
    return (
        <>
            <Card className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-heading">
                            Rate List
                        </h1>
                    </div>
                    <div>
                        <Select options={state.categories} value={state.selectedCategory} onChange={handleCategoryChange}   />
                    </div>
                </div>
            </Card>
            <Card>
                <Table columns={columns} data={getData()} rowKey="id"  />
            </Card>
            <Card className='mt-2 text-right'>
                <Button onClick={() => updatePrice()}> Update Price </Button>
            </Card>
        </>
    )
};

rateList.Layout = ShopLayout;