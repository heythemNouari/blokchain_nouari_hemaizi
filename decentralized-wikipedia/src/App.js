import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import * as Ethereum from './services/Ethereum'
import styles from './App.module.css'
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import ReactHtmlParser from 'react-html-parser';








const NewArticle = () => {
  const [editor, setEditor] = useState(null)
  
  useEffect(() => {
  /* async function add= () => {
      const contract = useSelector(({ contract }) => contract)
      if(contract){
        contract.methods.addArticle(this.msg).call()
      }
    }
    add(); */ 
    setEditor(new MediumEditor(`.${styles.editable}`))
  }, [setEditor])

  return (
    <form /* onSubmit = {this.Add()}*/ >
      <div className={styles.subTitle}>New article </div>
      <div className={styles.mediumWrapper}>
        <textarea className={styles.editable} name="msg"  />
      </div>
       <input type="submit" value="Submit" /> 
    </form>
  )
}

const Home = () => {
  return (
    <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/article/new">Add an article</Link>
      <Link to="/article/all">All articles</Link>
    </div>
  )
}
  
const AllArticles = () => {
  const [articles, setArticles] = useState([])
  const contract = useSelector(({ contract }) => contract)
  useEffect(() => {
   async function getAll () {
     if(contract){
       
      
       var tab =[]
       var ids = await contract.methods.getAllIds().call()
       console.log("size :"+ids.lenght)
       for(var i = 0 ; i < ids.lenght ; i++){
         console.log(i)
         let article = await contract.methods.articleContent(ids[i]).call()
         tab.push(article)
       }
       setArticles(tab)
     }
   }
   getAll();
  }, [contract, setArticles])
  return (
    
    
  <div>
    <Home />
    <div>Voici la liste des articles : </div>
    {
      articles.map((article ,index) => (
        <div className="article" key={index.toString()}> {ReactHtmlParser(article)}</div>
      ))}
  </div>)
  }


const NotFound = () => {
  return <div>Not found</div>
}

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(Ethereum.connect)
  },[dispatch])
  return (
    <div className={styles.app}>
      <div className={styles.title}>Welcome to Decentralized Wikipedia</div>
  
      <Switch>
        <Route path="/article/new">
          <NewArticle />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/article/all">
          <AllArticles />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
} 

export default App
