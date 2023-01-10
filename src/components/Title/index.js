import './title.css'


export default function Title({children, name}){
    return(
        <div >
            <div className="content">
                <div className="h1">
                    {children}
                    <span className='spanTitle'>{name}</span>
                </div>
            </div>
        </div>
    )
}