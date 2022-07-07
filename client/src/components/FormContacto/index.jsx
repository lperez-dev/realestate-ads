import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../styledComponents/Button";
import DivContainer from "../../styledComponents/DivContainer";
import { Input } from "../../styledComponents/StyledFormElements";
import styles from './styles.module.css'
import imagw  from './whatsapp.png';
import { useParams } from 'react-router-dom';



export default function FormContacto({tel}){
    const {id} = useParams()

    const contacto = {
        name: 'Carlos',
        email: ' carlos@gmail.com',
        telephone: 90563455,
        message: 'estoy interesado',
        property: id
    }
    
    
    console.log("telForm:", tel)
    let url = `https://wa.me/${tel}?text=Me%20gustaría%20saber%20el%20precio%20de%20la%20propiedad` 
   

    return(
        <DivContainer contact={true} className={styles.contFormContacto}>
            
            <h1 className={styles.titulo}>Formulario de contacto</h1>
            <br></br>
            <Input className={styles.email} type={'text'}  placeholder={'Email'}></Input>
            <br></br>
            <Input className={styles.nombre} type={'text'}  placeholder={'Nombre'}/>
            <br></br>
            <Input className={styles.tel} type={'text'}  placeholder={'Telefono'}/>
            <br></br>
            <textarea className={styles.descrip} type={'text'} placeholder={'Mensaje:'}/>
            <br></br>
            <div className={styles.container}>
            <a href={url}><img src={imagw} className={styles.whatsapp}/></a>
            <Button className={styles.contactar}>Contactar</Button>
            </div>

        </DivContainer>
    )
}