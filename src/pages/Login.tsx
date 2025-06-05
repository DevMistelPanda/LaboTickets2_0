import Header from '@/components/HeaderLogin';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

const Login = () => {
    return(

        <div className="min-h-screen">
            <Header />
            <LoginForm />  
            <Footer />
                    
        </div>

    );
};

export default Login;