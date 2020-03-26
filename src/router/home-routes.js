export default {
  path: '/home',
  component: ()=>import('../pages/home/root/Home'),
  children: [
    {
      path: 'detail/:id',
      props: true,
      component: ()=>import('../pages/home/detail/Detail'),
      children: [
        {
          name: 'confirm',
          path: 'confirm',
          component: ()=>import('../pages/home/confirm/Confirm'),
          children: [
            {
              name: 'select-address',
              path: 'select',
              component: ()=>import('../pages/mine/address/Address'),
              children: [
                {
                  name: 'edit-address',
                  path: 'edit',
                  component: ()=>import('../pages/mine/edit-address/EditAddress')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}