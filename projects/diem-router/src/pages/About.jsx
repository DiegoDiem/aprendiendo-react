import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Hola Soy Diego y esto es un clon de React Routers',
    button: 'Ir al inicio'
  },
  en: {
    title: 'About us',
    description: 'Hola Mi name is Diego, this is clone of React router',
    button: 'Go to Home Page'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src='https://pbs.twimg.com/profile_images/1637830663226159105/a9qiw1zq_400x400.jpg' alt='ffoto de diem' />
        <p>{i18n.description} </p>
      </div>
      <Link to='/'> {i18n.button}</Link>
    </>
  )
}
