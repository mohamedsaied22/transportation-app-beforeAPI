import { ReactNode } from "react"

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
return (
    <div className=" flex items-center justify-center text-center mt-8 md:mt-20">
        {children}
    </div>
);
}
export default AuthLayout;


