import './message.css'

export default function Message({image, own, messageText, createdAt}){
  const formattedDate = new Date(createdAt).toLocaleString(undefined, {
    dateStyle: 'medium', 
    timeStyle: 'medium', 
  });
  const imageToShow = !image || image ==="" ? "https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png": image;
  return(
        <div className={own ? "message own" : "message"}>
             <div className='messageTop'>
             <img  className='messageImg' src={imageToShow}/>
             <p className='messageText'>{messageText}</p>
             </div>
             <div className='messageBottom'>
               {formattedDate}
             </div>
        </div>
    )
}



