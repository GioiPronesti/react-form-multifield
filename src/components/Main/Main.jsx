import PostCard from '../PostCard/PostCard'
import style from './Main.module.css'
import { posts } from '../../posts.js'
import Tags from '../tags/Tags.jsx'
import { useState } from 'react'
import Button from '../Button/Button.jsx'

/*Ampliare l’esercizio precedente aggiungendo, nel form, i campi per immagine, contenuto, categoria (select), tags (lista di checkbox) e uno stato per pubblicare o meno l’articolo. Utilizzare un unico oggetto per gestire tutti i dati del form.
BONUS:
Aggiungere uno useEffect che mostri un alert quando l’utente clicca sull’apposita checkbox per pubblicare un articolo.*/ 

 const initialFormData = {
    title: "",
    image: undefined,
    content: "",
    tags : "",
    category: "",
    published: true
  }

export default function Main() {

  // variabile di stato, formData variabile reattiva
  const [formData,setFormData] = useState(initialFormData)

  function handleFormData(e){

    // ottengo i valori delle chiavi e loro rispettivi valori
    const key = e.target.name
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

    // duplico l'oggetto,  che mi serve per aggiornare le proprietà di Initial Form Data e far reagire formData
    
    const newFormData = {...formData}
    newFormData[key] = value
    
    // aggiorno la mia variabile di stato
    setFormData(newFormData)

  }

  const [publishedPosts, setPublishedPosts ] = useState(posts.filter((post) => post.published === true ))
  const tags = []

  posts.forEach(post => {

    const postTags = post.tags
    console.log(postTags)

    postTags.forEach((tag) => {
      if(!tags.includes(tag)) {
        tags.push(tag)
      }
      // !tags.includes(tag) && tags.push(tag)
    })

  })

  //const [title,setTitle] = useState('')

  function addPost(e) {
    e.preventDefault()

    //const newTitle = title.trim()
    if(formData.title.trim() === '') return

    const post = {
      id: Date.now(),
      ...formData,
      
    //  image: undefined /* compila questo campo */,
     // content:
     //   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
      tags: formData.tags.split(',').map((tag) => tag.trim())
     // published: true,
    }

    setPublishedPosts([...publishedPosts,post])
    setFormData(initialFormData) // resetto il form
    //setTitle('')
     
  }

  function deletePost(id) {

    setPublishedPosts(publishedPosts.filter(post => post.id !== id ))

  }

  // console.log('tags',tags)

  return (
    <main>
      <section className={style.section}>
        <div className="container">
          {/*
          <form onSubmit={addPost} action="" className='inline-form'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Titolo del post' />
            
          </form> */}


          <form className='form-post' onSubmit={addPost} action=''>
            <h2>Aggiungi un nuovo post</h2>
            <div className='form-field'>
              <label htmlFor="title">titolo</label>
              <input id="title" type="text"  name="title" onChange={handleFormData}  value={formData.title} placeholder="scrivi il titolo" />
              <Button text='Salva' /> 
            </div>
            <div className="form-field">
              <label htmlFor="image">immagine</label>
              <input id="image" type="text"  name="image" onChange={handleFormData} value={formData.image} placeholder="carica un'immagine" />
            </div>
            <div className="form-field">
              <label htmlFor="content">Contenuto</label>
              <input id="content" type="text"  name="content" onChange={handleFormData} value={formData.content} placeholder="scrivi una descrizione" />
            </div>
            <div>
              <label htmlFor="category">Scegli un categoria</label>
              <select name="category" id="category" onChange={handleFormData} value={formData.category}>
                <option value="Automotive">Automotive</option>
                <option value="Tech">Tech</option>
                <option value="Sport">Sport</option>
              </select>  
            </div>
            <div className="form-field">
              <label htmlFor="tags">Contenuto</label>
              <input id="tags" type="text"  name="tags" onChange={handleFormData} value={formData.tags} placeholder="scrivi un'etichetta" />
            </div>
            <div className="form-field form-field-inline">
              <input onChange={handleFormData} checked={formData.published} name='published' id="isPublished" type="checkbox" />
              <label htmlFor="isPublished">Disponibilità</label>
            </div>
            <input type='submit' value="Aggiungi il Post"></input>
          </form>
        </div>
        <div className="container">
          <h1 className={style.section_title}>Il mio blog</h1>
        </div>
        <div className="container">
          <Tags className={style.tags_centered } tags={tags} />
        </div>
        <div className="container">
          <div className="row">
            { publishedPosts.map((el) => (
              <div key={el.id} className="col-4">
                <PostCard onDelete={() => deletePost(el.id)} post={el} />
              </div>
            ))}          
          </div>
        </div>
      </section>
    </main>
  )
}