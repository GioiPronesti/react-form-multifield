import PostCard from '../PostCard/PostCard'
import style from './Main.module.css'
import { posts } from '../../posts.js'
import Tags from '../tags/Tags.jsx'
import { useState } from 'react'
import Button from '../Button/Button.jsx'

/*Ampliare l’esercizio precedente aggiungendo, nel form, i campi per immagine, contenuto, categoria (select), tags (lista di checkbox) e uno stato per pubblicare o meno l’articolo. Utilizzare un unico oggetto per gestire tutti i dati del form.
BONUS:
Aggiungere uno useEffect che mostri un alert quando l’utente clicca sull’apposita checkbox per pubblicare un articolo.*/ 

 const inizialFormData = {
    image: undefined,
    content: "",
    tags : "",
    category: "",
    published: true
  }

export default function Main() {

  const [formData,setFormData] = useState(initialFormData)

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

  const [title,setTitle] = useState('')

  function addPost(e) {
    e.preventDefault()

    const newTitle = title.trim()
    if(newTitle === '') return

    const post = {
      id: Date.now(),
      title,
      image: undefined /* compila questo campo */,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
      tags: [],
      published: true,
    }

    setPublishedPosts([...publishedPosts,post])
    setTitle('')

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
            <Button text='Salva' /> 
          </form>*/ }
          <form className='form-post' onSubmit={addPost} action=''>
            <h2>Aggiungi un nuovo post</h2>
            <div className="form-field">
              <label htmlFor="image">immagine</label>
              <input id="image" type="text"  name="image"  value={formData.image} placeholder="carica un'immagine" />
            </div>
            <div className="form-field">
              <label htmlFor="content">Contenuto</label>
              <input id="content" type="text"  name="content"  value={formData.content} placeholder="scrivi una descrizione" />
            </div>
            <div>
              <label htmlFor="category">Scegli un categoria</label>
              <select name="category" id="category" value={formData.category}>
                <option value="Automotive">Automotive</option>
                <option value="Tech">Tech</option>
                <option value="Sport">Sport</option>
              </select>  
            </div>
            <div className="form-field">
              <label htmlFor="tags">Contenuto</label>
              <input id="tags" type="text"  name="tags"  value={formData.tags} placeholder="scrivi un'etichetta" />
            </div>
            <div className="form-field form-field-inline">
              <input name='published' id="published" type="checkbox" />
              <label htmlFor="published">Disponibilità</label>
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