import React from "react";
import DivContainer from '../../styledComponents/DivContainer';
import { DivRow } from "../../styledComponents/DivRow";
import { Title } from "../../styledComponents/FiltersStyles";
import './planes.css';
import Premium from "./Premium";
import Vip from "./Vip";

export default function Planes() {

    return (
        <div className="bodyPlanes">
            <div className="subWrapper">
            <Title>¡Suscribite para publicar!</Title>
            <DivRow alignIt='space-between' justCont='space-between'>
                <Premium />
                <Vip />
            </DivRow>
            </div>
        </div>
    )
}