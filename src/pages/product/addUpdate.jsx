import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import LinkButton from '../../components/link-button'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import { reqAddProduct, reqCategory } from '../../api'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

export default function ProductAddUpdate(props) {

  //useForm
  const [form] = useForm()

  const [options, setOptions] = useState([]);

  const [selected, setSelected] = useState([])

  const [editor, setEditor] = useState(<p />)

  const ref1 = React.useRef()

  let isUpdate = false
  let product = {}
  let updateProductCategoryId = []
  if (props.location.state) {
    product = props.location.state
    // console.log("update product details are:", product);
    isUpdate = true
    if (product.pCategoryId === "0") {
      updateProductCategoryId.push(product.categoryId)
    } else {
      updateProductCategoryId.push(product.pCategoryId)
      updateProductCategoryId.push(product.categoryId)
    }

  }
  const onFinish = async (values) => {
    console.log("values=", values);
    console.log(ref1.current.getImgs());
    console.log(editor)

    const { name, desc, price, category } = values
    const imgs = ref1.current.getImgs()
    const detail = editor
    console.log("category = ", category);

    let pCategoryId, categoryId
    if (category.length === 2) {
      pCategoryId = category[0]
      categoryId = category[1]
    } else {
      pCategoryId = "0"
      categoryId = category[0]
    }

    let newProduct
    if (isUpdate) {
      newProduct = { pCategoryId, category, imgs, _id: product._id, detail, price, desc, name }
    } else {
      newProduct = { pCategoryId, categoryId, imgs, detail, price, desc, name }
    }

    const re = await reqAddProduct(newProduct)
    if (re.status === 0) {
      message.success("update success.")
      props.history.goBack()
    } else {
      message.error("update failed.")
    }


  }

  const onFinishFailed = () => {
    console.log("Failed.");
  }

  const title = (
    <span>
      <LinkButton><ArrowLeftOutlined onClick={props.history.goBack} />
        &nbsp;{isUpdate ? "Update product" : "ADD Product"}</LinkButton>
    </span>
  )

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  }

  const onChange = (value, selectedOption) => {
    setSelected(selectedOption)
  };

  const loadData = async selectedOptions => {
    // const targetOption = selectedOptions[selectedOptions.length - 1];
    // targetOption.loading = true;
    // Sample: {value: '??????ff', label: '??????ff', isLeaf: false}
    // {label: '??????ff', value: '??????ff', id: '5e1346533ed02518b4db0cd7', isLeaf: false}
    // console.log("selectedOptions.id=", selectedOptions[0].id);
    const subCategorys = await getCategorys(selectedOptions[0].value)
    // console.log("subCategorys=",subCategorys);
    if (subCategorys.length > 0) {
      const cOptions = subCategorys.map(c => (
        {
          value: c._id,
          label: c.name,
          isLeaf: true
        }
      ))
      selectedOptions[0].children = cOptions

    } else {
      selectedOptions[0].isLeaf = true
    }
    setOptions([...options])

  }

  const initOptions = async categorys => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // ????????????
    }))
    //if it is update page and the product is the subCategory, load the subCategory Option
    if (isUpdate && product.pCategoryId !== '0') {
      const subCategorys = await getCategorys(product.pCategoryId)
      const childrenOptions = subCategorys.map((item) => (
        {
          value: item._id,
          label: item.name,
          isLeaf: true
        }
      ))
      const targetOption = options.find(item => item.value === product.pCategoryId)
      targetOption.children = childrenOptions
    }
    setOptions([...options])
  }

  const getCategorys = async (parentId) => {
    // console.log("parentId=", parentId);
    const re = await reqCategory(parentId)
    // console.log("re=", re.data);
    if (re.status === 0) { // successfully get the data
      const categorys = re.data
      if (parentId === "0") { //if it's the primary category
        initOptions(categorys)
      } else {
        return categorys
      }
    } else { //Request failed.
      message.error("Failed to get the category list.")
    }
  }

  useEffect(() => {
    getCategorys("0")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card title={title}  >
      <Form
        name="basic"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="name" label="Product Name:"
          initialValue={isUpdate ? product.name : null}
          rules={[
            {
              required: true,
              message: 'Please input the category name',
            }]}
        >
          <Input placeholder="Pls input the name" />
        </Form.Item>
        <Form.Item name="desc"
          label="Product Description"
          initialValue={isUpdate ? product.desc : null}
          rules={[
            {
              required: true,
              message: 'Please input the description',
            }]}
        >
          <Input.TextArea placeholder="Tell me about it"
            autoSize />
        </Form.Item>
        <Form.Item name="price" label="Price"
          type="number"
          initialValue={isUpdate ? product.price : null}
          rules={[
            {
              validator: (_, value) => {
                if (value * 1 > 0) {
                  return Promise.resolve()
                } else return Promise.reject("Pls input the correct price")
              }
            }]
          }
        >
          <Input prefix="$" />
        </Form.Item>
        <Form.Item name="category" label="Category"
          initialValue={updateProductCategoryId}
          rules={[
            {
              required: true,
              message: 'Please select the category',
            }]}
        >
          <Cascader options={options}
            loadData={loadData}
            onChange={onChange} changeOnSelect
            placeholder="Pls select the options"
          // defaultValue={["613af779e5a75a9d047bd995"]}
          />
        </Form.Item>
        <Form.Item name="img" label="Photos"
          rules={[
            {
              validator: () => {
                const re = ref1.current.getImgs()
                // console.log("re=",re.length);
                if (re.length !== 0) {
                  return Promise.resolve()
                } else return Promise.reject("Pls upload a photo")
              }
            }]
          }
        >
          <PicturesWall ref={ref1} imgs={product.imgs} />
        </Form.Item>
        <Form.Item name="details" label="Details"
          rules={[
            {
              validator: () => {
                const re = editor
                console.log("re=", re.length);
                if (re.length > 8) return Promise.resolve()
                else return Promise.reject('Pls input something')
              }
            }]}
        >
          <RichTextEditor setEditor={setEditor} detail={product.detail}>
          </RichTextEditor>
        </Form.Item>
        <Button type="primary" htmlType="submit" form="basic"
          style={{ transform: 'translate(150%)' }}>
          Submit</Button>
      </Form>
    </Card>

  </>

}