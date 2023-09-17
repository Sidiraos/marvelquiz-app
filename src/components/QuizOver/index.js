import React , {useState , useEffect} from 'react'
import {GiTrophyCup} from 'react-icons/gi';
import {ImCrying} from 'react-icons/im';
import Modal from '../Modal';
import Loader from '../Loader';


const QuizOver = React.forwardRef((props, ref)=> {
    const {score , totalQuestions , scorePercentage , handleNextLevel , btnMsg , congrugatsMsg , canNextLevel , isSuccesOrEndGameBtnClassName}  = props;
    const infoMsg = canNextLevel ? <p className={`successMsg`}>{congrugatsMsg} <GiTrophyCup size={'50px'} /></p> : <p className={'failureMsg'}>{congrugatsMsg} <ImCrying size={'50px'}/></p>
    const [showModal , setShowModal] = useState(false);
    const [heroInfo , setHeroInfo] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [loadingText , setLoadingText] = useState('Loading hero Info');
    const [loadingTitle , setLoadingTitle] = useState('Loading hero Info...');

    const MARVEL_API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const hash = '304a7920b97b64149a123de4942847bd';
    

    const fetchDataIfOudated = (storedData , deadline)=>{
        if(parseInt(storedData , 10) > deadline){
            // console.log('data is not out of date')
            localStorage.setItem('apiDataTimestamp', new Date().getTime().toString());
        } else {
            // console.log('data is out of date')
            localStorage.clear()

        }
      
    }

    useEffect(()=>{
        const storedTimestamp = localStorage.getItem('apiDataTimestamp');
        const fifteenDaysAgo = new Date().getTime() - 15 * 24 * 60 * 60 * 1000; // 15 jours en millisecondes
        if(storedTimestamp){
            fetchDataIfOudated(storedTimestamp , fifteenDaysAgo)
        }

    } , [])


    const openModal = (id)=>{
        setShowModal(true);
        const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}`;
        const storedData = localStorage.getItem(`apiData${id}`);
    
        if(storedData){
            // donnée disponible 
            console.log("local storage")
            // console.log(JSON.parse(storedData));
            setHeroInfo(JSON.parse(storedData));
        } else {
            // donnee non disponible 
            console.log("fetch")
            setIsLoading(true);
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setHeroInfo(data)
                localStorage.setItem(`apiData${id}`, JSON.stringify(data));
                localStorage.setItem('apiDataTimestamp', new Date().getTime().toString());
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err)
                console.log(err.message)
                setIsLoading(true)
                setLoadingText(err.message)
                setLoadingTitle('Marvel API Error')
            } )
        }

    }
    const hideModal = ()=>{
        setShowModal(false);
    }
    // console.log(heroInfo);
    const capitalizeFirstLetter = (inputString)=> {
        // Vérifier si la chaîne est vide ou nulle
        if (!inputString) {
          return inputString;
        }
      
        // Mettre en majuscule la première lettre et concaténer le reste de la chaîne
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
      }
    return (
            <>
                <div className='stepsBtnContainer'>
                    {infoMsg}
                    <button className={`btnResult ${isSuccesOrEndGameBtnClassName}`} onClick={handleNextLevel}>{btnMsg}</button>

                </div>

                <div className='percentage'>
                        <div className='progressPercent'>success : {scorePercentage}%</div>
                        <div className='progressPercent'>Note : {score} / {totalQuestions}</div>
                </div>

                

                {canNextLevel &&
                    (
                        <>
                        <hr />
                        <Modal showModal = {showModal} hideModal = {hideModal}>
                            {isLoading ? (
                                <>
                                
                                <div className='modalHeader'>
                                            <h1>{loadingTitle}</h1>
                                            </div>
                                           <div style={{background : "#fff"}}>
                                                    <Loader loaderText={loadingText} />
                                           </div>
                                           <div className='modalFooter'>
                                               <button onClick={hideModal} className='modalBtn'>Close</button>
                                           </div>
                                
                                </>
                                              
                            
                            ) : 
                            
                            (
                                <>
                                    <div className='modalHeader'>
                                         <h1>{heroInfo.data.results[0].name}</h1>
                                     </div>
                                    <div className='modalBody'>
                                        <div className='comicImage'>
                                            <img src={`${heroInfo.data.results[0].thumbnail.path}.${heroInfo.data.results[0].thumbnail.extension}`} alt={heroInfo.data.results[0].name} />
                                            <p>{heroInfo.attributionText}</p>
                                        </div>
                                        <div className='comicDetails'>
                                            <h3>Description</h3>
                                            {
                                                heroInfo.data.results[0].description ?
                                                <p>{heroInfo.data.results[0].description}</p>
                                                :
                                                <p>No description available</p>
                                            }
                                            <h3>More Infos</h3>
                                            {
                                                heroInfo.data.results[0].urls && heroInfo.data.results[0].urls.map((item, index) => {
                                                    return (
                                            
                                                        <a key={index} className='comicUrl' href={item.url} target='_blank' rel='noopener noreferrer'>{capitalizeFirstLetter(item.type)}</a>
                                                        
                                                    )
                                                    
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='modalFooter'>
                                        <button onClick={hideModal} className='modalBtn'>Close</button>
                                    </div>
                                 </>
                            )}
                        </Modal>
                         <p>
                            The answers of the questions are:  
                         </p>

                            <div className='answerContainer'>

                                <table className='answers'>
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>Answer</th>
                                            <th>Info</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ref.map(item => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.question}</td>
                                                        <td>{item.answer}</td>
                                                        <td><button onClick={()=> openModal(item.heroId)} className='btnInfo'>Info</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                }

               
                
            </>
        )
})

export default React.memo(QuizOver)