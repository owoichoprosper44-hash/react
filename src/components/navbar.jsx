import Button from "./Button"

const NavBar = () =>{
    return(
        <nav style={
            {
                display:"flex",
                alignItems: "center",
                justifyContent : "space-between",
                padding: "20px 30px"
            

            }
        }>
            <h3>Brand</h3> 
            <ul
            className="flex items-center gap-4">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>contact</li>
            </ul>
        <Button 
         />

        </nav>
    )
}

export default NavBar