// secrect.js
const config = {
  url: import.meta.env.VITE_API_URL || 'http://localhost:3005',
  MODEL_URL: '/models',
  ImgUrl: import.meta.env.VITE_EMPLOYEE_IMG_URL || 'http://localhost:3005/images/Employee',
  VisitorImgUrl: import.meta.env.VITE_VISITOR_IMG_URL || 'http://localhost:3005/images/visitor',
  CompanyName: import.meta.env.VITE_COMPANY_NAME || 'NM EnterPrise',
  CompanyAddress: import.meta.env.VITE_COMPANY_ADDRESS || '6/15, Aalay, Opp. Bus Stop, Vastrapur, Ahmedabad - 380 015. Gujarat, India.',
  AdminDashbordRefreshTime: '60000',
};

export default config;
