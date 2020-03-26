export default {
  path: '/mine',
  component: ()=>import('../pages/mine/root/Mine'),
  children: [
    {
      path: 'address',
      component: ()=>import('../pages/mine/address/Address'),
      children: [
        {
          path: 'edit',
          component: ()=>import('../pages/mine/edit-address/EditAddress')
        }
      ]
    }
  ]
}