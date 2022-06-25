import React, { useEffect, useState } from "react";
import Button from "../../styledComponents/Button";
import { useDispatch } from "react-redux";
import { filter } from "../../redux/actions";

import {
  Container,
  Title,
  Input,
  Label,
  FilterType,
  Select,
  StyledButton,
} from "../../styledComponents/FiltersStyles";

export default function Filter() {
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({});
  const [freeze, setFreeze] = useState(false);

  function handleType(e) {
    setFreeze(false);
    setLocation(e.target.value);
  }

  function handleChange(e) {
    setFreeze(false);
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    console.log(filters)
    if (!freeze) {
      dispatch(filter(filters, location));
    }
  }, [location, filters])

  function handleSubmit(e) {
    e.preventDefault();
    setFreeze(true);
    setFilters({});
    setLocation("");
    dispatch(filter(filters, location));
  }

  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <Title>Filtrar Por</Title>

        <Input
          type="text"
          name="neighbourhood"
          placeholder="Zona/Barrio"
          onChange={(e) => handleType(e)}
        />

        <Label>
          <FilterType>Tipo de Propiedad</FilterType>
          <Select name="type" value={filters.type} onChange={handleChange}>
            <option value="">Cualquier</option>
            <option value="Departamento">Departamento</option>
            <option value="Casa">Casa</option>
            <option value="Casa de Campo">Casa de Campo</option>
            <option value="Casa de Playa">Casa de Playa</option>
            <option value="Garage">Grarage</option>
            <option value="Habitacion">Habitacion</option>
            <option value="Hotel">Hotel</option>
            <option value="Local Comercial">Local Comercial</option>
            <option value="Local Industrial">Local Industrial</option>
            <option value="Oficina">Oficina</option>
            <option value="Otros">Otros</option>
            <option value="Terreno/Lote">Terreno/Lote</option>
            <option value="Terreno agricola">Terreno agricola</option>
          </Select>
        </Label>
        <Label>
          <FilterType>Habitaciones</FilterType>
          <Select name="rooms" value={filters.rooms} onChange={handleChange}>
            <option value="">Sin Preferencias</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </Label>
        <Label>
          <FilterType>Baños</FilterType>
          <Select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
          >
            <option value="">Sin Preferencias</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </Label>
        <Label>
          <FilterType>Precio</FilterType>
          <Select
            name="priceMax"
            value={filters.priceMax}
            onChange={handleChange}
          >
            <option value="">Sin Limite</option>
            <option value="400">$400</option>
            <option value="600">$600</option>
            <option value="800">$800</option>
            <option value="1000">$1,000</option>
            <option value="1500">$1,500</option>
            <option value="2000">$2,000</option>
            <option value="2500">$2,500</option>
            <option value="3000">$3,000</option>
            <option value="3500">$3,500</option>
            <option value="4000">$4,000</option>
            <option value="5000">$5,000</option>
            <option value="7000">$7,000</option>
            <option value="10000">$10,000</option>
          </Select>
        </Label>
        {/* <Label>
          <FilterType>Otro Filtro</FilterType>
          <Select name="distanceMax">
            <option value="">Sin Limite</option>
            <option value="1">1 mile</option>
            <option value="2">2 miles</option>
            <option value="3">3 miles</option>
            <option value="4">4 miles</option>
            <option value="5">5 miles</option>
            <option value="6">6 miles</option>
            <option value="7">7 miles</option>
            <option value="8">8 miles</option>
            <option value="9">9 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
            <option value="25">25 miles</option>
          </Select>
        </Label> */}
        <StyledButton>
          <Button style={{ color: "black" }} color="yellow" type="submit">
            Aplicar Filtro
          </Button>
        </StyledButton>
      </form>
    </Container>
  );
}