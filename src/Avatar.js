import './index.css';

const Avatar = (props) => {

    function getPicture() {
        console.log("returning picture for " + props.name);
        return "https://crafatar.com/renders/body/" + props.uuid + "?overlay";
    }



    return ( 
        <div className="avatar">
            <img src={getPicture()} alt="" />
            <br /> 
            <span className="subtext">{props.name}</span>
        </div>
     );
}
 
export default Avatar;
