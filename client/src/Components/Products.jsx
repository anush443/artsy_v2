import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ProductCard from "./ProductCard";
import { mobile } from "../responsive";

const Header = styled.h1`
  margin-top: 100px;
  text-align: center;
`;

const Container = styled.div`
  margin: 10px;
  padding: 15px;
  width: 70%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })}
`;

const Products = ({ cat, filters, sort, title, artists, selectedArtist }) => {
  const [artworks, setArtworks] = useState([]);
  const [filteredartworks, setFilteredArtworks] = useState([]);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/artworks?category=${cat}`
            : `http://localhost:5000/api/artworks`
        );
        setArtworks(res.data);
      } catch (err) {}
    };
    getArtworks();
  }, [cat]);

  // artworks.length > 0 && artists(artworks);

  useEffect(() => {
    cat &&
      setFilteredArtworks(
        artworks.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [artworks, cat, filters]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredArtworks((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredArtworks((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    if (selectedArtist !== "") {
      setFilteredArtworks(
        artworks.filter((artwork) => {
          return artwork.artist_name === selectedArtist;
        })
      );
    } else {
      setFilteredArtworks(artworks);
    }
  }, [selectedArtist, artworks]);

  return (
    <>
      {!cat && <Header>{title}</Header>}
      {/* {cat && (
        <FilterContainer>
          <Filter>
            <FilterText>Search By Artist</FilterText>
            <Select name="show by artist" onChange={showByArtist}>
              <option value="">All</option>
              {[...artistOptions].map((name) => (
                <option>{name}</option>
              ))}
            </Select>
          </Filter>
        </FilterContainer>
      )} */}

      <Container>
        {cat
          ? filteredartworks.map((item) => <ProductCard item={item} />)
          : artworks.slice(0, 7).map((item) => <ProductCard item={item} />)}
      </Container>
    </>
  );
};

export default Products;
