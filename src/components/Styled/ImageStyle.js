import styled from "styled-components";

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  background: #f5f8ff;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // background: #fff;
  place-items: center;
  // padding: 36px 48px;
  // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
  //   rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  // border-radius: 20px;
  text-align: center;
  margin-right: 20px;
  p {
    margin-top: -10px;
    color: #777;
  }
`;

export const BoxUpload = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
  border: 1px dashed #799cd9;
  /* padding: 36px 48px; */
  position: relative;
  height: 300px;
  width: 300px;
  background: #fbfbff;
  .image-upload {
    display: flex;
    flex-wrap: wrap;
    label {
      cursor: pointer;

      :hover {
        opacity: 0.8;
      }
    }
    > input {
      display: none;
    }
  }
  @media screen and (max-width: 450px) {
    height: 250px;
    width: 250px;
  }

  @media screen and (max-width: 350px) {
    height: 200px;
    width: 200px;
  }
`;

export const ImagePreview = styled.div`
  position: relative;

  /* cursor: pointer; */
  #uploaded-image {
    height: 300px;
    width: 300px;
    object-fit: fill;
  }
  .close-icon {
    height: 20px;
    background: #000;
    opacity: 0.8;
    position: absolute;
    z-index: 10;
    right: 15px;
    top: 20px;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }

  @media screen and (max-width: 450px) {
    #uploaded-image {
      height: 250px;
      width: 250px;
      object-fit: fill;
    }
  }

  @media screen and (max-width: 350px) {
    #uploaded-image {
      height: 200px;
      width: 200px;
      object-fit: fill;
    }
  }
`;
