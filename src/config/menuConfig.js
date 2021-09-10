// import { PieChartOutlined } from '@ant-design/icons'
const menuList = [
    {
        key: '/home',
        icon: 'PieChartOutlined',
        title: 'Home'
    },
    {
        title: 'Goods',
        key: '/products',
        icon: 'PieChartOutlined',
        children: [ // 子菜单列表
            {
                key: '/category',
                icon: 'PieChartOutlined',
                title: 'Category'
            },
            {
                key: '/product',
                icon: 'PieChartOutlined',
                title: 'Product'
            },

        ]
    },
    {
        key: '/user',
        icon: 'PieChartOutlined',
        title: 'User'
    },
    {
        key: '/role',
        icon: 'PieChartOutlined',
        title: 'Role'
    },
    {
        title: 'Charts',
        key: '/charts',
        icon: 'PieChartOutlined',
        children: [ // 子菜单列表
            {
                key: '/pie',
                icon: 'PieChartOutlined',
                title: 'Pie'
            },
            {
                key: '/line',
                icon: 'PieChartOutlined',
                title: 'Line'
            },
            {
                key: '/bar',
                icon: 'PieChartOutlined',
                title: 'Bar'
            },

        ]
    }



]

export default menuList
