
import index from '../page/index';
import download from '../page/download';
import upload from '../page/upload';
import word from '../page/word';

// import companyList from '@src/page/query/payCompany/companyList'

export default [
    {
        name: 'index',
        path: '/index',
        meta: { title: '局域网共享' },
        component: index,
    },
    {
        name: 'download',
        path: '/download',
        meta: {
            title: '文件下载'
        },
        component: download
    },
    {
        name: 'upload',
        path: '/upload',
        meta: {
            title: '文件上传'
        },
        component: upload
    },
    {
        name: 'word',
        path: '/word',
        meta: {
            title: '文本传输'
        },
        component: word
    },
    {
        path: '*',
        meta: { title: '局域网共享' },
        component: index
    }
]
