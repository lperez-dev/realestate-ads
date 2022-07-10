
import StyledCard from '../../styledComponents/StyledCard'
import styles from './styles.module.css'

export default function ContactCard ({ name, email, telephone, message }){
  return (

    <StyledCard className={styles.contenedorGral}>
        
        <div>
          <h2 className={styles.datos}>Mensaje de: {name}</h2>
        </div>

        <div>
          <h2 className={styles.datos}>Correo electrónico: {email}</h2>          
        </div>

        <div>
          <h2 className={styles.datos}>Teléfono: {telephone}</h2>
        </div>
        
        <div>
          <h2 className={styles.datos}>Mensaje: {message}</h2> 
        </div>

    </StyledCard>
  )
}
