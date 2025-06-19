import Login from '@/components/Login'; // assuming you built a <Login /> component
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const LoginPage = () => {
    return (
   <div className="min-h-screen">
      <Header />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
