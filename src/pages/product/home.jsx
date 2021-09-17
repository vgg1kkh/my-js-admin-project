import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Select, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqProductList, reqSearchProduct, reqUpdateAvailability } from '../../api'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'

const { Option } = Select

export default function ProductHome(props) {

    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [selectData, setSelectData] = useState('')
    const [inputData, setInputData] = useState('')

    //Collect Select data
    const handleSelectData = value => setSelectData(value)

    //Collect Input data
    const handleInputData = e => setInputData(e.target.value);

    //Change the product status
    const changeAvailability = async product => {
        let { _id, status } = product
        status = status === 1 ? 2 : 1
        // console.log("origin status vs new status=",product,status);
        await reqUpdateAvailability({ productId: _id, status })
        // console.log("re=",re);
        getProductList(pageNum)
    }



    const extra = (<>
        <Button type="primary"
            onClick={() => props.history.push('/product/addupate')}>
            <PlusOutlined />Add product
        </Button>
    </>)

    const columns = [
        {
            width: 200,
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: price => <>$&nbsp;{price}</>
        },
        {
            width: 100,
            title: 'Status',

            render: product => <>
                <Button type="primary"
                    style={{ fontSize: '12px', width: '110px' }}
                    onClick={() => changeAvailability(product)}>
                    {product.status === 1 ? "set unavailable" : "put on rack"}
                </Button><br />
                {product.status === 1 ? "availabe" : "soldout"}
            </>,
        },
        {
            width: 100,
            title: 'Operation',
            render: (product) => (<>
                <LinkButton
                    onClick={() => props.history.push('/product/detail', { product })}>
                    detail</LinkButton>
                <LinkButton onClick={() => props.history.push('/product/addupate',product)}>update</LinkButton>
            </>)
        },
    ];

    const getProductList = async (pageNum, pageSize) => {
        setPageNum(pageNum)
        setLoading(true)
        let re
        if (selectData && inputData) {
            // console.log("selectData=",selectData);      
            re = await reqSearchProduct({ pageNum, pageSize: PAGE_SIZE, searchName: inputData, searchType: selectData === "0" ? "productName" : "productDesc" })
            // console.log("re=",re);
        } else {
            re = await reqProductList(pageNum, PAGE_SIZE)
        }
        setLoading(false)
        if (re.status === 0) {
            const { total, list } = re.data
            setProductList(list)
            // console.log("list=", list);
            setTotal(total)
            // setPageNum(pageNum)
            
        } else {
            message.error("Failed to get the product list")
        }
    }

    const title = (<>
        <Select
            onChange={handleSelectData}
            name="title" id="" style={{ width: '140px' }}>
            <Option value="0">By Name</Option>
            <Option value="1">By Description</Option>
        </Select>
        <Input onChange={handleInputData} style={{ width: '140px', margin: '0px 20px' }} />
        <Button type="primary" onClick={() => getProductList(1)}>Search</Button>
    </>
    )

    //Get the productList at the beginning
    useEffect(() => {
        getProductList(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <Card title={title} extra={extra} >
            <Table columns={columns}
                rowKey={'_id'}
                dataSource={productList}
                bordered
                loading={loading}
                pagination={{
                    defaultPageSize: PAGE_SIZE,
                    total: total,
                    current: pageNum, //fix the bug
                    showQuickJumper: true,
                    onChange: getProductList
                }}
            />
        </Card>

    </>
}
