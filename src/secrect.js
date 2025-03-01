// secrect.js
const config = {
  url: 'http://localhost:3005'  || 'https://pro1.smart-punch.com',
  MODEL_URL: '/models',
  ImgUrl: import.meta.env.VITE_EMPLOYEE_IMG_URL || 'http://localhost:3005/images/Employee',
  VisitorImgUrl: import.meta.env.VITE_VISITOR_IMG_URL || 'http://localhost:3005/images/visitor',
  CompanyName:  'NM EnterPrise',
  CompanyAddress:'6/15, Aalay, Opp. Bus Stop, Vastrapur, Ahmedabad - 380 015. Gujarat, India.',
  AdminDashbordRefreshTime: '60000',
};

export default config;
