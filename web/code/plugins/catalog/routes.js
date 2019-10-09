import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/names',
        config: controllers.getnames
    },
    {
        method: 'GET',
        path: '/data/{id}/{reference?}',
        config: controllers.getdata
    },
    {
        method: 'POST',
        path: '/',
        config: controllers.save
    },
    {
        method: 'PUT',
        path: '/rename',
        config: controllers.rename
    },
    {
        method: 'DELETE',
        path: '/{id}',
        config: controllers.remove
    },
    {
        method: 'DELETE',
        path: '/item',
        config: controllers.removeitem
    },
    {
        method: 'GET',
        path: '/{id}',
        config: controllers.items
    },
    {
        method: 'GET',
        path: '/exportpdf/{id}',
        config: controllers.exportpdf
    },
    {
        method: 'GET',
        path: '/webnames',
        config: controllers.getnameswithshared
    },
    {
        method: 'GET',
        path: '/webnamessetitem',
        config: controllers.getnameswithsharedsetitem
    },
    {
        method: 'POST',
        path: '/shared',
        config: controllers.saveshared
    },
    {
        method: 'POST',
        path: '/setitem',
        config: controllers.savesetitem
    },
    {
        method: 'GET',
        path: '/namessetitem',
        config: controllers.getnamessetitem
    },
    {
        method: 'GET',
        path: '/datasetitem/{id}/{reference?}',
        config: controllers.getdatasetitem
    },
    {
        method: 'GET',
        path: '/setitem/{id}',
        config: controllers.itemssetitem
    },
    {
        method: 'GET',
        path: '/migrateprice',
        config: controllers.migrateprice
    },
    {
        method: 'POST',
        path: '/setcatalogitem',
        config: controllers.savesetcatalogitem
    },
    {
        method: 'GET',
        path: '/webnamessetcatalog',
        config: controllers.getnameswithsharedcatalog
    },
    {
        method: 'GET',
        path: '/setcatalogitem/{id}',
        config: controllers.itemssetcatalogitem
    },
    {
        method: 'PUT',
        path: '/renameset',
        config: controllers.renameset
    },
    {
        method: 'DELETE',
        path: '/set/{id}',
        config: controllers.removeset
    },
    {
        method: 'POST',
        path: '/sharedset',
        config: controllers.savesharedset
    },
    {
        method: 'DELETE',
        path: '/setitem',
        config: controllers.removesetitem
    },
    {
        method: 'POST',
        path: '/yingcatalog/name',
        config: controllers.addyingcatalog.name
    },
    {
        method: 'GET',
        path: '/yingcatalog/name',
        config: controllers.getyingcatalog.name
    },
    {
        method: 'GET',
        path: '/yingcatalog/detail/{id}',
        config: controllers.getyingcatalog.id
    },
    {
        method: 'POST',
        path: '/yingcatalog/detail/{id}',
        config: controllers.addyingcatalog.id
    },
    { 
        method: 'GET',
        path: '/yingcatalog/item/{reference}',
        config: controllers.getyingitem
    },
    { 
        method: 'POST',
        path: '/yingcatalog/upload/setimage',
        config: controllers.uploadsetimage
    },
    { 
        method: 'PUT',
        path: '/yingcatalog/detail/{id}',
        config: controllers.updateyingcatalog
    },
    { 
        method: 'GET',
        path: '/yingcatalog/setreference/{id}',
        config: controllers.getyingsetreference
    },
    { 
        method: 'PUT',
        path: '/yingcatalog/setreference/{id}',
        config: controllers.updateordersetreference
    },
    { 
        method: 'DELETE',
        path: '/yingcatalog/{id}',
        config: controllers.deleteyingcatalog
    },
    {
        method: 'GET',
        path: '/yingcatalog/somename',
        config: controllers.getyingcatalog.some
    },
    {
        method: 'POST',
        path: '/yingcatalog/share',
        config: controllers.share
    },
    {
        method: 'GET',
        path: '/yingcatalog/name/all',
        config: controllers.getyingcatalog.nameall
    },
    { 
        method: 'PUT',
        path: '/yingcatalog/detail/item/{id}',
        config: controllers.updateyingcatalogitem
    },
    { 
        method: 'PUT',
        path: '/yingcatalog/detail/set/{id}',
        config: controllers.updateyingcatalogset
    },
    { 
        method: 'DELETE',
        path: '/yingcatalog/set/{id}',
        config: controllers.deleteyingset
    },
    { 
        method: 'GET',
        path: '/yingcatalog/getallpdf/{id}',
        config: controllers.getyingallpdf
    },
    { 
        method: 'GET',
        path: '/yingcatalog/getexcel/{id}',
        config: controllers.getexcel
    }
]
