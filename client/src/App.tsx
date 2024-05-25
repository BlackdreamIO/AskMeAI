import { useRef, useState, useEffect } from "react";

import StartPage from "./pages/Start/StartPage";
import AuthenticationPage from "./pages/Auth/AuthenticationPage";
import Layout from "./pages/App/Layout";

export default function App() 
{
    const [showAuthPage, setShowAuthPage] = useState(false);
    const AuthenticationPageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(AuthenticationPageRef.current) {
            AuthenticationPageRef.current?.scrollIntoView({
                behavior : 'smooth'
            });
        }
        console.log(AuthenticationPageRef);
    }, [AuthenticationPageRef, showAuthPage])
    

    return (
        <div className="w-full cursor-default scroll-smooth">
            {/* <StartPage onStart={() => setShowAuthPage(true)} /> */}
            {/* {
                showAuthPage && (
                    <AuthenticationPage
                        ref={AuthenticationPageRef}
                    />
                )
            } */}
            <Layout />
        </div>
    )
}
