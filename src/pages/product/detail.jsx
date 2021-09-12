import React, { useEffect, useState } from 'react'
import { Card, List, message } from 'antd'
import "./product.less"
import { ArrowRightOutlined } from '@ant-design/icons'
import logo from "../../assets/imgs/birdy2.jpg"
import { reqCategoryName } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';
import LinkButton from '../../components/link-button'


export default function Detail(props) {

    const [categoryName, setCategoryName] = useState("")
    const [parentCategoryName, setParentCategoryName] = useState("")

    const { product } = props.location.state
    // console.log(product);

    const title = (<>
        <LinkButton onClick={props.history.goBack}>&lt;</LinkButton>&nbsp;&nbsp;<span>Product Detail</span>
    </>)

    const getProductName = async (categoryId, pCategoryId) => {
        if (pCategoryId === '0') {
            const re = await reqCategoryName(categoryId)
            // console.log("re.data=", re);
            if (re.status === 0) {
                setCategoryName(re.data.name)
            } else {
                message.error("Can't get the category name.")
            }
        } else {
            const results = await Promise.all([reqCategoryName(categoryId), reqCategoryName(pCategoryId)])
            // console.log("results=", results);
            setCategoryName(results[0].data.name)
            setParentCategoryName(results[1].data.name)
        }
    }

    useEffect(() => {

        getProductName(product.categoryId, product.pCategoryId)

    }, [])

    return <>
        <Card title={title} >
            <List className="product-detail">
                <List.Item className="product-detail-left">
                    <span className="left">Product Name</span>
                    <span>{product.name}</span>
                </List.Item>
                <List.Item className="product-detail-left">
                    <span className="left">Product Description</span>
                    <span>{product.desc}</span>
                </List.Item>
                <List.Item className="product-detail-left">
                    <span className="left">Price</span>
                    <span>${product.price}</span>
                </List.Item>
                <List.Item className="product-detail-left">
                    <span className="left">Product Category</span>
                    <span>{ parentCategoryName===''? categoryName: <>{parentCategoryName}<ArrowRightOutlined />{categoryName}</>}</span>
                </List.Item>
                <List.Item className="product-detail-left">
                    <span className="left">Product Imgs</span>
                    <span>
                        <img className="product-img" src="https://picsum.photos/id/1/50/50"
                            alt="" />
                        <img className="product-img" src="https://picsum.photos/id/2/50/50"
                            alt="" />
                        {product.imgs.map((item) => {
                            return <img className="product-img" key={item} src={BASE_IMG_URL + item}
                                alt="Haha" />
                        })}
                    </span>
                </List.Item>
                <List.Item className="product-detail-left">
                    <span className="left">Product Details</span>
                    <span dangerouslySetInnerHTML={{ __html: product.detail }}></span>
                </List.Item>
            </List>
        </Card>
    </>
}
