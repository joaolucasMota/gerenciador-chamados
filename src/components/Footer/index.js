import './footer.css'


export default function Footer(){
    return(
        <footer className="container-fluid">
                <p className="secondary-color"> Encontre-me nas redes sociais</p>
                <div className="row justify-content-center" id="social-icons-container">
                    <div className="col-1">
                        <a target="_blank" href="https://github.com/joaolucasMota"><i className="bi bi-github secondary-color"></i></a>
                    </div>
                    <div className="col-1">
                        <a target="_blank" href="https://www.linkedin.com/in/joao-lucas-mota-125966232/"><i className="bi bi-linkedin secondary-color"></i></a>
                    </div>
                    <div className="col-1">
                        <a target="_blank" href="https://pt.stackoverflow.com/users/316402/jo%c3%a3o-lucas-mota"><i className="bi bi-stack secondary-color"></i></a>
                    </div>
                </div>
        </footer>
    )
}