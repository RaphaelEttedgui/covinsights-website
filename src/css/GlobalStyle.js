import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.mainGrey};
    color: ${props => props.theme.mainBlack};
    font-display: swap;
    font-family: "Helvetica", sans-serif;
    font-size: 1rem;
    line-height: 1.4;
  }

  .delete_button{
    position:relative;
    left:85%;
  }

  .edit_button{
    position:relative;
    left:70%;
    top:16px;
    z-index: 2;
  }

  .show_activity{
    position:relative;
    bottom:34px;
  }

  .calculator_presentation{
    width:100%;
    text-align: center;
  }

  .addActivity_buttons{
    align-items: center;
    justify-content: space-between;
  }

  @media screen and (max-width: 576px){
    .inside_body{
      padding-top: 2rem;
    }
    .risk_calculator{
      align-items: center;
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 576px) {

    .inside_body{
      padding: 2rem 1rem 0 1rem;
    }

    .activity_box{
      width: "20rem";
      height: "10rem";
      margin: "auto";
      padding: 0 0.5rem 0 0.5rem;
    }
  
    .risk_calculator{
      max-width: 100%;
      border-style:solid;
      border-width: thin;
      border-radius: 25px;
      padding: 1rem;
    }
  
    .risk_form {
      justify-content: space-between;
      align-items: center;
    }

    .activity_list{
      position:relative;
    }
  
    .my_body {
      background: ${props => props.theme.mainWhite};
      min-height: 100vh;
      min-width: 50%;
      margin: 0 auto;
      display: flex;
    }

    .behind_body {
    padding-top: 2rem;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
  }


  h1, h2, h3, h4, h5, h6 {
    font-family: "Impact", sans-serif;
    letter-spacing: ${props => props.theme.mainSpacing};
    font-display: swap;
    margin-bottom: 1.25rem;
  }

  p {
    margin-bottom: 1.25rem;
  }

  a {
    text-decoration: none;
    }

    .defaultHero {
        min-height: calc(100vh - 62px);
        background: linear-gradient(rgba(63, 208, 212, 0.7), rgba(0, 0, 0, 0.7)),
            url("../../static/images/index-hero.webp") center/cover no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-white,
    .btn-primary {
        text-transform: uppercase;
        letter-spacing: ${props => props.theme.mainSpacing};
        color: ${props => props.theme.mainWhite};
        border: 2px solid ${props => props.theme.mainWhite};
        padding: 0.9rem 1.6rem;
        display: inline-block;
        transition: ${props => props.theme.mainTransition};
        cursor: pointer;
    }

    .btn-white:hover {
        background: ${props => props.theme.mainWhite};
        color: ${props => props.theme.primaryColor};
    }

    .btn-primary {
        background: ${props => props.theme.primaryColor};
        color: ${props => props.theme.mainWhite};
        border: 2px solid ${props => props.theme.primaryColor};
    }

    .btn-primary:hover {
        background: transparent;
        color: ${props => props.theme.primaryColor};
    }

    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
`
