const getMenufrontEnd = (role='USER_ROLE') => {


    const menu = [
        {
        titulo:'Principal',
        icono:'mdi mdi-gauge',
        submenu:[
          {titulo:'Menu',url:''},
          {titulo:'ProgressBar',url:'progress'},
          {titulo:'Grafica',url:'grafica1'}
          ]
        },{
        titulo:'Mantenimiento',
        icono:'mdi mdi-folder-lock-open',
        submenu:[
        //   {titulo:'Usuarios',url:'usuarios'},
          {titulo:'Hospitales',url:'hospitales'},
          {titulo:'Medicos',url:'medicos'},
          ]
        }
        
      ]
      if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo:'Usuarios',url:'usuarios'})
      }
      return menu;

}
module.exports = {
    getMenufrontEnd
}