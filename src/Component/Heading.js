export default function Heading({icon,text,color})
{

    return(
        <div style={{display:'flex',padding:5,fontFamily:'Barlow Condensed',fontSize:24,fontWeight:'bold',color:color}}>
        <img src={icon} width='20'/>
        <div style={{marginLeft:5}}>{text}</div>
    </div>
    )
}