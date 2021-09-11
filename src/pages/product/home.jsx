import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Select, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqProductList, reqSearchProduct } from '../../api'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'

const { Option } = Select

export default function ProductHome() {

    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [selectData,setSelectData] = useState('')
    const [inputData,setInputData] = useState('')

    //Collect Select data
    const handleSelectData = value=> setSelectData(value)
    
    //Collect Input data
    const handleInputData = e => setInputData(e.target.value);



    const extra = (<>
        <Button type="primary"><PlusOutlined />Add product</Button>
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
            dataIndex: 'status',
            render: status => <>
                <Button type="primary" style={{ fontSize:'12px',width: '110px' }}>{status === 1 ? "set unavailable" : "put on rack"}
                </Button><br />
                {status === 1 ? "availabe" : "soldout"}
            </>,
        },
        {
            width: 100,
            title: 'Operation',
            render: () => (<>
                <LinkButton>detail</LinkButton>
                <LinkButton>update</LinkButton>
            </>)
        },
    ];

    const getProductList = async (pageNum, pageSize) => {
        setLoading(true)
        let re
        if(selectData && inputData){
            re = await reqSearchProduct({pageNum,pageSize:PAGE_SIZE,searchName:inputData,searchType:selectData===0?"productName":"productDesc"})
        }else{
            re = await reqProductList(pageNum, PAGE_SIZE)
        }
        setLoading(false)
        if (re.status === 0) {
            const {pageNum,total} = re.data
            setProductList(re.data.list)
            setTotal(total)
            setPageNum(pageNum)
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
        <Input   onChange={handleInputData} style={{ width: '140px', margin: '0px 20px' }} />
        <Button type="primary" onClick={()=>getProductList(1)}>Search</Button>
    </>
    )

    //Get the productList at the beginning
    useEffect(() => {
        getProductList(1)
    }, [])

    return <>
        <Card title={title} extra={extra} >
            <Table columns={columns}
                rowkey={'_id'}
                dataSource={productList}
                bordered
                loading={loading}
                pagination={{
                    defaultPageSize:PAGE_SIZE,
                    total:total,
                    showQuickJumper:true,
                    onChange:getProductList
                 }} 
            />
        </Card>

    </>
}
